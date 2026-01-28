import { usePage } from "@inertiajs/react";

export default function useAuth() {
    const { auth } = usePage().props;

    return { auth };
}
