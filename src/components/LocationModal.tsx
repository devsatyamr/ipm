import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onSelectLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const popularCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad',
    'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'
  ];

  const filteredCities = popularCities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (city: string) => {
    onSelectLocation(city);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="relative bg-white rounded-lg max-w-md w-full p-6">
          <div className="absolute right-4 top-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Select Your Location</h2>
            <p className="mt-1 text-sm text-gray-500">Choose your delivery location</p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Search for your location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {filteredCities.map((city) => (
              <button
                key={city}
                onClick={() => handleLocationSelect(city)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-700">{city}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;