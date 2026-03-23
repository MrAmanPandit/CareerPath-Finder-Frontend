import React, { useEffect } from 'react';

/**
 * SEOSchema - A component used to securely inject JSON-LD Structured Data
 * directly into the <head> of the document for Google Search crawlers to parse.
 * 
 * @param {Object} schema - The JavaScript object containing the Schema.org definition
 */
const SEOSchema = ({ schema }) => {
  useEffect(() => {
    // Stringify the passed JSON schema object
    const schemaJSON = JSON.stringify(schema);
    
    // Check if we already injected a script tag with this exact schema
    const existingScript = Array.from(document.head.querySelectorAll('script[type="application/ld+json"]'))
      .find(node => node.textContent === schemaJSON);

    if (existingScript) return;

    // Create a new script element to hold the JSON-LD
    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.textContent = schemaJSON;

    // Append to document head
    document.head.appendChild(script);

    // Cleanup when component unmounts (prevents duplicate schemas on SPA navigation)
    return () => {
      document.head.removeChild(script);
    };
  }, [schema]);

  // This component doesn't render anything in the conventional React DOM
  return null;
};

export default SEOSchema;
