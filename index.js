const { get, router } = require('microrouter');
const { request: r } = require('graphql-request');
const { send } = require('micro');

const STATUS_CODE = 200;
const URL = 'https://graphql.anilist.co';

const handler = async (request, response) => {
  const { id } = request.params;
  const query = `
    query($id: Int!) {
      Media(id: $id, type: ANIME) {
        title {
          romaji
          english
          native
          userPreferred
        }
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    }
  `;

  const data = await r(URL, query, { id })
    // Anilist sends a weird response to 404's. We're
    // only interested in the `response` key.
    .catch(error => error.response);

  send(response, STATUS_CODE, data);
};

module.exports = router(
  get('/anime/:id', handler),
  get('/', (request, response) => send(response, 200, 'Try /anime/:id')),
);
