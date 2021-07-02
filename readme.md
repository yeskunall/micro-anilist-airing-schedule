# deno-deploy-anilist-airing-schedule

> Get the airing schedule of an anime from [Anilist.co](https://anilist.co) as a
> [JSON](#example-response) response

### Deploy

#### From the [`Deno Deploy`](https://deno.com/deploy) console (_hit deploy below!_)

[![Deno Deploy](https://deno.com/deno-deploy-button.svg)](https://dash.deno.com/new?url=https://denopkg.com/yeskunall/deno-deploy-anilist-airing-schedule@master/mod.ts)

### Test locally

```shell
deployctl run --no-check --watch mod.ts
```

### Example response

```json
// Output of `curl http://localhost:8080/?id=120120 | jq`
{
  "data": {
    "Media": {
      "title": {
        "english": "Tokyo Revengers",
        "userPreferred": "Tokyo Revengers",
        "romaji": "Tokyo Revengers",
        "native": "東京リベンジャーズ"
      },
      "nextAiringEpisode": {
        "episode": 13,
        "airingAt": 1625332080,
        "timeUntilAiring": 76512
      }
    }
  }
}
```
