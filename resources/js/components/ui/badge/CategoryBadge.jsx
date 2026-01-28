export default function CategoryBadge({ category_name, className = "" }) {
    return (
        <span
            className={`px-2 py-1 bg-blue-100 text-lowercase text-blue-800 text-sm rounded-full ${className}`}
        >
            {category_name}
        </span>
    );
}
