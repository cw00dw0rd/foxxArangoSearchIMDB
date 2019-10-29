'use strict';
const db = require('@arangodb').db;
const collectionName = 'imdb_vertices';
const viewName = 'imdbView';

if (!db._collection(collectionName)) {
  db._createDocumentCollection(collectionName);
}

if (!db._view(viewName)) {
  db._createView(viewName, 'arangosearch', {
  "links": {
    "imdb_vertices": {
      "analyzers": [
        "identity"
      ],
      "fields": {
        "description": {
          "analyzers": [
            "text_en"
          ]
        },
        "genre": {
          "analyzers": [
            "text_en"
          ]
        },
        "label": {
          "analyzers": [
            "text_en"
          ]
        },
        "title": {
          "analyzers": [
            "text_en"
          ]
        },
        "type": {
          "analyzers": [
            "text_en"
          ]
        }
      },
      "includeAllFields": true,
      "storeValues": "none",
      "trackListPositions": false
    }
  }
})
}
