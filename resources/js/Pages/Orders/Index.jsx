import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import OrdersTable from "../../components/tables/OrdersTable";
import { Link, router } from "@inertiajs/react";
import { PlusIcon } from "../../assets/images/icons";
import { useRouteContext } from "../../context/RouteContext";
const Index = ({ orders }) => {
    const route = useRouteContext();
    console.log(orders);

    return (
        <>
            <PageBreadcrumb pageTitle="Commandes" />

            <ComponentCard title="Gestion des commandes">
                <section className="flex justify-start">
                    <Link
                        href="#"
                        className="flex items-center space-x-2 p-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
                    >
                        <PlusIcon className="text-white" />
                        Ajouter une commande
                    </Link>
                </section>
                <OrdersTable orders={orders} />
            </ComponentCard>
        </>
    );
};

export default Index;
