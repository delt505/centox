const dotenv = require('dotenv');
const mongo = require('./server/utils/database');

dotenv.config();

(async () => {
    try {
        console.log('* Connecting to MongoDB...');
        const client = await mongo(
            process.env.MONGODB_USERNAME,
            process.env.MONGODB_PASSWORD,
            process.env.MONGODB_HOST,
            process.env.MONGODB_PORT
        );

        console.log('* MongoDB connected successfully!');
        const database = client.db(process.env.MONGODB_DATABASE);

        console.log('* Creating indexes...');
        await database.collection('logins').createIndex({ loggedIn: 1 }, { expireAfterSeconds: 3600 * 24 * 7 });
        await database.collection('applications').createIndex({ status: 1 });
        await database.collection('applications').createIndex({ user: 1 });
        await database.collection('roles').createIndex({ id: 1 }, { unique: true });

        console.log('* Creating default roles...');
        await database.collection('roles').insertMany([
            {
                label: 'admin',
                id: 'admin',
                color: 'red',
                deletable: false
            },
            {
                label: 'default',
                id: 'default',
                color: 'gray',
                deletable: false
            }
        ]);

        const firstUserId = process.env.OWNER_DISCORD_ID;
        console.log('* Inserting first user...');
        await database.collection('users').insertOne({
            id: firstUserId,
            role: 'admin',
            owner: true,
            createdAt: new Date().getTime()
        });

        console.log('* MongoDB configured successfully!');
        process.exit(0);
    } catch (err) {
        console.error(' - Error connecting to MongoDB:', err);
        process.exit(1);
    }
})();
