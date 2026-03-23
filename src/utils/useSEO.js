/**
 * useSEO - A custom React hook for setting page-level SEO meta tags dynamically.
 * Updates document title, meta description, meta keywords, og:title, og:description,
 * and canonical URL per page without any third-party library.
 *
 * @param {Object} options
 * @param {string} options.title - Page title (without brand suffix; brand is added auto)
 * @param {string} options.description - Meta description for this page
 * @param {string} [options.keywords] - Meta keywords for this page
 * @param {string} [options.canonical] - Canonical URL for this page
 * @param {string} [options.ogTitle] - OG title override (defaults to title)
 * @param {string} [options.ogDescription] - OG description override (defaults to description)
 */
const BRAND = 'CareerPath Finder';
const BASE_URL = 'https://www.careerpathsfinder.com';

function setMeta(name, content, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

function useSEO({ title, description, keywords, canonical, ogTitle, ogDescription } = {}) {
  const fullTitle = title ? `${title} | ${BRAND}` : `${BRAND} | Discover Your Perfect Career Path`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  document.title = fullTitle;

  if (description) {
    setMeta('description', description);
    setMeta('og:description', ogDescription || description, true);
    setMeta('twitter:description', ogDescription || description);
  }
  if (keywords) {
    setMeta('keywords', keywords);
  }
  if (title) {
    setMeta('og:title', ogTitle || fullTitle, true);
    setMeta('twitter:title', ogTitle || fullTitle);
  }
  setMeta('og:url', canonicalUrl, true);
  setMeta('twitter:url', canonicalUrl);
  setCanonical(canonicalUrl);
}

export default useSEO;
