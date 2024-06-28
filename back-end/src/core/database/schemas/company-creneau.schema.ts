import mongoose, { Schema } from "mongoose";
import { CompanyCreneauDoc } from "../../modeles/company-creneau.model";

const companyCreneauSchema = new Schema<CompanyCreneauDoc>(
    {
        duration: { type: Number, required: true},
        company_id: { type: Schema.Types.ObjectId, ref: "credentials", required: true },
    },
    {
        timestamps: true,
    }
);

// Créer et exporter le modèle Mongoose
const CompanyCreneau= mongoose.models.CompanyHourService as mongoose.Model<CompanyCreneauDoc> || mongoose.model<CompanyCreneauDoc>('companycreneau', companyCreneauSchema);
export default CompanyCreneau;