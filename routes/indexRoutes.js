const express = require('express');
const router = express.Router();
const authenticated = require('../middleware/authenticate');
const homeController = require('../controllers/homeControllers');

router.get('/', authenticated.check, (req, res, next) => {
    next();
}, homeController.create);

module.exports = router;