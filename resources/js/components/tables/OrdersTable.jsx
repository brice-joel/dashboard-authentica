import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

import { dateTimeFormatter } from "../../utils/utils";
import _Image from "../ui/images/Image";
import { CheckLineIcon, EyeIcon } from "../../assets/images/icons";
import OrderStatusBadge from "../ui/badge/OrderStatusBadge";
import PaymentStatusBadge from "../ui/badge/PaymentStatusBadge";
import { useState } from "react";
import { Modal } from "../../components/ui/modal";

import ComponentCard from "../../components/common/ComponentCard";
import { router } from "@inertiajs/react";
import { useRouteContext } from "../../context/RouteContext";
import { formatPrice } from "../../utils/utils";

import Swal from "sweetalert2";
import TruncatedText from "../ui/text/TruncatedText";
export default function OrdersTables({ orders }) {
    const route = useRouteContext();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedOrder(null);
    };

    const handleValidateDelivery = async (id) => {
        // Étape 1 : Demande de confirmation
        const result = await Swal.fire({
            title: "Confirmer la validation de retrait de cette commande par le client",
            text: "Cette action est irréversible. ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Oui, valider!",
            cancelButtonText: "Annuler",
        });

        if (result.isConfirmed) {
            router.put(
                route("order.update", { id: id, type: "validate-delivery" }),
                {
                    onSuccess: () => {
                        // Étape 4a : Cache le spinner et affiche le message de succès
                        Swal.hideLoading();
                        Swal.fire({
                            title: "Retrait effectué!",
                            text: "La commande a été retiré .",
                            icon: "success",
                        });
                        Swal.close();
                    },
                    onError: (errors) => {
                        // Étape 4b : Cache le spinner et affiche le message d'erreur
                        Swal.hideLoading();
                        Swal.fire({
                            title: "Erreur!",
                            text: "Une erreur est survenue lors de la confirmation de retrait.",
                            icon: "error",
                        });
                        Swal.close();
                        console.log(errors);
                    },
                }
            );
        }
    };

    const OrderModal = ({ order }) => {
        if (!order) return null; // S'assure de ne pas rendre la modal sans données
        return (
            <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <OrderInvoice order={order} />
            </Modal>
        );
    };

    const OrderInvoice = ({ order }) => {
        // Vos calculs de prix basés sur les données de la commande
        const subtotal = order.products.reduce(
            (acc, product) =>
                acc +
                product.pivot.quantity_purchased *
                    product.pivot.price_purchased,
            0
        );
        console.log(order.products);

        const remise = 0;
        const grandTotal = subtotal - (subtotal * remise) / 100;

        return (
            <div className=" rounded-lg shadow-xl p-6 md:p-10 max-w-4xl mx-auto my-10 font-sans dark:bg-gray-800 dark:text-gray-100">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-gray-200">
                    <div>
                        <h1 className="text-3xl  font-bold text-gray-800 dark:text-gray-100">
                            Détails de la Commande
                        </h1>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-100">
                            <span className="font-semibold">Référence :</span>{" "}
                            {order.order_ref}
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-100">
                            {dateTimeFormatter(order.created_at)}
                        </p>
                        <div
                            className={`mt-2 inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                                order.orderStatus === "En cours de préparation"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                            }`}
                        >
                            <OrderStatusBadge status={order.order_status} />
                        </div>
                    </div>
                </header>
                {/* ... (le reste du JSX de la facture) ... */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
                            Client
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-100">
                            <span className="font-medium">
                                {order.client_name}
                            </span>
                            <br />
                            <span className="text-gray-500 dark:text-gray-100">
                                {order.client_email}
                            </span>
                            <br />
                            <span className="text-gray-500 dark:text-gray-100">
                                {order.client_phone}
                            </span>
                        </p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
                            Récapitulatif & Statuts
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-100">
                            <span className="font-medium">
                                Point de retrait :
                            </span>{" "}
                            <span className="font-bold">
                                {order.pickup_address}
                            </span>
                        </p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-100">
                            <span className="font-medium">Opérateur :</span>
                            <span className="font-bold">
                                {order.payments[0].payment_operator}
                            </span>
                        </p>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-100">
                            <span className="font-medium">
                                Méthode de paiement :
                            </span>
                            <span className="font-bold">
                                {order.payments[0].payment_method}
                            </span>
                        </p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-100">
                            <span className="font-medium">
                                Statut du paiement :
                            </span>
                            <span
                                className={`ml-2 font-semibold ${
                                    order.payments[0].payment_status === "PAID"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                <PaymentStatusBadge
                                    status={order.payments[0].payment_status}
                                />
                            </span>
                        </p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-100">
                            <span className="font-medium">Montant total :</span>
                            <span className="ml-2 font-bold text-lg text-green-700">
                                {formatPrice(order.order_amount)}
                            </span>
                        </p>
                    </div>
                </section>

                <section className="mt-10">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 dark:text-gray-100">
                        Détails des produits
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg dark:border-gray-700 dark:bg-gray-800">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Produit
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantité
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Prix unitaire
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Prix total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {order.products.map((product, index) => (
                                    <tr key={index}>
                                        <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-100">
                                            {product.pivot.name_purchased}
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-100">
                                            {product.pivot.quantity_purchased}
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-100">
                                            {formatPrice(
                                                product.pivot.price_purchased
                                            )}
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-100">
                                            {formatPrice(
                                                product.pivot
                                                    .quantity_purchased *
                                                    product.pivot
                                                        .price_purchased
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mt-8 flex justify-end">
                    <div className="w-full md:w-1/2">
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-100">
                                Sous-total
                            </span>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                {formatPrice(subtotal)}
                            </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-100">
                                Remise
                            </span>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                {remise}%
                            </span>
                        </div>

                        <div className="flex justify-between uppercase py-2 mt-4 text-lg font-bold text-red-700 ">
                            <span>Total de la commande</span>
                            <span> {formatPrice(order.order_amount)}</span>
                        </div>
                    </div>
                </section>
            </div>
        );
    };

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
                                N°
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Code commande
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Client
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Statut
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Prix Total
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Commandé le.
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Point de retrait.
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 "
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {orders.map((order, index) => (
                            <TableRow key={order.id}>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {index}
                                </TableCell>
                                <TableCell className="px-5 py-4 sm:px-6 text-start">
                                    <TruncatedText
                                        text={order.order_ref}
                                        position="end"
                                        maxLength={5}
                                    />
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 overflow-hidden rounded-full">
                                            <_Image
                                                src="/images/user/user-17.jpg"
                                                alt={order.name}
                                                className="w-[40px] h-[40px]"
                                            />
                                        </div>
                                        <div>
                                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {order.client_name}
                                            </span>
                                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                {order.client_email}
                                            </span>
                                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                {order.client_phone}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    <OrderStatusBadge
                                        status={order.order_status}
                                    />
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {formatPrice(order.order_amount)}
                                    {/* A corriger pour une meilleure gestion si plusieurs paiements */}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    {dateTimeFormatter(order.created_at)}
                                </TableCell>{" "}
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {order.pickup_address}, {order.pickup_city}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex gap-2">
                                    {order.order_status === "PENDING" && (
                                        <button
                                            className="flex items-center space-x-2 p-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
                                            onClick={() =>
                                                handleValidateDelivery(order.id)
                                            }
                                        >
                                            <CheckLineIcon className="h-5 w-5 " />
                                        </button>
                                    )}

                                    <button
                                        className="flex items-center space-x-2 p-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                                        onClick={() => handleOpenModal(order)}
                                    >
                                        <EyeIcon className="h-5 w-5 " />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <OrderModal order={selectedOrder} />
        </div>
    );
}
