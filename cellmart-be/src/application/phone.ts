import { Request, Response, NextFunction } from "express";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { PhoneDTO } from "../domain/dtos/phone";
import Phone from "../infrastructure/schemas/Phone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import mongoose from "mongoose";
import OpenAI from "openai";

export const generateResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { prompt } = req.body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-5-nano",
    messages: [
      // {
      //   role: "system",
      //   content:
      //     "You are assistant of a phone shop called cellmart",
      // },
      { role: "user", content: prompt },
    ],
    store: true,
  });

  res.status(200).json({
    message: {
      role: "assistant",
      content: completion.choices[0].message.content,
    },
  });
  return;
};

export const getAllPhone = async (req : Request, res: Response, next:NextFunction) => {
  try{
    const phones = await Phone.find();
    res.status(200).json(phones);
  } catch(error){
    next(error);
  }
};
  
export const getPhoneById = async (req : Request, res: Response, next:NextFunction) => {
    try{
      const phoneId = req.params.id;
      const phone = await Phone.findById(phoneId);
      if (!phone) {
        throw new NotFoundError("Phone not found");
      }
      res.status(200).json(phone);
      return;
    }catch(error){
      next(error);
    }
};
  
export const deletePhone = async (req : Request, res: Response, next:NextFunction) => {
  try{
    const phoneId = req.params.id;
    await Phone.findByIdAndDelete(phoneId);
  
    res.status(200).send();
    return;
  }catch(error){
    next(error);
  }
};
  
export const createPhone = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const phone = PhoneDTO.safeParse(req.body);

    if (!phone.success) {
      throw new ValidationError(phone.error.message);
    }

    const createdPhone = await Phone.create({
      brand: phone.data.brand,
      model: phone.data.model,
      price: phone.data.price,
      pointdesc: phone.data.pointdesc,
      description: phone.data.description,
      storage: phone.data.storage,
      colors: phone.data.colors,
      warranty: phone.data.warranty,
      image: phone.data.image,
    });

    try {
      await createPhoneEmbedding(createdPhone.toObject());
      console.log("Phone embedding created successfully");
    } catch (embeddingError) {
      console.error("Failed to create phone embedding:", embeddingError);
    }

    res.status(201).json({
      message: "Phone created successfully",
      phoneId: createdPhone._id
    });
    return;
  } catch (error) {
    next(error);
  }
};
export const updatePhone = async (req : Request, res: Response, next:NextFunction) => {
  
  try{
    const phoneId = req.params.id;
    const phone = PhoneDTO.safeParse(req.body);
    
    if (!phone.success) {
      throw new ValidationError(phone.error.message)
    }

    await Phone.findByIdAndUpdate(phoneId, {
      brand: phone.data.brand,
      model: phone.data.model,
      price: phone.data.price,
      pointdesc: phone.data.pointdesc,
      description: phone.data.description,
      storage: phone.data.storage,
      colors: phone.data.colors,
      warranty: phone.data.warranty,
      image: phone.data.image,
    });
      res.status(200).send();
      return;
      
    }catch(error){
      next(error);
    }
};  

const createPhoneEmbedding = async (phoneData: any) => {
  try {
    const embeddingsModel = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
      apiKey: process.env.OPENAI_API_KEY,
    });

    const vectorIndex = new MongoDBAtlasVectorSearch(embeddingsModel, {
      collection: mongoose.connection.collection("DeviceVectors"),
      indexName: "vector_index",
    });

    const { _id, brand, model, price, pointdesc, description, storage, colors, warranty } = phoneData;
    
    const doc = new Document({
      pageContent: `${model} is one of the best phones from ${brand}, priced at ${price.toLocaleString('en-LK')} LKR. Its main features include ${description}. If we highlight some of the key points again, they are: ${pointdesc}. This device comes in colors like ${colors} and is available in storage options of ${storage}. It also includes a warranty of ${warranty}.`,
      metadata: {
        _id,
      },
    });
    
    await vectorIndex.addDocuments([doc]);
    console.log("Embedding success");
    return true;
  } catch (error) {
    console.error("Error creating phone embedding:", error);
    throw error;
  }
};
