'use strict';
const db = require('@arangodb').db;
const collectionName = 'imdb_vertices';

if (!db._collection(collectionName)) {
  db._createDocumentCollection(collectionName);
}
