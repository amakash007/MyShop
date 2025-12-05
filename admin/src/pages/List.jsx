import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    if (!token) {
      toast.error('Authentication token is missing.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching product list:', error);
      toast.error('Failed to fetch product list.');
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    if (!token) {
      toast.error('Authentication token is missing.');
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setList((prevList) => prevList.filter((item) => item._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error removing product:', error);
      toast.error('Failed to remove product.');
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]); // Refetch when token changes

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">All Products List</h2>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border-b bg-gray-100 text-sm font-semibold">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className="text-center">Action</p>
      </div>

      {/* Loading State (Skeleton) */}
      {loading ? (
        <div className="space-y-2 mt-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 animate-pulse"
            >
              <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-6 bg-gray-300 rounded w-8 mx-auto"></div>
            </div>
          ))}
        </div>
      ) : list.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No products found.</p>
      ) : (
        list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-2 px-4 border-b text-sm transition-all hover:bg-gray-50"
          >
            <img
              src={item.image[0]}
              className="w-12 h-12 object-cover rounded-md"
              alt={item.name}
            />
            <p className="truncate">{item.name}</p>
            <p className="text-gray-600">{item.category}</p>
            <p className="text-green-600 font-semibold">
              {currency} {item.price}
            </p>
            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-500 hover:text-red-700 transition text-lg text-center"
            >
              ✖
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default List;
