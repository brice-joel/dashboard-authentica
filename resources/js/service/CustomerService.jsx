// Fichier : src/service/CustomerService.js

export const CustomerService = {
    getCustomersMedium() {
        // Simulation d'une requête API avec une promesse.
        // On retourne des données JSON pour l'exemple.
        return Promise.resolve(this.getCustomersData());
    },

    getCustomersData() {
        return [
            {
                id: 1000,
                name: "James Butt",
                country: {
                    name: "Algeria",
                    code: "dz",
                },
                representative: {
                    name: "Ioni Bowcher",
                    image: "ionibowcher.png",
                },
                date: "2015-09-13",
                status: "unqualified",
                verified: true,
            },
            {
                id: 1001,
                name: "Josephine Darakjy",
                country: {
                    name: "Egypt",
                    code: "eg",
                },
                representative: {
                    name: "Amy Elsner",
                    image: "amyelsner.png",
                },
                date: "2019-02-18",
                status: "renewal",
                verified: false,
            },
            {
                id: 1002,
                name: "Art Littel",
                country: {
                    name: "Slovenia",
                    code: "si",
                },
                representative: {
                    name: "Asiya Javayant",
                    image: "asiyajavayant.png",
                },
                date: "2020-05-18",
                status: "unqualified",
                verified: true,
            },
            {
                id: 1003,
                name: "Stephen Shaw",
                country: {
                    name: "Sudan",
                    code: "sd",
                },
                representative: {
                    name: "Bernardo Dominic",
                    image: "bernardodominic.png",
                },
                date: "2010-10-10",
                status: "negotiation",
                verified: false,
            },
            {
                id: 1004,
                name: "Daniele Smith",
                country: {
                    name: "Romania",
                    code: "ro",
                },
                representative: {
                    name: "Asiya Javayant",
                    image: "asiyajavayant.png",
                },
                date: "2012-07-13",
                status: "new",
                verified: false,
            },
            {
                id: 1005,
                name: "Gabriel Sadowski",
                country: {
                    name: "Colombia",
                    code: "co",
                },
                representative: {
                    name: "Elwin Sharvill",
                    image: "elwinsharvill.png",
                },
                date: "2018-09-19",
                status: "qualified",
                verified: true,
            },
            {
                id: 1006,
                name: "Marvin Smith",
                country: {
                    name: "India",
                    code: "in",
                },
                representative: {
                    name: "Ioni Bowcher",
                    image: "ionibowcher.png",
                },
                date: "2017-01-28",
                status: "qualified",
                verified: true,
            },
            {
                id: 1007,
                name: "Alphonso Smith",
                country: {
                    name: "China",
                    code: "cn",
                },
                representative: {
                    name: "Asiya Javayant",
                    image: "asiyajavayant.png",
                },
                date: "2018-12-14",
                status: "qualified",
                verified: true,
            },
            {
                id: 1008,
                name: "Lukas Smith",
                country: {
                    name: "Mexico",
                    code: "mx",
                },
                representative: {
                    name: "Stephen Shaw",
                    image: "stephenshaw.png",
                },
                date: "2019-01-07",
                status: "unqualified",
                verified: false,
            },
            {
                id: 1009,
                name: "Maria Garcia",
                country: {
                    name: "Spain",
                    code: "es",
                },
                representative: {
                    name: "XuXue Feng",
                    image: "xuxuefeng.png",
                },
                date: "2016-10-14",
                status: "negotiation",
                verified: true,
            },
        ];
    },
};
