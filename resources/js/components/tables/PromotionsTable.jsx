import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

import { promotionRemainingTime } from "../../utils/utils";
import _Image from "../ui/images/Image";
import { TrashBinIcon } from "../../assets/images/icons";
import CategoryBadge from "../../components/ui/badge/CategoryBadge";
import { useRouteContext } from "../../context/RouteContext";
import { router } from "@inertiajs/react";
import Badge from "../ui/badge/Badge";
import Swal from "sweetalert2";
// Define the table data using the interface
export default function PromotionsTable({
    promotions,
    handleOpenModal,
    handleCloseModal,
}) {
    console.log(promotions);
    const route = useRouteContext();

    const handleDelete = async (promotion) => {
        // Étape 1 : Demande de confirmation
        const result = await Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Cette action est irréversible. Vous ne pourrez pas annuler la suppression de cette promotion.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Oui, supprimer!",
            cancelButtonText: "Annuler",
        });

        if (result.isConfirmed) {
            // Étape 2 : Affiche la modal de chargement
            Swal.fire({
                title: "Suppression en cours...",
                text: "Veuillez patienter.",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            // Étape 3 : Exécute la requête de suppression
            router.delete(route("promotion.destroy", promotion), {
                onSuccess: () => {
                    //handleCloseModal();
                    // Étape 4a : Cache le spinner et affiche le message de succès
                    Swal.hideLoading();
                    Swal.fire({
                        title: "Supprimé!",
                        text: "La promotion a été supprimé.",
                        icon: "success",
                    });
                },
                onError: (errors) => {
                    // handleOpenModal();
                    // Étape 4b : Cache le spinner et affiche le message d'erreur
                    Swal.hideLoading();
                    Swal.fire({
                        title: "Erreur!",
                        text: "Une erreur est survenue lors de la suppression.",
                        icon: "error",
                    });
                    console.log(errors);
                },
                preserveScroll: true,
                preserveState: true,
            });
        }
    };
    console.log(promotions);

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    N°
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Référence
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Catégorie de produits
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Pourcentage
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Description
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Début
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Fin
                                </TableCell>

                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Temps restant
                                </TableCell>

                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {promotions.map((promotion, index) => (
                                <TableRow key={promotion.id}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {index}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {promotion.reference}
                                    </TableCell>
                                    <TableCell className="px-4 py-3  text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {promotion.categories.map(
                                            (category, index) => (
                                                <CategoryBadge
                                                    index={index}
                                                    category_name={
                                                        category.name
                                                    }
                                                    className="m-2"
                                                />
                                            )
                                        )}
                                    </TableCell>
                                    <TableCell className=" sm:px-2 text-start">
                                        <div className="flex items-center gap-3">
                                            <Badge color="success">
                                                <span>
                                                    {promotion.percentage} %
                                                </span>
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {promotion.description}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {promotion.started_at}
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {promotion.finished_at}
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 ">
                                        <span className="text-center">
                                            <Badge color="success">
                                                {promotionRemainingTime(
                                                    promotion.started_at,
                                                    promotion.finished_at
                                                )}
                                            </Badge>
                                        </span>
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex gap-2">
                                        <div className="flex space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                            <button
                                                onClick={() =>
                                                    handleDelete(promotion)
                                                }
                                                className="flex items-center space-x-2 p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                                            >
                                                <TrashBinIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
