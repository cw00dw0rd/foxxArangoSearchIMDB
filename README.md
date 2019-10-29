# foxxArangoSearchIMDB
Very small Foxx microservice built for searching the imdb dataset using ArangoSearch.

## To use with your ArangoDB instance
- Zip entire project
- Install via Services tab in the ArangoDB WebUI
- Assumes imdb dataset loaded
  - Sets up empty imdb_vertices collection (if non-existent)
  - Creates view, named imdbView, with necessary links
