import z, { positive } from "zod";

//define a validation schema for the event form using zod
export const eventFormSchema = z.object({
    
    name: z.string().min(1, "Required"),
    description: z.string().optional(),
    isActive: z.boolean(),


    //'durationInMinutes' will be coerced(converted) to a number
    //it must be an integer, greater than 0, and less than or equal to 720 (12 hours)
    durationInMinutes: z.coerce.number()
    .int()
    .positive("Duration must be greater than 0")
    .max(60*12,`Duration must be less that 12 hours (${60*12} minutes)`)
})