import React, { useState } from 'react';
import { Building, MapPin, TrendingUp, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Skyline Residences',
      developer: 'Premium Development Group',
      location: 'Tbilisi Center',
      image: 'https://images.pexels.com/photos/3288103/pexels-photo-3288103.jpeg',
      priceFrom: 180000,
      investment: true,
      completion: '2025',
      status: 'pre-construction',
      description: 'Luxury high-rise residential complex with panoramic city views.',
    },
    {
      id: 2,
      title: 'Garden Valley',
      developer: 'Green Build Solutions',
      location: 'Vake District',
      image: 'https://images.pexels.com/photos/2121120/pexels-photo-2121120.jpeg',
      priceFrom: 220000,
      investment: true,
      completion: '2024',
      status: 'under-construction',
      description: 'Eco-friendly residential community with private gardens.',
    },
    {
      id: 3,
      title: 'Marina Bay Complex',
      developer: 'Coastal Developments',
      location: 'Batumi',
      image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg',
      priceFrom: 150000,
      investment: true,
      completion: '2026',
      status: 'planning',
      description: 'Waterfront mixed-use development with resort amenities.',
    },
    {
      id: 4,
      title: 'Business Plaza',
      developer: 'Commercial Real Estate Corp',
      location: 'Saburtalo',
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
      priceFrom: 350000,
      investment: true,
      completion: '2025',
      status: 'under-construction',
      description: 'Modern office and retail complex in growing business district.',
    },
  ];

  const statusColors = {
    planning: 'bg-yellow-100 text-yellow-800',
    'pre-construction': 'bg-blue-100 text-blue-800',
    'under-construction': 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('developmentProjects')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('investmentOpportunities')}
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { key: 'all', label: 'All Projects' },
              { key: 'planning', label: 'Planning' },
              { key: 'pre-construction', label: 'Pre-Construction' },
              { key: 'under-construction', label: 'Under Construction' },
              { key: 'completed', label: 'Completed' },
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                  filter === filterOption.key
                    ? 'bg-blue-700 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                </div>
                {project.investment && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Investment
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <Building className="h-4 w-4 mr-2" />
                  <span className="text-sm">{project.developer}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{project.location}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">Completion: {project.completion}</span>
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-2xl font-bold text-blue-700">
                      {t('from')} ${project.priceFrom.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">ROI Potential</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-200 text-sm font-medium">
                    {t('viewProject')}
                  </button>
                  <button className="flex-1 border border-blue-700 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-sm font-medium">
                    {t('learnMore')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;