var express = require("express");
var mongoose = require("mongoose");

// Require all models
var db = require("./models/index");
console.log(db);

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/financial2", { useNewUrlParser: true });

var PORT = 3000;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public static folder
app.use(express.static("public"));

// Routes
app.get("/orders", function(req,res) {
    db.order.find({})
    .then(function(dbOrders) {
      res.json(dbOrders);
    })
    .catch(function(err) {
      res.json(err);
    })
});

app.get("/categories", function(req,res) {
    db.category.find({})
    .then(function(dbCategory) {
      res.json(dbCategory);
    })
    .catch(function(err) {
      res.json(err);
    })
});

app.post("/orders", function(req, res) {
db.order.create(req.body)
    .then(function(dbOrder) {
    // If we were able to successfully create a Product, send it back to the client
    res.json(dbOrder);
    })
    .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
    });
});

app.post("/categories", function(req, res) {
    db.category.create(req.body)
        .then(function(dbCategory) {
        // If we were able to successfully create a Product, send it back to the client
        res.json(dbCategory);
        })
        .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
        });
    });

// Route for creating a new Review and updating Product "review" field with it
app.post("/product/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Review.create(req.body)
      .then(function(dbReview) {
        // If a Review was created successfully, find one Product with an `_id` equal to `req.params.id`. Update the Product to be associated with the new Review
        // { new: true } tells the query that we want it to return the updated Product -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Product.findOneAndUpdate({ _id: req.params.id }, { review: dbReview._id }, { new: true });
      })
      .then(function(dbProduct) {
        // If we were able to successfully update a Product, send it back to the client
        res.json(dbProduct);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
});

// Route for retrieving a Product by id and populating it's Review.
app.get("/orders/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.order.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("category")
    .then(function(dbOrder) {
    // If we were able to successfully find an Product with the given id, send it back to the client
    res.json(dbOrder);
    })
    .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
    });
});


// Home route. Currently just to make sure app is running returns hello message.
app.get("/", function(req, res) {
  res.send("Hello from demo app!");
});


// Start the server
app.listen(PORT, function() {
  console.log("Listening on port " + PORT + ".");
});

/* const express = require('express')
require('./db/mongoose')
const orderRouter = require('./routes/order')
const categoryRouter = require('./routes/category')

const app = express()

app.use(express.json())
app.use(orderRouter)
app.use(categoryRouter)

app.get('', (req, res) => {
    
    res.send('a')

})

//const host = '127.0.0.1'
const port = process.env.port || 3000

app.listen(port, () => {
    console.log(`Server up at port:${port}`)
}) */