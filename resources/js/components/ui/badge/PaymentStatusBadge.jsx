/**
 * Composant de badge pour afficher le statut d'une commande.
 * Affiche un badge avec une couleur et un texte adaptés au statut.
 *
 * @param {Object} props - Les props du composant.
 * @param {string} props.status - Le statut de la commande (ex: 'livré', 'en_cours_de_livraison', 'annulé', 'en_attente', 'confirmé').
 * @param {string} [props.className=''] - Classes CSS additionnelles à appliquer au badge.
 */
export default function PaymentStatusBadge({ status, className = "" }) {
    // Convertit le statut en un format lisible et détermine les classes Tailwind.
    const getStatusDisplay = (currentStatus) => {
        let text = "";
        let bgColorClass = "";
        let textColorClass = "";

        switch (currentStatus) {
            case "PAID":
                text = "Payé";
                bgColorClass = "bg-green-100";
                textColorClass = "text-green-800";
                break;
            case "PENDING":
                text = "Paiement en cours...";
                bgColorClass = "bg-blue-100";
                textColorClass = "text-blue-800";
                break;
            case "UNPAID":
                text = "Non payé";
                bgColorClass = "bg-red-100";
                textColorClass = "text-red-800";
                break;
            /*
            case "en_attente":
                text = "En attente";
                bgColorClass = "bg-yellow-100";
                textColorClass = "text-yellow-800";
                break;
            case "confirmé":
                text = "Confirmé";
                bgColorClass = "bg-purple-100";
                textColorClass = "text-purple-800";
                break;
                */
            default:
                text = "Inconnu";
                bgColorClass = "bg-gray-100";
                textColorClass = "text-gray-800";
                break;
        }

        return { text, bgColorClass, textColorClass };
    };

    const { text, bgColorClass, textColorClass } = getStatusDisplay(status);

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColorClass} ${textColorClass} ${className}`}
        >
            {text}
        </span>
    );
}
