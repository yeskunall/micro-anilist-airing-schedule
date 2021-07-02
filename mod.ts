// Another possibility is to use ...
// /// <reference lib="webworker" />
// ... but the types don’t play well with Deno.
// [This](https://github.com/denoland/deployctl/issues/24#issuecomment-819272065) sort
// of works.
// Also see: https://github.com/microsoft/TypeScript/issues/11781
/// <reference path="./deploy.d.ts" />

const ENDPOINT = "https://graphql.anilist.co";
const query = `
  query($id: Int!) {
    Media(id: $id, type: ANIME) {
      title {
        english
        userPreferred
        romaji
        native
      }
      nextAiringEpisode {
        episode
        airingAt
        timeUntilAiring
      }
    }
  }
`;

async function handleRequest(request: Request) {
  const { url } = request;
  const params = new URL(url).searchParams;

  const id = parseInt(params.get("id")!, 10);
  const variables = { id };

  const response = await fetch(ENDPOINT, {
    body: JSON.stringify({
      query,
      variables,
    }),
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    method: "POST",
  });

  const { data, errors } = await response.json();
  if (response.ok) {
    return new Response(
      JSON.stringify({ data }),
      {
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      },
    );
  }

  return new Response(
    // Return the first error
    JSON.stringify({ error: errors[0].message }),
    {
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      status: 500,
    },
  );
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});
