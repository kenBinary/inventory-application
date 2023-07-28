const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const carSchema = new Schema({
    name: { type: String, required: true, minLength: 0, maxLength: 100 },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    inStock: { type: Number, required: true },
    category: { type: Schema.ObjectId, ref: "Category", required: true },
}
)
carSchema.virtual("carName").get(() => {
    return "/car/" + this.name;
})

module.exports = mongoose.model("Car", carSchema)