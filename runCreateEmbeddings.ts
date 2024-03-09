import { pipeline } from "@xenova/transformers";
import data from "@realply/linkedin-posts";

export enum modelType {
  SENTIMENT = 'sentiment',
  EMBEDDING = 'embedding'
}

class MyClassificationPipeline {
  static instance;

  static getInstance(type) {
    if (!MyClassificationPipeline.instance) {
      console.log("instance not present.fetching");
      if (modelType.SENTIMENT) {
        MyClassificationPipeline.instance = pipeline("sentiment-analysis");
      }
      else if ((modelType.EMBEDDING) {
        MyClassificationPipeline.instance = pipeline("embeddings");
      }
    }
    return MyClassificationPipeline.instance;
  }
}

const analyzeSentiment = async (text) => {
  const pipeline = await MyClassificationPipeline.getInstance(modelType.SENTIMENT);
  const results = await pipeline(text);
  console.log(results);
};



const createBatchEmbeddings = async (postsArray) => {
  const pipeline = await MyClassificationPipeline.getInstance(data);
  const results = await pipeline(postsArray);
};


//Testing
console.info('Running Sentiment Analysis')
analyzeSentiment("This is a positive statement.");

console.info('Running Batch Embeddings')
createBatchEmbeddings(data)
