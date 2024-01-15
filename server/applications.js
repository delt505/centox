// Imports
const { ObjectId } = require('mongodb');

const logger = require('./utils/logger');

// Return module
module.exports = (db) => {
    const obj = {};

    const webhooks = require('./webhooks')(db);

    /**
     * Create application
     * @param {String} formId - The form _id
     * @param {String} userId - The user _id
     * @param {Object} answers - The answers
     * @param {Function} callback - The callback
     */
    obj.createApplication = async (formId, userId, answers, callback) => {
        try {
            var userObject = new ObjectId(userId);
            var formObject = new ObjectId(formId);

            await db.applications.insertOne({
                form: formObject,
                user: userObject,
                createdAt: new Date().getTime(),
                status: "pending",
                interactions: [],
                answers: answers
            }, async (err, res) => {
                if(err) {
                    logger.error(err);
                    return callback({ status: 500, message: 'An internal error occurred.' });
                }
                return callback({ status: 200, message: "Application has been created!", applicationId: res.insertedId })
            });
        } catch(err) {
            return callback({ status: 500, message: 'An internal error occurred.' });
        }
    }

    /**
     * Get the number of total applications with a specific status and formId
     * @param {String} formId - The form _id
     * @param {String[]} status - The status
     */
    obj.getTotalApplications = async (formId, status) => {
        try {
            var formObject = new ObjectId(formId);

            if(Array.isArray(status)){
                var statusObject = [];
                for(var i = 0; i < status.length; i++){
                    statusObject.push({ status: status[i] });
                }
                var count = await db.applications.count({ form: formObject, '$or': statusObject });
                return count;
            } else {
                var count = await db.applications.count({ form: formObject, status: status });
                return count;
            }
        } catch(err) {
            return 0;
        }
    }


    /**
     * Get a paginated list of all application with a specific status
     * 
     * @param {String} formId - The form _id
     * @param {String} status - The status
     * @param {Number} page - The page
     * @param {Number} limit - The limit
     */
    obj.getAllApplications = async (formId, status, page, limit) => {
        try {

            var formObject = new ObjectId(formId);

            if(Array.isArray(status)){
                var statusObject = [];
                for(var i = 0; i < status.length; i++)
                    statusObject.push({ status: status[i] });
                return db.applications.find({ form: formObject, '$or': statusObject }, { projection: { answers: 0, interactions: 0 }, skip: (page - 1) * limit, limit: limit, sort: { createdAt: -1} }).toArray();
            } else {
                return db.applications.find({ form: formObject, status: status }, { projection: { answers: 0, interactions: 0 }, skip: (page - 1) * limit, limit: limit, sort: { createdAt: -1} }).toArray();
            }
        }
        catch(err) {
            return []
        }
    }

    /**
     * Get a list of users applications
     * @param {String} userId - The user _id
     */
    obj.getUserApplications = async (userId) => {
        try {
            var userObject = new ObjectId(userId);
            return db.applications.find({ user: userObject }, { projection: { answers: 0, comments: 0 }}).toArray();
        }
        catch(err) {
            return []
        }
    }

    /**
     * Get a specific application
     * @param {String} applicationId - The application _id
     */
    obj.getApplication = async (applicationId) => {
        try {
            var applicationObject = new ObjectId(applicationId);
            return db.applications.findOne({ _id: applicationObject });
        }
        catch(err) {
            return null
        }
    }

    /**
     * Delete an application
     * @param {String} applicationId - The application _id
     * @param {Function} callback - The callback
     */
    obj.deleteApplication = async (applicationId, callback) => {
        try {
            var applicationObject = new ObjectId(applicationId);
            await db.applications.deleteOne({ _id: applicationObject }, (err, res) => {
                if(err){
                    logger.error(err);
                    return callback({ status: 500, message: 'An internal error occurred.' });
                }
                return callback({ status: 200, message: "Application has been deleted!" })
            });
        }
        catch(err) {
            return callback({ status: 500, message: 'An internal error occurred.' });
        }
    }

    /** 
     * Change the status of an application
     * @param {String} applicationId - The application _id
     * @param {String} userId - the id of the user who updates the status
     * @param {String} status - The status
     * @param {Function} callback - The callback
     */
    obj.changeStatus = async (applicationId, userId, status, callback) => {
        try {
            var applicationObject = new ObjectId(applicationId);
            var userObject = new ObjectId(userId);

            var statusUpdateObj = { type: 'statusUpdate', user: userObject, status: status, timestamp: new Date().getTime() }

            await db.applications.findOneAndUpdate({ _id: applicationObject }, { $set: { latestInteraction: new Date().getTime(), status: status }, $push: { interactions: statusUpdateObj } }, async (err, res) => {
                if(err){
                    logger.error(err);
                    return callback({ status: 500, message: 'An internal error occurred.' });
                }
                await webhooks.onStatusUpdate(res.value, statusUpdateObj);
                return callback({ status: 200, message: "Application status has been changed!" })
            });
        }
        catch(err) {
            return callback({ status: 500, message: 'An internal error occurred.' });
        }
    }

    /**
     * Add a comment to an application
     * @param {String} applicationId - The application _id
     * @param {String} userId - The user _id
     * @param {String} comment - The comment
     * @param {Function} callback - The callback
     */
    obj.addComment = async (applicationId, userId, comment, callback) => {
        try {
            var applicationObject = new ObjectId(applicationId);
            var userObject = new ObjectId(userId);
        
            var commentObj = { type: 'comment', user: userObject, text: comment, timestamp: new Date().getTime() }

            await db.applications.findOneAndUpdate({ _id: applicationObject }, { $set: { latestInteraction: new Date().getTime() }, $push: { interactions: commentObj } }, async (err, res) => {
                if(err){
                    logger.error(err);
                    return callback({ status: 500, message: 'An internal error occurred.' });
                }
                await webhooks.onComment(res.value, commentObj);
                return callback({ status: 200, message: "Comment has been created!" })
            });
        }
        catch(err) {
            logger.error(err);
            return callback({ status: 500, message: 'An internal error occurred.' });
        }
    }

    return obj;
}