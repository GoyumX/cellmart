import Phone from "../infastructure/schemas/Phone.js";

export const getAllPhone = async (req, res) => {
    const phones = await Phone.find();
    res.status(200).json(phones);
    return;
  };
  
  export const getPhoneById = async (req, res) => {
    const phoneId = req.params.id;
    const phone = await Phone.findById(phoneId);
    if (!phone) {
      res.status(404).send();
      return;
    }
  
    res.status(200).json(phone);
    return;
  };
  
  export const deletePhone = async (req, res) => {
    const phoneId = req.params.id;
    await Phone.findByIdAndDelete(phoneId);
  
    res.status(200).send();
    return;
  };
  
  export const createPhone = async (req, res) => {
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
      !phone.photoUrl
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
        photoUrl: phone.photoUrl, 
        
    });
  
    res.status(201).send();
    return;
  };

  export const updatePhone = async (req, res) => {
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
      !updatedPhone.photoUrl
    ) {
      res.status(400).send();
      return;
    }

    await Phone.findByIdAndUpdate(phoneId, updatedPhone);
  
    res.status(200).send();
    return;
  };  
  
