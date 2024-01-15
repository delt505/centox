// Imports
const router = require('express').Router();

// Export route
module.exports = (db) => {
    
    // Utils
    const webhooks = require('../../server/webhooks')(db);
    const auth = require('../../server/auth')(db);
    
    // Create rate limiter
    const rateLimiter = require('../../server/utils/rateLimiter')(2 * 60 * 1000, 15, "Too many requests. Try again later.")


    // Get all webhooks
    router.get('/', rateLimiter, auth.ensureAuthenticationWithUser, async (req, res) => {
        if(req.user?.role !== 'admin') return res.status(403).send({ status: 403, message: 'You are not authorized to access this resource.' });
        var webhooksArr = await webhooks.getWebhooks();
        return res.status(200).send({ status: 200, message: "Webhooks retrieved.", webhooks: webhooksArr });
    });

    // Get a webhook by id
    router.get('/:id', rateLimiter, auth.ensureAuthenticationWithUser, async (req, res) => {
        if(req.user?.role !== 'admin') return res.status(403).send({ status: 403, message: 'You are not authorized to access this resource.' });
        var webhook = await webhooks.getWebhookById(req.params.id);
        if(!webhook) return res.status(404).send({ status: 404, message: 'Webhook not found.' });
        return res.status(200).send({ status: 200, message: "Webhook retrieved.", webhook: webhook });
    });


    // Create webhook
    router.post('/', rateLimiter, auth.ensureAuthenticationWithUser, async (req, res) => {
        const { url, name, event } = req.body;
        if(!url || !name || !event) return res.status(400).json({ status: 400, message: 'Missing required fields.' });

        // check if event is valid
        if(!['all', 'onComment', 'onStatusUpdate'].includes(event)) return res.status(400).json({ status: 400, message: 'Invalid event.' });

        if(req.user?.role !== 'admin') return res.status(403).json({ status: 403, message: 'You are not authorized to perform this action.' });

        await webhooks.createWebhook(url, name, event, (response) => {
            return res.status(response.status).json(response);
        });
    })

    // Delete webhook
    router.delete('/:id', rateLimiter, auth.ensureAuthenticationWithUser, async (req, res) => {
        const { id } = req.params;
        if(!id) return res.status(400).json({ status: 400, message: 'Missing required fields.' });

        if(req.user.role !== 'admin') return res.status(403).json({ status: 403, message: 'You are not authorized to perform this action.' });

        await webhooks.deleteWebhook(id, (response) => {
            return res.status(response.status).json(response);
        });
    });


    return router;
}