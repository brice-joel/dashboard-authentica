import React from "react";

const BrandBadge = ({ brand, className = "" }) => {
    return (
        <span
            className={`px-2 py-1 bg-blue-100 text-lowercase text-blue-800 text-sm rounded-full ${className}`}
        >
            {brand ? brand : "N/A"}
        </span>
    );
};

export default BrandBadge;
