import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import VerticalCard from '../components/VerticalCard';

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(SummaryApi.searchProduct.url + query.search);
      const dataResponse = await response.json();

      if (!response.ok) {
        throw new Error(dataResponse.message || 'Something went wrong!');
      }

      setData(dataResponse.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [query.search]);  // Depend only on query.search

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div className='container mx-auto p-4'>
      {loading && <p className='text-lg text-center'>Loading ...</p>}

      {error && !loading && <p className='text-lg text-center text-red-600'>{error}</p>}

      <p className='text-lg font-semibold my-3'>Search Results: {data.length}</p>

      {data.length === 0 && !loading && !error && (
        <p className='bg-white text-lg text-center p-4'>No Data Found...</p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
