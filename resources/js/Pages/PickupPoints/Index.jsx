import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { router } from "@inertiajs/react";
import { useRouteContext } from "../../context/RouteContext";
import { PlusIcon } from "../../assets/images/icons";
import PickupPointsTable from "../../components/tables/PickupPointsTable";
import { Modal } from "../../components/ui/modal";
import { useState } from "react";
import PickupPointForm from "../../components/ui/form/PickupPointForm";
import Swal from "sweetalert2";
import usePickupPointForm from "../../hooks/forms/usePickupPointForm";

const Index = ({ pickup_points }) => {
    const route = useRouteContext();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPickup, setSelectedPickup] = useState(null);
    const [_errors, _setErrors] = useState({});
    const [_data, _setData] = useState({});

    const REGIONS = [
        {
            value: "CENTRE",
            label: "CENTRE",
        },
        {
            value: "LITTORAL",
            label: "LITTORAL",
        },
    ];

    const CITIES = [
        {
            value: "DOUALA",
            label: "DOUALA",
        },
        {
            value: "YAOUNDE",
            label: "YAOUNDE",
        },
    ];

    const handleOpenModal = (pickup_point = null) => {
        setSelectedPickup(pickup_point);
        setIsOpen(true);
        _setErrors({});
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedPickup(null);
    };
    /*pour faire remonter les erreurs de validations*/
    const handleErrorValidation = (errors) => {
        _setErrors(errors);
    };
    /* pour faire remonter les data du formulaire pour la persisence lors de la creation*/
    const handleDataForm = (data) => {
        setSelectedPickup(data);
    };
    const handleDelete = async (pickup_point) => {
        // Étape 1 : Demande de confirmation
        const result = await Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Cette action est irréversible. Vous ne pourrez pas annuler la suppression de ce point de retrait.",
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
            router.delete(route("pickup-point.destroy", pickup_point.id), {
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

    const PickupModal = () => {
        // Utiliser le hook pour obtenir les props du formulaire
        const { data, setData, processing, errors, submit } =
            usePickupPointForm(
                selectedPickup,
                handleErrorValidation,
                handleDataForm,
                handleCloseModal
            );

        console.log(data);

        return (
            <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <ComponentCard
                    title={`${
                        selectedPickup ? "Modifier" : "Ajouter"
                    } un Point de retrait`}
                >
                    <PickupPointForm
                        handleSubmit={submit}
                        setData={setData}
                        errors={_errors}
                        data={data}
                        processing={processing}
                        REGIONS={REGIONS}
                        CITIES={CITIES}
                    />
                </ComponentCard>
            </Modal>
        );
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Point de retrait" />
            <ComponentCard title="Gestion des Points de retrait">
                <section className="flex justify-start">
                    <Button
                        className="flex items-center space-x-2 p-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
                        onClick={() => handleOpenModal()}
                    >
                        <PlusIcon className="text-white" /> Ajouter une Point de
                        retrait
                    </Button>
                    <PickupModal />
                </section>
                <PickupPointsTable
                    pickup_points={pickup_points}
                    handleDelete={handleDelete}
                    handleOpenModal={handleOpenModal}
                />
            </ComponentCard>
        </>
    );
};

export default Index;
