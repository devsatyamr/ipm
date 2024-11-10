import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, MapPin, User, Search, ChevronDown, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { getLocations, getStoredUser, clearStoredUser } from '../utils/storage';

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { selectedLocation, setSelectedLocation } = useLocation();
  
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const user = getStoredUser();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Load locations
  useEffect(() => {
    const loadLocations = async () => {
      const locationsList = await getLocations();
      setLocations(['All Locations', ...locationsList]);
    };
    loadLocations();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.location-dropdown')) {
        setShowLocationDropdown(false);
      }
      if (!target.closest('.user-dropdown')) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    clearStoredUser();
    navigate('/auth');
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-orange-600">InstaCart</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, sellers, or locations"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </form>
          </div>

          {/* Right Side Navigation */}
          <div className="flex items-center space-x-6">
            {/* Location Selector */}
            <div className="relative location-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLocationDropdown(!showLocationDropdown);
                }}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <MapPin className="h-5 w-5 mr-1" />
                <span className="mr-1 max-w-[100px] truncate">
                  {selectedLocation}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showLocationDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => handleLocationSelect(location)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100
                        ${location === selectedLocation ? 'text-orange-600 font-medium' : 'text-gray-700'}`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700 hover:text-gray-900"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative user-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserDropdown(!showUserDropdown);
                }}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <User className="h-6 w-6" />
                {user && (
                  <span className="ml-2 max-w-[100px] truncate hidden sm:inline">
                    {user.name}
                  </span>
                )}
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-200">
                        Signed in as<br />
                        <span className="font-medium text-gray-900">{user.email}</span>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Your Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}