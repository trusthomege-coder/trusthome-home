import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Shield, CheckCircle, Users, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [currentReview, setCurrentReview] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [requestData, setRequestData] = useState({
    name: '',
    email: '',
    phone: '',
    preferences: '',
  });

  const featuredProperties = [
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
  ];

  const reviews = [
    {
      name: 'Sarah Johnson',
      text: 'Trust Home made finding our dream house so easy. Their team was professional and helped us every step of the way.',
      rating: 5,
    },
    {
      name: 'David Chen',
      text: 'Excellent service! They found us the perfect investment property within our budget. Highly recommended.',
      rating: 5,
    },
    {
      name: 'Maria Rodriguez',
      text: 'The process was smooth and transparent. Trust Home truly lives up to their name.',
      rating: 5,
    },
  ];

  const advantages = [
    {
      icon: Shield,
      title: t('secureDeals'),
      description: t('secureDealsDesc'),
    },
    {
      icon: CheckCircle,
      title: t('verifiedListings'),
      description: t('verifiedListingsDesc'),
    },
    {
      icon: Users,
      title: t('trustedDevelopers'),
      description: t('trustedDevelopersDesc'),
    },
    {
      icon: Zap,
      title: t('easyProcess'),
      description: t('easyProcessDesc'),
    },
  ];

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Hero form data:', formData);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Request form data:', requestData);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg"
            alt="Modern luxury home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Trust Home
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-light mb-4"
          >
            {t('heroTitle')}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-200 mb-12"
          >
            {t('heroSubtitle')}
          </motion.p>

          {/* Hero Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onSubmit={handleHeroSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-4xl mx-auto"
          >
            <input
              type="email"
              placeholder={t('email')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 outline-none flex-1 min-w-0"
            />
            <input
              type="tel"
              placeholder={t('phone')}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 outline-none flex-1 min-w-0"
            />
            <input
              type="text"
              placeholder={t('yourName')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 outline-none flex-1 min-w-0"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200"
            >
              {t('submit')}
            </button>
          </motion.form>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('featuredProperties')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PropertyCard {...property} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Home */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('whyTrustHome')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <advantage.icon className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('customerReviews')}
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(reviews[currentReview].rating)].map((_, i) => (
                  <div key={i} className="w-5 h-5 text-yellow-400">★</div>
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-6 italic">
                "{reviews[currentReview].text}"
              </p>
              <p className="font-semibold text-gray-900">
                {reviews[currentReview].name}
              </p>
            </div>

            <button
              onClick={() => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => setCurrentReview((prev) => (prev + 1) % reviews.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-16 bg-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('leaveRequest')}
            </h2>
            <p className="text-blue-100">
              {t('requestSubtitle')}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleRequestSubmit}
            className="bg-white rounded-2xl p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder={t('yourName')}
                value={requestData.name}
                onChange={(e) => setRequestData({ ...requestData, name: e.target.value })}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
              <input
                type="email"
                placeholder={t('email')}
                value={requestData.email}
                onChange={(e) => setRequestData({ ...requestData, email: e.target.value })}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
            <div className="mb-6">
              <input
                type="tel"
                placeholder={t('phone')}
                value={requestData.phone}
                onChange={(e) => setRequestData({ ...requestData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
            <div className="mb-6">
              <textarea
                placeholder="Tell us about your preferences..."
                value={requestData.preferences}
                onChange={(e) => setRequestData({ ...requestData, preferences: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {t('requestSubmit')}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Home;