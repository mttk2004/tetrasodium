import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type NhanVienDTO } from '@/schemas/api.schema';
import { FiSearch, FiPlus, FiUser, FiDollarSign, FiClock } from 'react-icons/fi';

// Dữ liệu nhân viên giả
const mockNhanVien: NhanVienDTO[] = [
  {
    ma: 1,
    hoTen: 'Nguyễn Văn A',
    ngaySinh: '1990-05-15',
    gioiTinh: 'Nam',
    diaChi: 'Số 1 Đường ABC, Quận 1, TP.HCM',
    email: 'nguyenvana@example.com',
    soDienThoai: '0901234567',
    tiLeHoaHong: 5.0,
    luongTheoGio: 50000,
    chucVu: 'Quản lý',
    cuaHangDTO: {
      ma: 1,
      tenCuaHang: 'Chi nhánh Quận 1',
      diaChi: 'Số 123 Đường XYZ, Quận 1, TP.HCM',
      maNVQuanLy: 1
    }
  },
  {
    ma: 2,
    hoTen: 'Trần Thị B',
    ngaySinh: '1995-10-20',
    gioiTinh: 'Nữ',
    diaChi: 'Số 2 Đường DEF, Quận 2, TP.HCM',
    email: 'tranthib@example.com',
    soDienThoai: '0912345678',
    tiLeHoaHong: 4.5,
    luongTheoGio: 45000,
    chucVu: 'Nhân viên bán hàng',
    cuaHangDTO: {
      ma: 1,
      tenCuaHang: 'Chi nhánh Quận 1',
      diaChi: 'Số 123 Đường XYZ, Quận 1, TP.HCM',
      maNVQuanLy: 1
    }
  },
  {
    ma: 3,
    hoTen: 'Lê Văn C',
    ngaySinh: '1992-12-01',
    gioiTinh: 'Nam',
    diaChi: 'Số 3 Đường GHI, Quận 3, TP.HCM',
    email: 'levanc@example.com',
    soDienThoai: '0923456789',
    tiLeHoaHong: 4.0,
    luongTheoGio: 42000,
    chucVu: 'Nhân viên kho',
    cuaHangDTO: {
      ma: 2,
      tenCuaHang: 'Chi nhánh Quận 2',
      diaChi: 'Số 456 Đường UVW, Quận 2, TP.HCM',
      maNVQuanLy: 4
    }
  },
  {
    ma: 4,
    hoTen: 'Phạm Thị D',
    ngaySinh: '1988-08-10',
    gioiTinh: 'Nữ',
    diaChi: 'Số 4 Đường JKL, Quận 4, TP.HCM',
    email: 'phamthid@example.com',
    soDienThoai: '0934567890',
    tiLeHoaHong: 6.0,
    luongTheoGio: 55000,
    chucVu: 'Quản lý',
    cuaHangDTO: {
      ma: 2,
      tenCuaHang: 'Chi nhánh Quận 2',
      diaChi: 'Số 456 Đường UVW, Quận 2, TP.HCM',
      maNVQuanLy: 4
    }
  },
  {
    ma: 5,
    hoTen: 'Hoàng Văn E',
    ngaySinh: '1993-04-25',
    gioiTinh: 'Nam',
    diaChi: 'Số 5 Đường MNO, Quận 5, TP.HCM',
    email: 'hoangvane@example.com',
    soDienThoai: '0945678901',
    tiLeHoaHong: 4.2,
    luongTheoGio: 44000,
    chucVu: 'Nhân viên bán hàng',
    cuaHangDTO: {
      ma: 1,
      tenCuaHang: 'Chi nhánh Quận 1',
      diaChi: 'Số 123 Đường XYZ, Quận 1, TP.HCM',
      maNVQuanLy: 1
    }
  },
];

