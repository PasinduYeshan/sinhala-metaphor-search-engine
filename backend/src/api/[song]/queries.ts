import { EHandler, Handler } from "../../utils/types";
import { inspectBuilder, body, param } from "../../utils/inspect";
import client from "../../utils/elasticsearch";

const keywords = require("../../data/keywords.json");
const named_entities = require("../../data/named_entities.json");
/**
 * :: STEP 1
 * Validate Request
 */
// const inspector = inspectBuilder(
//     body("firstName").optional().isString().withMessage("firstName is required"),
//     body("lastName").optional().isString().withMessage("lastName is is required"),
//     body("email").optional().isEmail().withMessage("email is required"),
//     body("telephone").optional().isMobilePhone("any").withMessage("telephone is required"),
//     param("userId").optional().isUUID().withMessage("invalid user id")
// )

/**
 * :: STEP 2
 * Search song
 */

/**
 *
 * query : {
 * "query": "",
 * "filterField" : "Singer Sinhala"
 * }
 */
const searchSong: Handler = async (req: any, res: any) => {
  const { r } = res;
  console.log(req.body.queryData);
  let query = req.body.queryData.query;
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
          fields: [
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
          ],
          operator: "or",
          type: field_type,
        },
      },
      aggs: {
        singer_filter: {
          terms: {
            field: "Singer Sinhala.keyword",
            size: 10,
          },
        },
        lyricist_filter: {
          terms: {
            field: "Lyricist Sinhala.keyword",
            size: 10,
          },
        },
        composer_filter: {
          terms: {
            field: "Composer Sinhala.keyword",
            size: 10,
          },
        },
      },
    },
  });

  if (body) {
    console.log("body", body);
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
