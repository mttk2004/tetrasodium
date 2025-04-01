import { Link, Outlet } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { routes } from '@/config/routes';
import { Home, Package, User, Calendar, Settings, LogOut, FacebookIcon, InstagramIcon, GithubIcon } from 'lucide-react';

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
      <div className="flex flex-col justify-start items-start w-64 bg-slate-800 text-white p-3">
        <div className="mb-6 p-2">
          <h1 className="text-xl font-bold">Tetrasodium</h1>
        </div>
        
        {/* Menu items */}
        <nav className="w-full space-y-1">
          {menuItems.map((item) => {
            // Nếu mục này chỉ dành cho admin và người dùng không phải admin, không hiện
            if (item.adminOnly && !isAdmin) return null;
            
            return (
                <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center w-full px-4 py-2 rounded-md hover:bg-slate-700 transition-colors"
                    activeProps={{className: 'bg-slate-700'}}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
            );
          })}
        </nav>
        
        {/* User info */}
        <div className="flex flex-col gap-2 w-full mt-4 pt-2 border-t border-slate-700">
          <div className="px-4 py-2">
            <p className=" font-medium">{user?.fullName}</p>
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
        
        {/* Footer */}
        <footer
            className="w-full text-center text-xs text-slate-400 mt-auto flex flex-col gap-4 items-center justify-center">
          <p>
            Built with ❤️ by Mai Trần Tuấn Kiệt
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://github.com/mttk2004" target="_blank" rel="noopener noreferrer">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href="https://github.com/mttk2004" target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href="https://github.com/mttk2004" target="_blank" rel="noopener noreferrer">
              <GithubIcon className="h-4 w-4" />
            </a>
          </div>
        </footer>
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