// Dữ liệu bảng lương giả
const mockBangLuong = [
  {
    nhanVienId: 1,
    thangTinhLuong: 12,
    namTinhluong: 2023,
    tongGioLam: 176,
    tongHoaHong: 2500000,
    luongCoBan: 8800000,
    khauTru: 300000,
    thucNhan: 11000000
  },
  {
    nhanVienId: 2,
    thangTinhLuong: 12,
    namTinhluong: 2023,
    tongGioLam: 168,
    tongHoaHong: 1800000,
    luongCoBan: 7560000,
    khauTru: 260000,
    thucNhan: 9100000
  },
  {
    nhanVienId: 3,
    thangTinhLuong: 12,
    namTinhluong: 2023,
    tongGioLam: 160,
    tongHoaHong: 0,
    luongCoBan: 6720000,
    khauTru: 220000,
    thucNhan: 6500000
  },
  {
    nhanVienId: 4,
    thangTinhLuong: 12,
    namTinhluong: 2023,
    tongGioLam: 176,
    tongHoaHong: 3000000,
    luongCoBan: 9680000,
    khauTru: 330000,
    thucNhan: 12350000
  },
  {
    nhanVienId: 5,
    thangTinhLuong: 12,
    namTinhluong: 2023,
    tongGioLam: 172,
    tongHoaHong: 1900000,
    luongCoBan: 7568000,
    khauTru: 270000,
    thucNhan: 9198000
  }
];

// Dữ liệu chấm công giả
const mockChamCong = [
  {
    nhanVienId: 1,
    ngay: '2023-12-01',
    gioVao: '08:00',
    gioRa: '17:00',
    tongGioLam: 8
  },
  {
    nhanVienId: 1,
    ngay: '2023-12-02',
    gioVao: '08:15',
    gioRa: '17:30',
    tongGioLam: 8.25
  },
  {
    nhanVienId: 1,
    ngay: '2023-12-03',
    gioVao: '08:05',
    gioRa: '17:15',
    tongGioLam: 8.15
  },
  {
    nhanVienId: 2,
    ngay: '2023-12-01',
    gioVao: '08:30',
    gioRa: '17:15',
    tongGioLam: 7.75
  },
  {
    nhanVienId: 2,
    ngay: '2023-12-02',
    gioVao: '08:10',
    gioRa: '17:00',
    tongGioLam: 7.85
  }
];

