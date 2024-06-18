import mongoose, { Schema } from "mongoose";
import { TemplateScenariosDoc } from "../../modeles/template-scenario.model";

const templateScenariosSchema = new Schema<TemplateScenariosDoc>(
    {
      thumbnail_id: {
        type: String,
        required: true,
      },
      sections: [
        {
          title: {
            type: String,
            required: true,
          },
          product_items: [
            {
              product_retailer_id: {
                type: String,
                required: true,
              },
            },
          ],
        },
      ],
    },
    {
      timestamps: true, // Ajoute automatiquement les champs createdAt et updatedAt
    }
  );
  
  // Création et exportation du modèle Mongoose
  const TemplateScenarios = mongoose.model<TemplateScenariosDoc>('templateScenarios', templateScenariosSchema);
  
  export default TemplateScenarios;