import React from 'react';

/**
 * SecureLink
 * 
 * Production-ready external link component engineered for:
 * 1. Lighthouse Best Practices: strictly enforces `rel="noopener noreferrer"` on `target="_blank"`.
 * 2. Tabnabbing Prevention: eliminates `window.opener` exploits where malicious origins redirect parent windows.
 * 3. Referrer Privacy: prevents leak of internal query parameters or session IDs in the Referer HTTP header.
 */
interface SecureLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isExternal?: boolean;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
}

export default function SecureLink({
  href,
  isExternal,
  target,
  rel,
  className = '',
  children,
  ...restProps
}: SecureLinkProps) {
  // Determine if link is cross-origin
  const isCrossOrigin = isExternal !== undefined 
    ? isExternal 
    : /^https?:\/\//i.test(href);

  // If opening in new tab or external, enforce noopener noreferrer
  const effectiveTarget = target || (isCrossOrigin ? '_blank' : undefined);
  
  let effectiveRel = rel;
  if (effectiveTarget === '_blank' || isCrossOrigin) {
    const existingRels = (rel || '').split(/\s+/).filter(Boolean);
    const required = ['noopener', 'noreferrer'];
    required.forEach((r) => {
      if (!existingRels.includes(r)) existingRels.push(r);
    });
    effectiveRel = existingRels.join(' ');
  }

  return (
    <a
      href={href}
      target={effectiveTarget}
      rel={effectiveRel}
      className={className}
      {...restProps}
    >
      {children}
    </a>
  );
}
