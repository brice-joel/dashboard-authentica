import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";
import DropzoneComponent from "../../form/form-elements/DropZone";
import { useForm } from "@inertiajs/react";
import Select from "../../form/Select";
import TextArea from "../../form/input/TextArea";
import { InfoIcon } from "../../../assets/images/icons";
import { generateSlug } from "../../../utils/utils";
import SubmitButton from "../button/SubmitButton";
import SelectCascade from "../../form/SelectCascade";

const ProductForm = ({
    handleSubmit,
    setData,
    data,
    errors,
    processing,
    categories,
    isPost,
}) => {
    categories = categories.map((category) => {
        return {
            key: category.id,
            value: category.id,
            label: category.name,
            selected: false,
        };
    });

    // This function handles the change in the name field and updates the slug
    const handleNameChange = (e) => {
        const newName = e.target.value;
        const newSlug = generateSlug(newName);
        setData("name", newName);
        setData("slug", newSlug);
    };
    console.log("post ? ", isPost);

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 mx-auto border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 md:w-full "
        >
            <div className="hidden">
                <Label htmlFor="slug">Slug du produit *</Label>
                <Input
                    className="hover:cursor-not-allowed"
                    type="text"
                    id="slug"
                    required
                    value={data.slug ?? ""}
                    defaultValue={data.slug ?? ""}
                    // The slug is now disabled
                    disabled
                    error={errors.slug ?? ""}
                />
            </div>

            <div>
                <Label htmlFor="name">Nom du produit *</Label>
                <Input
                    type="text"
                    id="name"
                    required
                    value={data.name ?? ""}
                    defaultValue={data.name ?? ""}
                    // Use the new handler for name changes
                    onChange={handleNameChange}
                    error={errors.name ?? ""}
                />
            </div>
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <Label htmlFor="category">Catégorie</Label>
                    <Select
                        id="category"
                        name="category"
                        options={categories}
                        placeholder="Selectionnez une Catégorie"
                        value={data.category_id ?? ""}
                        defaultValue={data.category_id ?? ""}
                        onChange={(e) => setData("category_id", e)}
                        className="dark:bg-dark-900"
                        //  required={true}
                        error={errors.category}
                    />
                </div>
                <div>
                    <Label htmlFor="price">Prix du produit (FCFA) *</Label>
                    <Input
                        type="number"
                        //step={50}
                        min={10}
                        id="price"
                        value={data.price ?? ""}
                        defaultValue={data.price ?? ""}
                        required
                        onChange={(e) => setData("price", e.target.value)}
                        error={errors.price}
                    />
                </div>
                <div>
                    <Label htmlFor="stock">Stock *</Label>
                    <Input
                        id="stock"
                        name="stock"
                        type="number"
                        min={1}
                        max={100}
                        value={data.stock ?? ""}
                        defaultValue={data.stock ?? ""}
                        required
                        onChange={(e) => setData("stock", e.target.value)}
                        error={errors.stock}
                    />
                </div>

                <div>
                    <Label htmlFor="brand">Marque</Label>
                    <Input
                        id="brand"
                        name="brand"
                        type="text"
                        value={data.brand ?? ""}
                        defaultValue={data.brand ?? ""}
                        // required
                        onChange={(e) => setData("brand", e.target.value)}
                        error={errors.brand}
                    />
                </div>
                <div className="col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <TextArea
                        required
                        //value={data.description}
                        value={data.description ?? ""}
                        defaultValue={data.description ?? ""}
                        onChange={(value) => setData("description", value)}
                        error={errors.description}
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="image">Image *</Label>
                {!isPost ? (
                    <div>
                        <span className="text-red-400 flex">
                            <InfoIcon /> Aller dans la rubrique "Détails du
                            produit" pour modifier ou supprimer son image
                            principale
                        </span>
                    </div>
                ) : (
                    <DropzoneComponent
                        id="image"
                        image={data.image}
                        setImage={(file) => setData("image", file)}
                        error={errors.image}
                    />
                )}
            </div>

            {/* Bouton de soumission */}

            <SubmitButton processing={processing} />
        </form>
    );
};

export default ProductForm;
