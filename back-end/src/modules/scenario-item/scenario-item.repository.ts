import { Types } from "mongoose"
import ScenarioItems from "../../core/database/schemas/scenario-item.schema"
import { ScenarioItemsDoc } from "../../core/modeles/scenario-item.model"

class ScenrarioItemRepository {

    async findChildByUuid(idParent: Types.ObjectId): Promise<ScenarioItemsDoc | null> {
        try {
            const item = await ScenarioItems.findById(idParent);
            return await ScenarioItems.findOne({uuid: item?.uuid})
        } catch (error) {
            throw `error in findScenarioItemByUuid ${error}`
        }
    }
}

export const scenarioItemRepository = new ScenrarioItemRepository()