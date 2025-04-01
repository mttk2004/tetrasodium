import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productService, Product, ProductCreateInput, ProductUpdateInput } from '@/services/product.service';

export function useProducts() {
  const queryClient = useQueryClient();

  // Get all products
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  // Get product by ID
  const getProduct = (id: string) => {
    return useQuery({
      queryKey: ['products', id],
      queryFn: () => productService.getProductById(id),
    });
  };

  // Create product
  const createProduct = useMutation({
    mutationFn: (newProduct: ProductCreateInput) => productService.createProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Update product
  const updateProduct = useMutation({
    mutationFn: (updatedProduct: ProductUpdateInput) => productService.updateProduct(updatedProduct),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products', data.id] });
    },
  });

  // Delete product
  const deleteProduct = useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    products: productsQuery.data || [],
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    error: productsQuery.error,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
