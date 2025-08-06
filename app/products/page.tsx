'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Package, Image, Shapes, Tag, Filter, X, Heart, ShoppingCart, Eye } from 'lucide-react';
import Navbar from '@/components/navbar';

const products = [
  { id: 1, name: 'Diffuser SUV Generator', price: 980, rating: 4.5, imageUrl: '/api/placeholder/300/200', category: 'Technology', badge: 'New' },
  { id: 2, name: 'Green Photography', price: 16, rating: 4.8, imageUrl: '/api/placeholder/300/200', category: 'Photography', badge: 'Popular' },
  { id: 3, name: '2D Rendered', price: 10, rating: 4.4, imageUrl: '/api/placeholder/300/200', category: 'Art', badge: 'Hot' },
  { id: 4, name: 'Aloe Vera', price: 8, rating: 4.3, imageUrl: '/api/placeholder/300/200', category: 'Nature', badge: 'Essential' },
  { id: 5, name: 'Homo Shuskat', price: 8, rating: 4.1, imageUrl: '/api/placeholder/300/200', category: 'Animals', badge: null },
  { id: 6, name: 'Digital Camera Pro', price: 1200, rating: 4.9, imageUrl: '/api/placeholder/300/200', category: 'Photography', badge: 'Premium' },
  { id: 7, name: 'Abstract Canvas', price: 45, rating: 4.6, imageUrl: '/api/placeholder/300/200', category: 'Art', badge: null },
  { id: 8, name: 'Smart Home Hub', price: 299, rating: 4.7, imageUrl: '/api/placeholder/300/200', category: 'Technology', badge: 'Trending' }
];

const categories = ['All', 'Technology', 'Art', 'Nature', 'Photography', 'Animals'];

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
    setFilteredProducts(filtered);
  }, [query, selectedCategory, priceRange]);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId: number) => {
    setCart(prev => [...prev, productId]);
    // Simple feedback animation could be added here
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white overflow-x-hidden">
    <Navbar />
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>



      {/* Enhanced Hero Header */}
      <section className="relative z-10 text-center pt-20 pb-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase text-cyan-500 font-medium tracking-wide">Browse Amazing Products</p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mt-2 bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
            Find Your Perfect <span className="text-cyan-400">Product</span>
          </h1>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
            Explore our curated collection of premium products designed to elevate your lifestyle.
          </p>
        </motion.div>

        {/* Enhanced Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 max-w-md mx-auto"
        >
          <div className={`flex items-center bg-slate-800/70 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 ${
            isSearchFocused ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/20 scale-105' : 'border-slate-700/50'
          }`}>
            <input
              type="text"
              placeholder="Search products, categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="flex-1 px-6 py-4 bg-transparent text-sm placeholder-slate-400 focus:outline-none"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-4 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Search size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Category Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mt-6 px-4"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Enhanced Stat Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-6xl mx-auto px-4 mb-12"
      >
        {[
          { label: 'Total Products', value: products.length, icon: Package },
          { label: 'Categories', value: '8+', icon: Shapes },
          { label: 'Featured', value: '12', icon: Tag },
          { label: 'In Stock', value: '95%', icon: Image }
        ].map((stat, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            className="rounded-2xl bg-slate-800/50 border border-slate-700/50 p-4 sm:p-6 flex flex-col items-center backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-pink-500/20 mb-3">
              <stat.icon className="text-cyan-400" size={24} />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">{stat.value}</h4>
            <p className="text-xs sm:text-sm text-slate-400 text-center">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="w-full flex items-center justify-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 backdrop-blur"
          >
            <Filter size={18} />
            <span>Filters & Sort</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`col-span-1 bg-slate-800/40 rounded-2xl border border-slate-700/50 p-6 h-fit backdrop-blur-xl ${
              showMobileFilter ? 'block' : 'hidden md:block'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Filters</h3>
              <button 
                onClick={() => setShowMobileFilter(false)}
                className="md:hidden text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-slate-400 mb-4 font-medium">Price Range</p>
                <div className="space-y-3">
                  <input 
                    type="range" 
                    min="0" 
                    max="1500" 
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-cyan-500" 
                  />
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>₱0</span>
                    <span>₱{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-slate-400 mb-4 font-medium">Quick Actions</p>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-700/50 transition-colors">
                    Clear All Filters
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-700/50 transition-colors">
                    Sort by Price
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-700/50 transition-colors">
                    Sort by Rating
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Enhanced Product Grid */}
          <section className="col-span-1 md:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-400">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            <AnimatePresence>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    layout
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                    className="group rounded-2xl bg-slate-800/50 border border-slate-700/40 backdrop-blur-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex-1 bg-white/20 backdrop-blur text-white py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
                          >
                            <Eye className="inline w-4 h-4 mr-1" />
                            Quick View
                          </motion.button>
                        </div>
                      </div>

                      {/* Badge */}
                      {product.badge && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: (index * 0.1) }}
                          className="absolute top-3 left-3 bg-gradient-to-r from-pink-600 to-pink-500 text-xs px-3 py-1 rounded-full text-white font-medium shadow-lg"
                        >
                          {product.badge}
                        </motion.span>
                      )}

                      {/* Favorite Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 transition-colors"
                      >
                        <Heart 
                          size={16} 
                          className={`${
                            favorites.includes(product.id) 
                              ? 'text-pink-500 fill-current' 
                              : 'text-white'
                          } transition-colors`}
                        />
                      </motion.button>
                    </div>

                    <div className="p-5">
                      <p className="text-xs text-cyan-400 font-medium mb-1">{product.category}</p>
                      <h2 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                        {product.name}
                      </h2>
                      <p className="text-xl font-bold text-white mb-3">₱{product.price}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star size={16} className="fill-current" />
                          <span className="font-medium">{product.rating}</span>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(product.id)}
                          className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800/50 flex items-center justify-center">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-slate-400 mb-6">Try adjusting your search or filter criteria</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setQuery('');
                    setSelectedCategory('All');
                    setPriceRange([0, 1500]);
                  }}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </section>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {showMobileFilter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            onClick={() => setShowMobileFilter(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}