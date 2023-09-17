const router = require('express').Router();
const { Validater } = require('../controllers/controller');

router.post('/regroute',Validater);

module.exports = router;