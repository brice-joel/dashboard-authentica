import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";
import AppLayout from "./Layout/AppLayout";
import { AppWrapper } from "./components/common/PageMeta";
import React from "react";
import { RouteProvider } from "./context/RouteContext";
import Tailwind from "primereact/passthrough/tailwind";
import "sweetalert2/dist/sweetalert2.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-purple/theme.css";

// Importation de react-toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrimeReactProvider } from "primereact/api";

createInertiaApp({
    title: (title) => `${title} - $dashboard authentica`,

    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        let page = pages[`./Pages/${name}.jsx`];

        // --- Logique pour déterminer le Layout dans resolve ---

        // 1. Vérifie si c'est la page de connexion
        const isAuthLogin = name === "Auth/Login";

        // 2. Si c'est la page de connexion, on ne lui assigne AUCUN layout
        if (isAuthLogin) {
            // Pas de layout = le composant App sera rendu directement
            page.default.layout = undefined;
        } else {
            // Pour toutes les autres pages (dashboard, products, etc.), on utilise AppLayout
            // On vérifie d'abord si la page définit déjà son propre layout
            page.default.layout =
                page.default.layout ||
                ((page) => (
                    <AppLayout>
                        <AppWrapper>{page}</AppWrapper>
                    </AppLayout>
                ));
        }

        // --- Fin de la logique de Layout ---

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <React.StrictMode>
                <RouteProvider>
                    <ThemeProvider>
                        <PrimeReactProvider
                            value={{
                                //ripple: true,
                                unstyled: true,
                                pt: Tailwind,
                                theme: "saga-blue",
                            }}
                        >
                            {/* Le composant App ici contiendra la page ET son layout
                                (sauf pour Auth/Login, où il n'y aura que la page) 
                            */}
                            <App {...props} />

                            {/* Le ToastContainer reste à la racine pour être toujours visible */}
                            <ToastContainer
                                position="bottom-right"
                                autoClose={4000}
                                hideProgressBar={true}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="colored"
                            />
                        </PrimeReactProvider>
                    </ThemeProvider>
                </RouteProvider>
            </React.StrictMode>
        );
    },
    progress: {
        showSpinner: true,
        color: "red",
    },
});
