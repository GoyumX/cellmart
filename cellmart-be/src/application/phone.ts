import { Request, Response, NextFunction } from "express";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { PhoneDTO } from "../domain/dtos/phone";

import Phone from "../infastructure/schemas/Phone";

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
  
export const createPhone = async (req : Request, res: Response, next:NextFunction) => {
    try{
      const phone = PhoneDTO.safeParse(req.body);
      
    if (!phone.success) {
      throw new ValidationError(phone.error.message)
    }
    
    await Phone.create({
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
  
    res.status(201).send();
    return;
    }catch(error){
      next(error);
    }
};

export const updatePhone = async (req : Request, res: Response, next:NextFunction) => {
    try{
      const phoneId = req.params.phoneId;
      const updatedPhone = req.body;
    
      if (
        !updatedPhone.brand ||
        !updatedPhone.model ||
        !updatedPhone.price ||
        !updatedPhone.pointdesc ||
        !updatedPhone.description ||
        !updatedPhone.storage ||
        !updatedPhone.colors ||
        !updatedPhone.warranty ||
        !updatedPhone.image
      ) {
        throw new ValidationError("Invalid phone data");
      }

      await Phone.findByIdAndUpdate(phoneId, updatedPhone);
    
      res.status(200).send();
      return;
    }catch(error){
      next(error);
    }
};  