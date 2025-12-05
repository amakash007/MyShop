import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("MEN");
  const [subCategory, setSubCategory] = useState("TOPWEAR");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((image, index) => {
        if (image) formData.append(`image${index + 1}`, image);
      });

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImages([null, null, null, null]);
        setPrice("");
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-5 bg-white shadow-md p-6 rounded-lg max-w-lg mx-auto"
    >
      {/* Image Upload */}
      <div>
        <p className="mb-2 font-medium text-gray-700">UPLOAD IMAGES</p>
        <div className="flex gap-3">
          {images.map((image, index) => (
            <label key={index} className="cursor-pointer">
              <img
                className="w-20 h-20 border border-gray-300 rounded-md object-cover"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
              />
              <input
                type="file"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2 font-medium text-gray-700">PRODUCT NAME</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter product name"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2 font-medium text-gray-700">PRODUCT DESCRIPTION</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Enter product description"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Category, Subcategory, and Price */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div>
          <p className="mb-2 font-medium text-gray-700">CATEGORY</p>
          <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded-md">
            <option value="MEN">MEN</option>
            <option value="WOMEN">WOMEN</option>
            <option value="KIDS">KIDS</option>
          </select>
        </div>
        <div>
          <p className="mb-2 font-medium text-gray-700">SUBCATEGORY</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2 border rounded-md">
            <option value="TOPWEAR">TOPWEAR</option>
            <option value="BOTTOMWEAR">BOTTOMWEAR</option>
            <option value="WINTERWEAR">WINTERWEAR</option>
          </select>
        </div>
        <div>
          <p className="mb-2 font-medium text-gray-700">PRICE</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="Enter price"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2 font-medium text-gray-700">PRODUCT SIZES</p>
        <div className="flex gap-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() => setSizes((prev) => (prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]))}
              className={`px-3 py-1 cursor-pointer rounded-md transition-all ${
                sizes.includes(size) ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="cursor-pointer"
        />
        <label htmlFor="bestseller" className="cursor-pointer font-medium text-gray-700">
          Add to Bestseller
        </label>
      </div>

      {/* Submit Button with Loading State */}
      <button
        type="submit"
        className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md transition-all hover:bg-blue-700 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin h-5 w-5 border-t-2 border-white border-solid rounded-full mr-2"></div>
            Submitting...
          </div>
        ) : (
          "ADD PRODUCT"
        )}
      </button>
    </form>
  );
};

export default Add;