// Hàm định dạng số thành tiền Việt Nam
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export function EmployeesPage() {
  const [employees] = useState<NhanVienDTO[]>(mockNhanVien);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<NhanVienDTO | null>(null);
  const [activeTab, setActiveTab] = useState('info');

  // Lọc nhân viên theo từ khóa tìm kiếm
  const filteredEmployees = employees.filter(employee =>
    employee.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.soDienThoai.includes(searchTerm)
  );

  // Tìm thông tin lương của nhân viên
  const findSalaryInfo = (employeeId: number | undefined) => {
    if (!employeeId) return undefined;
    return mockBangLuong.find(item => item.nhanVienId === employeeId);
  };

  // Tìm thông tin chấm công của nhân viên
  const findAttendanceInfo = (employeeId: number | undefined) => {
    if (!employeeId) return [];
    return mockChamCong.filter(item => item.nhanVienId === employeeId);
  };

  // Xử lý khi chọn một nhân viên
  const handleViewEmployee = (employee: NhanVienDTO) => {
    setSelectedEmployee(employee);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý Nhân viên</h1>
        <Button className="flex items-center gap-2">
          <FiPlus className="h-4 w-4" />
          Thêm nhân viên
        </Button>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, số điện thoại..."
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Bảng danh sách nhân viên */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách nhân viên</CardTitle>
          <CardDescription>
            Quản lý tất cả nhân viên trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã</TableHead>
                <TableHead>Họ tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Chức vụ</TableHead>
                <TableHead>Chi nhánh</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.ma}>
                  <TableCell>{employee.ma}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${employee.ma}`} />
                      <AvatarFallback>{employee.hoTen.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{employee.hoTen}</span>
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.soDienThoai}</TableCell>
                  <TableCell>
                    <Badge variant={employee.chucVu === 'Quản lý' ? 'secondary' : 'outline'}>
                      {employee.chucVu}
                    </Badge>
                  </TableCell>
                  <TableCell>{employee.cuaHangDTO?.tenCuaHang}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewEmployee(employee)}
                    >
                      <FiUser className="h-4 w-4" />
                      <span className="ml-2">Chi tiết</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Hiển thị {filteredEmployees.length} trên tổng số {employees.length} nhân viên
          </p>
        </CardFooter>
      </Card>

      {/* Dialog xem chi tiết nhân viên */}
      {selectedEmployee && (
        <Dialog open={!!selectedEmployee} onOpenChange={(open) => !open && setSelectedEmployee(null)}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${selectedEmployee.ma}`} />
                  <AvatarFallback>{selectedEmployee.hoTen.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span>{selectedEmployee.hoTen}</span>
                  <span className="text-sm font-normal text-muted-foreground">{selectedEmployee.chucVu}</span>
                </div>
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="info" className="mt-4" onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info" className="flex items-center gap-2">
                  <FiUser className="h-4 w-4" />
                  Thông tin cá nhân
                </TabsTrigger>
                <TabsTrigger value="salary" className="flex items-center gap-2">
                  <FiDollarSign className="h-4 w-4" />
                  Lương
                </TabsTrigger>
                <TabsTrigger value="attendance" className="flex items-center gap-2">
                  <FiClock className="h-4 w-4" />
                  Chấm công
                </TabsTrigger>
              </TabsList>

              {/* Tab thông tin cá nhân */}
              <TabsContent value="info" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Mã nhân viên</p>
                    <p>{selectedEmployee.ma}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Họ tên</p>
                    <p>{selectedEmployee.hoTen}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Ngày sinh</p>
                    <p>{new Date(selectedEmployee.ngaySinh).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Giới tính</p>
                    <p>{selectedEmployee.gioiTinh}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p>{selectedEmployee.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Số điện thoại</p>
                    <p>{selectedEmployee.soDienThoai}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-muted-foreground">Địa chỉ</p>
                    <p>{selectedEmployee.diaChi}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Chi nhánh</p>
                    <p>{selectedEmployee.cuaHangDTO?.tenCuaHang}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Lương theo giờ</p>
                    <p>{formatCurrency(selectedEmployee.luongTheoGio)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tỉ lệ hoa hồng</p>
                    <p>{selectedEmployee.tiLeHoaHong}%</p>
                  </div>
                </div>
              </TabsContent>

              {/* Tab lương */}
              <TabsContent value="salary" className="pt-4">
                {selectedEmployee && (
                  <>
                    {(() => {
                      const salaryInfo = findSalaryInfo(selectedEmployee.ma);
                      return salaryInfo ? (
                        <div className="rounded-md border">
                          <div className="grid grid-cols-2 gap-4 p-4">
                            <div className="flex flex-col items-center justify-center space-y-1 rounded-md bg-muted p-4">
                              <p className="text-sm font-medium text-muted-foreground">Lương cơ bản</p>
                              <p className="text-2xl font-bold text-primary">
                                {formatCurrency(salaryInfo.luongCoBan)}
                              </p>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-1 rounded-md bg-muted p-4">
                              <p className="text-sm font-medium text-muted-foreground">Thực nhận</p>
                              <p className="text-2xl font-bold text-primary">
                                {formatCurrency(salaryInfo.thucNhan)}
                              </p>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-1 rounded-md border p-4">
                              <p className="text-sm font-medium text-muted-foreground">Tổng hoa hồng</p>
                              <p className="text-lg font-bold">
                                {formatCurrency(salaryInfo.tongHoaHong)}
                              </p>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-1 rounded-md border p-4">
                              <p className="text-sm font-medium text-muted-foreground">Khấu trừ</p>
                              <p className="text-lg font-bold text-destructive">
                                {formatCurrency(salaryInfo.khauTru)}
                              </p>
                            </div>
                            <div className="col-span-2 flex flex-col space-y-1 rounded-md border p-4">
                              <p className="text-sm font-medium text-muted-foreground">Tổng giờ làm</p>
                              <div className="flex items-end justify-between">
                                <p className="text-lg font-bold">
                                  {salaryInfo.tongGioLam} giờ
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Tháng {salaryInfo.thangTinhLuong}/{salaryInfo.namTinhluong}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground">Không có dữ liệu lương</p>
                      );
                    })()}
                  </>
                )}
              </TabsContent>

              {/* Tab chấm công */}
              <TabsContent value="attendance" className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Giờ vào</TableHead>
                      <TableHead>Giờ ra</TableHead>
                      <TableHead>Tổng giờ làm</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(() => {
                      const attendanceInfo = selectedEmployee ? findAttendanceInfo(selectedEmployee.ma) : [];
                      return attendanceInfo.length > 0 ? (
                        attendanceInfo.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{new Date(item.ngay).toLocaleDateString('vi-VN')}</TableCell>
                            <TableCell>{item.gioVao}</TableCell>
                            <TableCell>{item.gioRa}</TableCell>
                            <TableCell>{item.tongGioLam} giờ</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            Không có dữ liệu chấm công
                          </TableCell>
                        </TableRow>
                      );
                    })()}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setSelectedEmployee(null)}>
                Đóng
              </Button>
              <Button>Chỉnh sửa</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
