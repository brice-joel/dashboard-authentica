import Select from "../../form/Select";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";

const PickupPointForm = ({
    handleSubmit,
    setData,
    data,
    errors,
    processing,
    REGIONS,
    CITIES,
}) => {
    console.log("data", data);

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div>
                <Label htmlFor="region">Selectionnez une Région</Label>
                <Select
                    name="region"
                    options={REGIONS}
                    placeholder="Selectionnez une Région"
                    value={data.region ?? ""}
                    defaultValue={data.region ?? ""}
                    onChange={(e) => setData("region", e)}
                    className="dark:bg-dark-900"
                    required={true}
                    error={errors.region ?? ""}
                />
            </div>
            <div>
                <Label htmlFor="city">Sélectionnez une ville</Label>
                <Select
                    name="city"
                    options={CITIES}
                    placeholder="Sélectionnez une ville"
                    value={data.city ?? ""}
                    defaultValue={data.city ?? ""}
                    onChange={(e) => setData("city", e)}
                    className="dark:bg-dark-900"
                    required={true}
                    error={errors.city}
                />
            </div>

            <div>
                <Label htmlFor="address">Addresse</Label>
                <Input
                    type="text"
                    id="address"
                    name="address"
                    value={data.address ?? ""}
                    defaultValue={data.address ?? ""}
                    placeholder="ex: Carrefour Odza borne 10"
                    className="dark:bg-dark-900"
                    required={true}
                    onChange={(e) => setData("address", e.target.value)}
                    error={errors.address} // Afficher l'erreur s'il y en a une
                />
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
    );
};

export default PickupPointForm;
