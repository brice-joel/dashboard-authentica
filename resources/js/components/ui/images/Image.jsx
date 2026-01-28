import { useState, useEffect } from "react";

// Composant ProductImage (réutilisé pour l'auto-contenance de cet immersif)
/**
 *
 * @param {{ src: string, alt: string, className?: string, defaultSrc?: string }} param0
 * @returns
 */
const _Image = ({
    src,
    alt = "",
    className = "",
    defaultSrc = "https://placehold.co/128x128/E0E0E0/333333?text=Image+non+disponible",
}) => {
    const [imageSrc, setImageSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    // Réinitialise l'état d'erreur et l'image source si la prop 'src' change
    useEffect(() => {
        setImageSrc(src);
        setHasError(false);
    }, [src]);

    // Gère les erreurs de chargement d'image
    const handleError = () => {
        if (!hasError) {
            // Empêche les boucles infinies en cas d'erreur sur le defaultSrc
            setImageSrc(defaultSrc);
            setHasError(true);
        }
    };

    return (
        <img
            src={imageSrc}
            alt={alt}
            className={className}
            onError={handleError}
        />
    );
};

export default _Image;
