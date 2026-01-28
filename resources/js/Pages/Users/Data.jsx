import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

const initialUsers = [
    { id: 1, name: "Alice Dupont", email: "alice.dupont@email.com" },
    { id: 2, name: "Bob Martin", email: "bob.martin@email.com" },
    { id: 3, name: "Carla Rousseau", email: "carla.rousseau@email.com" },
    { id: 4, name: "David Bernard", email: "david.bernard@email.com" },
    { id: 5, name: "Emma Leroy", email: "emma.leroy@email.com" },
    { id: 6, name: "Franck Petit", email: "franck.petit@email.com" },
    { id: 7, name: "Giselle Moreau", email: "giselle.moreau@email.com" },
    { id: 8, name: "Hugo Blanc", email: "hugo.blanc@email.com" },
    { id: 9, name: "Ines Laurent", email: "ines.laurent@email.com" },
    { id: 10, name: "Julien Fabre", email: "julien.fabre@email.com" },
];

export default function Data() {
    const [users, setUsers] = useState(initialUsers);
    const [globalFilter, setGlobalFilter] = useState("");

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
            user.email.toLowerCase().includes(globalFilter.toLowerCase())
    );

    return (
        <div className="card">
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "1rem",
                }}
            >
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Rechercher..."
                    />
                </span>
            </div>
            <DataTable
                value={filteredUsers}
                paginator
                rows={5}
                responsiveLayout="scroll"
                emptyMessage="Aucun utilisateur trouvé."
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} utilisateurs"
            >
                <Column field="id" header="ID" sortable />
                <Column field="name" header="Nom" sortable />
                <Column field="email" header="Email" sortable />
            </DataTable>
        </div>
    );
}
