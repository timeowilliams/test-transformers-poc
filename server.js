import express from "express";
import bodyParser from "body-parser";
import fakePosts from "@realply/linkedin-posts";
import {
  createBatchEmbeddings,
  analyzeSentiment,
} from "./runCreateEmbeddings.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/analyze-sentiment", async (req, res) => {
  console.info("sentiment analysis invoked");
  try {
    const text = req.body.text || "hello world";
    if (!text) {
      return res.status(400).send({ error: "No text provided for analysis." });
    }

    const result = await analyzeSentiment(text);
    res.send({ sentiment: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error processing sentiment analysis." });
  }
});

app.post("/create-batch-embeddings", async (req, res) => {
  console.log("fakePosts length", fakePosts.length);
  try {
    const postsArray = req.body.postsArray || fakePosts;
    if (!postsArray || !Array.isArray(postsArray)) {
      return res
        .status(400)
        .send({ error: "No valid array of posts provided for embeddings." });
    }

    const results = await createBatchEmbeddings(postsArray);
    res.send({ embeddings: results });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error processing batch embeddings." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
