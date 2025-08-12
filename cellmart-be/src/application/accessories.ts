import { Request, Response, NextFunction } from "express";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { AccessoryDTO } from "../domain/dtos/accessory";

import Accessories from "../infastructure/schemas/Accessories"

export const getAllAccessories = async (req : Request, res: Response, next:NextFunction) => {
  try{
    const accessories = await Accessories.find();
    res.status(200).json(accessories);
  } catch(error){
    next(error);
  }
};
  
export const getAccessoriesById = async (req : Request, res: Response, next:NextFunction) => {
  try{

    const accessorieId = req.params.id;
    const accessorie = await Accessories.findById(accessorieId);
    if (!accessorie) {
      throw new NotFoundError("Accessory not found");
    }
  
    res.status(200).json(accessorie);
    return;

  } catch(error){
    next(error);
  } 
};  
  
  
export const createAccessories = async (req : Request, res: Response, next:NextFunction) => {
    try{
      const accessorie = AccessoryDTO.safeParse(req.body);
    
    if (!accessorie.success) {
      throw new ValidationError(accessorie.error.message)
    }
    
    await Accessories.create({
        type: accessorie.data.type,
        brand: accessorie.data.brand,
        model: accessorie.data.model,
        image: accessorie.data.image,
        warranty: accessorie.data.warranty,
        price: accessorie.data.price,
        description: accessorie.data.description,
        pointdesc: accessorie.data.pointdesc,
    });
  
    res.status(201).send();
    return;
    }catch(error){
      next(error);
    }
};
  
export const deleteAccessories = async (req : Request, res: Response, next:NextFunction) => {
  try{
    const accessorieId = req.params.id;
    await Accessories.findByIdAndDelete(accessorieId);
  
    res.status(200).send();
    return;
  }catch(error){
    next(error);
  }
};

export const updateAccessories = async (req : Request, res: Response, next:NextFunction) => {
    try{
      const accessorieId = req.params.accessorieId;
      const updatedAccessorie = req.body;
    
      if (
          !updatedAccessorie.type ||
          !updatedAccessorie.brand ||
          !updatedAccessorie.model ||
          !updatedAccessorie.image ||
          !updatedAccessorie.price ||
          !updatedAccessorie.pointdesc ||
          !updatedAccessorie.description ||
          !updatedAccessorie.warranty
      ) {
        throw new ValidationError("Invalid accessory data");
      }

      await Accessories.findByIdAndUpdate(accessorieId, updatedAccessorie);
    
      res.status(200).send();
      return;

    }catch(error){
      next(error);
    }
};