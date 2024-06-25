import { Types } from "mongoose"
import ScenarioItems from "../../core/database/schemas/scenario-item.schema"
import { ScenarioItemsDoc } from "../../core/modeles/scenario-item.model"

class ScenrarioItemRepository {

    async findChildByIdParent(idParent: Types.ObjectId): Promise<ScenarioItemsDoc | null> {
        try {
            const parentScenarioItem = await ScenarioItems.findById(idParent);
            return await ScenarioItems.findOne({uuid: parentScenarioItem?.children[0]})
        } catch (error) {
            throw `error in findScenarioItemByUuid ${error}`
        }
    }
}

export const scenarioItemRepository = new ScenrarioItemRepository()