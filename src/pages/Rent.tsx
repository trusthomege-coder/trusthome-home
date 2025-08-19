import React, { useState } from 'react';
import { Calendar, Clock, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import PropertyCard from '../components/PropertyCard';

const Rent: React.FC = () => {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState('price-asc');

  const rentalProperties = [
    {
      id: 1,
      title: 'Modern Studio Downtown',
      price: 1200,
      location: 'Tbilisi Center',
      bedrooms: 1,
      bathrooms: 1,
      area: 450,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    },
    {
      id: 2,
      title: 'Cozy 2BR Apartment',
      price: 1800,
      location: 'Vake District',
      bedrooms: 2,
      bathrooms: 2,
      area: 800,
      image: 'https://images.pexels.com/photos/2121120/pexels-photo-2121120.jpeg',
    },
    {
      id: 3,
      title: 'Family House with Garden',
      price: 2500,
      location: 'Saburtalo',
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
    },
    {
      id: 4,
      title: 'Luxury Penthouse',
      price: 3500,
      location: 'Vera',
      bedrooms: 3,
      bathrooms: 3,
      area: 1600,
      image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg',
    },
    {
      id: 5,
      title: 'Student Friendly Apartment',
      price: 800,
      location: 'Isani',
      bedrooms: 1,
      bathrooms: 1,
      area: 400,
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
    },
    {
      id: 6,
      title: 'Executive Suite',
      price: 2800,
      location: 'Dighomi',
      bedrooms: 2,
      bathrooms: 2,
      area: 1000,
      image: 'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg',
    },
  ];

  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'area-desc', label: 'Area: Largest First' },
    { value: 'bedrooms-desc', label: 'Most Bedrooms' },
  ];

  const sortProperties = (properties: typeof rentalProperties, sortBy: string) => {
    return [...properties].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'area-desc':
          return b.area - a.area;
        case 'bedrooms-desc':
          return b.bedrooms - a.bedrooms;
        default:
          return 0;
      }
    });
  };

  const sortedProperties = sortProperties(rentalProperties, sortBy);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="h-8 w-8 text-blue-700" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('propertiesFor')} {t('forRent')}
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Find your perfect rental property from our curated selection
          </p>
        </motion.div>

        {/* Rental Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start space-x-3">
            <Clock className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Quick Rental Process</h3>
              <p className="text-blue-700 text-sm">
                All rental properties come with transparent lease terms, verified landlords, 
                and our rental guarantee program. Move-in ready properties available for immediate occupancy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">
              {sortedProperties.length} rental properties available
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <PropertyCard {...property} isForRent={true} />
            </motion.div>
          ))}
        </div>

        {/* Rental Services Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Help Finding the Perfect Rental?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our rental specialists can help you find properties that match your exact requirements, 
            budget, and timeline. Free consultation and personalized recommendations.
          </p>
          <button className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            Contact Rental Specialist
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Rent;