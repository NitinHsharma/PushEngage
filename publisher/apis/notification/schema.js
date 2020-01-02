const Joi = require('joi');
 
const notificationSchema = Joi.object().keys({
    notificationId: Joi.string().required(),
    siteId: Joi.string().required()
});

module.exports = {
    notificationSchema
}