import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayNPRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);

    const scrollElement = useRef();
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        e.stopPropagation(); // Prevents navigation on button click
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        // Reverse the data array to show the latest products first
        setData(categoryProduct?.data.reverse());
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            <div
                className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all'
                ref={scrollElement}
            >
                <button
                    className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block'
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block'
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>

                {loading ? (
                    loadingList.map((_, index) => (
                        <div
                            key={index}
                            className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'
                        >
                            <div className='bg-slate-200 h-full w-1/3 p-4 min-w-[120px] md:min-w-[145px] animate-pulse' />
                            <div className='p-4 w-2/3 flex flex-col justify-between'>
                                <div className='flex flex-col'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full' />
                                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full' />
                                </div>
                                <div className='flex flex-col mt-2'>
                                    <div className='flex gap-3 items-center'>
                                        <p className='text-red-600 font-medium text-sm bg-slate-200 w-full animate-pulse rounded-full' />
                                        <p className='text-slate-500 line-through text-sm bg-slate-200 w-full animate-pulse rounded-full' />
                                    </div>
                                    <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse mt-2' />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => {
                        const originalPrice = product.price;
                        const sellingPrice = product.sellingPrice;
                        const discount = originalPrice - sellingPrice;
                        const discountPercentage = ((discount / originalPrice) * 100).toFixed(0);

                        return (
                            <Link
                                to={"product/" + product?._id}
                                key={product._id}
                                className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex relative'
                            >
                                <div className='w-1/3 bg-slate-200 h-full p-4 relative'>
                                    <img
                                        src={product.productImage[0]}
                                        className='object-cover h-full w-full hover:scale-110 transition-all'
                                        alt={product?.productName}
                                    />
                                    {discount > 0 && (
                                        <div className='absolute top-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1'>
                                            <span>{discountPercentage}% OFF</span>
                                        </div>
                                    )}
                                </div>
                                <div className='p-4 w-2/3 flex flex-col justify-between'>
                                    <div className='flex flex-col'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                                            {product?.productName}
                                        </h2>
                                        <p className='capitalize text-slate-500'>
                                            {product?.category}
                                        </p>
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <div className='flex gap-3 items-center'>
                                            <p className='text-red-600 font-medium text-2xl'>
                                                {displayNPRCurrency(sellingPrice)}
                                            </p>
                                            {discount > 0 && (
                                                <p className='text-slate-500 line-through text-sm'>
                                                    {displayNPRCurrency(originalPrice)}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full w-full mt-2'
                                            onClick={(e) => handleAddToCart(e, product?._id)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default HorizontalCardProduct;
