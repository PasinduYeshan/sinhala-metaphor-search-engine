import { EHandler, Handler } from "../../utils/types";
import { inspectBuilder, body, param } from "../../utils/inspect";
import client from "../../utils/elasticsearch";

const keywords = require("../../data/keywords.json");
const named_entities = require("../../data/named_entities.json");

/**
 * :: STEP 2
 * Search song
 */
const searchSong: Handler = async (req: any, res: any) => {
  const { r } = res;
  let query = req.body.queryData.query;
  const fieldFilter = req.body.queryData.fieldFilter;
  const phraseSearch = req.body.queryData.phraseSearch;
  console.log(phraseSearch);

  let query_words = query.trim().split(" ");
  let removing_query_words: any = []; // Check if elastic search remove the stop words

  let size = 100;

  let field_type = "";

  let b_singer = 1;
  let b_unformatted_lyrics = 1;
  let b_title = 1;
  let b_lyricist = 1;

  if (query_words.length > 8) {
    b_unformatted_lyrics = b_unformatted_lyrics + 2;
    field_type = "best_fields";
  } else {
    field_type = "cross_fields";
    query_words.forEach((word: string) => {
      word = word.replace("ගේ", ""); // Remove the suffix
      word = word.replace("යන්ගේ", "");
      if (named_entities.artist_names.includes(word)) {
        b_singer = b_singer + 1;
      }
      if (named_entities.writer_names.includes(word)) {
        b_lyricist = b_lyricist + 1;
      }
      if (keywords.artist.includes(word)) {
        b_singer = b_singer + 1;
        removing_query_words.push(word);
      }
      if (keywords.write.includes(word)) {
        b_lyricist = b_lyricist + 1;
        removing_query_words.push(word);
      }
      if (keywords.song.includes(word)) {
        removing_query_words.push(word);
      }
    });
  }
  removing_query_words.forEach((word: string) => {
    query = query.replace(word, "");
  });

  /**
   * Choose fields to search
   */
  let fFields = [];
  if (!fieldFilter || fieldFilter.length == 0) {
    fFields = [
      `Singer Sinhala^${b_singer}`,
      `Lyricist Sinhala^${b_lyricist}`,
      `Title Sinhala^${b_title}`,
      `Lyrics^${b_unformatted_lyrics}`,
      `Source Domain`,
      `Target Domain`,
      "Singer English",
      "Lyricist English",
      "Composer Sinhala",
      "Composer English",
      "Lyrics",
      "Metaphor",
      "Source Domain",
      "Target Domain",
      "Interpretation",
    ];
  } else {
    fFields = fieldFilter;
  }

  /**
   * Choose operator
   */
  let ope = "or";
  if (phraseSearch) {
    ope = "and";
  }

  const body = await client.search({
    index: "songs",
    body: {
      size: size,
      _source: {
        includes: [
          "Target Domain",
          "Source Domain",
          "Title Sinahala",
          "Title English",
          "Singer Sinhala",
          "Singer English",
          "Lyricist Sinhala",
          "Lyricist English",
          "Composer Sinhala",
          "Composer English",
          "Lyrics",
          "Metaphor",
          "Source Domain",
          "Target Domain",
          "Interpretation",
        ],
      },
      query: {
        multi_match: {
          query: query.trim(),
          fields: fFields,
          operator: ope,
          type: field_type,
        },
      },
      aggs: {
        singer_agg: {
          terms: {
            field: "Singer Sinhala.keyword",
          },
        },
        lyricist_agg: {
          terms: {
            field: "Lyricist Sinhala.keyword",
          },
        },
        composer_agg: {
          terms: {
            field: "Composer Sinhala.keyword",
          },
        },
      },
    },
  });

  if (body) {
    r.status
      .OK()
      .message("Success")
      .data({
        hits: body.hits?.hits,
        aggregations: body.aggregations,
      })
      .send();
    return;
  }

  r.pb.ISE();
};

/**
 * Request Handler Chain
 */
export default [<EHandler>searchSong];
