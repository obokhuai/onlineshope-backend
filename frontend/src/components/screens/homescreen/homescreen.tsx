import "./homescreen.css";
import { useGetProductsQuery } from "../../../../src/slices/product-slice";
import Product from "../../product/product";
import Loader from "../../spinner/spinner";
import Message from "../../message/message";
const HomeScreen: React.FC = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  console.log("data",products)

  console.log("productsP", products);

  return (
    <div className="home-screen">
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant="danger">
          {(error as any)?.data?.message ||
            (error as any)?.error ||
            "An error occurred"}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
              <div className="product-grid">
            {products &&
              products.map((product) => (
                <div className="product-grid-item" key={product._id}>
                  <Product product={product} />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
