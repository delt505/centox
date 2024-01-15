// Package imports
require('dotenv').config();
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require('path');

// Local imports
const connectToDatabase = require('./server/utils/database');
const getFileLocations = require('./server/utils/getFileLocations');
const morgan = require('./server/utils/morgan');
const logger = require('./server/utils/logger');

// Creating the app
const server = express();
const app = next({ dev: process.env.NODE_ENV === 'development' });
const handle = app.getRequestHandler();
const http = require('http').Server(server);

// Middleware
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json());
server.use(cookieParser());

// CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Content-Length, X-Requested-Width, Accept, Access-Control-Allow-Credentials');

    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
})

app.prepare().then(() => {
    console.log('Preparing server...');
    connectToDatabase(process.env.MONGODB_USERNAME, process.env.MONGODB_PASSWORD, process.env.MONGODB_HOST, process.env.MONGODB_PORT, async (err, client) => {

        if (err) throw err;
    
        // Load database collections
        const database = client.db(process.env.MONGODB_DATABASE);
    
        console.log('Connected to --- MongoDB ---');
        var collections = ['users', 'logins', 'roles', 'forms', 'applications', 'webhooks']
        var db = {}
    
        for(let i = 0; i < collections.length; i++){
            console.log(` - ${collections[i]}`)
            db[collections[i]] = database.collection(collections[i]);
        }
    
    
        // Load base API routes
        var baseRoutes = await getFileLocations(`${__dirname}/routes/`, ['.js', '.ts']);
    
    
        server.use(express.static(path.join(__dirname, './public')))
        server.use('/_next', express.static(path.join(__dirname, './.next')))

        // Instantiate after static and '_next' to ensure it doesn't log all static content.
        // https://stackoverflow.com/questions/26943213/expressjs-morgan-log-only-route-request
        server.use(morgan)
    
        console.log('Loading base routes..');
        for (let i = 0; i < baseRoutes.length; i++) {
            var paths = `${baseRoutes[i]}`.replace(__dirname, ''),
                pathArr = paths.split('/'),
                baseName = `/`;
            for (let j = 3; j < pathArr.length; j++) {
                if ((j > 1) && (j != (pathArr.length - 1))) baseName += `${pathArr[j]}/`;
                else if (pathArr[j] != 'index.js') baseName += `${`${pathArr[j]}`.replace('.js', '').replace('.ts', '')}/`;
            }
            var route = require(baseRoutes[i])(db);
            server.use(`/api${baseName}`, route);
            console.log(` - /api${baseName}`);
        }

        // Handle all other requests (next pages)
        server.get('*', (req, res) => {
            return handle(req, res);
        });

    
        // Start API Server
        const port = process.env.APP_PORT || 3000
        http.listen(port, () => {
            logger.info(`Server running in --- ${process.env.NODE_ENV || "development"} --- on port ${port}`)
        });
    });
});