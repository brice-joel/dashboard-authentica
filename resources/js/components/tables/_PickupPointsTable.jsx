import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import _Image from "../ui/images/Image";
import { PencilIcon, TrashBinIcon } from "../../assets/images/icons";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

// Define the table data using the interface
export default function PickupPoints({
    pickup_points,
    handleDelete,
    handleOpenModal,
}) {
    const [_pickup_points, setPickupPoints] = useState(pickup_points);
    const [globalFilter, setGlobalFilter] = useState("");
    const filtered_pickup_points = _pickup_points.filter(
        (pickup_point) =>
            pickup_point.region
                .toLowerCase()
                .includes(globalFilter.toLowerCase()) ||
            pickup_point.city
                .toLowerCase()
                .includes(globalFilter.toLowerCase()) ||
            pickup_point.address
                .toLowerCase()
                .includes(globalFilter.toLowerCase())
    );
    console.log(filtered_pickup_points);

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    {/* Table Header */}
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Id
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Addresse
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Region
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Ville
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {pickup_points.map((pickup_point, index) => (
                            <TableRow key={pickup_point.id}>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {index}
                                </TableCell>
                                <TableCell className="px-5 py-4 sm:px-6 text-start">
                                    {pickup_point.address}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {pickup_point.region}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {pickup_point.city}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <div className="flex space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                        <button
                                            className="flex items-center space-x-2 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                            onClick={() =>
                                                handleOpenModal(pickup_point)
                                            }
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                            <span>Modifier</span>
                                        </button>
                                        <button
                                            className="flex items-center space-x-2 p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                                            onClick={() =>
                                                handleDelete(pickup_point)
                                            }
                                        >
                                            <TrashBinIcon className="h-5 w-5" />
                                            <span>Supprimer</span>
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
