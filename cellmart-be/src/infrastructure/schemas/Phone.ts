import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({

    brand: {
        type: String,
        required: true,
    },
    model: {
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
    storage: {
        type: String,
        required: true,
    },
    colors: {
        type: String,
        required: true,
    },
    warranty: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const Phone = mongoose.model("Phone", phoneSchema);

export default Phone;