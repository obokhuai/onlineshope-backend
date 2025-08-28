import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../../slices/product-slice';
import Product from '../../product/product';
import Loader from '../../spinner/spinner';
import Message from '../../message/message';
import Paginate from '../../pagination/paginate';
import ProductCarousel from '../../product-carousel/product-carousel';
import './homescreen.css';



interface ProductType {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

interface ProductsResponse {
  products: ProductType[];
  page: number;
  pages: number;
}

interface RouteParams {
  pageNumber?: string;
  keyword?: string;
}

const HomeScreen:  React.FC = () => {
   const { pageNumber, keyword } = useParams<{ pageNumber?: string; keyword?: string }>();
 
   const { data, isLoading, error } = useGetProductsQuery({
     keyword,
     pageNumber,
   });

  return (
    <div className="homescreen-container">
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="back-button">
          Go Back
        </Link>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {'data' in error && (error as any)?.data?.message
            ? (error as any).data.message
            : (error as any).error}
        </Message>
      ) : (
        <>
          {/* <Meta /> */}
          <h1 className="homescreen-title">Latest Products</h1>
          <div className="product-grid">
            {data?.products.map((product) => (
              <div key={product._id} className="product-grid-item">
                <Product product={product} />
              </div>
            ))}
          </div>
          <Paginate
            pages={data?.pages || 0}
            page={data?.page || 1}
            keyword={keyword ?? ''}
          />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
