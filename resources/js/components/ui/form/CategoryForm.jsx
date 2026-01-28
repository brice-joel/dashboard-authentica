import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import DropzoneComponent from "../../form/form-elements/DropZone";
import TextArea from "../../form/input/TextArea";
import SubmitButton from "../button/SubmitButton";
import { generateSlug } from "../../../utils/utils";
import { InfoIcon } from "../../../assets/images/icons";
import Select from "../../form/Select";
import SelectCascade from "../../form/SelectCascade";

const CategoryForm = ({
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
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div className="hidden">
                <Label htmlFor="slug">Slug</Label>
                <Input
                    type="text"
                    id="slug"
                    value={data.slug}
                    defaultValue={data.slug}
                    required
                    disabled
                    error={errors.slug ?? ""} // Afficher l'erreur s'il y en a une
                />
            </div>
            {/* Nom de la catégorie */}
            <div>
                <Label htmlFor="name">Nom de la catégorie</Label>
                <Input
                    type="text"
                    id="name"
                    required
                    value={data.name ?? ""}
                    defaultValue={data.name ?? ""}
                    onChange={handleNameChange}
                    error={errors.name ?? ""}
                />
            </div>
            {/* catégorie parente */}
            <div>
                <Label htmlFor="parent">Catégorie parente</Label>
                <Select
                    id="parent"
                    name="parent_id"
                    options={categories}
                    placeholder="Selectionnez une Catégorie"
                    value={data.parent_id ?? ""}
                    defaultValue={data.parent_id ?? ""}
                    onChange={(e) => setData("parent_id", e)}
                    className="dark:bg-dark-900"
                    //  required={true}
                    error={errors.parent_id ?? ""}
                />
            </div>

            {/* Description */}
            <div>
                <Label htmlFor="description">Description</Label>
                <TextArea
                    value={data.description}
                    onChange={(value) => setData("description", value)}
                    rows={6}
                    error={errors.description} // Afficher l'
                />
            </div>

            {/* Image */}
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

export default CategoryForm;
