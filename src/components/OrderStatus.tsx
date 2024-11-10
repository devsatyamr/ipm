import React from 'react';
import { Check, Clock, Truck, Package, XCircle } from 'lucide-react';

interface OrderStatusProps {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'Order Placed'
  },
  processing: {
    icon: Package,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'Processing'
  },
  shipped: {
    icon: Truck,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'Shipped'
  },
  delivered: {
    icon: Check,
    color: 'text-green-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'Delivered'
  },
  cancelled: {
    icon: XCircle,
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'Cancelled'
  }
};

export default function OrderStatus({ status }: OrderStatusProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`flex items-center ${config.bg} ${config.border} border rounded-full px-3 py-1`}>
      <Icon className={`h-4 w-4 ${config.color} mr-2`} />
      <span className={`text-sm font-medium ${config.color}`}>
        {config.text}
      </span>
    </div>
  );
}