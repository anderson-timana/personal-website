export const WP_GRAPHQL_URL = import.meta.env.WP_GRAPHQL_URL;

/**
 * Utility function to fetch data from WordPress WPGraphQL endpoint.
 * @param query The GraphQL query string
 * @param variables Optional variables for the query
 * @returns The data object from the GraphQL response
 */
export async function wpFetch({ query, variables = {} }: { query: string, variables?: any }) {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    console.error(`Failed to fetch from WPGraphQL: ${res.status} ${res.statusText}`);
    return {};
  }

  const { data, errors } = await res.json();

  if (errors) {
    console.error('WPGraphQL Errors:', errors);
    throw new Error('Failed to fetch WordPress API');
  }

  return data;
}
