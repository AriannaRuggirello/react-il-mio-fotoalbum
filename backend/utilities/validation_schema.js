const Joi = require ('joi')

const authSchema = Joi.object({
    email:Joi.string().email().lowercase().required().messages({
        'string.empty': 'Il campo non può essere vuoto',
        'any.required': "L'email è obbligatoria",
    }),
    password : Joi.string().min(6).required().messages({
        'string.empty': 'Il campo non può essere vuoto',
        'any.required': "La password è obbligatoria",
    }),
})

const postSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Il campo non può essere vuoto',
        'any.required': 'Il titolo è obbligatorio',
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Il campo non può essere vuoto',
    }),
    image: Joi.string(),
    available: Joi.boolean().required(),
    categoryId: Joi.number().required(),
      
  });
  
  const categorySchema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Il campo nome non può essere vuoto',
      'any.required': 'Il nome è obbligatorio',
      
    }),
  });
      


module.exports ={
    authSchema,
    postSchema,
    categorySchema
}