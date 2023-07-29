const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name: { type: String, required: true, minLength: 0, maxLength: 100 }
    }
)

categorySchema.virtual("url").get(function () {
    return "/catalog/" + this.name;
});
module.exports = mongoose.model("Category", categorySchema)