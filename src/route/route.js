const express=require('express');
const router=express.Router();
const UserController=require('../controllers/userController')
const BookController = require("../controllers/bookController")
const ReviewController = require("../controllers/reviewController")
const middleware = require("../middleware/auth")





router.post('/register',UserController.createUser )

router.post('/login',UserController.loginUser )

router.post('/books',middleware.authenticate, BookController.createBook)

router.post('/books/:bookId/review',ReviewController.createReview)

router.get('/books',BookController.getBooks)

router.get('/books/:bookId',middleware.authenticate,middleware.autherization, BookController.getDetailsBooks)

router.put('/books/:bookId',middleware.authenticate,middleware.autherization, BookController.updateBook)

router.delete('/books/:bookId',middleware.authenticate,middleware.autherization, BookController.deleteBook)

router.put("/books/:bookId/review/:reviewId",ReviewController.updateReview)

router.delete("/books/:bookId/review/:reviewId",ReviewController.deleteReview)


module.exports=router;