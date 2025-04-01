import { createRoute, createRouter } from '@tanstack/react-router';
import { z } from 'zod';
import App from '@/App';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LoginPage } from '@/pages/LoginPage';
import { Route as rootRoute } from './__root';
import { ProductsPage } from '@/pages/ProductsPage';
import { EmployeesPage } from '@/pages/EmployeesPage';
// Định nghĩa các trang con
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Trang chủ</div>,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

// Layout cho dashboard
const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'dashboard-layout',
  component: DashboardLayout,
});

// Các route con trong dashboard layout
const dashboardRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/dashboard',
  component: () => <div>Trang dashboard</div>,
});

const productsRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/products',
  component: () => <ProductsPage />,
});

const employeesRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/employees',
  component: () => <EmployeesPage />,
});

const attendanceRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/attendance',
  component: () => <div>Chấm công</div>,
});

const settingsRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/settings',
  component: () => <div>Cài đặt</div>,
});

// Đăng ký tất cả các route
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardLayoutRoute.addChildren([
    dashboardRoute,
    productsRoute,
    employeesRoute,
    attendanceRoute,
    settingsRoute,
  ]),
]);

// Tạo router từ cây route
export const router = createRouter({ routeTree });

// Khai báo các kiểu dữ liệu
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
