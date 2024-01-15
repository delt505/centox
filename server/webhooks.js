const { ObjectId } = require('mongodb');
const { uuid } = require('uuidv4');
const axios = require('axios').default;

const logger = require('./utils/logger');

// Return module
module.exports = (db) => {
    const obj = {};

    /**
     * Creates a webhook for a channel
     * @param {string} url - The url to send the webhook to
     * @param {string} name - The name of the webhook
     * @param {string} event - event of the webhook
     * @param {Function} callback - Callback function
     */
    obj.createWebhook = async (url, name, event, callback) => {
        try {
            var secretKey = uuid().toString();

            await db.webhooks.insertOne({
                url: url,
                name: name,
                event: event,
                secret: secretKey,
                createdAt: new Date().getTime()
            }, (err, res) => {
                if(err){
                    logger.error(err);
                    return callback({ status: 500, message: 'An internal error occurred.' });
                }
                return callback({ status: 200, message: "Webhook has been created.", secret: secretKey })
            });
        } catch(err) {
            logger.error(err);
            return callback({ status: 500, message: 'An internal error occurred.' });
        }
    }

    /**
     * Delete a webhook by id
     * @param {string} id - The id of the webhook
     * @param {Function} callback - Callback function
     */
    obj.deleteWebhook = async (id, callback) => {
        try {
            await db.webhooks.deleteOne({ _id: new ObjectId(id) }, (err, res) => {
                if(err){
                    logger.error(err);
                    return callback({ status: 500, message: 'An internal error occurred.' });
                }
                return callback({ status: 200, message: "Webhook has been deleted." });
            });
        } catch(err) {
            logger.error(err);
            return callback({ status: 500, message: 'An internal error occurred.' });
        }
    }


    /**
     * Gets all webhooks
     * @returns {Array} - Array of webhooks
     */
    obj.getWebhooks = async () => {
        var webhooks = await db.webhooks.find({}).toArray();
        return webhooks;
    }

    /**
     * Gets a webhook by id
     * @param {string} id - The id of the webhook
     * @returns {Object} - The webhook
     */
    obj.getWebhookById = async (id) => {
        try {
            var webhook = await db.webhooks.findOne({ _id: new ObjectId(id) });
            return webhook;
        } catch(err) {
            logger.error(err);
            return null;
        }
    }

    /**
     * Send request to webhooks with data
     * @param {string} event - The event of the webhook
     * @param {Object} data - The data to send
     */
    obj.sendWebhook = async (event, data) => {
        try {
            var webhooks = await db.webhooks.find({ $or: [ {event: event, event: 'all'}] }).toArray();
            for(var i = 0; i < webhooks.length; i++){
                var webhook = webhooks[i];
                await axios.post(webhook.url, { event: event, secret: webhook.secret, data: data }, { headers: { 'Content-Type': 'application/json' } })
                    .catch(err => {
                        logger.error(err);
                    });
            }
        } catch(err) {
            logger.error(err);
        }
    }
    
    /**
     * Send webhook when a comment is created.
     * @param {*} application - The application which the comment was created on
     * @param {*} comment - The comment which was created
     */
    obj.onComment = async (application, comment) => {

        var applicationUser = await db.users.findOne({ _id: new ObjectId(application.user) });
        var commentUser = await db.users.findOne({ _id: new ObjectId(comment.user) });

        var data = {
            application: {...application, user: applicationUser },
            comment: {...comment, user: commentUser },
        }
        await obj.sendWebhook('onComment', data);
    }

    /**
     * Send webhook when a status is changed.
     * @param {*} application - The application which the status was changed on
     * @param {*} statusUpdate - The status update object
     */
    obj.onStatusUpdate = async (application, statusUpdate) => {

        var applicationUser = await db.users.findOne({ _id: new ObjectId(application.user) });
        var statusUpdateUser = await db.users.findOne({ _id: new ObjectId(statusUpdate.user) });

        var data = {
            application: {...application, user: applicationUser },
            statusUpdate: {...statusUpdate, user: statusUpdateUser },
        }
        await obj.sendWebhook('onStatusUpdate', data);
    }
    
    return obj;
}