import { dateTimeFormatter, formatPrice } from "../../../utils/utils";
import _Image from "../../ui/images/Image";
import { getFileName, imagePath } from "../../../config/url";
import { Modal } from "../modal/index";
import Stock from "../badge/Stock";
import OnlineBadge from "../badge/OnlineBadge";
import BrandBage from "../badge/BrandBadge";
import { useEffect, useState } from "react"; // ⬅️ Import de useState
import ComponentCard from "../../common/ComponentCard";
import DropzoneComponent from "../../form/form-elements/DropZone";
import Label from "../../form/Label";
import SubmitButton from "../button/SubmitButton";
import { router, useForm } from "@inertiajs/react";
import { useRouteContext } from "../../../context/RouteContext";
import CategoryBadge from "../badge/CategoryBadge";

export default function DetailsCategoryModal({ isOpen, setIsOpen, category }) {
    // if category is null return nothing
    if (!category) return null;

    const route = useRouteContext();

    // formulaire d'ajout des images d'un produit.
    const { data, setData, processing, errors, post, reset } = useForm({
        image: null,
    });

    const [_isOpen_, _setIsOpen_] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("category.category-image.update", category), {
            onSuccess: () => {
                reset();
                _setIsOpen_(false);
                setIsOpen(false);
            },
            onError: (errors) => {
                console.log(errors);
                _setIsOpen_(false);
                setIsOpen(false);
            },
        });
    };

    return (
        <>
            {/* Modal des details du produit */}
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                isFullscreen={true}
            >
                <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pb-10">
                    <div className="container mx-auto px-4 mt-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden lg:flex">
                            {/* Section Image Principale */}
                            <div className="lg:w-1/2 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                                <div className="w-full max-w-lg">
                                    <div className="flex justify-around mb-5">
                                        <button
                                            onClick={() => _setIsOpen_(true)}
                                            className="px-4 py-1 rounded-sm shadow-xl text-gray-200 bg-blue-700 hover:bg-green-300 hover:text-blue-900 "
                                        >
                                            Modifier l'image principale
                                        </button>
                                    </div>
                                    {/* 3. 🎯 Utilisation de l'état `mainImage` pour la source */}
                                    <_Image
                                        src={imagePath(
                                            category.image,
                                            "categories"
                                        )} // ⬅️ Source dynamique
                                        alt={category.name}
                                        className="w-full h-auto object-contain rounded-xl shadow-md"
                                    />
                                </div>
                            </div>

                            {/* Section Détails */}
                            <div className="lg:w-1/2 p-8 lg:p-12">
                                <div className="flex justify-between items-center mb-4">
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {category.name}
                                    </h1>
                                    <div>
                                        <OnlineBadge
                                            is_active={category.is_active}
                                        />
                                        {!category.is_active && (
                                            <p className="text-red-600 dark:text-red-400 text-sm">
                                                Tous les produits de cette
                                                catégorie sont hors ligne
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Description
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {category.description}
                                    </p>
                                </div>

                                {/* Informations Clés */}
                                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-gray-600 dark:text-gray-400 mb-8">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm text-gray-500 dark:text-gray-300">
                                            Catégorie Parente
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-100">
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
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm text-gray-500 dark:text-gray-300">
                                            Slug
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-100 break-words">
                                            {category.slug}
                                        </span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm text-gray-500 dark:text-gray-300">
                                            Publié le
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-100">
                                            {dateTimeFormatter(
                                                category.created_at
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm text-gray-500 dark:text-gray-300">
                                            Mis à jour le
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-100">
                                            {dateTimeFormatter(
                                                category.updated_at
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* Modal pour modifier l\image de la catégorie */}
            <Modal isOpen={_isOpen_} onClose={() => _setIsOpen_(false)}>
                <ComponentCard
                    title="Ajouter une image pour cette categorie"
                    className="text-center"
                >
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-6 mx-auto border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 md:w-3/5"
                    >
                        <div>
                            <Label htmlFor="image">Image *</Label>
                            <DropzoneComponent
                                id="image"
                                image={data.image}
                                setImage={(file) => setData("image", file)}
                                error={errors.image}
                            />
                        </div>

                        {/* Bouton de soumission */}

                        <SubmitButton processing={processing} />
                    </form>
                </ComponentCard>
            </Modal>
        </>
    );
}
