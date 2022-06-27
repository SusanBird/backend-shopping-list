const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

module.exports = Router()
.post('/', authenticate, async (req, res, next) => {
    try {
        const item = await Item.insert({ ...req.body, user_id: req.user.id });
        res.json(item);
    } catch (e) {
        next(e);
    }
})