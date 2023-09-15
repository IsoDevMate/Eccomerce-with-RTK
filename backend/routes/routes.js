const router = require('express').Router();
const { Validater } = require('../controllers/controller');

router.post('/', Validater);

module.exports = router;