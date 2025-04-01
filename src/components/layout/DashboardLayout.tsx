import { Link, Outlet } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { routes } from '@/config/routes';
import { Home, Package, User, Calendar, Settings, LogOut } from 'lucide-react';

export function DashboardLayout() {
  const { user, logout, isAdmin } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Trang chủ', href: routes.dashboard },
    { icon: Package, label: 'Sản phẩm', href: routes.products },
    { icon: User, label: 'Nhân viên', href: routes.employees, adminOnly: true },
    { icon: Calendar, label: 'Chấm công', href: routes.attendance },
    { icon: Settings, label: 'Cài đặt', href: routes.settings },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white p-4">
        <div className="mb-6 p-2">
          <h1 className="text-xl font-bold">Phụ kiện thời trang</h1>
        </div>

        {/* Menu items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            // Nếu mục này chỉ dành cho admin và người dùng không phải admin, không hiện
            if (item.adminOnly && !isAdmin) return null;

            return (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center px-4 py-2 rounded-md hover:bg-slate-700 transition-colors"
                activeProps={{ className: 'bg-slate-700' }}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="mt-auto pt-4 border-t border-slate-700 mt-6">
          <div className="px-4 py-2">
            <p className="font-medium">{user?.fullName}</p>
            <p className="text-sm text-slate-400">{user?.role === 'ADMIN' ? 'Quản trị viên' : 'Nhân viên'}</p>
          </div>

          {/* Logout button */}
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 w-full text-left rounded-md hover:bg-slate-700 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
