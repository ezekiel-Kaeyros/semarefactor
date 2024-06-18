import mongoose, { Schema } from "mongoose";
import { ScenarioItemsDoc } from "../../modeles/scenario-item.model";

const scenarioItemsSchema = new Schema<ScenarioItemsDoc>(
    {
      uuid: { type: String, required: true},
      label: {type: String, required: false},
      url: { type: String, required: false},
      template_scenario_id: [{type: Schema.Types.ObjectId, ref: 'templateScenarios', required: false, } ],
      type: { type: String, required: true },
      parents: { type: [String], default: []},
      children: { type: [String], default: []},
      scenario_id: { type: Schema.Types.ObjectId, ref: 'scenarios', required: true},
    },
    { timestamps: true }
  );
  
  // Création et exportation du modèle Mongoose
  const ScenarioItems = mongoose.model<ScenarioItemsDoc>('scenarioItems', scenarioItemsSchema);
  
  export default ScenarioItems;