import mongoose, { Schema } from "mongoose";
import { ServiceBookingDoc } from "../../modeles/service-booking.model";


const serviceBookingSchema = new Schema<ServiceBookingDoc>(
    {
        name: { type: String, required: true},
        price: { type: Number, required: true},
        duration: { type: Number, required: true},
        category_id: { type: Schema.Types.ObjectId, ref: "categorybookings", required: true },
        company_id: { type: Schema.Types.ObjectId, ref: "credentials", required: true },
    },
    {
        timestamps: true,
    }
);

// Créer et exporter le modèle Mongoose
const ServiceBooking = mongoose.models.Servicebookings as mongoose.Model<ServiceBookingDoc> || mongoose.model<ServiceBookingDoc>('servicebookings', serviceBookingSchema);
export default ServiceBooking;