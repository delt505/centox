// Imports
const rateLimit = require('express-rate-limit');

/**
 * Create a rate limiter
 * @param window Timeframe for which requests are checked/remembered.
 * @param max Max number of connections during specified timeframe.
 * @param message Error message sent to user when limit is reached.
 * @returns {rateLimit.RateLimit} Rate limit object
 */
function createRateLimit(window, max, message){
    return rateLimit({
        windowMs: window,
        max: max,
        message: message
    })
}

module.exports = createRateLimit;