'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProperty, updateProperty } from '../../features/seller/SellerSlice';
import { Edit3Icon } from 'lucide-react';

export default function AddPropertyModal({ handleModal, openModal }) {
  const {Edit} = useSelector((state)=>state.seller)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    description: '',
    price: '',
    propertyType: '',
    configuration: '',
    sqFeet: '',
    yearBuilt: '',
    amenities: [],
    propertyImage: []
  });
    const handleSubmit = (e)=>{
        e.preventDefault()
        const data = new FormData()
        data.append('title',formData.title)
        data.append('address',formData.address)
        data.append('city',formData.city)
        data.append('state',formData.state)
        data.append('zipcode',formData.zipcode)
        data.append('description',formData.description)
        data.append('price',formData.price)
        data.append('propertyType',formData.propertyType)
        data.append('configuration',formData.configuration)
        data.append('sqFeet',formData.sqFeet)
        data.append('yearBuilt',formData.yearBuilt)
        data.append('amenities',formData.amenities)
        for(const file of formData.propertyImage){
            data.append('propertyImage',file)
        }
        Edit.isEdit?dispatch(updateProperty({id:Edit.propertyData._id,data})):dispatch(addProperty(data))
        setFormData({
            title: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            description: '',
            price: '',
            propertyType: '',
            configuration: '',
            sqFeet: '',
            yearBuilt: '',
            amenities: [],
            propertyImage: []
        })
        handleModal()
    }
  
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e)=>{
    const {name,value,type,files} = e.target 
    console.log(name,value,type,files)
    if(type==='checkbox'){
        let updatedAmenities = [...formData.amenities];
        if (updatedAmenities.includes(value)) {
            updatedAmenities = updatedAmenities.filter(item => item !== value);
        } else {
            updatedAmenities.push(value);
        }
        setFormData({...formData,
            amenities: updatedAmenities
        })
    }
    else if(type==='file'){
        const fileArray = Array.from(files);
        const newPreviews = fileArray.map(file => URL.createObjectURL(file));
        
        setImagePreviews(prev => {
            // Only revoke if they were object URLs we created. 
            // If they were string URLs (from backend), don't revoke.
            prev.forEach(url => {
                 if(url.startsWith('blob:')) URL.revokeObjectURL(url)
            });
            return newPreviews;
        });

        setFormData({...formData,
            propertyImage:files
        })
    }
    else{
        setFormData({...formData,
            [name]:value
        })
    }
  }

  const removeImage = (indexToRemove) => {
    // Determine if we are removing a File (new upload) or a URL (existing image)
    // The logic depends on what propertyImage contains.
    // If it's a FileList (from upload), we can't mutate it easily, but we can convert to Array.
    
    // Simplification: We will just filter the imagePreviews, 
    // BUT we also need to update formData.propertyImage so it doesn't get submitted.
    // However, for existing images (Edit mode), they might be strings.
    // For new images, they are Files.
    
    // This is tricky because formData.propertyImage might be a FileList (read-only) or array of Strings.
    
    const currentImages = Array.from(formData.propertyImage || []); // Convert to array to be safe
    const updatedImages = currentImages.filter((_, index) => index !== indexToRemove);
    
    const updatedPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);
    setImagePreviews(updatedPreviews);
    
    setFormData({
        ...formData,
        propertyImage: updatedImages
    });
  };

  const propertyTypes = ['Residential', 'Commercial', 'Industrial', 'Land', 'Multi-Family'];
  const configurations = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK', 'Studio'];
  const amenitiesList = ['Swimming Pool', 'Gym', 'Parking', 'Garden', 'Security', 'Library', 'Community Center', 'Tennis Court', 'Balcony', 'Lift'];

  if (!openModal) return null;

  useEffect(()=>{
    if(Edit?.isEdit){
        // Clone propertyData to avoid mutating Redux state directly if it's shallow
        const propertyData = { ...Edit.propertyData };

        // Fix amenities if they are a string (common issue with FormData/Mongoose)
        if (typeof propertyData.amenities === 'string') {
            propertyData.amenities = propertyData.amenities.split(',');
        } else if (Array.isArray(propertyData.amenities) && propertyData.amenities.length === 1 && propertyData.amenities[0].includes(',')) {
             // Handle case where it's ["Gym,Pool"]
             propertyData.amenities = propertyData.amenities[0].split(',');
        }

        setFormData(propertyData)
        
        // Set image previews from existing property images
        if (propertyData.propertyImage && Array.isArray(propertyData.propertyImage)) {
            setImagePreviews(propertyData.propertyImage);
        }
    }
  },[Edit])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Property</h2>
            <p className="text-sm text-gray-600 mt-1">Fill in the details below to list your property</p>
          </div>
          <button
            onClick={handleModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <form className="p-8 space-y-8">
          {/* Basic Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.5m0 0H9.5m0 0H4" />
              </svg>
              Basic Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
                <input
                name='title'
                onChange={handleChange}
                value={formData.title}
                  type="text"
                  placeholder="e.g., Luxury Modern Villa with Garden"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                name='address'
                onChange={handleChange}
                value={formData.address}
                  type="text"
                  placeholder="e.g., 123 Oak Street"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                name='city'
                onChange={handleChange}
                value={formData.city}
                  type="text"
                  placeholder="e.g., Austin"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                name='state'
                onChange={handleChange}
                value={formData.state}
                  type="text"
                  placeholder="e.g., Texas"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Zip Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                <input
                name='zipcode'
                onChange={handleChange}
                value={formData.zipcode}
                  type="text"
                  placeholder="e.g., 78701"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                <input
                name='price'
                onChange={handleChange}
                value={formData.price}
                  type="number"
                  placeholder="e.g., 1,250,000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Property Details Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Property Details
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select
                name='propertyType'
                onChange={handleChange}
                value={formData.propertyType}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                  <option value="">Select Property Type</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Configuration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Configuration</label>
                <select
                name='configuration'
                onChange={handleChange}
                value={formData.configuration}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                  <option value="">Select Configuration</option>
                  {configurations.map((config) => (
                    <option key={config} value={config}>{config}</option>
                  ))}
                </select>
              </div>

              {/* Square Feet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Square Feet</label>
                <input
                name='sqFeet'
                onChange={handleChange}
                value={formData.sqFeet}
                  type="number"
                  placeholder="e.g., 2500"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Year Built */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year Built</label>
                <input
                name='yearBuilt'
                onChange={handleChange}
                value={formData.yearBuilt}
                  type="number"
                  placeholder="e.g., 2020"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
            name='description'
            onChange={handleChange}
            value={formData.description}
                          rows="4"
              placeholder="Describe your property in detail. Include special features, recent renovations, and any unique characteristics..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Amenities Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Amenities
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                  name='amenities'
                  onChange={handleChange}
                  value={amenity}
                  checked={formData.amenities.includes(amenity)}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Photo Upload Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Property Photos
            </h3>

            {/* Multiple File Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <input
                name='propertyImage'
                onChange={handleChange}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="property-images"
              />
              <label htmlFor="property-images" className="cursor-pointer">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-gray-700 font-medium">Click to upload photos or drag and drop</p>
                <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 10MB each. Upload multiple photos.</p>
              </label>
            </div>
            
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                            <img 
                                src={preview} 
                                alt={`Preview ${index + 1}`} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="p-1 bg-white rounded-full text-red-600 hover:text-red-700"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}


          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6  border-gray-200">
            <button
              type="button"
              onClick={handleModal}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            {
              Edit?.isEdit? (<button
            onClick={handleSubmit}
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Edit3Icon className="w-5 h-5 ml-2"/>
              Update Property
            </button>):(<button
            onClick={handleSubmit}
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Property
            </button>)
            }
          </div>
        </form>
      </div>
    </div>
  );
}
