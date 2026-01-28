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

export default function DetailsProductModal({ isOpen, setIsOpen, product }) {
    // if product is null return nothing
    if (!product) return null;

    const route = useRouteContext();
    const [_isOpen_, _setIsOpen_] = useState(false);
    const [__isOpen__, __setIsOpen__] = useState(false);
    // formulaire d'ajout des images d'un produit.
    const { data, setData, processing, errors, post, reset } = useForm({
        image: null,
    });

    const {
        data: _data,
        setData: _setData,
        processing: _processing,
        errors: _errors,
        post: _post,
        reset: _reset,
    } = useForm({
        image: null,
    });

    // 1. 🖼️ État pour l'image principale actuellement affichée
    // Initialiser avec l'image principale du produit
    const [mainImage, setMainImage] = useState(
        imagePath(product.image, "products")
    );

    const [id_product_image, setIdProductImage] = useState(null);
    const [is_product_image, setIsProductImage] = useState(true);

    // =========================================================================
    // ✨ MISE À JOUR CRITIQUE AVEC useEffect
    // =========================================================================
    useEffect(() => {
        // Cette fonction s'exécute à chaque fois que 'product' change ou 'isOpen' passe à true.
        if (product) {
            // Réinitialise l'image principale à l'image par défaut du NOUVEAU produit.
            setMainImage(imagePath(product.image, "products"));

            // Réinitialise les autres états si nécessaire
            setIdProductImage(null);
            setIsProductImage(true);
        }
    }, [product, isOpen]); // Dépendances: Réagit lorsque 'product' ou 'isOpen' changent.
    // =========================================================================

    // Initialiser la liste complète des images (principale + galerie) pour faciliter la gestion
    const allImages = [
        { url: product.image, isMain: true, path: "products" },
        ...(product.images || []).map((img) => ({
            url: img.url,
            isMain: false,
            path: "products/images",
            id: img.id,
        })),
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("product.image.store", product), {
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
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (id) => {
        // 1. Appel de la boîte de dialogue native du navigateur
        if (
            confirm(
                "Voulez-vous supprimer cette image ? Cette action est irréversible."
            )
        ) {
            // 2. Si l'utilisateur clique sur 'OK', procéder à la suppression Inertia
            router.delete(route("product.image.destroy", id), {
                onSuccess: () => {
                    // Logique après succès (rechargement de la page si nécessaire)
                    console.log("Image supprimée avec succès.");
                    setIsOpen(false);
                },
                onError: (errors) => {
                    console.error("Erreur lors de la suppression:", errors);
                    setIsOpen(false);
                },
            });
        }
    };

    // 2. 🔄 Fonction pour changer l'image principale
    const handleThumbnailClick = (imageUrl, imageId) => {
        setMainImage(imageUrl);
        setIdProductImage(imageId);

        //permet dafficher le bouton pour modifier l'image principale
        product.image === getFileName(imageUrl)
            ? setIsProductImage(true)
            : setIsProductImage(false);
    };

    // Fonction qui permet de modifier l'image  du produit principale
    const handleEditProductImage = (e) => {
        e.preventDefault();

        // 1. Appel de la boîte de dialogue native du navigateur
        if (
            confirm(
                "Voulez-vous supprimer l'Image principale du produit ? Cette action est irréversible."
            )
        ) {
            // 2. Si l'utilisateur clique sur 'OK', procéder à la suppression Inertia
            _post(route("product.product-image.update", product), {
                onSuccess: () => {
                    _reset();
                    __setIsOpen__(false);
                    setIsOpen(false);
                },
                onError: (errors) => {
                    console.log(errors);
                    __setIsOpen__(false);
                    setIsOpen(false);
                },
            });
        }
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
                                        {is_product_image ? (
                                            <button
                                                onClick={() =>
                                                    __setIsOpen__(true)
                                                }
                                                className="px-4 py-1 rounded-sm shadow-xl text-gray-200 bg-blue-700 hover:bg-green-300 hover:text-blue-900 "
                                            >
                                                Modifier l'image principale
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        id_product_image
                                                    )
                                                }
                                                className="px-4 py-1 rounded-sm shadow-xl text-gray-200 bg-red-700 hover:bg-green-300 hover:text-red-900 "
                                            >
                                                Supprimer
                                            </button>
                                        )}
                                    </div>
                                    {/* 3. 🎯 Utilisation de l'état `mainImage` pour la source */}
                                    <_Image
                                        src={mainImage} // ⬅️ Source dynamique
                                        alt={product.name}
                                        className="w-full h-auto object-contain rounded-xl shadow-md"
                                    />
                                </div>
                            </div>

                            {/* Section Détails */}
                            <div className="lg:w-1/2 p-8 lg:p-12">
                                <div className="flex justify-between items-center mb-4">
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {product.name}
                                    </h1>
                                    <OnlineBadge
                                        is_active={product.is_active}
                                    />
                                </div>

                                <div className="text-2xl font-semibold text-brand-600 dark:text-brand-400 mb-6">
                                    {formatPrice(product.price)}
                                </div>

                                {/* Description */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Description
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Informations Clés */}
                                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-gray-600 dark:text-gray-400 mb-8">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm text-gray-500 dark:text-gray-300">
                                            Référence
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-100">
                                            {product.product_ref}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm text-gray-500 dark:text-gray-300">
                                            Slug
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-100 break-words">
                                            {product.slug}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm text-gray-500 dark:text-gray-300">
                                            Marque
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-100">
                                            <BrandBage brand={product.brand} />
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm text-gray-500 dark:text-gray-300">
                                            Stock
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-100 flex gap-2">
                                            <Stock
                                                showStock={false}
                                                product={product}
                                            />
                                            unités
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm text-gray-500 dark:text-gray-300">
                                            Publié le
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-100">
                                            {dateTimeFormatter(
                                                product.created_at
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm text-gray-500 dark:text-gray-300">
                                            Mis à jour le
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-100">
                                            {dateTimeFormatter(
                                                product.updated_at
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {/* Galerie d'Images */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                                        Autres Images
                                    </h3>
                                    <div className="flex flex-wrap gap-4">
                                        {/* Boucle sur toutes les images */}
                                        {allImages.map((img, index) => {
                                            const fullPath = imagePath(
                                                img.url,
                                                img.path
                                            );

                                            // Déterminer si c'est l'image actuellement sélectionnée pour un effet visuel
                                            const isSelected =
                                                fullPath === mainImage;
                                            //Attribuer l'ID de cette image.
                                            const id = img.id;

                                            return (
                                                <div
                                                    key={index}
                                                    className={`w-30 h-30 overflow-hidden rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                                        isSelected
                                                            ? "border-brand-500 ring-2 ring-brand-500 shadow-md"
                                                            : "border-gray-200 dark:border-gray-600 hover:border-brand-300"
                                                    }`}
                                                    onClick={() =>
                                                        handleThumbnailClick(
                                                            fullPath,
                                                            id
                                                        )
                                                    } // ⬅️ Gestion du clic
                                                >
                                                    <_Image
                                                        src={fullPath}
                                                        alt={`${
                                                            product.name
                                                        } - Image ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            );
                                        })}
                                        <button
                                            onClick={() => _setIsOpen_(true)}
                                            className="px-4 py-1 m-8 rounded-sm shadow-xl text-gray-200 bg-green-700 hover:bg-green-300 hover:text-gray-900 "
                                        >
                                            Ajouter une image
                                        </button>{" "}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* Modal pour ajouter une nouvelle image */}
            <Modal isOpen={_isOpen_} onClose={() => _setIsOpen_(false)}>
                <ComponentCard
                    title="Ajouter une image pour cet article"
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
            {/* Modal pour modifier l'image principale */}
            <Modal isOpen={__isOpen__} onClose={() => __setIsOpen__(false)}>
                <ComponentCard
                    title="Modifier l'image principale de cet article"
                    className="text-center"
                >
                    <form
                        onSubmit={handleEditProductImage}
                        className="grid grid-cols-1 gap-6 mx-auto border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 md:w-3/5"
                    >
                        <div>
                            <Label htmlFor="image">Image *</Label>
                            <DropzoneComponent
                                id="image-principale"
                                image={_data.image}
                                setImage={(file) => _setData("image", file)}
                                error={_errors.image}
                            />
                        </div>

                        {/* Bouton de soumission */}

                        <SubmitButton processing={_processing} />
                    </form>
                </ComponentCard>
            </Modal>
        </>
    );
}
