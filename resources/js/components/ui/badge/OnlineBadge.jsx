import React from "react";

const OnlineBadge = ({ is_active = true }) => {
    return (
        <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                is_active
                    ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
            }`}
        >
            {is_active ? "En Ligne" : "Hors Ligne"}
        </span>
    );
};

export default OnlineBadge;
