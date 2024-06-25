"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scenarioRepository = void 0;
const credential_schema_1 = __importDefault(require("../../core/database/schemas/credential.schema"));
const scenario_item_schema_1 = __importDefault(require("../../core/database/schemas/scenario-item.schema"));
const scenario_schema_1 = __importDefault(require("../../core/database/schemas/scenario.schema"));
class ScenarioRepository {
    findScenarioByKeywordAndPhoneNumberId(keyword, phoneNumberId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the credential by phone number ID
                const credential = yield credential_schema_1.default.findOne({ phone_number_id: phoneNumberId });
                if (!credential) {
                    throw new Error('Credential not found');
                }
                // Use the credential ID to find the scenario, making the keyword search case-insensitive
                const scenario = yield scenario_schema_1.default.findOne({
                    credential_id: credential._id,
                    keywords: { $regex: new RegExp(keyword, 'i') } // Case-insensitive regex
                });
                return scenario;
            }
            catch (error) {
                console.error('Error finding scenario:', error);
                throw error;
            }
        });
    }
    findScenarioItemWithEmptyParents(scenarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const scenario = yield scenario_schema_1.default.findById(scenarioId)
                    .populate('scenario_items_id')
                    .exec();
                if (!scenario) {
                    throw new Error('Scenario not found');
                }
                const scenarioItemWithEmptyParents = scenario.scenario_items_id.find(item => item.parents.length === 0);
                return scenarioItemWithEmptyParents || null;
            }
            catch (error) {
                console.error('Error finding scenario item with empty parents:', error);
                throw error;
            }
        });
    }
    /**
     * retourne le scenario item et les details de ces enfant qui sont aussi des scenario items
     * @param scenarioItem
     * @returns
     */
    findScenarioItemWithChildren(scenarioItem) {
        return __awaiter(this, void 0, void 0, function* () {
            if (scenarioItem.children.length > 0) {
                try {
                    const results = yield scenario_item_schema_1.default.aggregate([
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
                }
                catch (error) {
                    console.error('Erreur lors de la récupération des enfants:', error);
                    return scenarioItem;
                }
            }
            else {
                return scenarioItem; // Retourner l'item sans modifications si pas d'enfants
            }
        });
    }
    findScenarioItemBySession(session) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const scenarioItem = yield scenario_item_schema_1.default.findById(session.current_scenario_item_id);
                return scenarioItem;
            }
            catch (error) {
                console.error('Erreur lors de la récupération du ScenarioItem à partir de la session:', error);
                return null;
            }
        });
    }
}
exports.scenarioRepository = new ScenarioRepository();
