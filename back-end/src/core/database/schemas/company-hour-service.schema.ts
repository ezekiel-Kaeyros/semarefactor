import mongoose, { Schema } from "mongoose";
import { CompanyHourServiceDoc } from "../../modeles/company-hour-service.model";

const companyHourServiceSchema = new Schema<CompanyHourServiceDoc>(
    {
        day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true},
        openingTime: { type: String, required: true, validate: {
            validator: function(v: string) {
              // Regex pour vérifier le format HH:mm (24 heures)
              return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: props => `${props.value} is not a valid time format! Use HH:mm.`
          }},
        closeTime: { type: String, required: true, validate: {
            validator: function(v: string) {
              // Regex pour vérifier le format HH:mm (24 heures)
              return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: props => `${props.value} is not a valid time format! Use HH:mm.`
          }},
        company_id: { type: Schema.Types.ObjectId, ref: "credentials", required: true },
    },
    {
        timestamps: true,
    }
);

// Créer et exporter le modèle Mongoose
const CompanyHourService = mongoose.models.CompanyHourService as mongoose.Model<CompanyHourServiceDoc> || mongoose.model<CompanyHourServiceDoc>('companyhourservices', companyHourServiceSchema);
export default CompanyHourService;