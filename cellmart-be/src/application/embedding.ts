import { Request, Response, NextFunction } from "express";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import mongoose from "mongoose";
import Phone from "../infastructure/schemas/Phone";

export const createEmbeddings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const embeddingsModel = new OpenAIEmbeddings({
      model: "text-embedding-3-large",
      apiKey: process.env.OPENAI_API_KEY,
    });

    const vectorIndex = new MongoDBAtlasVectorSearch(embeddingsModel, {
      collection: mongoose.connection.collection("DeviceVectors"),
      indexName: "vector_index",
    });

    const phones = await Phone.find({});

    const docs = phones.map((phones) => {
      const { _id, brand, model, price, pointdesc, description, storage, colors, warranty} = phones;
      const doc = new Document({
        pageContent: `${model} is one of the best phones from ${brand}, priced at  ${price.toLocaleString('en-LK')} LKR. Its main features include ${description}. If we highlight some of the key points again, they are: ${pointdesc}. This device comes in colors like ${colors} and is available in storage options of ${storage}. It also includes a warranty of ${warranty}.`,
        metadata: {
          _id,
        },
      });
      return doc;
    });

    await vectorIndex.addDocuments(docs);

    res.status(200).json({
      message: "Embeddings created successfully",
    });
  } catch (error) {
    next(error);
  }
};