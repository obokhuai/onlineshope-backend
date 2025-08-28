import React from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
// import Message from '../../components/Message';
// import Loader from '../../components/Loader';
// import Paginate from '../../components/Paginate';
// import {
//   useGetProductsQuery,
//   useDeleteProductMutation,
//   useCreateProductMutation,
// } from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import Message from '../../../message/message';
import Loader from '../../../spinner/spinner';
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../../../slices/product-slice';
import "./product-list-screen.css"
import { useCreateOrderMutation } from '../../../../slices/orders-api-slice';
import Paginate from '../../../pagination/paginate';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
}

interface ProductData {
  products: Product[];
  page: number;
  pages: number;
}
const ProductListScreen: React.FC = () => {
  const { pageNumber } = useParams<{ pageNumber?: string }>();

const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });


    const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();



  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted")
        refetch();
      } catch (err: any) {
        toast.error(err?.data?.message || err.error || "Error deleting product");
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct(1);
        refetch();
      } catch (err: any) {
        toast.error(err?.data?.message || err.error || "Error creating product");
      }
    }
  };

  return (
    <>
       <div className="row align-center">
        <div className="col">
          <h1>Products</h1>
        </div>
        <div className="col text-end">
          <button  onClick={createProductHandler}>
            <FaPlus /> Create Product
          </button>
        </div>
      </div>

      {(loadingCreate  || isLoading) && <Loader />}
      {(loadingDelete  || isLoading) && <Loader />}

      {error ? (
        <Message variant="danger">
          {/* @ts-ignore */}
          {error.data?.message || error.error || 'An error occurred'}
        </Message>
      ) : (
        <>
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.products.map((product:any) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`} className="btn btn-light btn-sm mx-2">
                      <FaEdit />
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                       onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data && <Paginate pages={data.pages} page={data.page} isAdmin={true} />}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
