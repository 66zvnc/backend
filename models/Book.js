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
    // Options
    timestamps: true, // adds createdAt and updatedAt fields
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('Book model was synchronized successfully.');
    })
    .catch(err => {
        console.error('Failed to sync model:', err);
    });
