import { Request, Response, NextFunction } from "express";
import Phone from "../infrastructure/schemas/Phone";
import mongoose from "mongoose";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";

export const retrieve = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.query;
    if (!query || query === "") {
      const devices = (await Phone.find()).map((phone) => ({
        phone: phone,
        confidence: 1,
      }));

      res.status(200).json(devices);
      return;
    }

    const embeddingsModel = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
      apiKey: process.env.OPENAI_API_KEY,
    });

    const vectorIndex = new MongoDBAtlasVectorSearch(embeddingsModel, {
      collection: mongoose.connection.collection("DeviceVectors"),
      indexName: "vector_index",
    });

    const results = await vectorIndex.similaritySearchWithScore(
      query as string
    );

    console.log(results);

    const matcheddevices = await Promise.all(
      results.map(async (result) => {
        const phone = await Phone.findById(result[0].metadata._id);
        return {
          phone: phone,
          confidence: result[1],
        };
      })
    );
    console.log(matcheddevices);
    res.status(200).json(matcheddevices.length > 3 ? matcheddevices.slice(0, 4) : matcheddevices);
    return;
  } catch (error) {
    next(error);
  }
};