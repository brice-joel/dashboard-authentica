import { createContext, useContext } from "react";
import { useRoute } from "../../../vendor/tightenco/ziggy/src/js";
const RouteContext = createContext(null);

export const RouteProvider = ({ children }) => {
    const route = useRoute();
    return <RouteContext.Provider value={route} children={children} />;
};

export const useRouteContext = () => {
    return useContext(RouteContext);
};
