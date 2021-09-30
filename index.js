const express = require('express');
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
        // wrap queries up in a an async function?
        const {product_id} = req.params;
        const q1 = "SELECT * FROM styles WHERE product_id = $1";
        const styles = await pool.query(q1, [product_id]);
        const q2 = "SELECT * FROM photos WHERE product_id = $1";
        const photos = await pool.query(q2, [product_id]);
        const q3 = "SELECT * FROM skus WHERE product_id = $1";
        const skus = await pool.query(q3, [product_id]);
        console.table(styles.rows);
        console.table(photos.rows);
        console.table(skus.rows);
        res.send('cool')
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