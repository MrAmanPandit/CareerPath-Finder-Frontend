import React, { useEffect } from 'react';

const SEO = ({ title, description, keywords, canonical }) => {
    useEffect(() => {
        // Update Title
        if (title) {
            document.title = `${title} | CareerPath Finder`;
        }

        // Update Meta Description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            if (description) metaDescription.setAttribute('content', description);
        } else {
            metaDescription = document.createElement('meta');
            metaDescription.name = "description";
            if (description) metaDescription.content = description;
            document.getElementsByTagName('head')[0].appendChild(metaDescription);
        }

        // Update Meta Title (for Search engines)
        let metaTitle = document.querySelector('meta[name="title"]');
        if (metaTitle) {
            if (title) metaTitle.setAttribute('content', `${title} | CareerPath Finder`);
        }

        // Update Open Graph tags
        const updateOG = (property, content) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (tag && content) tag.setAttribute('content', content);
        };

        updateOG('og:title', title);
        updateOG('og:description', description);
        updateOG('og:url', window.location.href);

        // Update Canonical
        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (linkCanonical) {
            linkCanonical.setAttribute('href', canonical || window.location.href);
        }

    }, [title, description, keywords, canonical]);

    return null;
};

export default SEO;
