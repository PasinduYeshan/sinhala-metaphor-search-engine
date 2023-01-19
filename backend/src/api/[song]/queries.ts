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
  const mustInclude = req.body.queryData.mustInclude;

  let query_words = query.trim().split(" ");
  let rm_query_key_words: any = [];

  let size = 100;

  let field_type = "";

  let b_singer = 1;
  let b_unformatted_lyrics = 1;
  let b_title = 1;
  let b_lyricist = 1;

  field_type = "best_fields";

  // Change the field type if user want to search query as an phrase
  if (phraseSearch) {
    field_type = "phrase";
  }

  // Change operator to "and" if user selects must include all the words
  let ope = "or";
  if (mustInclude) {
    ope = "and";
  }

  /**
   * Remove the suffix from the query
   * Check if the query contains any lyricist or singer name and boost the relevant fields accordingly
   */
  query_words.forEach((word: string) => {
    // Remove the suffix
    word = word.replace("ගේ", ""); 
    word = word.replace("යන්ගේ", "");
    word = word.replace("න්ගේ", "");
    word = word.replace("යන්", "");

    if (named_entities.singer_names.includes(word)) {
      b_singer = b_singer + 1;
    }
    if (named_entities.lyricist_names.includes(word)) {
      b_lyricist = b_lyricist + 1;
    }

    // Check for keywords
    if (keywords.singer.includes(word)) {
      b_singer = b_singer + 2;
      rm_query_key_words.push(word);
    }
    if (keywords.lyricist.includes(word)) {
      b_lyricist = b_lyricist + 2;
      rm_query_key_words.push(word);
    }
    if (keywords.song.includes(word)) {
      rm_query_key_words.push(word);
    }

  });


  rm_query_key_words.forEach((word: string) => {
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
      `Lyrics`,
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

  

  const body = await client.search({
    index: "songs",
    body: {
      size: size,
      _source: {
        includes: [
          "Target Domain",
          "Source Domain",
          "Title Sinhala",
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
