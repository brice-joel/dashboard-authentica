import { useForm } from "@inertiajs/react";

const usePromotionForm = (
    initialData = null,
    handleErrorValidation,
    handleDataForm,
    handleCloseModal
) => {
    // Initialiser les données du formulaire avec les valeurs existantes ou des chaînes vides
    const { data, setData, post, processing, errors, reset } = useForm({
        categories_ids: initialData?.categories_ids || [],
        reference: initialData?.reference || "",
        percentage: initialData?.percentage || "",
        description: initialData?.description || "",
        started_at: initialData?.started_at || Date.now(),
        finished_at: initialData?.finished_at || Date.now(),
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);

        // Logique d'ajout
        post(route("promotion.store"), {
            onSuccess: () => {
                handleCloseModal();
            },
            onError: (errors) => {
                handleErrorValidation(errors);
                handleDataForm(data);
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    return {
        data,
        setData,
        processing,
        errors,
        reset,
        submit,
    };
};

export default usePromotionForm;
