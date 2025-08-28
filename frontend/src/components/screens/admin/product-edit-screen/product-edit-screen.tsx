import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Message from '../../../message/message';
import Loader from '../../../spinner/spinner';
import FormContainer from '../../../form-container/form-container';
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../../../slices/product-slice';
import "./product-edit-screen.css"


const ProductEditScreen: React.FC = () => {
  const { id: productId } = useParams<{ id: string }>();

  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [countInStock, setCountInStock] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();
      toast.success('Product updated');
      refetch();
      navigate('/admin/productlist');
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setImage(res.image);
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Link to='/admin/productlist'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{(error as any).data?.message || 'Error'}</Message>
        ) : (
          <form className="edit-form" onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor='name'>Name</label>
              <input
                id='name'
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor='price'>Price</label>
              <input
                id='price'
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor='image'>Image</label>
              <input
                id='image'
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="form-control"
              />
              <input
                type='file'
                onChange={uploadFileHandler}
                className="form-control"
                style={{ marginTop: '0.5rem' }}
              />
              {loadingUpload && <Loader />}
            </div>

            <div className="form-group">
              <label htmlFor='brand'>Brand</label>
              <input
                id='brand'
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor='countInStock'>Count In Stock</label>
              <input
                id='countInStock'
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor='category'>Category</label>
              <input
                id='category'
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor='description'>Description</label>
              <input
                id='description'
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              />
            </div>

            <button type='submit' className='btn btn-primary' style={{ marginTop: '1rem' }}>
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
