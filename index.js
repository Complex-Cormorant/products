const express = require('express');
const fixData = require('./helper')
const app = express()
const pool = require('./db');

app.use(express.json())

app.get("/products", async (req, res) => {
    try {
        const page = req.body.page || 1;
        const count = req.body.count || 5;
        const q1 = "SELECT * FROM products WHERE id > $1 AND id <= $2"
        const results = await pool.query(q1, [count * (page-1), count * page])
        res.json(results.rows)
    } catch(err) {
        console.error(err)
    }
})

app.get("/products/:product_id", async (req, res) => {
    try {
        const {product_id} = req.params;
        const q1 = "SELECT * FROM products WHERE id = $1";
        const products = await pool.query(q1, [product_id]);
        const q2 = "SELECT * FROM features WHERE product_id = $1";
        const features = await pool.query(q2, [product_id]);
        res.json({...products.rows[0], features: features.rows});
    } catch(err) {
        console.error(err)
    }
})

app.get("/products/:product_id/styles", async (req, res) => {
    try {
        const {product_id} = req.params;
        const q1 = "SELECT * FROM styles JOIN photos ON styles.id = photos.style_id JOIN skus ON skus.style_id = styles.id WHERE styles.product_id = $1";
        const results = await pool.query(q1, [product_id])
        const formatted = await fixData(results.rows);
        console.log(formatted);
        res.json(formatted)
    } catch(err) {
        console.error(err)
    }
})

app.get("/products/:product_id/related", async (req, res) => {
    try {
      const {product_id} = req.params;
      const q1 = "SELECT related_product_id FROM related WHERE product_id = $1";
      const related = await pool.query(q1, [product_id]);
      res.json(related.rows.map(obj => obj.related_product_id))
    } catch(err) {
        console.error(err);
    }

})

app.listen(3000, () => {
    console.log("listening on port 3000")
})