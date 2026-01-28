// resources/js/Pages/Auth/Login.jsx
import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { BoltIcon, GridIcon } from "../../assets/images/icons";

const Login = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [darkMode, setDarkMode] = useState(() => {
        if (
            localStorage.getItem("theme") === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            return true;
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data);

        // C'est ici que vous feriez votre requête de connexion à Laravel
        // Inertia va envoyer une requête POST à la route 'login' (que vous devez définir dans Laravel)
        post(route("auth.dologin"), {
            // Utilisez la fonction route() de Ziggy
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Head title="Connexion" />

            <div className="relative p-8 rounded-lg shadow-xl bg-white dark:bg-gray-800 w-full max-w-md">
                <button
                    onClick={toggleDarkMode}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? (
                        <GridIcon className="h-5 w-5 text-yellow-500" />
                    ) : (
                        <BoltIcon className="h-5 w-5 text-gray-400" />
                    )}
                </button>

                <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
                    Connexion
                </h1>

                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Adresse Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoFocus
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs italic mt-2">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label
                            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs italic mt-2">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="mb-6 flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700 dark:border-gray-600 transition duration-150 ease-in-out"
                            />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                Se souvenir de moi
                            </span>
                        </label>
                        {/* Optionnel: Lien "Mot de passe oublié ?" */}
                        {/* <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Mot de passe oublié ?
                        </a> */}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 w-full"
                            disabled={processing}
                        >
                            {processing
                                ? "Connexion en cours..."
                                : "Se connecter"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
