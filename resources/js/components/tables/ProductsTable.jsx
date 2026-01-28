import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

import Stock from "../ui/badge/Stock";
import CategoryBadge from "../ui/badge/CategoryBadge";
import Button from "../ui/button/Button";
import { dateTimeFormatter } from "../../utils/utils";
import _Image from "../ui/images/Image";
import {
    EyeCloseIcon,
    EyeIcon,
    PencilIcon,
    TrashBinIcon,
} from "../../assets/images/icons";
import { imagePath } from "../../config/url";
import ToggleSwitch from "../form/form-elements/ToggleSwitch";
import Switch from "../form/switch/Switch";
import { useState } from "react";
import { useRouteContext } from "../../context/RouteContext";
import { Link, router } from "@inertiajs/react";
import { Modal } from "../ui/modal";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DetailsProductModal from "../ui/modal/DetailsProductModal";

// Define the table data using the interface
export default function ProductsTables({
    products,
    handleDelete,
    handleOpenModal,
}) {
    const [productsData, setProductsData] = useState(products);
    const [product, setProduct] = useState(null);
    const route = useRouteContext();
    const [isOpen, setIsOpen] = useState(false);

    const handleSwitchChange = (productId) => {
        // Logique de mise à jour de l'état local
        const updatedProducts = productsData.map((product) => {
            if (product.id === productId) {
                return { ...product, is_active: !product.is_active };
            }
            return product;
        });
        setProductsData(updatedProducts);

        // Envoyer une requête PATCH au serveur pour mettre à jour le statut
        // Inertia.js gère la requête pour vous.
        router.patch(
            route("product.update.is_active", { product: productId }),
            {
                is_active: !productsData.find((p) => p.id === productId)
                    .is_active,
            },
            {
                onSuccess: () => {
                    // Vous pouvez ajouter une notification ici si vous le souhaitez
                    console.log("Statut mis à jour avec succès");
                },
                onError: () => {
                    // En cas d'erreur, annulez la mise à jour de l'interface utilisateur
                    // ou affichez un message d'erreur
                    console.error("Erreur lors de la mise à jour du statut.");
                    setProductsData(products); // Revenir à l'état initial
                },
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleOpenDetailsProductModal = (product) => {
        setIsOpen(true);
        setProduct(product);
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
                                    Catégorie
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Prix (XAF)
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Images
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Stock
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Online
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Publié le.
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
                            {products.map((product, index) => (
                                <TableRow key={product.id}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {index}
                                    </TableCell>
                                    <TableCell className=" sm:px-2 text-start">
                                        <div className="flex items-center gap-3">
                                            <div className=" overflow-hidden rounded-full">
                                                <_Image
                                                    src={imagePath(
                                                        product.image,
                                                        "products"
                                                    )} ///images/user/user-17.jpg
                                                    alt={product.name}
                                                    className="w-[40px] h-[40px]"
                                                />
                                            </div>
                                            <div>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                    {product.name}
                                                </span>
                                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                    {product.brand}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {product.category ? (
                                            <CategoryBadge
                                                category_name={
                                                    product.category.name
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
                                        {product.price}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <div className="flex -space-x-2">
                                            {product.images.map(
                                                (teamImage, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                                                    >
                                                        <img
                                                            width={50}
                                                            height={50}
                                                            src={imagePath(
                                                                teamImage.url,
                                                                "products/images"
                                                            )}
                                                            alt={`${
                                                                product.imagedelete
                                                            } ${index + 1}`}
                                                            className="w-full size-6"
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Stock product={product} />
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {product.stock}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <Switch
                                            defaultChecked={product.is_active} // Utilise la valeur de la DB pour l'état initial
                                            onChange={() =>
                                                handleSwitchChange(product.id)
                                            } // Appelle la fonction de mise à jour
                                        />
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {dateTimeFormatter(product.created_at)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <div className="flex space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                            <button
                                                onClick={() =>
                                                    handleOpenModal(product)
                                                }
                                                className="flex items-center space-x-2 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(product.id)
                                                }
                                                className="flex items-center space-x-2 p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                                            >
                                                <TrashBinIcon className="h-5 w-5" />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleOpenDetailsProductModal(
                                                        product
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
            <DetailsProductModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                product={product}
            />
        </>
    );
}
