// (b) Using Node.js, Express, and MongoDB, build a product management system with the following requirements:
// Accept product details: Product_ID, Name, Price, Discount, and Stock from a web form.
// On insertion, calculate the Final Price using the formula: Final_Price = Price - (Price × Discount / 100) and store it along with the product details in MongoDB.
// Implement a GET route to display all products where the Final_Price is less than 1000.

// in command line
// mongosh
// use ProductDB
// db.createCollection('products')


const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// const path = require('path');

const app = express();
const port = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db;
const mongoUrl = 'mongodb://127.0.0.1:27017';
// const mongoUrl = 'mongodb://localhost:27017';


MongoClient.connect(mongoUrl)
  .then(
    client => {
      console.log("mongodb connected");
      db = client.db('ProductDB');
      app.listen(port, () => {
        console.log(`Server is connected at ${port}`);
      });
  })
  .catch(err => {
    console.log("Cant connect to mongodb, Error:", err);
  });

app.get('/', async (req, res) => {
    // res.sendFile(path.join(__dirname, 'product.html'));
  res.send(`
    <h1>Product Management System</h1>
    
    <h2>Add New Product</h2>
    <form action="/inserting" method="POST">
      Product ID: <input type="text" name="productId" required><br><br>
      Name: <input type="text" name="name" required><br><br>
      Price: <input type="number" name="price" required min="0" step="0.01"><br><br>
      Discount (%): <input type="number" name="discount" required min="0" max="100" step="0.01"><br><br>
      Stock: <input type="number" name="stock" required min="0"><br><br>
      <button type="submit">Add Product</button>
    </form>
    
    <h2>Price Calculator Preview</h2>
    <p><strong>Formula:</strong> Final Price = Price - (Price × Discount / 100)</p>
    <p><strong>Example:</strong> If Price = ₹1200 and Discount = 20%, then Final Price = ₹1200 - (₹1200 × 20 / 100) = ₹960</p>
    
    <br>
    <a href="/getting">View Products Under ₹1000</a><br>
    <a href="/all-products">View All Products</a>
  `);
});

app.post('/inserting', async (req, res) => {
  try {
    const { productId, name, price, discount, stock } = req.body;
    
    // Calculate Final Price using the formula: Final_Price = Price - (Price × Discount / 100)
    const priceNum = parseFloat(price);
    const discountNum = parseFloat(discount);
    const finalPrice = priceNum - (priceNum * discountNum / 100);
    
    await db.collection('products').insertOne({ 
      productId: productId,
      name: name, 
      price: priceNum,
      discount: discountNum,
      stock: parseInt(stock),
      finalPrice: parseFloat(finalPrice.toFixed(2))
    });
    res.send(`Product added successfully!<br>
              <strong>Final Price:</strong> ₹${finalPrice.toFixed(2)}<br>
              <a href='/'>Back</a>`);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getting', async (req, res) => {
  try {
    const results = await db.collection('products').find({ finalPrice: { $lt: 1000 } }).toArray();
    let html = '<h1>Products Under ₹1000 (Final Price)</h1>';
    if (results.length === 0) {
      html += '<p>No products found with final price less than ₹1000.</p>';
    } else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                   <strong>Product ID:</strong> ${value.productId}<br>
                   <strong>Name:</strong> ${value.name}<br>
                   <strong>Original Price:</strong> ₹${value.price}<br>
                   <strong>Discount:</strong> ${value.discount}%<br>
                   <strong>Final Price:</strong> ₹${value.finalPrice}<br>
                   <strong>Stock:</strong> ${value.stock} units<br>
                   <strong>Savings:</strong> ₹${(value.price - value.finalPrice).toFixed(2)}
                 </div>`;
      });
    }
    html += '<a href="/">Back</a>';
    res.send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Additional route to view all products
app.get('/all-products', async (req, res) => {
  try {
    const results = await db.collection('products').find({}).toArray();
    let html = '<h1>All Products</h1>';
    if (results.length === 0) {
      html += '<p>No products found.</p>';
    }
    else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                   <strong>Product ID:</strong> ${value.productId}<br>
                   <strong>Name:</strong> ${value.name}<br>
                   <strong>Original Price:</strong> ₹${value.price}<br>
                   <strong>Discount:</strong> ${value.discount}%<br>
                   <strong>Final Price:</strong> ₹${value.finalPrice}<br>
                   <strong>Stock:</strong> ${value.stock} units<br>
                   <strong>Savings:</strong> ₹${(value.price - value.finalPrice).toFixed(2)}
                 </div>`;
      });
    }
    html += '<a href="/">Back</a>';
    res.send(html);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/deleting', async (req, res) => {
  try {
    const { productId } = req.body;
    const result = await db.collection('products').deleteMany({ productId: productId });
    res.send(`Deleted ${result.deletedCount} product records<br><a href="/">Back</a>`);
  } 
  catch (err) {
    res.send('Failed to delete<br><a href="/">Back</a>');
  }
});

app.post('/updating', async (req, res) => {
  try {
    const { productId, price, discount } = req.body;
    
    // Recalculate Final Price if price or discount is updated
    const priceNum = parseFloat(price);
    const discountNum = parseFloat(discount);
    const finalPrice = priceNum - (priceNum * discountNum / 100);
    
    const result = await db.collection('products').updateOne(
      { productId: productId }, 
      { 
        $set: { 
          price: priceNum,
          discount: discountNum,
          finalPrice: parseFloat(finalPrice.toFixed(2))
        } 
      }
    );
    if (result.modifiedCount > 0) {
      res.send(`Product updated successfully. New Final Price: ₹${finalPrice.toFixed(2)}<br><a href="/">Back</a>`);
    }
    else {
      res.send(`Product not found<br><a href="/">Back</a>`);
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});