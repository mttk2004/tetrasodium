import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const userSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3, 'Tên người dùng phải có ít nhất 3 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  fullName: z.string().min(2, 'Tên đầy đủ phải có ít nhất 2 ký tự'),
  role: z.enum(['ADMIN', 'EMPLOYEE']),
  isActive: z.boolean().default(true),
});

export type User = z.infer<typeof userSchema>;
