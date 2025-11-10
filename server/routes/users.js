const express = require('express');
const router = express.Router();
const { createUser, getUser, login } = require('../controllers/usersController');

router.post('/', createUser);
router.post("/Login", login)
router.get('/:id', getUser);


module.exports = router;
