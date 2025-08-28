import React from 'react';
import { Link } from 'react-router-dom';
// import Message from './Message';
import Message from '../message/message';
import { useGetTopProductsQuery } from '../../slices/product-slice';
import './product-carousel.css';


const ProductCarousel: React.FC = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery(1);

  if (isLoading) return null;

  if (error) {
    // Adjust error typing as needed depending on your API slice
    const errorMessage =
      (error as any)?.data?.message || (error as any).error || 'An error occurred';
    return <Message variant="danger">{errorMessage}</Message>;
  }

  if (!products || products.length === 0) {
    return <Message>No products found</Message>;
  }

  return (
    <div className="carousel-container" aria-label="Featured Products Carousel">
      <div className="carousel-track">
        {products.map((product:any) => (
          <div className="carousel-item" key={product._id}>
            <Link to={`/product/${product._id}`} className="carousel-link">
              <img src={product.image} alt={product.name}
               className="carousel-image" />
              {/* <div className="carousel-caption">
                <h2>
                  {product.name} (${product.price})
                </h2>
              </div> */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
