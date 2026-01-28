import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { Link } from "@inertiajs/react";
import { PlusIcon } from "../../assets/images/icons";
import PromotionsTable from "../../components/tables/PromotionsTable";
import { useState } from "react";
import Button from "../../components/ui/button/Button";
import usePromotionForm from "../../hooks/forms/usePromotionForm";
import { Modal } from "../../components/ui/modal";
import PromotionForm from "../../components/ui/form/PromotionForm";
const Index = ({ promotions, categories }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [_errors, _setErrors] = useState({});
    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedPromotion(null);
    };
    const handleDataForm = (data) => {
        setSelectedPromotion(data);
    };
    const handleErrorValidation = (errors) => {
        _setErrors(errors);
    };

    const PromotionModal = () => {
        const { data, setData, processing, errors, submit } = usePromotionForm(
            selectedPromotion,
            handleErrorValidation,
            handleDataForm,
            handleCloseModal
        );

        return (
            <Modal
                isOpen={isOpen}
                onClose={handleCloseModal}
                isFullscreen={false}
            >
                <ComponentCard
                    title="Créer une promotion"
                    className="text-center"
                >
                    <PromotionForm
                        handleSubmit={submit}
                        setData={setData}
                        data={data}
                        errors={_errors}
                        processing={processing}
                        categories={categories}
                    />
                </ComponentCard>
            </Modal>
        );
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Promotions" />

            <ComponentCard title="Promotions">
                <section className="flex justify-start">
                    <Button
                        onClick={() => handleOpenModal()}
                        className="flex items-center space-x-2 p-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
                    >
                        <PlusIcon className="text-white" />
                        Ajouter une promotion
                    </Button>
                    <PromotionModal />
                </section>
                <PromotionsTable
                    promotions={promotions}
                    handleOpenModal={handleOpenModal}
                    handleCloseModal={handleCloseModal}
                />
            </ComponentCard>
        </>
    );
};

export default Index;
