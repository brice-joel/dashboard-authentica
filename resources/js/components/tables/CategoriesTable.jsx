import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import _Image from "../ui/images/Image";
import { EyeIcon, PencilIcon, TrashBinIcon } from "../../assets/images/icons";
import { imagePath } from "../../config/url";
import CategoryBadge from "../ui/badge/CategoryBadge";
import { useState } from "react";
import DetailsProductModal from "../ui/modal/DetailsProductModal";
import DetailsCategoryModal from "../ui/modal/DetailsCategoryModal";
import Switch from "../form/switch/Switch";
import { router } from "@inertiajs/react";
import { useRouteContext } from "../../context/RouteContext";

// Define the table data using the interface
export default function CategoriesTables({
    categories,
    handleDelete,
    handleOpenModal,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const route = useRouteContext();
    const [category, setCategory] = useState(null);
    const [categoriesData, setCategoriesData] = useState(categories);

    const handleSwitchChange = (category_id) => {
        //console.log(category_id);
        // Logique de mise à jour de l'état local
        const updatedCategories = categoriesData.map((category) => {
            if (category.id === category_id) {
                return { ...category, is_active: !category.is_active };
            }
            return category;
        });
        setCategoriesData(updatedCategories);
        // Envoyer une requête PATCH au serveur pour mettre à jour le statut
        // Inertia.js gère la requête pour vous.
        router.patch(
            route("category.update.is_active", { category: category_id }),
            {
                is_active: !categoriesData.find((p) => p.id === category_id)
                    .is_active,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    // Vous pouvez ajouter une notification ici si vous le souhaitez
                    console.log("Statut mis à jour avec succès");
                },
                onError: () => {
                    // En cas d'erreur, annulez la mise à jour de l'interface utilisateur
                    // ou affichez un message d'erreur
                    console.error("Erreur lors de la mise à jour du statut.");
                    setCategoriesData(categories); // Revenir à l'état initial
                },
            }
        );
    };
    const handleOpenDetailsCategoryModal = (category) => {
        setCategory(category);
        console.log(category);
        setIsOpen(true);
    };

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
                                    Nom
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Catégorie parente
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
                                    Image
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Statut
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
                            {categories.map((category, index) => (
                                <TableRow key={category.id}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        #{index}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                                <_Image
                                                    src={imagePath(
                                                        category.image,
                                                        "categories"
                                                    )}
                                                    alt={category.name}
                                                    className="w-[40px] h-[40px]"
                                                />
                                            </div>
                                            <div>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                    {category.name}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {category.parent ? (
                                            <CategoryBadge
                                                category_name={
                                                    category.parent.name
                                                }
                                            />
                                        ) : (
                                            <CategoryBadge
                                                category_name="N/A"
                                                className="bg-red-100 text-gray-900"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {category.description}
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <_Image
                                            src={imagePath(
                                                category.image,
                                                "categories"
                                            )}
                                            alt={category.name}
                                            className="w-[80px] h-[80px]"
                                        />
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <Switch
                                            defaultChecked={category.is_active} // Utilise la valeur de la DB pour l'état initial
                                            onChange={() =>
                                                handleSwitchChange(category.id)
                                            } // Appelle la fonction de mise à jour
                                        />
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <div className="flex space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                            <button
                                                onClick={() =>
                                                    handleOpenModal(category)
                                                }
                                                className="flex items-center space-x-2 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(category)
                                                }
                                                className="flex items-center space-x-2 p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                                            >
                                                <TrashBinIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleOpenDetailsCategoryModal(
                                                        category
                                                    )
                                                }
                                                className="flex items-center space-x-2 p-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                                            >
                                                <EyeIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <DetailsCategoryModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                category={category}
            />
        </>
    );
}
