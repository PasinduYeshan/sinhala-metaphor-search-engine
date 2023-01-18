import { EHandler, Handler } from "../../utils/types";
import { inspectBuilder, body, param } from "../../utils/inspect";
import client from "../../utils/elasticsearch";

const keywords = require("../../data/keywords.json");
const named_entities = require("../../data/named_entities.json");

/**
 * :: STEP 2
 * Search song
 */
const getMeta: Handler = async (req: any, res: any) => {
    const { r } = res;
    
  const body = await client.search({
    index: "songs",
    body: {
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
export default [<EHandler>getMeta];
