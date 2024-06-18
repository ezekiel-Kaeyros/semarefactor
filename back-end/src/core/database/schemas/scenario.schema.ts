import mongoose, { Schema } from "mongoose";
import { ScenarioDoc } from "../../modeles/scenario.model";

const scenarioSchema = new Schema<ScenarioDoc>(
    {
      title: { type: String, required: true },
      type: { type: String, required: true },
      keywords: { type: [String], required: true },
      credential_id: { type: Schema.Types.ObjectId, ref: 'credentials', required: false },
      active: { type: Boolean, default: true },
      scenario_items_id: [{ type: Schema.Types.ObjectId, ref: 'scenarioItems', required: false, default: [] }],
      repeat_count: { type: Number, required: false }
    },
    { timestamps: true }
);
  
// Créer et exporter le modèle Mongoose
const Scenario = mongoose.models.Scenario as mongoose.Model<ScenarioDoc> || mongoose.model<ScenarioDoc>('scenarios', scenarioSchema);

export default Scenario;