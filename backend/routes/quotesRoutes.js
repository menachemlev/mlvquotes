const express = require('express');
const controller = require('./../controlles/quotesController');
const { protect } = require('./../controlles/userController');
const router = express.Router();

router.post('/', controller.addQuote);
router.get('/', controller.getQuotes);
router.get('/user', controller.getAllUserQuotes);
router.post('/like', controller.addLike);
router.post('/dislike', controller.addDislike);
router.post('/removelike', controller.removeLike);
router.post('/removedislike', controller.removeDislike);
router.post('/comment', controller.addComment);

//router.post('/forgot-password', controller.forgotPassword);
router.delete('/', protect, controller.deleteQuote);
module.exports = router;
