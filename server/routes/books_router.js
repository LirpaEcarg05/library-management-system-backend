const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books_controller')

router.get('/',booksController.getAllBooks);
router.post('/',booksController.addBooks);
router.get("/:id",booksController.getById);
router.put("/:id",booksController.updateBooks);

router.delete("/:id",booksController.deleteBooks);

router.get('/getFile/:path',booksController.fetchBooksFile)
router.get('/contributors', booksController.getAllContributors);
module.exports = router;