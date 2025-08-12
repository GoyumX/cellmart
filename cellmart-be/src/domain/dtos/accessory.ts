import { z } from "zod";

export const AccessoryDTO = z.object({
    type: z.string(),
    brand: z.string(),
    model: z.string(),
    image: z.string(),
    price: z.number(),
    pointdesc: z.string(),
    description: z.string(),
    warranty: z.string()
})
