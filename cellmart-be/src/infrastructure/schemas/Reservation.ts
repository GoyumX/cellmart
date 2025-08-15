import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'productType',
    },
    productType: {
        type: String,
        required: true,
        enum: ['Phone', 'Accessories'],
    },
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    gmail: {
        type: String,
        required: true,
    },
});


const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;