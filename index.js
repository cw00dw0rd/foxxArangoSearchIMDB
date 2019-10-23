'use strict';
const { aql, query, db } = require("@arangodb");
const createRouter = require('@arangodb/foxx/router');
const router = createRouter();

const joi = require('joi');
const foxxColl = db._collection('imdb_vertices');

module.context.use(router);

function capitalize(str)  {
  return (str.charAt(0).toUpperCase() + str.slice(1))
}

router.post('/titlesearch', function (req,res) {
  const data = req.body;
  const label = data.label;
  const type = data.type ? capitalize(data.type) : '';
  const genre = data.genre ? capitalize(data.genre) : '';
  const filter1 = label ? aql`FILTER d.label == ${label}` : aql``;
  const filter2 = type ? aql`FILTER d.type == ${type}` : aql``;
  const filter3 = genre ? aql`FILTER d.genre == ${genre}` : aql``;
  const keys = query`
  LET userInput = ${label}
  LET tokens = TOKENS(userInput, 'text_en')
  LET prefixToken = LAST(tokens)
  LET fullTokens = POP(tokens)

  FOR d IN imdbView
  SEARCH ANALYZER(d.title IN fullTokens
  OR STARTS_WITH (d.title, prefixToken), 'text_en')
  ${filter3}
  COLLECT title = d.title, genre = d.genre, description = d.description, studio = d.studio, trailer = d.trailer WITH COUNT INTO freq
  SORT freq DESC
  LIMIT 20
  RETURN {
    title: title,
    genre: genre,
    description: description,
    studio: studio,
    trailer: trailer
  }
  `;
  res.send(keys.toArray());
})
.body(joi.object().required(), 'Search using label("avoid stop words") or genre. ')
.response(joi.object().required(), 'Returns title, description, genre, studio, and trailer')
.summary('Search for movies using keyword title search and genre.')
.description('Searches the imdb_vertices collection for movie titles and can filter with genre. Returns title, description, genre, studio, and trailer ');

function capitalize(str)  {
  return (str.charAt(0).toUpperCase() + str.slice(1))
}
