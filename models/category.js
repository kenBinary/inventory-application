const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name: { type: String, required: true, minLength: 0, maxLength: 100 }
    }
)

categorySchema.virtual("categoryName").get(() => {
    return "/car/" + this.name;
});

module.exports = mongoose.model("Category", categorySchema)