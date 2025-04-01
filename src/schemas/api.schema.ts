import { z } from 'zod';

// Schema cho SanPham
export const sanPhamSchema = z.object({
  ma: z.number().optional(),
  tenSanPham: z.string(),
  hinhSanPham: z.string().optional(),
  gioiTinh: z.string(),
  moTa: z.string().optional(),
  trangThai: z.string(),
  ngayTao: z.string().optional(),
  loaiSanPhamId: z.number().optional(),
  sizeId: z.number().optional(),
  tonKhoId: z.number().optional(),
});

export type SanPhamDTO = z.infer<typeof sanPhamSchema>;

// Schema cho BangLuong
export const bangLuongSchema = z.object({
  ma: z.number().optional(),
  thangTinhLuong: z.number(),
  namTinhluong: z.number(),
  luongCoBan: z.number(),
  thucNhan: z.number(),
  tongHoaHong: z.number(),
  tongGioLam: z.number(),
  quyTinhLuong: z.number(),
  khauTru: z.number(),
  nhanVienId: z.number(),
  cuaHangId: z.number(),
});

export type BangLuongDTO = z.infer<typeof bangLuongSchema>;

// Schema cho ChamCong
export const chamCongSchema = z.object({
  ma: z.number().optional(),
  thoiGianVao: z.string(),
  thoiGianRa: z.string(),
  tongGioLam: z.number(),
  trangThai: z.string(),
  tenNhanVien: z.string(),
  tenCuaHang: z.string(),
});

export type ChamCongDTO = z.infer<typeof chamCongSchema>;

// Schema cho CuaHang
export const cuaHangSchema = z.object({
  ma: z.number().optional(),
  tenCuaHang: z.string(),
  diaChi: z.string(),
  maNVQuanLy: z.number(),
});

export type CuaHangDTO = z.infer<typeof cuaHangSchema>;

// Schema cho NhanVien
export const nhanVienSchema = z.object({
  ma: z.number().optional(),
  hoTen: z.string(),
  ngaySinh: z.string(),
  gioiTinh: z.string(),
  diaChi: z.string(),
  email: z.string().email('Email không hợp lệ'),
  soDienThoai: z.string(),
  tiLeHoaHong: z.number(),
  luongTheoGio: z.number(),
  chucVu: z.string(),
  cuaHangDTO: cuaHangSchema.optional(),
});

export type NhanVienDTO = z.infer<typeof nhanVienSchema>;

// Schema cho Role
export const roleSchema = z.object({
  ma: z.number().optional(),
  chucVu: z.string(),
});

export type RoleDTO = z.infer<typeof roleSchema>;

// Schema cho TaiKhoan
export const taiKhoanSchema = z.object({
  ma: z.number().optional(),
  thoiGianTao: z.string().optional(),
  tenDangNhap: z.string(),
  matKhau: z.string().optional(),
  trangThai: z.string(),
  quyen: z.string(),
  nhanVienDTO: nhanVienSchema.optional(),
  roleDTO: roleSchema.optional(),
});

export type TaiKhoanDTO = z.infer<typeof taiKhoanSchema>;

// Schema cho TaiKhoanCreate
export const taiKhoanCreateSchema = z.object({
  thoiGianTao: z.string().optional(),
  tenDangNhap: z.string(),
  matKhau: z.string(),
  trangThai: z.string(),
  quyen: z.string(),
  maNhanVien: z.number(),
  roleId: z.number(),
});

export type TaiKhoanCreateDTO = z.infer<typeof taiKhoanCreateSchema>;

// Schema cho DangNhap
export const dangNhapSchema = z.object({
  tenDangNhap: z.string(),
  password: z.string(),
});

export type DangNhapDTO = z.infer<typeof dangNhapSchema>;

// Schema cho Authentication
export const authenticationSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
  role: z.string(),
});

export type AuthenticationDTO = z.infer<typeof authenticationSchema>;

// Schema cho ApiResponse
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema.optional(),
  });

export type ApiResponseDTO<T> = {
  success: boolean;
  message: string;
  data?: T;
};
