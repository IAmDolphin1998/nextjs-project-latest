import { liteClient as algoliasearch } from 'algoliasearch/lite';

let searchClient: any;

if (
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID &&
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPI_KEY
) {
  searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPI_KEY,
  );
} else {
  console.error(
    'NEXT_PUBLIC_ALGOLIA_APP_ID or NEXT_PUBLIC_ALGOLIA_SEARCHAPI_KEY is not set.',
  );
  searchClient = null;
}
export { searchClient };

export function getAbsoluteMediaUrl(relativeUrl: string) {
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${relativeUrl}`;
}
