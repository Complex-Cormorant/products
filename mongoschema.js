import mongoose from 'mongoose';
const { Schema } = mongoose;

const skusSchema = new Schema({
    quantity: Number,
    size: String
})

const stylesSchema = new Schema({
    name: String,
    original_price: String,
    sale_price: String,
    def: Boolean,
    photos: [
        {
            thumbnail_url: String,
            url: String
        }
    ],
    skus: [skusSchema]
})

const productSchema = new Schema({
    id: Number,
    name: String,
    slogan: String,
    category: String,
    default_price: String,
    features: [
        {
            feature: String,
            value: String
        }
    ],
    styles: [stylesSchema],
    related: [Number]
})l