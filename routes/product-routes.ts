import { Router } from "express"
import { getProducts, getProductById,createProduct, updateProduct,
  deleteProduct,
  createProductReview,getTopProducts} from "../controllers/product-controller";
import { protect, admin } from "../middleware/auth-middleware";


// const router = Router();
// //router.get('/', getProducts);
// router.route('/').get(getProducts).post(protect, admin, createProduct);
// //router.get('/:id', getProductById);
// router.route('/:id').put(protect, admin, updateProduct)


// export default router;


const router = Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)

export default router;