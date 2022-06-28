const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');
const authorizeItem = require('../middleware/authorizeItem');


module.exports = Router()
.post('/', authenticate, async (req, res, next) => {
    try {
        const item = await Item.insert({ ...req.body, user_id: req.user.id });
        res.json(item);
    } catch (e) {
        next(e);
    }
})

.put('/:id', authenticate, authorizeItem, async (req, res, next) => {
    try {
      const item = await Item.updateById(req.params.id, req.body);
      res.json(item);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', authenticate, authorizeItem, async (req, res, next) => {
    try {
      const data = await Item.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });