import z from 'zod'

export const updateProfileSchema = z.object({
    name: z.string()
        .nonempty('Campo requerido')
        .min(4, 'Deve conter pelo menos 4 caracteres')
        .max(25, 'Deve conter no máximo 25 caracteres'),
    username: z.string()
        .nonempty('campo requerido')
        .min(4, 'Deve conter pelo menos 4 caracteres')
        .max(20, 'Deve conter no máximo 20 caracteres')
        .refine((value) => /^[a-zA-Z0-9_.]+$/.test(value), 'Deve conter apenas letras, números, underscore e pontos'),
    description: z.string()
        .max(150, 'Deve conter no máximo 150 caracteres'),
    email: z.string()
        .nonempty('Campo requerido')
        .email('Email inválido')
})

export type updateProfileSchema = z.infer<typeof updateProfileSchema>
