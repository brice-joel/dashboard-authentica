import { useForm } from "@inertiajs/react";
import { useState } from "react";

const useProductForm = (
    initialData = null,
    handleErrorValidation,
    handleDataForm,
    handleCloseModal
) => {
    // Initialiser les données du formulaire avec les valeurs existantes ou des chaînes vides
    const { data, setData, processing, errors, post, put, reset } = useForm({
        slug: initialData?.slug || "",
        name: initialData?.name || "",
        price: initialData?.price || "",
        category_id: initialData?.category_id || "",
        description: initialData?.description || "",
        brand: initialData?.brand || "",
        stock: initialData?.stock || "",
        image: initialData?.image || null,
    });

    const isPost = !initialData || !("id" in initialData); //verifi si cest la creation ou la modification

    const submit = (e) => {
        e.preventDefault();

        if (initialData && "id" in initialData) {
            //pour la persistance des données lors de la la creation.
            console.log("edit");
            console.log("data", data);

            // Logique de modification

            put(route("product.update", initialData), {
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
            console.log("sotre");

            post(route("product.store"), {
                onSuccess: () => {
                    handleCloseModal();
                },
                onError: (errors) => {
                    handleErrorValidation(errors);
                    handleDataForm(data);
                    console.log(errors);
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

export default useProductForm;
