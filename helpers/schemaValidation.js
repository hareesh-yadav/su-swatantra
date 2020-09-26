import joi from "joi"

const authSchema=joi.object({
    name:joi.string().required(),
    email:joi.string().email({minDomainSegments:2,tlds:{allow:["com","in"]}}).lowercase().required(),
    phone:joi.string().min(10).max(10)
})

const accSchema=joi.object({
    name:joi.string().required(),
    email:joi.string().lowercase().required().regex(/^[a-zA-Z0-9]{6,15}$/),
    phone:joi.number().min(10).max(10)
})

export default {authSchema,accSchema}