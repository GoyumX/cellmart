import Phone from "../infastructure/schemas/phone.js";

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
  
