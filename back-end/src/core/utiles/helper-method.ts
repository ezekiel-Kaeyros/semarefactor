export class HelperMethod {
    static getDifferenceInMinutes(date1: Date, date2: Date = new Date()): number {
        // Calculer la différence en millisecondes
        const differenceInMillis = date2.getTime() - date1.getTime();
    
        // Convertir la différence de millisecondes en minutes
        const differenceInMinutes = differenceInMillis / (1000 * 60);
    
        return differenceInMinutes;
    }
}