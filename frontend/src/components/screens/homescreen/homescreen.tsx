import "./homescreen.css";
import { useGetProductsQuery } from "../../../../src/slices/product-slice";
import Product from "../../product/product";
const HomeScreen: React.FC = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  console.log("products", products);

  return (
    <div className="home-screen">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>
          {(error as any)?.data?.message ||
            (error as any)?.error ||
            "An error occurred"}
        </div>
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
