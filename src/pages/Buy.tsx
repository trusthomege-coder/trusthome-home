import React, { useState } from 'react';
import { Home, DollarSign, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import PropertyCard from '../components/PropertyCard';

const Buy: React.FC = () => {
  const { t } = useLanguage();
  const [priceRange, setPriceRange] = useState('all');
  const [propertyType, setPropertyType] = useState('all');

  const saleProperties = [
    {
      id: 1,
      title: 'Modern Apartment Downtown',
      price: 350000,
      location: 'Tbilisi Center',
      bedrooms: 2,
      bathrooms: 2,
      area: 850,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    },
    {
      id: 2,
      title: 'Luxury Villa with Pool',
      price: 750000,
      location: 'Vake District',
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      image: 'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg',
    },
    {
      id: 3,
      title: 'Cozy Family House',
      price: 280000,
      location: 'Saburtalo',
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
    },
    {
      id: 4,
      title: 'Studio Apartment',
      price: 120000,
      location: 'Isani',
      bedrooms: 1,
      bathrooms: 1,
      area: 450,
      image: 'https://images.pexels.com/photos/2121120/pexels-photo-2121120.jpeg',
    },
    {
      id: 5,
      title: 'Penthouse with View',
      price: 950000,
      location: 'Vera',
      bedrooms: 3,
      bathrooms: 3,
      area: 1800,
      image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg',
    },
    {
      id: 6,
      title: 'Garden House',
      price: 420000,
      location: 'Dighomi',
      bedrooms: 4,
      bathrooms: 2,
      area: 1600,
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
    },
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices', min: 0, max: Infinity },
    { value: '0-200k', label: 'Under $200K', min: 0, max: 200000 },
    { value: '200k-400k', label: '$200K - $400K', min: 200000, max: 400000 },
    { value: '400k-600k', label: '$400K - $600K', min: 400000, max: 600000 },
    { value: '600k-1m', label: '$600K - $1M', min: 600000, max: 1000000 },
    { value: '1m+', label: 'Over $1M', min: 1000000, max: Infinity },
  ];

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: t('apartment') },
    { value: 'house', label: t('house') },
    { value: 'villa', label: t('villa') },
  ];

  const filterProperties = () => {
    let filtered = saleProperties;

    // Filter by price range
    if (priceRange !== 'all') {
      const range = priceRanges.find(r => r.value === priceRange);
      if (range) {
        filtered = filtered.filter(prop => prop.price >= range.min && prop.price <= range.max);
      }
    }

    // Filter by property type (simplified for demo)
    if (propertyType !== 'all') {
      // In a real app, properties would have a type field
      filtered = filtered.filter(prop => {
        const title = prop.title.toLowerCase();
        if (propertyType === 'apartment') return title.includes('apartment') || title.includes('studio') || title.includes('penthouse');
        if (propertyType === 'house') return title.includes('house');
        if (propertyType === 'villa') return title.includes('villa');
        return true;
      });
    }

    return filtered;
  };

  const filteredProperties = filterProperties();

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
            <Home className="h-8 w-8 text-blue-700" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('propertiesFor')} {t('forSale')}
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Discover your dream home from our premium property collection
          </p>
        </motion.div>

        {/* Financing Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start space-x-3">
            <DollarSign className="h-6 w-6 text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Flexible Financing Options</h3>
              <p className="text-green-700 text-sm">
                We partner with leading banks to offer competitive mortgage rates starting from 3.5% APR. 
                Get pre-approved in 24 hours and access exclusive buyer programs.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filter Properties</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('propertyType')}
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Results count */}
            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{filteredProperties.length}</span> properties found
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <PropertyCard {...property} />
            </motion.div>
          ))}
        </div>

        {/* No results message */}
        {filteredProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Home className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
            <button
              onClick={() => {
                setPriceRange('all');
                setPropertyType('all');
              }}
              className="bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Buyer Services Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Make an Offer?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our experienced buyer agents will help you negotiate the best deal, 
            arrange inspections, and guide you through the entire purchase process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Schedule Consultation
            </button>
            <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-700 transition-colors duration-200">
              Get Pre-Approved
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Buy;