export default function Stock({ product, showStock = true }) {
    // Détermine le statut du stock et les classes CSS
    const isStockAvailable = product.stock > 0;
    const stockBadgeClass = isStockAvailable
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800";
    const stockText = isStockAvailable ? "En stock" : "Stock épuisé";

    return (
        <div className="flex items-center gap-2">
            {/* STOCK QUANTITY */}
            <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    isStockAvailable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                }`}
            >
                {product.stock}
            </span>
            {/* STOCK */}
            {showStock && (
                <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${stockBadgeClass}`}
                >
                    {stockText}
                </span>
            )}
        </div>
    );
}
