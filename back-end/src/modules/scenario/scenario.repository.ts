import Credentials from "../../core/database/schemas/credential.schema";
import ScenarioItems from "../../core/database/schemas/scenario-item.schema";
import Scenario from "../../core/database/schemas/scenario.schema";
import { ScenarioItemsDoc } from "../../core/modeles/scenario-item.model";
import { ScenarioDoc } from "../../core/modeles/scenario.model";
import { SessionDoc } from "../../core/modeles/session.model";

class ScenarioRepository {
    async findScenarioByKeywordAndPhoneNumberId(keyword: string, phoneNumberId: string): Promise<ScenarioDoc | null> {
        try {
            // Find the credential by phone number ID
            const credential = await Credentials.findOne({ phone_number_id: phoneNumberId });
    
            if (!credential) {
                throw new Error('Credential not found');
            }
    
            // Use the credential ID to find the scenario, making the keyword search case-insensitive
            const scenario = await Scenario.findOne({
                credential_id: credential._id,
                keywords: { $regex: new RegExp(keyword, 'i') } // Case-insensitive regex
            });
    
            return scenario;
        } catch (error) {
            console.error('Error finding scenario:', error);
            throw error;
        }
    }

    async findScenarioItemWithEmptyParents(scenarioId: string): Promise<ScenarioItemsDoc | null> {
        try {
            const scenario = await Scenario.findById(scenarioId)
            .populate<{ scenario_items_id: ScenarioItemsDoc[] }>('scenario_items_id')
            .exec();
      
            if (!scenario) {
              throw new Error('Scenario not found');
            }
      
            const scenarioItemWithEmptyParents = scenario.scenario_items_id.find(item => item.parents.length === 0);
      
            return scenarioItemWithEmptyParents || null;
        } catch (error) {
            console.error('Error finding scenario item with empty parents:', error);
            throw error;
        }
    }

    /**
     * retourne le scenario item et les details de ces enfant qui sont aussi des scenario items
     * @param scenarioItem 
     * @returns 
     */
    async findScenarioItemWithChildren(scenarioItem: ScenarioItemsDoc): Promise<ScenarioItemsDoc> {
        if (scenarioItem.children.length > 0) {
          try {
            const results = await ScenarioItems.aggregate([
              { $match: { uuid: scenarioItem.uuid } }, // Trouver le scenarioItem de départ
              {
                $lookup: {
                  from: 'scenarioitems', // La collection où sont stockés les ScenarioItems
                  localField: 'children', // Le champ dans le document parent
                  foreignField: 'uuid', // Le champ dans les documents enfants
                  as: 'childrenDetails' // Le nom du tableau résultant
                }
              }
            ]);
      
            return results.length > 0 ? results[0] : null;
          } catch (error) {
            console.error('Erreur lors de la récupération des enfants:', error);
            return scenarioItem;
          }
        } else {
          return scenarioItem; // Retourner l'item sans modifications si pas d'enfants
        }
    }

    async findScenarioItemBySession(session: SessionDoc): Promise<ScenarioItemsDoc | null> {
        try {
            const scenarioItem = await ScenarioItems.findById(session.current_scenario_item_id);
            return scenarioItem;
        } catch (error) {
            console.error('Erreur lors de la récupération du ScenarioItem à partir de la session:', error);
            return null;
        }
    }
      
    
}

export const scenarioRepository = new ScenarioRepository();