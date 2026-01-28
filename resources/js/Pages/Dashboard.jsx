import PageBreadcrumb from "../components/common/PageBreadCrumb"; // Vérifiez ce chemin
import { dateTimeFormatter } from "../utils/utils"; // Importer l'utilitaire de date
import Home from "./Home";

// Icônes simples (vous pouvez les remplacer par des icônes de bibliothèques comme Heroicons, Font Awesome, etc.)
const IconArrowUp = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
    </svg>
);

const IconArrowDown = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
    </svg>
);

const IconSun = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-yellow-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-7.757l-.707-.707M6.343 17.657l-.707.707M18.364 18.364l.707.707M5.636 5.636l.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
    </svg>
);

const IconMoon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z"
        />
    </svg>
);

const Dashboard = () => {
    // Données fictives pour un tableau de bord e-commerce
    const stats = [
        {
            title: "Ventes Total (Mois)",
            value: "FCFA 15,250",
            change: "+8%",
            type: "up",
        },
        {
            title: "Commandes Traitées",
            value: "345",
            change: "+15%",
            type: "up",
        },
        {
            title: "Panier Moyen",
            value: "FCFA 44.20",
            change: "+2%",
            type: "up",
        },
        { title: "Nouveaux Clients", value: "87", change: "-5%", type: "down" },
    ];

    const recentOrders = [
        {
            id: 101,
            customer: "Alice Dupont",
            amount: "FCFA 89.99",
            status: "Livré",
            date: "2025-07-28T10:30:00Z",
        },
        {
            id: 102,
            customer: "Bob Martin",
            amount: "FCFA 125.00",
            status: "En cours",
            date: "2025-07-29T11:45:00Z",
        },
        {
            id: 103,
            customer: "Claire Lefevre",
            amount: "FCFA 49.50",
            status: "Annulé",
            date: "2025-07-29T09:00:00Z",
        },
        {
            id: 104,
            customer: "David Bernard",
            amount: "FCFA 210.20",
            status: "En attente",
            date: "2025-07-30T10:15:00Z",
        },
    ];

    const popularProducts = [
        { id: 1, name: "Smartphone X", sales: "120", revenue: "FCFA 12,000" },
        {
            id: 2,
            name: "Écouteurs sans fil",
            sales: "85",
            revenue: "FCFA 4,250",
        },
        {
            id: 3,
            name: "Montre connectée V2",
            sales: "60",
            revenue: "FCFA 7,200",
        },
        { id: 4, name: "Webcam HD Pro", sales: "45", revenue: "FCFA 2,700" },
    ];

    return (
        <>
            <PageBreadcrumb pageTitle="Tableau de bord Authentica" />

            <section className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <div className="container mx-auto p-4 sm:px-6 lg:px-8">
                    {/* Section des Statistiques Clés */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between transition-transform transform hover:scale-105"
                            >
                                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                                    {stat.title}
                                </h3>
                                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                                    {stat.value}
                                </p>
                                <div className="flex items-center text-sm">
                                    {stat.type === "up" ? (
                                        <IconArrowUp />
                                    ) : (
                                        <IconArrowDown />
                                    )}
                                    <span
                                        className={`ml-1 ${
                                            stat.type === "up"
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {stat.change}
                                    </span>
                                    <span className="ml-2 text-gray-500 dark:text-gray-400">
                                        depuis le mois dernier
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Section Graphiques et Listes (Commandes Récentes, Produits Populaires) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Graphique des Ventes (Placeholder) */}
                        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                Tendances des Ventes Mensuelles
                            </h3>
                            <div className="h-64 bg-gray-50 dark:bg-gray-700 flex items-center justify-center rounded-md text-gray-400 dark:text-gray-500">
                                <p>
                                    Placeholder pour un graphique de ventes (ex:
                                    Chart.js, Recharts)
                                </p>
                            </div>
                        </div>

                        {/* Commandes Récentes */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                Commandes Récentes
                            </h3>
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                {recentOrders.map((order) => (
                                    <li
                                        key={order.id}
                                        className="py-3 flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                                Commande #{order.id} -{" "}
                                                {order.customer}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {dateTimeFormatter(
                                                    order.date,
                                                    "shortDateTime"
                                                )}
                                            </p>
                                        </div>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold
                                            ${
                                                order.status === "Livré"
                                                    ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                                                    : order.status ===
                                                      "En cours"
                                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100"
                                                    : order.status === "Annulé"
                                                    ? "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100"
                                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Section Produits Populaires (Nouvelle section pour l'e-commerce) */}
                    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            Produits les Plus Vendus
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        >
                                            Produit
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        >
                                            Ventes
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        >
                                            Revenu
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {popularProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {product.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {product.sales}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {product.revenue}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <Home />
        </>
    );
};

export default Dashboard;
