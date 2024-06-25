"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperMethod = void 0;
class HelperMethod {
    static getDifferenceInMinutes(date1, date2 = new Date()) {
        // Calculer la différence en millisecondes
        const differenceInMillis = date2.getTime() - date1.getTime();
        // Convertir la différence de millisecondes en minutes
        const differenceInMinutes = differenceInMillis / (1000 * 60);
        return differenceInMinutes;
    }
}
exports.HelperMethod = HelperMethod;
