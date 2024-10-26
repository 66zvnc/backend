const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Express App
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Set up Sequelize for SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',  // SQLite database file location
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to SQLite has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Define the Book model
const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,  // Automatically manage createdAt and updatedAt fields
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('Book model synchronized with SQLite database.');
    })
    .catch(err => {
        console.error('Failed to sync model:', err);
    });

// Route to upload a book
app.post('/api/books/upload', async (req, res) => {
    const { title, fileUrl } = req.body;

    try {
        const newBook = await Book.create({ title, fileUrl });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload book' });
    }
});

// Route to get all books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
