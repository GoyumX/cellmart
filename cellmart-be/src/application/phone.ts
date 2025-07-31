import { Request, Response, NextFunction } from "express";

import Phone from "../infastructure/schemas/Phone";

export const getAllPhone = async (req : Request, res: Response) => {
    const phones = await Phone.find();
    res.status(200).json(phones);
    return;
  };
  
  export const getPhoneById = async (req : Request, res: Response) => {
    const phoneId = req.params.id;
    const phone = await Phone.findById(phoneId);
    if (!phone) {
      res.status(404).send();
      return;
    }
  
    res.status(200).json(phone);
    return;
  };
  
  export const deletePhone = async (req : Request, res: Response) => {
    const phoneId = req.params.id;
    await Phone.findByIdAndDelete(phoneId);
  
    res.status(200).send();
    return;
  };
  
  export const createPhone = async (req : Request, res: Response) => {
    const phone = req.body;
      
    if (
      !phone.brand ||
      !phone.model ||
      !phone.price ||
      !phone.pointdesc ||
      !phone.description ||
      !phone.storage ||
      !phone.colors ||
      !phone.warranty ||
      !phone.image
    ) {
      res.status(400).send();
      return;
    }
    
    await Phone.create({
        brand: phone.brand,
        model: phone.model,
        price: parseInt(phone.price),
        pointdesc: phone.pointdesc,
        description: phone.description,
        storage: phone.storage,
        colors: phone.colors,
        warranty: phone.warranty,
        image: phone.image, 
    });
  
    res.status(201).send();
    return;
  };

  export const updatePhone = async (req : Request, res: Response) => {
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
      res.status(400).send();
      return;
    }

    await Phone.findByIdAndUpdate(phoneId, updatedPhone);
  
    res.status(200).send();
    return;
  };  