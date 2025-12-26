'use client'

import UploadImageGetUrl from '@/components/UploadImageGetUrl';
import { axiosInstanceWithOfflineToken } from '@/helper/axiosinstance';
import { Box, Image, Loader2, Plus, Trash2, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductForm() {

    const params = useParams();
    const editId = params?.id;

    const defaultValues = {
        title: '',
        price: 0,
        details: '',
        images: '', // Changed to string
        active: true,
        variants: [
            {
                color: '#ff0000',
                size: 'xl',
                stock: 0,
                actual_price: 0,
                offer: 0,
                offer_type: 'percentage',
            },
        ],
    };

    const { register, control, reset, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm({
        defaultValues,
    });

    const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
        control,
        name: 'variants',
    });

    const mainPrice = watch('price');
    const variants = watch('variants');
    const currentImages = watch('images');

    const [manuallyChangedPrices, setManuallyChangedPrices] = useState(new Set());

    // Function to handle image URL from UploadImageGetUrl
    const handleImageUploaded = (url) => {
        const trimmedUrl = url.trim();
        if (!trimmedUrl) return;

        // If images field is empty, just set the URL
        if (!currentImages || currentImages.trim() === '') {
            setValue('images', trimmedUrl);
        } else {
            // Otherwise, append with comma separator
            setValue('images', `${currentImages}, ${trimmedUrl}`);
        }
    };

    // Sync price
    useEffect(() => {
        variants.forEach((variant, index) => {
            if (!manuallyChangedPrices.has(index)) {
                setValue(`variants.${index}.actual_price`, mainPrice);
            }
        });
    }, [mainPrice, variants.length]);

    const handleVariantPriceChange = (index) => {
        setManuallyChangedPrices(prev => new Set([...prev, index]));
    };

    // ⭐ Load edit data from sessionStorage
    useEffect(() => {
        const saved = sessionStorage.getItem("edit_product");

        if (saved) {
            const product = JSON.parse(saved);

            const editValues = {
                title: product.title || '',
                price: product.variants?.[0]?.actual_price || 0,
                details: product.details || '',
                images: product.images?.length ? product.images.join(', ') : '', // Convert array to comma-separated string
                active: product.active ?? true,
                variants: product.variants?.length
                    ? product.variants.map(v => ({
                        color: v.color || '#ff0000',
                        size: v.size || 'xl',
                        stock: v.stock || 0,
                        actual_price: v.actual_price || 0,
                        offer: v.offer || 0,
                        offer_type: v.offer_type || 'percentage',
                    }))
                    : defaultValues.variants,
            };

            reset(editValues);
        } else {
            toast.error("No product data found!");
        }
    }, []);


    // ⭐ Submit Handler (Update Only)
    const onSubmit = async (formData) => {
        if (!editId) {
            toast.error("Product ID not found!");
            return;
        }

        const { price, images, ...restData } = formData;

        // Convert comma-separated string to array
        const imagesArray = images
            .split(',')
            .map(url => url.trim())
            .filter(url => url !== '');

        restData.variants = restData.variants.map(v => ({
            ...v,
            actual_price: v.actual_price,
        }));

        try {
            await axiosInstanceWithOfflineToken.put(
                `/api/offline/products/w/update/${editId}`,
                {
                    ...restData,
                    images: imagesArray // Send as array
                }
            );

            toast.success("Product updated successfully!");
            sessionStorage.removeItem("edit_product");

            setTimeout(() => {
                window.history.back();
            }, 500);

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to update product!");
        }
    };

    const handleCancel = () => {
        sessionStorage.removeItem("edit_product");
        window.history.back();
    };
    // Remove URL
    const handleRemoveUrl = (url) => {
        const updatedImages = currentImages
            .split(',')
            .filter(image => image.trim() !== url)
            .join(',');

        setValue('images', updatedImages);
    }




    return (

        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl shadow-md flex items-center justify-center">
                    <Box className="w-5 h-5 text-indigo-600" />
                </div>
                <h1 className="text-lg text-gray-900">
                    Edit Product
                </h1>
            </div>

            <UploadImageGetUrl onImageUploaded={handleImageUploaded} />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* --- Product Details --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <h2 className="text-base font-semibold text-gray-900 p-4 mb-4 bg-blue-100">
                        Product Details
                    </h2>

                    <div className="space-y-4 px-6 pb-6">

                        {/* Title + Price */}
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_150px] gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter product title"
                                    {...register('title', { required: "Title required" })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm md:text-end font-medium text-gray-700 mb-1">Price (₹)</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    {...register('price', {
                                        required: 'Price is required',
                                        min: { value: 0, message: 'Price must be positive' }
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-center"
                                />
                                {errors.price && (
                                    <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                rows="4"
                                placeholder="Enter product description"
                                {...register('details', { required: 'Description is required' })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                            />
                            {errors.details && (
                                <p className="text-red-500 text-xs mt-1">{errors.details.message}</p>
                            )}
                        </div>

                        {/* Images - Single Input */}
                        <div>
                            {currentImages.length > 0 &&
                                <div className="flex flex-wrap gap-2">
                                    {currentImages.split(',')
                                        .map(url => url.trim()).map((url, index) => (
                                            <div key={index} className="relative mb-2">
                                                <img src={url} alt={`Image ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveUrl(url)}
                                                    className="absolute right-2 top-2 cursor-pointer bg-red-500 rounded text-white hover:bg-red-600"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            }
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Images (comma-separated URLs)
                            </label>
                            <div className="relative">
                                <Image className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                                <textarea
                                    rows="3"
                                    placeholder="Enter image URLs separated by commas (use upload button above)"
                                    {...register('images', { required: 'At least one image URL is required' })}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                />
                            </div>
                            {errors.images && (
                                <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                                Tip: Use the "Upload Image" button above to automatically add URLs
                            </p>
                        </div>

                        {/* Active */}
                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="active"
                                {...register('active')}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="active" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                    </div>
                </div>

                {/* --- Variants Section --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="flex items-center justify-between text-base font-semibold text-gray-900 p-4 bg-gray-100">
                        <h2 className="text-base font-semibold text-gray-900">Product Variants</h2>
                        <button
                            type="button"
                            onClick={() =>
                                appendVariant({
                                    color: '#ff0000',
                                    size: 'xl',
                                    stock: 0,
                                    actual_price: mainPrice,
                                    offer: 0,
                                    offer_type: 'percentage',
                                })
                            }
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Variant
                        </button>
                    </div>

                    <div className="space-y-4 p-6">
                        {variantFields.map((field, index) => (
                            <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-medium text-gray-900">Variant #{index + 1}</h3>
                                    {variantFields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                removeVariant(index);
                                                setManuallyChangedPrices(prev => {
                                                    const newSet = new Set(prev);
                                                    newSet.delete(index);
                                                    // Reindex remaining items
                                                    const reindexed = new Set();
                                                    newSet.forEach(i => {
                                                        if (i > index) reindexed.add(i - 1);
                                                        else reindexed.add(i);
                                                    });
                                                    return reindexed;
                                                });
                                            }}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                    {/* Color */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Color
                                        </label>
                                        <Controller
                                            control={control}
                                            name={`variants.${index}.color`}
                                            render={({ field }) => (
                                                <div className="flex items-center rounded-md justify-between px-1.5 border-gray-300 border gap-2">
                                                    <div className='flex items-center py-1 md:gap-2 gap-1'>
                                                        <input
                                                            type="color"
                                                            {...field}
                                                            className="w-5 h-6 border-gray-300 cursor-pointer"
                                                        />
                                                        <span className="text-xs text-gray-600">{field.value}</span>
                                                    </div>
                                                    <img src="/assets/color-wheel.png" alt="" className="md:w-6 md:h-6 w-4 h-4" />
                                                </div>
                                            )}
                                        />
                                    </div>

                                    {/* Size */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Size
                                        </label>
                                        <select
                                            {...register(`variants.${index}.size`)}
                                            defaultValue={watch(`variants.${index}.size`).toLocaleLowerCase()}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm cursor-pointer"
                                        >
                                            {sizeOptions.map((s) => (
                                                <option key={s} value={s.toLowerCase()}>{s}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Stock */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Stock
                                        </label>

                                        <input
                                            type="number"
                                            min={0}
                                            {...register(`variants.${index}.stock`, { valueAsNumber: true })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                   outline-none text-sm"
                                        />
                                    </div>


                                    {/* Price */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Price (₹)
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            {...register(`variants.${index}.actual_price`, {
                                                min: { value: 0, message: 'Price must be positive' }
                                            })}
                                            onChange={(e) => {
                                                register(`variants.${index}.actual_price`).onChange(e);
                                                handleVariantPriceChange(index);
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm cursor-pointer"
                                        />
                                    </div>

                                    {/* Offer */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Offer
                                        </label>
                                        <div className="flex gap-1">
                                            <input
                                                type="number"
                                                placeholder="0"
                                                {...register(`variants.${index}.offer`, {
                                                    min: { value: 0, message: 'Offer must be positive' },
                                                    max: { value: 100, message: 'Max 100' }
                                                })}
                                                className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm cursor-pointer"
                                            />
                                            <select
                                                {...register(`variants.${index}.offer_type`)}
                                                className="flex-1 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs cursor-pointer"
                                            >
                                                <option value="percentage">%</option>
                                                <option value="flat">₹</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Action Buttons --- */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={handleSubmit(onSubmit)}
                        className={`py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Updating...
                            </span>
                        ) : (
                            "Update Product"
                        )}

                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>

    );
}