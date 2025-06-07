// 1. Find all books in a specific genre
// Example: Fiction
db.books.find({ genre: "Fiction" })

// 2. Find books published after a certain year
// Example: After 2000
db.books.find({ published_year: { $gt: 2000 } })

// 3. Find books by a specific author
// Example: George Orwell
db.books.find({ author: "George Orwell" })

// 4. Update the price of a specific book
// Example: Update price of "1984" to 12.99
db.books.updateOne(
    { title: "1984" },
    { $set: { price: 12.99 } }
)

// 5. Delete a book by its title
// Example: Delete "Moby Dick"
db.books.deleteOne({ title: "Moby Dick" })

// 6. Find books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// 7. Use projection to return only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// 8. Sort books by price
// Ascending
db.books.find().sort({ price: 1 })
// Descending
db.books.find().sort({ price: -1 })

// 9. Pagination - 5 books per page
// Page 1
db.books.find().limit(5)
// Page 2
db.books.find().skip(5).limit(5)

// 10. Aggregation: Average price of books by genre
db.books.aggregate([
    { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// 11. Aggregation: Author with the most books
db.books.aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
])

// 12. Aggregation: Group books by publication decade
db.books.aggregate([
    {
        $project: {
            decade: { $concat: [{ $substr: ["$published_year", 0, 3] }, "0s"] }
        }
    },
    {
        $group: { _id: "$decade", count: { $sum: 1 } }
    },
    {
        $sort: { _id: 1 }
    }
])

// 13. Create an index on the title field
db.books.createIndex({ title: 1 })

// 14. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// 15. Use explain() to show performance improvement
db.books.find({ title: "1984" }).explain("executionStats")
