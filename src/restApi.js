const router = require('express').Router();
const books = require('./books_db');


router.get('/books', (req, res) => {
    res.send(books);
});

router.get('/books/:id', (req, res) => {
    const { id } = req.params;

    const book = books.find(b => b._id === id);
    if (!book) return res.status(404).send('Book does not exist');

    res.send(book);
});

router.post('/books', (req, res) => {
    const {
        title,
        _id,
        publishedDate,
        shortDescription,
        status,
        authors
    } = req.body;

    const bookExist = books.find(b => b._id === _id);
    if (bookExist) return res.send('Book already exist');

    const book = {
        title,
        _id,
        publishedDate,
        shortDescription,
        status,
        authors
    };
    books.push(book);

    res.send(book);
});

router.put('/books/:id', (req, res) => {
    const { id } = req.params;

    let book = books.find(b => b._id === id);
    if (!book) return res.status(404).send('Book does not exist');

    const updateField = (val, prev) => !val ? prev : val;

    const updatedBook = {
        ...book,
        title: updateField(title, req.body.title),
        _id: updateField(_id, req.body._id),
        publishedDate: updateField(publishedDate, req.body.publishedDate),
        shortDescription: updateField(shortDescription, req.body.shortDescription),
        status: updateField(status, req.body.status),
        authors: updateField(authors, req.body.authors)
    };

    const bookIndex = books.findIndex(b => b._id === book._id);
    books.splice(bookIndex, 1, updatedBook);

    res.status(200).send(updatedBook);
});

router.delete('/books/:id', (req, res) => {
    const { id } = req.params;

    let book = books.find(b => b._id === id);
    if (!book) return res.status(404).send('Book does not exist');

    books = books.filter(b => b._id !== id);

    res.send('Success');
});

module.exports = router;