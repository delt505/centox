// Imports
const router = require('express').Router();

// Export route
module.exports = (db) => {

    router.get('/', async (req, res) => {
        return res.clearCookie("access_token").redirect("/login?logout=true")
    })

    return router;
}