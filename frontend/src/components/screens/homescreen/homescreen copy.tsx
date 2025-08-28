// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// // import { useGetProductsQuery } from '../slices/productsApiSlice';
// // import Product from '../components/Product';
// // import Loader from '../components/Loader';
// // import Message from '../components/Message';
// // import Paginate from '../components/Paginate';
// // import ProductCarousel from '../components/ProductCarousel';
// // import Meta from '../components/Meta';
// import './homescreen.css';
// import { useGetProductsQuery } from '../../../slices/product-slice';
// import Product from '../../product/product';
// import Loader from '../../spinner/spinner';
// import Message from '../../message/message';
// import Paginate from '../../pagination/paginate';




// const HomeScreen: React.FC = () => {
//   const { pageNumber, keyword } = useParams<{ pageNumber?: string; keyword?: string }>();

//   const { data, isLoading, error } = useGetProductsQuery({
//     keyword,
//     pageNumber,
//   });

//   return (
//     <>
//       {/* {!keyword ? (
//         <ProductCarousel />
//       ) : (
//         <Link to="/" className="btn btn-light mb-4">
//           Go Back
//         </Link>
//       )} */}
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">
//           {(error as any)?.data?.message || (error as any).error}
//         </Message>
//       ) : (
//         <>
//           {/* <Meta /> */}
//           <h1>Latest Products</h1>
//           <div className="row">
//             {data?.products.map((product) => (
//               <div key={product._id} className="col-12 col-md-6 col-lg-4 col-xl-3">
//                 <Product product={product} />
//               </div>
//             ))}
//           </div>
//           <Paginate
//             pages={data?.pages || 0}
//             page={data?.page || 1}
//             keyword={keyword ?? ''}
//           />
//         </>
//       )}
//     </>
//   );
// };

// export default HomeScreen;



import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './homescreen.css';
import { useGetProductsQuery } from '../../../slices/product-slice';
import Product from '../../product/product';
import Loader from '../../spinner/spinner';
import Message from '../../message/message';
import Paginate from '../../pagination/paginate';
import ProductCarousel from '../../product-carousel/product-carousel';


const HomeScreen: React.FC = () => {
  const { pageNumber, keyword } = useParams<{ pageNumber?: string; keyword?: string }>();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  console.log("data",data?.pages)

  return (
    <div className="home-container">
     {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
     

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {(error as any)?.data?.message || (error as any).error}
        </Message>
      ) : (
        <>
          <h1 className="title">Latest Products</h1>
          <div className="grid">
            {data?.products.map((product: any) => (
              <div key={product._id} className="grid-item">
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

