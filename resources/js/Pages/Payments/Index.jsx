import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { Link } from "@inertiajs/react";
import { PlusIcon } from "../../assets/images/icons";
import PaymentsTable from "../../components/tables/PaymentsTable";
const Index = ({ payments }) => {
    return (
        <>
            <PageBreadcrumb pageTitle="Paiements" />

            <PaymentsTable payments={payments} />
        </>
    );
};

export default Index;
