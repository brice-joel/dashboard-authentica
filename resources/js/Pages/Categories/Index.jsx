import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import CategoriesTables from "../../components/tables/CategoriesTable";
import { Link, router, usePage } from "@inertiajs/react";
import { useRouteContext } from "../../context/RouteContext";
import {
    EyeCloseIcon,
    EyeIcon,
    PencilIcon,
    PlusIcon,
    TrashBinIcon,
} from "../../assets/images/icons";
import Swal from "sweetalert2";
import { useEffect } from "react";
import CategoryForm from "../../components/ui/form/CategoryForm";
import useCategoryForm from "../../hooks/forms/useCategoryForm";
import { useState } from "react";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";

const Index = ({ categories }) => {
    console.log(categories);
    const route = useRouteContext();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [_errors, _setErrors] = useState({});
    const [_data, _setData] = useState({});

    const handleOpenModal = (category = null) => {
        setSelectedCategory(category);
        setIsOpen(true);
        _setErrors({});
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedCategory(null);
    };
    /*pour faire remonter les erreurs de validations*/
    const handleErrorValidation = (errors) => {
        _setErrors(errors);
    };
    /* pour faire remonter les data du formulaire pour la persisence lors de la creation*/
    const handleDataForm = (data) => {
        setSelectedCategory(data);
    };
    const handleDelete = async (category) => {
        // Étape 1 : Demande de confirmation
        const result = await Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Cette action est irréversible. Vous ne pourrez pas annuler la suppression de ce point de cette catégorie.",
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
            router.delete(route("category.destroy", category.id), {
                onSuccess: () => {
                    // Étape 4a : Cache le spinner et affiche le message de succès
                    Swal.hideLoading();
                    Swal.fire({
                        title: "Supprimé!",
                        text: "Le point de retrait a été supprimé.",
                        icon: "success",
                    });
                },
                onError: (errors) => {
                    // Étape 4b : Cache le spinner et affiche le message d'erreur
                    Swal.hideLoading();
                    Swal.fire({
                        title: "Erreur!",
                        text: "Une erreur est survenue lors de la suppression.",
                        icon: "error",
                    });
                },
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    const CategoryModal = () => {
        // Utiliser le hook pour obtenir les props du formulaire
        const { data, setData, processing, errors, submit, isPost } =
            useCategoryForm(
                selectedCategory,
                handleErrorValidation,
                handleDataForm,
                handleCloseModal
            );

        return (
            <Modal
                isOpen={isOpen}
                onClose={handleCloseModal}
                isFullscreen={false}
                className="max-w-4xl mt-15"
            >
                <ComponentCard
                    title={`${
                        selectedCategory ? "Modifier" : "Ajouter"
                    } une catégorie`}
                >
                    <CategoryForm
                        handleSubmit={submit}
                        setData={setData}
                        errors={_errors}
                        data={data}
                        processing={processing}
                        categories={categories}
                        isPost={isPost}
                    />
                </ComponentCard>
            </Modal>
        );
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Catégories" />

            <ComponentCard title="Catégories">
                <section className="flex justify-start">
                    <Button
                        //  href={route("category.create")}
                        onClick={() => handleOpenModal()}
                        className="flex items-center space-x-2 p-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
                    >
                        <PlusIcon className="text-white" /> Ajouter une
                        Catégorie
                    </Button>

                    <CategoryModal />
                </section>
                <CategoriesTables
                    categories={categories}
                    handleDelete={handleDelete}
                    handleOpenModal={handleOpenModal}
                />
            </ComponentCard>
        </>
    );
};

export default Index;

{
    /* 
       <button className="flex items-center space-x-2 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                        <PencilIcon className="h-5 w-5" />
                        <span>Modifier</span>
                    </button>

                    <button className="flex items-center space-x-2 p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors">
                        <TrashBinIcon className="h-5 w-5" />
                        <span>Supprimer</span>
                    </button>

                    <button className="flex items-center space-x-2 p-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition-colors">
                        <EyeIcon className="h-5 w-5" />
                        <span>Voir</span>
                    </button>
    */
}
