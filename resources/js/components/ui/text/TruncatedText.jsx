import React, { useState, useMemo } from "react";

/**
 * Composant de Texte Tronqué avec bascule au clic.
 * * Affiche une chaîne de caractères tronquée avec des points de suspension,
 * et révèle le texte complet lors du clic.
 *
 * @param {object} props
 * @param {string} props.text La chaîne de caractères complète à afficher.
 * @param {number} [props.maxLength=15] Le nombre maximum de caractères à afficher.
 * @param {'begin'|'end'} [props.position='begin'] Spécifie si la coupure se fait au début ('begin') ou à la fin ('end') du texte.
 * @param {string} [props.className=''] Classes Tailwind CSS supplémentaires pour le span.
 */
export default function TruncatedText({
    text,
    maxLength = 15,
    position = "begin",
    className = "",
}) {
    // 1. État pour gérer l'affichage : tronqué ou complet
    const [isTruncated, setIsTruncated] = useState(true);

    // Vérifie si le texte est assez long pour être tronqué
    const requiresTruncation = text && text.length > maxLength;

    // 2. Fonction pour basculer l'état au clic
    const handleToggle = () => {
        if (requiresTruncation) {
            setIsTruncated((prev) => !prev);
        }
    };

    // 3. Logique de troncature mise en cache (useMemo)
    const displayedText = useMemo(() => {
        if (!text) {
            return "";
        }

        // Si la troncature n'est pas nécessaire ou si l'état n'est pas tronqué, on retourne le texte complet
        if (!requiresTruncation || !isTruncated) {
            return text;
        }

        const len = text.length;

        if (position === "begin") {
            // Afficher les premiers caractères (ex: AU.251104.0400...)
            const start = text.substring(0, maxLength);
            return `${start}...`;
        } else if (position === "end") {
            // Afficher les derniers caractères (ex: ...0400.I0244)
            const end = text.substring(len - maxLength, len);
            return `...${end}`;
        }

        // Par défaut, retourner le texte complet si la position est invalide
        return text;
    }, [text, maxLength, position, requiresTruncation, isTruncated]);

    // Classes conditionnelles pour le style et le curseur
    const combinedClassName = `
        ${className} 
        ${
            requiresTruncation
                ? "cursor-pointer hover:underline text-indigo-600 dark:text-indigo-400"
                : "text-gray-900 dark:text-gray-100"
        }
        inline-block
    `;

    return (
        <span
            className={combinedClassName}
            onClick={handleToggle}
            title={
                requiresTruncation
                    ? isTruncated
                        ? "Cliquer pour afficher la commande complète"
                        : "Cliquer pour masquer"
                    : ""
            }
        >
            {displayedText}
        </span>
    );
}
