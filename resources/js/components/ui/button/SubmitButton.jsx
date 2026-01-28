import React from "react";

const SubmitButton = ({ processing }) => {
    return (
        <button
            type="submit"
            className={`w-full py-2 px-4 text-center text-sm font-semibold text-white transition duration-100 rounded-md flex items-center justify-center space-x-2 
                ${
                    processing
                        ? "bg-brand-400 cursor-not-allowed" // Style pour l'état de chargement
                        : "bg-brand-500 hover:bg-brand-600 focus-visible:ring active:bg-brand-700" // Style normal
                }
    `}
            disabled={processing}
        >
            {processing ? (
                <span className="flex items-center space-x-2">
                    <span>Traitement...</span>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                </span>
            ) : (
                "Enregistrer"
            )}
        </button>
    );
};

export default SubmitButton;
