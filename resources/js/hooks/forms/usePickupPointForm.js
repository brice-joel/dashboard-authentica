import { useForm } from "@inertiajs/react";

const usePickupPointForm = (
    initialData = null,
    handleErrorValidation,
    handleDataForm,
    handleCloseModal
) => {
    // Initialiser les données du formulaire avec les valeurs existantes ou des chaînes vides
    const { data, setData, post, put, processing, errors, reset } = useForm({
        city: initialData?.city || "",
        region: initialData?.region || "",
        address: initialData?.address || "",
    });
    const submit = (e) => {
        e.preventDefault();
        //console.log(isNaN);
        if (initialData && "id" in initialData) {
            //pour la persistance des données lors de la la creation.
            console.log("edit");

            // Logique de modification
            put(route("pickup-point.update", initialData.id), {
                onSuccess: () => {
                    handleCloseModal();
                },
                onError: (errors) => {
                    handleErrorValidation(errors);
                },
                preserveScroll: true,
                preserveState: true,
            });
        } else {
            console.log("store");

            // Logique d'ajout
            post(route("pickup-point.store"), {
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
        }
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

export default usePickupPointForm;
