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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { type SanPhamDTO } from '@/schemas/api.schema';
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiFilter } from 'react-icons/fi';

// Dữ liệu sản phẩm giả
const mockSanPham: SanPhamDTO[] = [
  {
    ma: 1,
    tenSanPham: 'Vòng tay bạc 925',
    hinhSanPham: 'https://placehold.co/300x200',
    gioiTinh: 'Nữ',
    moTa: 'Vòng tay bạc 925 thiết kế tinh tế, sang trọng',
    trangThai: 'Đang bán',
    ngayTao: '2023-12-01T00:00:00',
    loaiSanPhamId: 1,
    sizeId: 2,
    tonKhoId: 5
  },
  {
    ma: 2,
    tenSanPham: 'Dây chuyền mạ vàng',
    hinhSanPham: 'https://placehold.co/300x200',
    gioiTinh: 'Nữ',
    moTa: 'Dây chuyền mạ vàng 24k cao cấp',
    trangThai: 'Đang bán',
    ngayTao: '2023-11-15T00:00:00',
    loaiSanPhamId: 2,
    sizeId: 1,
    tonKhoId: 6
  },
  {
    ma: 3,
    tenSanPham: 'Nhẫn đôi bạc',
    hinhSanPham: 'https://placehold.co/300x200',
    gioiTinh: 'Cả hai',
    moTa: 'Nhẫn đôi bạc 925 cho cặp đôi',
    trangThai: 'Hết hàng',
    ngayTao: '2023-10-20T00:00:00',
    loaiSanPhamId: 3,
    sizeId: 3,
    tonKhoId: 7
  },
  {
    ma: 4,
    tenSanPham: 'Khuyên tai ngọc trai',
    hinhSanPham: 'https://placehold.co/300x200',
    gioiTinh: 'Nữ',
    moTa: 'Khuyên tai ngọc trai tự nhiên',
    trangThai: 'Đang bán',
    ngayTao: '2023-12-05T00:00:00',
    loaiSanPhamId: 4,
    sizeId: 1,
    tonKhoId: 8
  },
  {
    ma: 5,
    tenSanPham: 'Lắc tay nam',
    hinhSanPham: 'https://placehold.co/300x200',
    gioiTinh: 'Nam',
    moTa: 'Lắc tay inox cao cấp cho nam',
    trangThai: 'Đang bán',
    ngayTao: '2023-11-10T00:00:00',
    loaiSanPhamId: 1,
    sizeId: 2,
    tonKhoId: 9
  },
];

export function ProductsPage() {
  const [products] = useState<SanPhamDTO[]>(mockSanPham);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<SanPhamDTO | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter(product =>
    product.tenSanPham.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý khi chọn một sản phẩm để xem chi tiết
  const handleViewProduct = (product: SanPhamDTO) => {
    setSelectedProduct(product);
  };

  // Xử lý khi chọn một sản phẩm để xóa
  const handleDeleteClick = (product: SanPhamDTO) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Xử lý khi xác nhận xóa sản phẩm
  const handleConfirmDelete = () => {
    // Trong thực tế, gọi API để xóa sản phẩm
    console.log('Xóa sản phẩm:', selectedProduct?.ma);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý Sản phẩm</h1>
        <Button className="flex items-center gap-2">
          <FiPlus className="h-4 w-4" />
          Thêm sản phẩm
        </Button>
      </div>

      {/* Thanh tìm kiếm và bộ lọc */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <FiFilter className="h-4 w-4" />
          Lọc
        </Button>
      </div>

      {/* Bảng danh sách sản phẩm */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách sản phẩm</CardTitle>
          <CardDescription>
            Danh sách tất cả sản phẩm trong cửa hàng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Giới tính</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.ma}>
                  <TableCell>{product.ma}</TableCell>
                  <TableCell className="font-medium">{product.tenSanPham}</TableCell>
                  <TableCell>{product.gioiTinh}</TableCell>
                  <TableCell>
                    <Badge
                      variant={product.trangThai === 'Đang bán' ? 'default' : 'destructive'}
                    >
                      {product.trangThai}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(new Date(product.ngayTao!))}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProduct(product)}
                      >
                        <FiEdit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Hiển thị {filteredProducts.length} trên tổng số {products.length} sản phẩm
          </p>
        </CardFooter>
      </Card>

      {/* Dialog xác nhận xóa sản phẩm */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa sản phẩm "{selectedProduct?.tenSanPham}"?
              Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Hủy bỏ
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog xem chi tiết sản phẩm */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct && !isDeleteDialogOpen} onOpenChange={(open) => !open && setSelectedProduct(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Chi tiết sản phẩm</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="mb-4">
                <img
                  src={selectedProduct.hinhSanPham}
                  alt={selectedProduct.tenSanPham}
                  className="mx-auto rounded-md object-cover h-48 w-auto"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Tên sản phẩm</p>
                  <p>{selectedProduct.tenSanPham}</p>
                </div>
                <div>
                  <p className="font-medium">Mã sản phẩm</p>
                  <p>{selectedProduct.ma}</p>
                </div>
                <div>
                  <p className="font-medium">Giới tính</p>
                  <p>{selectedProduct.gioiTinh}</p>
                </div>
                <div>
                  <p className="font-medium">Trạng thái</p>
                  <Badge
                    variant={selectedProduct.trangThai === 'Đang bán' ? 'default' : 'destructive'}
                  >
                    {selectedProduct.trangThai}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <p className="font-medium">Mô tả</p>
                  <p>{selectedProduct.moTa}</p>
                </div>
                <div>
                  <p className="font-medium">Ngày tạo</p>
                  <p>{formatDate(new Date(selectedProduct.ngayTao!))}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedProduct(null)}
              >
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
