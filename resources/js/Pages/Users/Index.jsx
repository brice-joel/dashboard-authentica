import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import UsersTable from "../../components/tables/UsersTable";
//import DataTable from "datatables.net-react";
//import DT from "datatables.net-dt";
import DT from "datatables.net-bs5";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import { useEffect, useRef, useState } from "react";
import DataTable from "datatables.net-dt";
import Data from "./Data";
DataTable.use(DT);

import { PrimeReactProvider } from "primereact/api";
import PrimeTable from "./PrimeTable";

function MyApp({ Component, pageProps }) {
    return (
        <PrimeReactProvider>
            <Component {...pageProps} />
        </PrimeReactProvider>
    );
}

const Index = ({ users }) => {
    const [tableData, setTableData] = useState([
        [
            "Tiger Nixon",
            "System Architect",
            "Edinburgh",
            61,
            "2011/04/25",
            "$320,800",
        ],
        [
            "Garrett Winters",
            "Accountant",
            "Tokyo",
            63,
            "2011/07/25",
            "$170,750",
        ],
        [
            "Ashton Cox",
            "Junior Technical Author",
            "San Francisco",
            66,
            "2009/01/12",
            "$86,000",
        ],
        [
            "Cedric Kelly",
            "Senior Javascript Developer",
            "Edinburgh",
            22,
            "2012/03/29",
            "$433,060",
        ],
        ["Airi Satou", "Accountant", "Tokyo", 33, "2008/11/28", "$162,700"],
        [
            "Brielle Williamson",
            "Integration Specialist",
            "New York",
            61,
            "2012/12/02",
            "$372,000",
        ],
        [
            "Herrod Chandler",
            "Sales Assistant",
            "San Francisco",
            59,
            "2012/08/06",
            "$137,500",
        ],
        [
            "Rhona Davidson",
            "Integration Specialist",
            "Tokyo",
            55,
            "2010/10/14",
            "$327,900",
        ],
        [
            "Colleen Hurst",
            "Javascript Developer",
            "San Francisco",
            39,
            "2009/09/15",
            "$205,500",
        ],
        [
            "Sonya Frost",
            "Software Engineer",
            "Edinburgh",
            23,
            "2008/12/13",
            "$103,600",
        ],
        [
            "Jena Gaines",
            "Office Manager",
            "London",
            30,
            "2008/12/19",
            "$90,560",
        ],
        [
            "Quinn Flynn",
            "Support Lead",
            "Edinburgh",
            22,
            "2013/03/03",
            "$342,000",
        ],

        // generate 100 more rows
    ]);
    //customise css for datatables

    return (
        <>
            <PageBreadcrumb pageTitle="Utilisateurs" />
            <ComponentCard title="Utilisateurs">
                <UsersTable users={users} />
            </ComponentCard>
        </>
    );
};

export default Index;
