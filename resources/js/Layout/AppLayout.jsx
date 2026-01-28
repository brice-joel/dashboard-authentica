import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const LayoutContent = ({ children }) => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();
    const { flash } = usePage().props;
    const { errors } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
        // Vous pouvez ajouter d'autres types de messages si nécessaire
    }, [flash]); // S'exécute à chaque changement de `flash` console.log(usePage().props);

    useEffect(() => {
        // Check if the errors object is not empty
        if (Object.keys(errors).length > 0) {
            console.log("Validation errors found:");
            // Boucle sur les clés de l'objet errors pour accéder à chaque message
            for (const key in errors) {
                // Affiche la clé (le nom du champ) et la valeur (le message d'erreur)
                //console.log(`${key}: ${errors[key]}`);
                toast.error(errors[key]);
                break;
            }
        }
    }, [errors]);

    return (
        <div className="min-h-screen xl:flex">
            <div>
                <AppSidebar />
                <Backdrop />
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out rounded-xl border  border-gray-200 bg-white text-gray-900 dark:text-gray-200 dark:border-gray-800   dark:bg-gray-900 ${
                    isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
                } ${isMobileOpen ? "ml-0" : ""}`}
            >
                <AppHeader />
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 ">
                    {children}
                </div>
            </div>
        </div>
    );
};

const AppLayout = ({ children }) => {
    return (
        <SidebarProvider>
            <LayoutContent>{children}</LayoutContent>
        </SidebarProvider>
    );
};

export default AppLayout;
