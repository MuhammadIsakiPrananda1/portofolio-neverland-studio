import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://portfolio.neverlandstudio.my.id';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.webp`;

interface SEOProps {
    title: string;
    description?: string;
    /** OG image URL (absolute). Defaults to site-wide og-image.webp */
    image?: string;
    /** OG type. Defaults to "website" */
    type?: string;
    /** Explicit canonical URL. Defaults to current pathname */
    canonical?: string;
    /** Additional keywords (comma-separated) */
    keywords?: string;
    /** Set to true for pages that should not be indexed */
    noIndex?: boolean;
}

function setMeta(selector: string, content: string, attr: 'name' | 'property' = 'name') {
    let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${selector}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, selector);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
    let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
    }
    el.href = href;
}

export default function SEO({
    title,
    description = 'Neverland Studio - Solusi cyber security & IT infrastructure kelas enterprise. Penetration testing, security audit, network security, cloud security, dan IT consulting.',
    image = DEFAULT_IMAGE,
    type = 'website',
    canonical,
    keywords,
    noIndex = false,
}: SEOProps) {
    const location = useLocation();
    const fullTitle = title.includes('Neverland') ? title : `${title} | Neverland Studio`;
    const canonicalUrl = canonical ?? `${SITE_URL}${location.pathname}`;

    useEffect(() => {
        // Title
        document.title = fullTitle;

        // Primary
        setMeta('description', description);
        if (keywords) setMeta('keywords', keywords);
        setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
        setLink('canonical', canonicalUrl);

        // Open Graph
        setMeta('og:title', fullTitle, 'property');
        setMeta('og:description', description, 'property');
        setMeta('og:url', canonicalUrl, 'property');
        setMeta('og:type', type, 'property');
        setMeta('og:image', image, 'property');
        setMeta('og:site_name', 'Neverland Studio', 'property');

        // Twitter
        setMeta('twitter:title', fullTitle, 'name');
        setMeta('twitter:description', description, 'name');
        setMeta('twitter:image', image, 'name');
        setMeta('twitter:card', 'summary_large_image', 'name');

        // GA page view (if loaded)
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'page_view', {
                page_path: location.pathname,
                page_title: fullTitle,
            });
        }
    }, [fullTitle, description, image, type, canonicalUrl, keywords, noIndex, location.pathname]);

    return null;
}
