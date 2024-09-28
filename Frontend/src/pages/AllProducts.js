import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      const dataResponse = await response.json();

      if (dataResponse.success) {
        setAllProduct(dataResponse?.data || []);
      } else {
        console.error("Failed to fetch products:", dataResponse.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button
          className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/** All products */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map(product => (
            <AdminProductCard 
              data={product} 
              key={product.id} // Assuming `product.id` is a unique identifier
              fetchdata={fetchAllProduct}
            />
          ))
        }
      </div>

      {/** Upload product component */}
      {
        openUploadProduct && (
          <UploadProduct 
            onClose={() => setOpenUploadProduct(false)} 
            fetchData={fetchAllProduct}
          />
        )
      }
    </div>
  );
}

export default AllProducts;
