import mongoose, { Schema } from "mongoose";
import { BookingDoc } from "../../modeles/booking.model";

const bookingSchema = new Schema<BookingDoc>(
    {
        name: { type: String, required: false},
        status: {type: String, enum: ['open', 'close', 'finish'], required: true, default: 'open'},
        total_price: { type: Number, required: true},
        description: { type: String, required: false },
        startAt: { type: Date, required: true},
        endAt: { type: Date, required: true},
        service_booking_id: [{ type: Schema.Types.ObjectId, ref: "servicebookings", required: true }],
        conversation_id: { type: Schema.Types.ObjectId, ref: "conversations", required: true},
    },
    {
        timestamps: true,
    }
);

// Créer et exporter le modèle Mongoose
const Booking = mongoose.models.Booking as mongoose.Model<BookingDoc> || mongoose.model<BookingDoc>('bookings', bookingSchema);
export default Booking;