import mongoose, { Schema } from "mongoose";
import { CategoryBookingDoc } from "../../modeles/category-booking.model";

const categoryBookingSchema = new Schema<CategoryBookingDoc>(
    {
        name: { type: String, required: true},
        slug: { type: String, required: true},
        company_id: { type: Schema.Types.ObjectId, ref: "credentials", required: true },
    },
    {
        timestamps: true,
    }
);

// Créer et exporter le modèle Mongoose
const CategoryBooking = mongoose.models.Categorybooking as mongoose.Model<CategoryBookingDoc> || mongoose.model<CategoryBookingDoc>('categorybookings', categoryBookingSchema);
export default CategoryBooking;