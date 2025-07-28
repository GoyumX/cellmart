import { Request, Response, NextFunction } from "express";

import Accessories from "../infastructure/schemas/Accessories"

export const getAllAccessories = async (req : Request, res: Response) => {
    const accessories = await Accessories.find();
    res.status(200).json(accessories);
    return;
  };
  
  export const getAccessoriesById = async (req : Request, res: Response) => {
    const accessorieId = req.params.id;
    const accessorie = await Accessories.findById(accessorieId);
    if (!accessorie) {
      res.status(404).send();
      return;
    }
  
    res.status(200).json(accessorie);
    return;
  };
  
  export const createAccessories = async (req : Request, res: Response) => {
    const accessorie = req.body;
  
    
    if (
      !accessorie.type ||
      !accessorie.brand ||
      !accessorie.model ||
      !accessorie.image ||
      !accessorie.price ||
      !accessorie.pointdesc ||
      !accessorie.description ||
      !accessorie.warranty
    ) {
      res.status(400).send();
      return;
    }
    
    await Accessories.create({
        type: accessorie.type,
        brand: accessorie.brand,
        model: accessorie.model,
        image: accessorie.image,
        warranty: accessorie.warranty,
        price: parseInt(accessorie.price),
        description: accessorie.description,
        pointdesc: accessorie.pointdesc,
    });
  
    res.status(201).send();
    return;
  };
  
  export const deleteAccessories = async (req : Request, res: Response) => {
    const accessorieId = req.params.id;
    await Accessories.findByIdAndDelete(accessorieId);
  
    res.status(200).send();
    return;
  };

  export const updateAccessories = async (req : Request, res: Response) => {
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
      res.status(400).send();
      return;
    }

    await Accessories.findByIdAndUpdate(accessorieId, updatedAccessorie);
  
    res.status(200).send();
    return;
  };