import { z } from "zod";

export const ReservationDTO = z.object({
    productType: z.string(),
    name: z.string(),
    contactNumber: z.number(),
    gmail: z.string()
})