import axiosInstance from '@/lib/axios';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateInput {
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  category: string;
}

export interface ProductUpdateInput extends Partial<ProductCreateInput> {
  id: string;
}

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const response = await axiosInstance.get<Product[]>('/products');
    return response.data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const response = await axiosInstance.get<Product>(`/products/${id}`);
    return response.data;
  },

  createProduct: async (product: ProductCreateInput): Promise<Product> => {
    const response = await axiosInstance.post<Product>('/products', product);
    return response.data;
  },

  updateProduct: async (product: ProductUpdateInput): Promise<Product> => {
    const response = await axiosInstance.put<Product>(`/products/${product.id}`, product);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/products/${id}`);
  },
};
