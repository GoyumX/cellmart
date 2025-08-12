import { z } from "zod";

export const PhoneDTO = z.object({
    brand: z.string(),
    model: z.string(),
    price: z.number(),
    pointdesc: z.string(),
    description: z.string(),
    storage: z.string(),
    colors: z.string(),
    warranty: z.string(),
    image: z.string()
})
