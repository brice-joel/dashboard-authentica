import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";
import DropzoneComponent from "../../form/form-elements/DropZone";
import { useForm } from "@inertiajs/react";

export default function ProductForm() {
    // handleSubmit,
    //   setData,
    //data,
    //errors,
    //processing
    const categoriesOptions = [
        { value: "1", text: "Categorie 1", selected: false },
        { value: "2", text: "Categorie 2", selected: false },
        { value: "3", text: "Categorie 3", selected: false },
        { value: "4", text: "Categorie 4", selected: false },
        { value: "5", text: "Categorie 5", selected: false },
    ];
    const [selectedValues, setSelectedValues] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    };

    const { data, setData, processing, errors } = useForm({
        name: "",
    });

    return (
        <>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <div>
                    <Label htmlFor="name">Nom du produit</Label>
                    <Input
                        type="text"
                        id="name"
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <MultiSelect
                            label="Catégorie(s)"
                            options={categoriesOptions}
                            defaultSelected={["1", "3"]}
                            // onChange={(values) => setSelectedValues(values)}
                        />
                        <p className="sr-only">
                            Selected Values: {selectedValues.join(", ")}
                        </p>
                    </div>
                    <div>
                        <Label htmlFor="price">Prix du produit (XAF)</Label>
                        <Input type="number" step={50} min={500} id="price" />
                    </div>
                </div>

                <div>
                    <DropzoneComponent />
                </div>
                {/* Bouton de soumission */}

                <button
                    type="submit"
                    className={`w-full py-2 px-4 text-center text-sm font-semibold text-white transition duration-100 rounded-md flex items-center justify-center space-x-2 
                ${
                    processing
                        ? "bg-brand-400 cursor-not-allowed" // Style pour l'état de chargement
                        : "bg-brand-500 hover:bg-brand-600 focus-visible:ring active:bg-brand-700" // Style normal
                }
    `}
                    disabled={processing}
                >
                    {processing ? (
                        <span className="flex items-center space-x-2">
                            <span>Traitement...</span>
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        </span>
                    ) : (
                        "Enregistrer"
                    )}
                </button>
            </form>
        </>
    );
}
