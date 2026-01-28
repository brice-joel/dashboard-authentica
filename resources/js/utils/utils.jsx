// src/utils/dateUtils.js
import { usePage } from "@inertiajs/react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { useEffect } from "react";
import { toast } from "react-toastify";

/**
 * Formate une chaîne de date ISO en un format lisible, en français.
 *
 * @param {string} dateString La chaîne de date ISO (ex: "2025-07-15T17:03:02.000000Z").
 * @param {string} formatType Le type de format désiré (ex: "fullDate", "shortDateTime", "timeOnly").
 * @returns {string} La date formatée.
 */

export function formatPrice(
    price,
    lang = "en-US",
    currency = "FCFA",
    show_currency = true
) {
    // Crée un formateur de nombres pour la langue et le style monétaire
    const formatter = new Intl.NumberFormat(lang, {
        style: "decimal", // Utilise le style décimal
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    // Formate le prix avec l'espacement des milliers
    const formattedPrice = formatter.format(price);

    // Retourne le prix formaté avec ou sans la devise
    return formattedPrice + (show_currency ? ` ${currency}` : "");
}
export function dateTimeFormatter(dateString, formatType) {
    // Vérifie si la dateString est valide
    if (!dateString) {
        return "Date invalide";
    }

    // Convertir la chaîne ISO en objet Date JavaScript
    const dateObject = parseISO(dateString);

    // Vérifie si la conversion a réussi (dateObject est valide)
    if (isNaN(dateObject.getTime())) {
        return "Date invalide";
    }

    let formatString;

    switch (formatType) {
        case "fullDateTime":
            // Ex: "Mardi 15 juillet 2025 à 17:03"
            formatString = "EEEE dd MMMM yyyy à HH:mm";
            break;
        case "shortDateTime":
            // Ex: "15/07/2025 17:03"
            formatString = "dd/MM/yyyy HH:mm";
            break;
        case "fullDate":
            // Ex: "Mardi 15 juillet 2025"
            formatString = "EEEE dd MMMM yyyy";
            break;
        case "shortDate":
            // Ex: "15 juil. 2025"
            formatString = "dd MMM yyyy";
            break;
        case "timeOnly":
            // Ex: "17:03"
            formatString = "HH:mm";
            break;
        case "fullTime":
            // Ex: "17h03min02s"
            formatString = "HH'h'mm'min'ss's'";
            break;
        // Vous pouvez ajouter d'autres types de format ici
        default:
            // Format par défaut si le type n'est pas reconnu
            formatString = "dd/MM/yyyy HH:mm"; // Un format commun par défaut
    }

    // Formater la date avec la locale française
    return format(dateObject, formatString, { locale: fr });
}

// Function to generate the slug from a given string

export function generateSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters, except spaces and hyphens
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
        .trim(); // Trim leading/trailing whitespace
}

// cette fonction calcule le temps restant de la promotion
export function promotionRemainingTime(startDate, finishedAt) {
    const now = new Date();
    const endDate = new Date(finishedAt);
    console.log("now", now, "endDate", endDate);

    // Calcule la différence en millisecondes
    let difference = endDate.getTime() - now.getTime();

    // Vérifie si la promotion est terminée
    if (difference <= 0) {
        return "Terminée";
    }

    // Convertit les millisecondes en unités de temps
    const MS_PER_SECOND = 1000;
    const MS_PER_MINUTE = MS_PER_SECOND * 60;
    const MS_PER_HOUR = MS_PER_MINUTE * 60;
    const MS_PER_DAY = MS_PER_HOUR * 24;
    // Approximation pour mois et semaines
    const MS_PER_WEEK = MS_PER_DAY * 7;
    const MS_PER_MONTH = MS_PER_DAY * 30.44; // Moyenne de 365.25 / 12 jours

    // --- Calcul des unités de temps restantes ---

    const totalMonths = Math.floor(difference / MS_PER_MONTH);
    difference -= totalMonths * MS_PER_MONTH;

    const totalWeeks = Math.floor(difference / MS_PER_WEEK);
    difference -= totalWeeks * MS_PER_WEEK;

    const totalDays = Math.floor(difference / MS_PER_DAY);
    difference -= totalDays * MS_PER_DAY;

    const totalHours = Math.floor(difference / MS_PER_HOUR);
    difference -= totalHours * MS_PER_HOUR;

    const totalMinutes = Math.floor(difference / MS_PER_MINUTE);
    difference -= totalMinutes * MS_PER_MINUTE;

    const totalSeconds = Math.floor(difference / MS_PER_SECOND);

    // Fonction utilitaire pour le pluriel
    const pluralize = (count, unit) =>
        count > 0 ? `${count} ${unit}${count > 1 ? "s" : ""}` : "";

    // --- Logique de Formatage Conditionnel ---

    // 1. Mois, Semaines, Jours, Heures (s'il reste plusieurs mois)
    if (totalMonths > 0) {
        // Pour les mois, on se base sur une estimation, puis on ajoute les jours/heures restants
        // On préfère afficher Jours plutôt que Semaines pour plus de précision si le mois est déjà calculé
        const parts = [
            pluralize(totalMonths, "mois"),
            pluralize(totalDays, "jour"), // Utilisez les jours restants APRES les mois
            pluralize(totalHours, "heure"),
        ]
            .filter(Boolean)
            .join(" ");

        return `${parts}`;
    }

    // 2. Semaines, Jours, Heures (s'il reste plusieurs semaines)
    if (totalWeeks > 0) {
        const parts = [
            pluralize(totalWeeks, "semaine"),
            pluralize(totalDays, "jour"), // Utilisez les jours restants APRES les semaines
            pluralize(totalHours, "heure"),
        ]
            .filter(Boolean)
            .join(" ");

        return `${parts}`;
    }

    // 3. Jours, Heures (s'il reste plusieurs jours)
    if (totalDays > 0) {
        const parts = [
            pluralize(totalDays, "jour"),
            pluralize(totalHours, "heure"),
            pluralize(totalMinutes, "minute"),
        ]
            .filter(Boolean)
            .join(" ");

        return `${parts}`;
    }

    // 4. Heures, Minutes (s'il reste plusieurs heures)
    if (totalHours > 0) {
        const parts = [
            pluralize(totalHours, "heure"),
            pluralize(totalMinutes, "minute"),
            pluralize(totalSeconds, "seconde"),
        ]
            .filter(Boolean)
            .join(" ");

        return `${parts}`;
    }

    // 5. Minutes, Secondes (s'il reste plusieurs secondes)
    if (totalMinutes > 0 || totalSeconds > 0) {
        const parts = [
            pluralize(totalMinutes, "minute"),
            pluralize(totalSeconds, "seconde"),
        ]
            .filter(Boolean)
            .join(" ");

        return `${parts}`;
    }

    // Par défaut, si tout est passé mais < 1 seconde
    return "Terminée";
}
