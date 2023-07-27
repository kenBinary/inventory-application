const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name: { type: String, required: true, minLength: 0, maxLength: 100 }
    }
)

module.exports = mongoose.model("Category", categorySchema)