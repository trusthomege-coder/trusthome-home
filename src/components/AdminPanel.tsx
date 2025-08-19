import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { Plus, Edit, Trash2, Save, X, Building, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image_url: string;
  category: 'rent' | 'sale' | 'project';
  type: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  question_en: string;
  options: string[];
  options_en: string[];
  order_index: number;
}

const AdminPanel: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'properties' | 'quiz'>('properties');
  const [properties, setProperties] = useState<Property[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const [newProperty, setNewProperty] = useState<Omit<Property, 'id'>>({
    title: '',
    description: '',
    price: 0,
    location: '',
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    image_url: '',
    category: 'sale',
    type: 'apartment',
  });

  const [newQuestion, setNewQuestion] = useState<Omit<QuizQuestion, 'id'>>({
    question: '',
    question_en: '',
    options: [''],
    options_en: [''],
    order_index: 0,
  });

  useEffect(() => {
    if (isAdmin) {
      fetchProperties();
      fetchQuizQuestions();
    }
  }, [isAdmin]);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchQuizQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setQuizQuestions(data || []);
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = async () => {
    try {
      const { error } = await supabase
        .from('properties')
        .insert([newProperty]);

      if (error) throw error;
      
      setNewProperty({
        title: '',
        description: '',
        price: 0,
        location: '',
        bedrooms: 1,
        bathrooms: 1,
        area: 0,
        image_url: '',
        category: 'sale',
        type: 'apartment',
      });
      setShowAddProperty(false);
      fetchProperties();
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  const handleUpdateProperty = async () => {
    if (!editingProperty) return;

    try {
      const { error } = await supabase
        .from('properties')
        .update(editingProperty)
        .eq('id', editingProperty.id);

      if (error) throw error;
      
      setEditingProperty(null);
      fetchProperties();
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const handleDeleteProperty = async (id: number) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access the admin panel.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Admin Panel
          </h1>
          <p className="text-lg text-gray-600">
            Manage properties and quiz questions
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('properties')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'properties'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Building className="h-5 w-5 inline mr-2" />
                Properties
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'quiz'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MessageSquare className="h-5 w-5 inline mr-2" />
                Quiz Questions
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'properties' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Properties Management</h2>
                  <button
                    onClick={() => setShowAddProperty(true)}
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Property</span>
                  </button>
                </div>

                {/* Properties List */}
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="border border-gray-200 rounded-lg p-4">
                      {editingProperty?.id === property.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={editingProperty.title}
                              onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              placeholder="Title"
                            />
                            <input
                              type="text"
                              value={editingProperty.location}
                              onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
                              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              placeholder="Location"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={handleUpdateProperty}
                              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center space-x-1"
                            >
                              <Save className="h-4 w-4" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={() => setEditingProperty(null)}
                              className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 flex items-center space-x-1"
                            >
                              <X className="h-4 w-4" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-gray-900">{property.title}</h3>
                            <p className="text-gray-600">{property.location} - ${property.price.toLocaleString()}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingProperty(property)}
                              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center space-x-1"
                            >
                              <Edit className="h-4 w-4" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProperty(property.id)}
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center space-x-1"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Quiz Questions Management</h2>
                  <button
                    onClick={() => setShowAddQuestion(true)}
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Question</span>
                  </button>
                </div>

                {/* Quiz Questions List */}
                <div className="space-y-4">
                  {quizQuestions.map((question) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{question.question}</h3>
                          <p className="text-gray-600 text-sm mb-2">{question.question_en}</p>
                          <div className="text-sm text-gray-500">
                            Options: {question.options.join(', ')}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingQuestion(question)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center space-x-1"
                          >
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;