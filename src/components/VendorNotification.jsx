import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, X } from 'lucide-react';

const VendorNotification = ({ vendorStatus, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (vendorStatus === 'pending') {
      setIsVisible(true);
    }
  }, [vendorStatus]);

  if (!isVisible || vendorStatus !== 'pending') return null;

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-white rounded-lg shadow-lg border-l-4 border-yellow-400 p-4 animate-slide-in">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Clock className="h-6 w-6 text-yellow-400" />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-gray-900">
              Vendor Application Submitted
            </h3>
            <div className="mt-2 text-sm text-gray-600">
              <p className="mb-2">
                Your vendor application has been submitted successfully!
              </p>
              <p className="font-medium">
                You will be notified once the admin reviews and approves your application.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                You can add products only after approval.
              </p>
            </div>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={handleClose}
                className="text-sm text-yellow-600 hover:text-yellow-500 font-medium"
              >
                I understand
              </button>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default VendorNotification;
