import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_BASE_URL = 'https://modernfisheriese.com';

/**
 * Reusable JSON-LD BreadcrumbList Structured Data Component
 * 
 * Dynamically constructs and injects Google-compliant Schema.org BreadcrumbList microdata
 * into the document head using react-helmet-async.
 * 
 * Automatically ensures the 'Home' root item is established as position 1,
 * followed by the category level and current page level, formatting all URLs
 * into fully-qualified canonical links required for Google SERP sitelinks and hierarchy indexing.
 * 
 * Usage Examples:
 * 
 * 1. Using category & currentPage props:
 *    <BreadcrumbSchema 
 *      category={{ name: 'Biofloc Ecology', url: '/bioflock' }}
 *      currentPage={{ name: 'C:N Ratio Dynamics', url: '/bioflock/cn-ratio' }}
 *    />
 * 
 * 2. Using simple string values:
 *    <BreadcrumbSchema 
 *      category="RAS Engineering"
 *      currentPage="Biofilter Sizing Guide"
 *    />
 * 
 * 3. Using custom items array:
 *    <BreadcrumbSchema 
 *      items={[
 *        { name: 'Research Blueprints', url: '/research' },
 *        { name: 'Nitrification Kinetics', url: '/research/nitrification' }
 *      ]}
 *    />
 * 
 * @param {Object} props
 * @param {Array<{name: string, url: string}>} [props.items] - Custom breadcrumb trail items
 * @param {string|{name: string, url?: string}} [props.category] - Parent category name or object
 * @param {string|{name: string, url?: string}} [props.currentPage] - Current subpage title or object
 * @param {string} [props.baseUrl] - Base canonical domain URL (defaults to 'https://modernfisheriese.com')
 */
export default function BreadcrumbSchema({
  items,
  category,
  currentPage,
  baseUrl = DEFAULT_BASE_URL
}) {
  // Normalize base canonical domain without trailing slash
  const domain = (baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, '');

  // Helper to ensure full, absolute canonical URLs required by Google Schema
  const toAbsoluteUrl = (path = '/') => {
    if (!path) return `${domain}/`;
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${domain}${cleanPath}`;
  };

  const breadcrumbs = useMemo(() => {
    let list = [];

    // Case 1: Custom items array provided
    if (Array.isArray(items) && items.length > 0) {
      list = items
        .filter((item) => item && (item.name || item.title))
        .map((item) => ({
          name: item.name || item.title,
          url: toAbsoluteUrl(item.url || item.item || item.path || '/'),
        }));
    } else {
      // Case 2: Hierarchical category and current page props
      if (category) {
        if (typeof category === 'string') {
          list.push({
            name: category,
            url: toAbsoluteUrl(`/${category.toLowerCase().trim().replace(/[\s_]+/g, '-')}`),
          });
        } else if (typeof category === 'object' && category.name) {
          list.push({
            name: category.name,
            url: toAbsoluteUrl(category.url || `/${category.name.toLowerCase().trim().replace(/[\s_]+/g, '-')}`),
          });
        }
      }

      if (currentPage) {
        if (typeof currentPage === 'string') {
          const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
          list.push({
            name: currentPage,
            url: toAbsoluteUrl(currentPath),
          });
        } else if (typeof currentPage === 'object' && currentPage.name) {
          list.push({
            name: currentPage.name,
            url: toAbsoluteUrl(currentPage.url || (typeof window !== 'undefined' ? window.location.pathname : '/')),
          });
        }
      }
    }

    // Always ensure the 'Home' root is present as the first item (position 1)
    const hasHomeRoot = list.length > 0 && (
      list[0].name.toLowerCase() === 'home' ||
      list[0].url === `${domain}/` ||
      list[0].url === `${domain}`
    );

    if (!hasHomeRoot) {
      list.unshift({
        name: 'Home',
        url: `${domain}/`,
      });
    } else {
      list[0].name = 'Home';
      list[0].url = `${domain}/`;
    }

    return list;
  }, [items, category, currentPage, domain]);

  // If there is only 'Home' root and no sub-level crumbs, omit schema
  if (!breadcrumbs || breadcrumbs.length <= 1) {
    return null;
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.name,
      'item': crumb.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
    </Helmet>
  );
}
