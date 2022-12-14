const express = require('express');
const router = express.Router();
const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/indexRoutes');

router.use("/auth", authRoutes);
router.use("/", indexRoutes);

module.exports = router;