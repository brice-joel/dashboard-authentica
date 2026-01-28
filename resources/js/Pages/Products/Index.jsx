import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import ProductsTable from "../../components/tables/ProductsTable";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { PlusIcon } from "../../assets/images/icons";
import { useRouteContext } from "../../context/RouteContext";
import { Modal } from "../../components/ui/modal";
import { useState } from "react";
import ProductForm from "../../components/ui/form/ProductForm";
import useProductForm from "../../hooks/forms/useProductForm";
import Button from "../../components/ui/button/Button";
const Index = ({ products, categories }) => {
    const route = useRouteContext();
    const [_errors, _setErrors] = useState({});
    const [_data, _setData] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async (id) => {
        // Étape 1 : Demande de confirmation
        const result = await Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Cette action est irréversible. Vous ne pourrez pas annuler la suppression de ce produit.",
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
            router.delete(route("product.destroy", id), {
                onSuccess: () => {
                    // Étape 4a : Cache le spinner et affiche le message de succès
                    Swal.hideLoading();
                    Swal.fire({
                        title: "Supprimé!",
                        text: "Le produit a été supprimé.",
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
            });
        }
    };

    const handleOpenModal = (product = null) => {
        setSelectedProduct(product);
        setIsOpen(true);
        _setErrors({});
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedProduct(null);
    };
    const handleErrorValidation = (errors) => {
        _setErrors(errors);
    };
    const handleDataForm = (data) => {
        setSelectedProduct(data);
    };

    const ProductModal = () => {
        const { data, setData, processing, errors, submit, isPost } =
            useProductForm(
                selectedProduct,
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
                        selectedProduct ? "Modifier" : "Ajouter"
                    } un Nouveau Produit`}
                    className="text-center"
                >
                    <ProductForm
                        handleSubmit={submit}
                        setData={setData}
                        data={data}
                        errors={_errors}
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
            <PageBreadcrumb pageTitle="Produits" />

            <ComponentCard title="Produits">
                <section className="flex justify-start">
                    <Button
                        onClick={() => handleOpenModal()}
                        className="flex items-center space-x-2 p-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
                    >
                        <PlusIcon className="text-white" />
                        Ajouter un produit
                    </Button>
                    <ProductModal />
                </section>
                <ProductsTable
                    products={products}
                    handleDelete={handleDelete}
                    handleOpenModal={handleOpenModal}
                />
            </ComponentCard>
        </>
    );
};

export default Index;
