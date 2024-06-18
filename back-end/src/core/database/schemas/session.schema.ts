import mongoose, { Schema } from "mongoose";
import { SessionDoc } from "../../modeles/session.model";

const sessionSchema = new Schema<SessionDoc>(
    {
        current_scenario_item_id: {
            type: Schema.Types.ObjectId,
            ref: 'scenarioItems',
            required: true
        },
        conversation_id: {
            type: Schema.Types.ObjectId,
            ref: 'conversations',
        },
        is_active: {
            type: Boolean,
            default: true
        }
    
    },
    {
        timestamps: true, // Cette option ajoute les champs createdAt et updatedAt
    }
);

// Créer et exporter le modèle Mongoose
const Session = mongoose.models.Scenario as mongoose.Model<SessionDoc> || mongoose.model<SessionDoc>('sessions', sessionSchema);

export default Session;
