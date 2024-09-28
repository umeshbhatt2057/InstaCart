import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayNPRCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';

const CategroyWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault(); // Prevent default behavior of the link click
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    console.log("horizontal data", categoryProduct.data);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
        {
          loading ? (
            loadingList.map((_, index) => (
              <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' key={index}>
                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'></div>
                <div className='p-4 grid gap-3'>
                  <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                  <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                  <div className='flex gap-3'>
                    <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                    <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                  </div>
                  <button className='text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse'></button>
                </div>
              </div>
            ))
          ) : (
            data.map((product) => {
              const originalPrice = parseFloat(product.price);
              const sellingPrice = parseFloat(product.sellingPrice);
              const discount = originalPrice - sellingPrice;
              const discountPercentage = originalPrice > 0 ? ((discount / originalPrice) * 100).toFixed(0) : 0;

              return (
                <Link
                  to={"/product/" + product?._id}
                  className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'
                  onClick={scrollTop}
                  key={product._id}
                >
                  <div className='relative'>
                    <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                      <img
                        src={product.productImage[0]}
                        className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'
                        alt={product.productName}
                      />
                    </div>
                    {discount > 0 && (
                      <div className='absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium'>
                        {discountPercentage}% OFF
                      </div>
                    )}
                  </div>
                  <div className='p-4 grid gap-3'>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                      {product?.productName}
                    </h2>
                    <p className='capitalize text-slate-500'>{product?.category}</p>
                    <div className='flex gap-3'>
                      <p className='text-red-600 font-medium text-2xl'>{displayNPRCurrency(sellingPrice)}</p>
                      {originalPrice > sellingPrice && (
                        <p className='text-slate-500 line-through'>{displayNPRCurrency(originalPrice)}</p>
                      )}
                    </div>
                    <button
                      className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })
          )
        }
      </div>
    </div>
  );
};

export default CategroyWiseProductDisplay;
