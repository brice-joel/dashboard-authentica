import { PencilIcon, TrashBinIcon } from "../../assets/images/icons";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

export default function PickupPoints({
    pickup_points,
    handleDelete,
    handleOpenModal,
}) {
    const [globalFilter, setGlobalFilter] = useState("");

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <button
                    className="flex items-center space-x-2 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    onClick={() => handleOpenModal(rowData)}
                >
                    <PencilIcon className="h-5 w-5" />
                    <span>Modifier</span>
                </button>
                <button
                    className="flex items-center space-x-2 p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                    onClick={() => handleDelete(rowData)}
                >
                    <TrashBinIcon className="h-5 w-5" />
                    <span>Supprimer</span>
                </button>
            </div>
        );
    };

    const header = (
        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900">
            <h5 className="m-0 text-lg font-semibold text-gray-700 dark:text-gray-200">
                Points de Retrait
            </h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search text-gray-500 dark:text-gray-300" />
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Rechercher..."
                    className="p-inputtext-sm p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
            </span>
        </div>
    );

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="max-w-full overflow-x-auto">
                <DataTable
                    value={pickup_points}
                    header={header}
                    globalFilter={globalFilter}
                    emptyMessage="Aucun point de retrait trouvé."
                    responsiveLayout="scroll"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    className="data-table"
                    tableClassName="w-full"
                    rowClassName="border-b border-gray-100 dark:border-gray-700"
                    paginatorClassName="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300"
                    paginatorTemplate="RowsPerPageDropdown CurrentPageReport PrevPageLink PageLinks NextPageLink"
                    currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} entrées"
                    rowsPerPageDropdownOptions={[5, 10, 25, 50]}
                    stripedRows
                >
                    <Column
                        field="address"
                        header="Adresse"
                        sortable
                        style={{
                            textAlign: "start",
                            paddingBlock: "12px",
                            paddingInline: "16px",
                        }}
                        bodyClassName="px-4 py-3 text-gray-700 dark:text-gray-300"
                        headerClassName="px-4 py-3 text-gray-700 dark:text-gray-300"
                    />
                    <Column
                        field="region"
                        header="Région"
                        sortable
                        bodyClassName="px-4 py-3 text-gray-700 dark:text-gray-300"
                        headerClassName="px-4 py-3 text-gray-700 dark:text-gray-300"
                    />
                    <Column
                        field="city"
                        header="Ville"
                        sortable
                        bodyClassName="px-4 py-3 text-gray-700 dark:text-gray-300"
                        headerClassName="px-4 py-3 text-gray-700 dark:text-gray-300"
                    />
                    <Column
                        header="Action"
                        body={actionBodyTemplate}
                        exportable={false}
                        bodyClassName="px-4 py-3"
                        headerClassName="px-4 py-3 text-gray-700 dark:text-gray-300"
                    />
                </DataTable>
            </div>
        </div>
    );
}
