const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const bookSchema = new mongoose.Schema({

    title: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    userId: { type: ObjectId, ref: "user", required: true, trim: true },
    ISBN: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, trim: true },
    subcategory: { type: Array, required: true, trim: true },
    reviews: { type: Number, default: 0,  trim: true },
    deletedAt: { type: Date, trim: true },
    isDeleted: { type: Boolean, default: false, trim: true },
    releasedAt: { type: Date, required: true, match:[/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/], trim: true },

}, { timestamps: true })

module.exports = mongoose.model('Books', bookSchema)