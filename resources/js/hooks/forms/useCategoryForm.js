import { useForm } from "@inertiajs/react";

const useCategoryForm = (
    initialData = null,
    handleErrorValidation,
    handleDataForm,
    handleCloseModal
) => {
    // Initialiser les données du formulaire avec les valeurs existantes ou des chaînes vides
    const { data, setData, post, put, processing, errors, reset } = useForm({
        parent_id: initialData?.parent_id || "",
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        image: initialData?.image || null,
    });
    const isPost = !initialData || !("id" in initialData); //verifi si cest la creation ou la modification

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        if (initialData && "id" in initialData) {
            //pour la persistance des données lors de la la creation.
            console.log("edit");

            // Logique de modification
            put(route("category.update", initialData), {
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
            post(route("category.store"), {
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
        isPost,
    };
};

export default useCategoryForm;
