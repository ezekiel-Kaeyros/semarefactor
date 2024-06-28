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
    //Fonction pour obtenir un slug
    static stringToSlug(str) {
        // Convertir la chaîne en minuscules
        str = str.toLowerCase();
        // Remplacer les accents par leurs équivalents non accentués
        const from = "àáâäæãåāçćčèéêëēėęìíîïīįįðñńòóôöõøōœśšşùúûüūųýÿżźž";
        const to = "aaaaaaaacccceeeeeeeiiiidnnoooooooosssuuuuuuuyyyzzz";
        for (let i = 0; i < from.length; i++) {
            str = str.replace(new RegExp(from[i], 'g'), to[i]);
        }
        // Remplacer les caractères non autorisés par des tirets
        str = str.replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
        // Supprimer les tirets de début et de fin
        str = str.replace(/^-+|-+$/g, '');
        return str;
    }
    static timeStringToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }
    // Fonction pour voir si une date est valide ou pas
    static isValidDate(dateString) {
        const date = new Date(dateString);
        // console.log(date)
        // console.log(date.getTime())
        if (isNaN(date.getTime())) {
            return false;
        }
        return true;
    }
    // Fonction pour obtenir le jour de la semaine à partir d'une date
    static getDayOfWeek(dateString) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        if (!this.isValidDate(dateString)) {
            throw new Error('Invalid date');
        }
        return days[date.getDay()];
    }
    // Fonction pour ajouter des minutes a une date
    static ajouterMinutes(date, minutes) {
        let nouvelleDate = new Date(date.getTime());
        nouvelleDate.setMinutes(nouvelleDate.getMinutes() + minutes);
        return nouvelleDate;
    }
    // Fonction pour generer des plages d'horaire
    static genererPlagesHoraires(dateStr, heureDebut, heureFin, dureeCreneau, typeFormat) {
        let date = new Date(dateStr);
        let [debutHeure, debutMinute] = heureDebut.split(':').map(Number);
        let [finHeure, finMinute] = heureFin.split(':').map(Number);
        let debutDate = new Date(date);
        debutDate.setHours(debutHeure, debutMinute, 0, 0);
        let finDate = new Date(date);
        finDate.setHours(finHeure, finMinute, 0, 0);
        let plagesHoraires = [];
        let creneauActuel = new Date(debutDate);
        while (creneauActuel < finDate) {
            let creneauFin = this.ajouterMinutes(creneauActuel, dureeCreneau);
            if (creneauFin > finDate)
                break;
            if (typeFormat == 1)
                plagesHoraires.push(`${creneauActuel.toTimeString().substr(0, 5)}`);
            else
                plagesHoraires.push(`${creneauActuel.toTimeString().substr(0, 5)} - ${creneauFin.toTimeString().substr(0, 5)}`);
            creneauActuel = creneauFin;
        }
        return plagesHoraires;
    }
    // Fonction pour ajouter des jours à une date donnée
    static ajouterJours(date, jours) {
        let nouvelleDate = new Date(date);
        nouvelleDate.setDate(nouvelleDate.getDate() + jours);
        return nouvelleDate;
    }
    // Fonction pour générer la liste des dates dans une plage
    static genererPlageDeDates(dateDebutStr, dureeJours, daysOfWeek) {
        let dateDebut = new Date(dateDebutStr);
        let plagesDeDates = [];
        for (let i = 0; i <= dureeJours; i++) {
            let dateActuelle = this.ajouterJours(dateDebut, i);
            const dayOfWeekNow = this.getDayOfWeek(dateActuelle.toISOString().split('T')[0]);
            let days = {
                date: dateActuelle.toISOString().split('T')[0],
                isOpen: daysOfWeek.includes(dayOfWeekNow)
            };
            plagesDeDates.push(days);
            // plagesDeDates.push(dateActuelle.toISOString().split('T')[0]);
        }
        return plagesDeDates;
    }
    // Fonction pour vérifier si une date est dans une plage horaire
    static estDansPlageHoraire(date, heureDebut, heureFin) {
        // Récupérer l'année, le mois et le jour de la date
        let annee = date.getFullYear();
        let mois = date.getMonth();
        let jour = date.getDate();
        // Créer des objets Date pour l'heure de début et l'heure de fin
        let [debutHeure, debutMinute] = heureDebut.split(':').map(Number);
        let [finHeure, finMinute] = heureFin.split(':').map(Number);
        let dateDebut = new Date(annee, mois, jour, debutHeure, debutMinute);
        let dateFin = new Date(annee, mois, jour, finHeure, finMinute);
        // Vérifier si la date donnée est dans la plage horaire
        return date >= dateDebut && date <= dateFin;
    }
}
exports.HelperMethod = HelperMethod;
