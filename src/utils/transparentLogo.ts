export const GOURMETIZE_LOGO_URL = "https://res.cloudinary.com/epo1w9hl/image/upload/v1784757041/Gourmetize__6_-removebg-preview_lih1ac.png";

/**
 * Returns the exact logo URL without canvas image modification.
 */
export function getTransparentLogo(src: string = GOURMETIZE_LOGO_URL): Promise<string> {
  return Promise.resolve(src);
}

