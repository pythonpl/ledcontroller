const express = require('express');
const router = express.Router();

const led = require('./obj/objects').led;
const schedule = require('./obj/objects').schedule;
const plantrelay = require('./obj/objects').plantrelay;

router.post('/offLedstrip', (req, res) => { led.offStrip(); res.sendStatus(200); });

router.post('/ledStripColor/:color', (req, res) => { led.setColorInBasicMode('#'+req.params.color); res.sendStatus(200); });

router.delete('/schedule/:id', async (req, res) => { await schedule.cancelSchedule(req.params.id); res.sendStatus(200); });

router.post('/schedule', async (req, res) => { await schedule.insertNewSchedule(req.body.type, req.body.oneTime, req.body.date); res.sendStatus(200); });

router.post('/onRelay', (req, res) => { plantrelay.set(); res.sendStatus(200); });

router.post('/offRelay', (req, res) => { plantrelay.reset(); res.sendStatus(200); });

module.exports = router;