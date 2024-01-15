// Imports
const jwt = require('jsonwebtoken');
const express = require('express');
// Imports
const { ObjectId } = require('mongodb');

module.exports = (db) => {
    const obj = {};

    /**
     * Generate a new access token for a given user
     * @param {String} userId
     * @returns 
     */
    obj.generateAccessToken = (userId) => {
        return jwt.sign({userId: userId}, process.env.JWT_SECRET, { expiresIn: 3600*24*7 });
    }

    /**
     * Checks if the given access token exists in the database
     * @param {String} token 
     * @returns 
     */
    obj.isAccessTokenValid = async (token) => {
        var res = await db.logins.findOne({token: token});
        if (!res) return false;
        return true;
    }

    /**
     * Get Authorization token from request header.
     * @param {express.Request} req
     * @returns {String} token
     */
    obj.getTokenFromHeader = (req) => {
        /*const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]*/

        const token = req.cookies.access_token;

        return token;
    }

    /**
     * Middleware for authenticating a user by the access token
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     * @returns 
     */
    obj.ensureAuthentication = async (req, res, next) => {
        const token = obj.getTokenFromHeader(req);

        if(token == null) return res.status(401).json({
            message: 'Authentication failed.',
            isLoggedIn: false
        });

        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        
            if (err) {
                return res.status(401).json({
                    message: 'Access token expired.',
                    isLoggedIn: false
                });
            }

            var dbRes = await obj.isAccessTokenValid(token);

            if (!dbRes) return res.status(401).json({
                message: 'Access token expired.',
                isLoggedIn: false
            });
            
            req.userId = data.userId;
            return next();
        });
    }

    /**
     * Middleware for authenticating a user by the access token (quering the database for the user object)
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     * @returns 
    */
    obj.ensureAuthenticationWithUser = async (req, res, next) => {
        const token = obj.getTokenFromHeader(req);

        if(token == null) return res.status(401).json({
            message: 'Authentication failed.'
        });

        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        
            if (err) {
                return res.status(401).json({
                    message: 'Access token expired.'
                });
            }

            var dbRes = await obj.isAccessTokenValid(token);

            if (!dbRes) return res.status(401).json({
                message: 'Access token expired.'
            });

            
            var user = await obj.getUserFromId(data.userId);

            req.userId = data.userId;
            req.user = user;
            return next();
        });
    }


    /**
     * Middleware for forwarding a user if authenticated
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     * @returns 
     */
     obj.forwardAuthentication = async (req, res, next) => {
        const token = obj.getTokenFromHeader(req);

        if(token == null) return next();

        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    
            if (err) return next();

            if (!await obj.isAccessTokenValid(token)) return next();
        
            return res.redirect("/")
        });
    }

    /**
     * Get user data from access token
     * @param {String} accessToken 
     */
     obj.getUserFromId = async (id) => {
        var user = await db.users.findOne({_id: new ObjectId(id)});
        if (!user) return null;
        return user;
    }


    return obj;
}