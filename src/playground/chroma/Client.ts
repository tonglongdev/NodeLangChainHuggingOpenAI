import OpenAI from "openai";
import { ChromaClient, EmbeddingFunction } from "chromadb";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const client = new ChromaClient({ path: "http://localhost:8000" });

const embeddingFunction: EmbeddingFunction = {
  async generate(texts: string[]): Promise<number[][]> {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: texts,
    });
    return response.data.map(d => d.embedding);
  },
};

const addData = async () => {
  const collection = await client.getCollection({
    name: "data-test2",
    embeddingFunction,
  });

  const result = await collection.add({
    ids: ["id0"],
    documents: ["This is my entry"],
  });

  console.log(result);
};

addData();
