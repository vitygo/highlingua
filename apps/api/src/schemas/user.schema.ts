import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  avatar: z.string().optional(),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>