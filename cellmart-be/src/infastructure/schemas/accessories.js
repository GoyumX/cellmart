import mongoose from "mongoose";

const accessoriesSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    pointdesc: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    warranty: {
        type: String,
        required: true,
    },
});

const Accessories = mongoose.model("Accessories", accessoriesSchema);

export default Accessories;