import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import { useState } from "react";
import DropzoneComponent from "../../form/form-elements/DropZone";
import { useForm } from "@inertiajs/react";
import Select from "../../form/Select";
import TextArea from "../../form/input/TextArea";
import { generateSlug } from "../../../utils/utils";
import SubmitButton from "../button/SubmitButton";
import SelectCascade from "../../form/SelectCascade";
import DatePicker from "../../form/date-picker";
import MultiSelect from "../../form/MultiSelect";

const PromotionForm = ({
    categories,
    handleSubmit,
    setData,
    data,
    errors,
    processing,
}) => {
    categories = categories.map((category) => {
        return {
            key: category.id,
            label: category.name,
            value: category.id,
            text: category.name,
            selected: false,
        };
    });

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 mx-auto border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 md:w-3/5"
        >
            <div>
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

            <div>
                <Label htmlFor="percentage">Pourcentage *</Label>
                <Input
                    type="number"
                    id="percentage"
                    required
                    min={1}
                    max={99}
                    step={1}
                    value={data.percentage ?? ""}
                    defaultValue={data.percentage ?? ""}
                    onChange={(e) => setData("percentage", e.target.value)}
                    // Use the new handler for name changes
                    error={errors.percentage ?? ""}
                />
            </div>

            <div>
                <Label htmlFor="categories">
                    Selectionner les catégories *
                </Label>
                {/* <SelectCascade
                    value={data.categories}
                    onChange={(e) => setData("categories", e.value)}
                    options={categories}
                    optionLabel="label"
                    placeholder="Catégories"
                    className="dark:bg-dark-900"
                /> */}
                <MultiSelect
                    value={data.categories_ids}
                    onChange={(e) => setData("categories_ids", e)}
                    options={categories}
                    optionLabel="label"
                    placeholder=""
                    className="dark:bg-dark-900"
                />
            </div>
            <div className="flex justify-between">
                <div>
                    <Label htmlFor="start">Début *</Label>
                    <Input
                        type="datetime-local"
                        id="start"
                        required
                        value={data.started_at ?? ""}
                        defaultValue={data.started_at ?? ""}
                        // Use the new handler for name changes
                        error={errors.started_at ?? ""}
                        onChange={(e) => setData("started_at", e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="end">Fin *</Label>
                    <Input
                        type="datetime-local"
                        id="end"
                        required
                        value={data.finished_at ?? ""}
                        defaultValue={data.finished_at ?? ""}
                        // Use the new handler for name changes
                        error={errors.finished_at ?? ""}
                        onChange={(e) => setData("finished_at", e.target.value)}
                    />
                </div>
            </div>

            {/* Bouton de soumission */}

            <SubmitButton processing={processing} />
        </form>
    );
};

export default PromotionForm;
