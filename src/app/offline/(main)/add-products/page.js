'use client'

import React, { useState } from 'react';

const ProductForm = () => {
  // Main product state
  const [product, setProduct] = useState({
    title: '',
    details: '',
    images: [''], // Multiple images
    active: true,
  });

  // Variants state
  const [variants, setVariants] = useState([
    {
      color: '#ff0000', // default red
      size: 'M',
      stock: 0,
      actual_price: 0,
      offer: 0,
      offer_type: 'percentage',
    },
  ]);

  // Handle product main fields
  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle image URL changes
  const handleImageChange = (index, e) => {
    const newImages = [...product.images];
    newImages[index] = e.target.value;
    setProduct(prev => ({ ...prev, images: newImages }));
  };

  // Add new image field
  const addImageField = () => {
    setProduct(prev => ({ ...prev, images: [...prev.images, ''] }));
  };
 const deleteImage = (index) => {
    const newImages = product.images.filter((_, i) => i !== index);
    setProduct(prev => ({ ...prev, images: newImages.length ? newImages : [''] }));
  };

  // Handle variant changes
  const handleVariantChange = (index, e) => {
    const { name, value, type } = e.target;
    const newVariants = [...variants];
    newVariants[index][name] = ['stock', 'actual_price', 'offer'].includes(name) ? Number(value) : value;
    setVariants(newVariants);
  };

  // Add new variant
  const addVariant = () => {
    setVariants(prev => [
      ...prev,
      {
        color: '#ff0000',
        size: 'M',
        stock: 0,
        actual_price: 0,
        offer: 0,
        offer_type: 'percentage',
      },
    ]);
  };

  const deleteVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants.length ? newVariants : [
      {
        color: '#ff0000',
        size: 'M',
        stock: 0,
        actual_price: 0,
        offer: 0,
        offer_type: 'percentage',
      },
    ]);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...product, variants };
    console.log('Final Data to Send:', finalData);
  };

  return (
     <div className="min-h-screen bg-gray-100 p-8 text-black">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">🛍️ Add New Product</h2>

        {/* Product Details */}
        <section className="mb-8 p-4 border rounded-lg bg-indigo-50">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Product Details</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleProductChange}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="details"
              value={product.details}
              onChange={handleProductChange}
              rows="3"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Images */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Images</label>
            {product.images.map((img, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                <input
                  type="url"
                  value={img}
                  onChange={(e) => handleImageChange(index, e)}
                  placeholder="Image URL"
                  required
                  className="flex-1 mt-1 px-3 py-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => deleteImage(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              + Add Another Image
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="active"
              checked={product.active}
              onChange={handleProductChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm font-medium text-gray-700">Active</label>
          </div>
        </section>

        {/* Variants */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Variants</h3>

          {variants.map((variant, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg mb-4 bg-white">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-lg">Variant #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => deleteVariant(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Color</label>
                  <input
                    type="color"
                    name="color"
                    value={variant.color}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="mt-1 w-full h-10 border rounded-md"
                  />
                </div>

                {/* Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Size</label>
                  <select
                    name="size"
                    value={variant.size}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={variant.stock}
                    onChange={(e) => handleVariantChange(index, e)}
                    min="0"
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>

                {/* Actual Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                  <input
                    type="number"
                    name="actual_price"
                    value={variant.actual_price}
                    onChange={(e) => handleVariantChange(index, e)}
                    min="0"
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>

                {/* Offer & Offer Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Offer</label>
                  <input
                    type="number"
                    name="offer"
                    value={variant.offer}
                    onChange={(e) => handleVariantChange(index, e)}
                    min="0"
                    max="100"
                    className="mt-1 block w-full px-3 py-2 border rounded-md mb-2"
                  />
                  <select
                    name="offer_type"
                    value={variant.offer_type}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="flat">Flat</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            + Add New Variant
          </button>
        </section>

        {/* Submit */}
        <div className="mt-6 border-t pt-4">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
