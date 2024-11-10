import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getStoredUser, saveOrder } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';
import { CreditCard, Smartphone, ChevronRight } from 'lucide-react';

type PaymentMethod = 'CARD' | 'UPI' | null;

interface CardDetails {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

interface UPIDetails {
  id: string;
}

export default function Payment() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState<string>('');
  const user = getStoredUser();

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCardNumber(e.target.value);
    setCardDetails(prev => ({ ...prev, number: value }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setCardDetails(prev => ({ ...prev, expiry: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }

    // Validate payment details
    if (selectedMethod === 'CARD') {
      if (cardDetails.number.length < 19 || !cardDetails.name || cardDetails.expiry.length < 5 || cardDetails.cvv.length < 3) {
        alert('Please fill in all card details correctly');
        return;
      }
    } else if (selectedMethod === 'UPI') {
      if (!upiId.includes('@')) {
        alert('Please enter a valid UPI ID');
        return;
      }
    }

    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newOrder = {
        id: uuidv4(),
        userId: user.id,
        items: cart,
        status: 'pending' as const,
        total: getCartTotal(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        shippingAddress: user.addresses.find(addr => addr.isDefault) || user.addresses[0],
        paymentMethod: selectedMethod
      };

      await saveOrder(newOrder);
      clearCart();
      navigate('/payment-success', { state: { orderId: newOrder.id } });
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      {/* Shipping Address */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
        <div className="border rounded p-4">
          <p className="font-medium">{user.name}</p>
          <p>{user.addresses[0].street}</p>
          <p>{user.addresses[0].city}, {user.addresses[0].state} {user.addresses[0].zipCode}</p>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
        
        <div className="space-y-4">
          {/* Card Payment Option */}
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-colors
              ${selectedMethod === 'CARD' ? 'border-orange-500 bg-orange-50' : 'hover:border-gray-300'}`}
            onClick={() => setSelectedMethod('CARD')}
          >
            <div className="flex items-center">
              <CreditCard className="h-6 w-6 text-gray-600" />
              <span className="ml-3 font-medium">Credit/Debit Card</span>
              <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* UPI Payment Option */}
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-colors
              ${selectedMethod === 'UPI' ? 'border-orange-500 bg-orange-50' : 'hover:border-gray-300'}`}
            onClick={() => setSelectedMethod('UPI')}
          >
            <div className="flex items-center">
              <Smartphone className="h-6 w-6 text-gray-600" />
              <span className="ml-3 font-medium">UPI Payment</span>
              <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Card Details Form */}
        {selectedMethod === 'CARD' && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                maxLength={19}
                value={cardDetails.number}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                placeholder="John Doe"
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  maxLength={5}
                  value={cardDetails.expiry}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="password"
                  maxLength={3}
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                  placeholder="123"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* UPI Form */}
        {selectedMethod === 'UPI' && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">UPI ID</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="username@upi"
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        {cart.map(item => (
          <div key={item.productId} className="flex justify-between py-2">
            <span>{item.product.name} × {item.quantity}</span>
            <span>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
          </div>
        ))}
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePayment}
        disabled={loading || cart.length === 0 || !selectedMethod}
        className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing Payment...' : `Pay ₹${getCartTotal().toLocaleString('en-IN')}`}
      </button>
    </div>
  );
}