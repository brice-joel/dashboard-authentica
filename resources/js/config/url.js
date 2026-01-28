//const IMAGES_PATH = "http://127.0.0.1:8000/storage/assets/images";
const IMAGES_PATH = "https://admin.authentica.cm/storage/assets/images";

/**
 * Retourne l'URL de l'image du produit.
 * @param {string} image_path Chemin relatif de l'image du produit
 * @param {string} folder Chemin relatif du dossier contenant l'image
 * @returns {string} L'URL de l'image du produit
 */
export function imagePath(image_path, folder = "") {
    //recuperer depuis le dossier public par le lien symbolique
    return `${IMAGES_PATH}/${folder}/${image_path}`;
}

/**
 * Retourne l'URL d'un fichier et son extention dans une  url.
 * @param {string} url Chemin absolue de du fichier.
 * @returns {string} le nom de du fichier et son extention
 */
export function getFileName(url) {
    // Vérifie si l'URL est une chaîne de caractères valide
    if (typeof url !== "string" || !url) {
        return null;
    }

    // Divise la chaîne par le séparateur '/'
    const parts = url.split("/");

    // Le nom du fichier sera le dernier élément du tableau
    const fileName = parts[parts.length - 1];

    return fileName;
}
