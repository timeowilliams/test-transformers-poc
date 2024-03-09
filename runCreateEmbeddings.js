import { pipeline } from "@xenova/transformers";
import { v4 as uuidv4 } from "uuid";

const sliceIntoChunks = (arr, chunkSize) => {
  console.log("slicing into chunks");
  return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, i) =>
    arr.slice(i * chunkSize, (i + 1) * chunkSize),
  );
};

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

export const createEmbedding = async (text) => {
  // const pipeline = await getTransformersPipeline();
  const pipeline = await MyClassificationPipeline.getInstance("embedding");
  const result = await pipeline(text);
  // Embed a single string

  return {
    id: uuidv4(),
    metadata: {
      text,
    },
    values: Array.from(result.data),
  };
};

export const createBatchEmbeddings = async (posts, batchSize, onDoneBatch) => {
  console.info("Started batchEmbeddings");
  // Batch an array of string and embed each batch
  // Call onDoneBatch with the embeddings of each batch

  const batches = sliceIntoChunks(posts, batchSize);
  let results;
  for (const batch of batches) {
    const embeddings = await Promise.all(
      batch.map((post) => createEmbedding(post.content)),
    );
    console.log("embeddings are ", embeddings);
    results = await onDoneBatch(embeddings);
    console.log("results ", results);
  }
  return results;
};

/*Testing
console.info("Running Sentiment Analysis");
//analyzeSentiment("This is a positive statement.");

console.info("Running Batch Embeddings");
//createBatchEmbeddings(fakeData);
*/
