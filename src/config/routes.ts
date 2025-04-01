export const routes = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',

  // Nhân viên
  employees: '/employees',
  employeeDetail: (id: string = ':id') => `/employees/${id}`,
  employeeCreate: '/employees/create',
  employeeEdit: (id: string = ':id') => `/employees/${id}/edit`,

  // Sản phẩm
  products: '/products',
  productDetail: (id: string = ':id') => `/products/${id}`,
  productCreate: '/products/create',
  productEdit: (id: string = ':id') => `/products/${id}/edit`,

  // Tài khoản
  accounts: '/accounts',
  accountDetail: (id: string = ':id') => `/accounts/${id}`,
  accountCreate: '/accounts/create',
  accountEdit: (id: string = ':id') => `/accounts/${id}/edit`,

  // Chấm công
  attendance: '/attendance',

  // Cài đặt
  settings: '/settings',

  // Lỗi
  notFound: '*',
};
