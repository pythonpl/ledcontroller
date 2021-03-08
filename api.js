const express = require('express');
const router = express.Router();

const led = require('./obj/objects').led;

router.get('/offLedstrip', (req, res) => { led.offStrip(); res.sendStatus(200); });

router.get('/ledStripColor/:color', (req, res) => { led.setColorInBasicMode('#'+req.params.color); res.sendStatus(200); });

module.exports = router;