import { pipeline } from "@xenova/transformers";

const getTransformersPipeline = async () => {
  const transformers = await import("@xenova/transformers");
  return transformers.pipeline; // Return the pipeline function
};

// export enum modelType {
//   SENTIMENT = "sentiment",
//   EMBEDDING = "embedding",
// }

class MyClassificationPipeline {
  static instance;

  static getInstance(type) {
    if (!MyClassificationPipeline.instance) {
      console.log("instance not present.fetching");
      if (type === "sentiment") {
        MyClassificationPipeline.instance = pipeline("sentiment-analysis");
      } else if (type === "embedding") {
        MyClassificationPipeline.instance = pipeline("embeddings");
      }
    }
    return MyClassificationPipeline.instance;
  }
}

export const analyzeSentiment = async (text) => {
  // const pipeline = await getTransformersPipeline();
  const pipelineInstance =
    await MyClassificationPipeline.getInstance("sentiment");
  const results = await pipelineInstance(text);
  console.log(results);
  return results;
};

export const createBatchEmbeddings = async (postsArray) => {
  // const pipeline = await getTransformersPipeline();
  const pipeline = await MyClassificationPipeline.getInstance("embedding");
  const results = await pipeline(postsArray);
  return results;
};

/*Testing
console.info("Running Sentiment Analysis");
//analyzeSentiment("This is a positive statement.");

console.info("Running Batch Embeddings");
//createBatchEmbeddings(fakeData);
*/
