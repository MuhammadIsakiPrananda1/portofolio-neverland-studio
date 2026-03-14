import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title: string;
    description?: string;
    name?: string;
    type?: string;
}

export default function SEO({ title, description, name, type }: SEOProps) {
    const location = useLocation();

    useEffect(() => {
        document.title = title;

        // Set meta tags if description is provided
        if (description) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', description);
            } else {
                const meta = document.createElement('meta');
                meta.name = 'description';
                meta.content = description;
                document.head.appendChild(meta);
            }
        }
    }, [title, description, name, type, location.pathname]);

    return null;
}
