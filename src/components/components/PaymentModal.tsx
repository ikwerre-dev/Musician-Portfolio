import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: string | null;
  totalPrice: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, paymentMethod, totalPrice }) => {
  const [timeLeft, setTimeLeft] = useState(10 * 60 * 60);  
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isOpen && paymentMethod === 'crypto') {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, paymentMethod]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          {paymentMethod === 'crypto' && (
            <>
              <p className="mb-4">Please send ${totalPrice} in BTC to the following address:</p>
              <div className="flex items-center justify-between bg-gray-100 p-2 rounded mb-4">
                <code className="text-sm">0x1234567890abcdef1234567890abcdef12345678</code>
                <button
                  onClick={() => copyToClipboard('0x1234567890abcdef1234567890abcdef12345678')}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Copy size={20} />
                </button>
              </div>
              {isCopied && <p className="text-green-500 text-sm mb-4">Copied to clipboard!</p>}
              <p className="mb-4">Time remaining: {formatTime(timeLeft)}</p>
            </>
          )}

          {paymentMethod === 'paypal' && (
            <p className="mb-4">You will be redirected to PayPal to complete your payment of ${totalPrice}.</p>
          )}

          {paymentMethod === 'telegram' && (
            <>
              <p className="mb-4">Please contact our management team on Telegram to complete your purchase:</p>
              <div className="flex items-center justify-between bg-gray-100 p-2 rounded mb-4">
                <code className="text-sm">@FanExperienceManagement</code>
                <button
                  onClick={() => copyToClipboard('@FanExperienceManagement')}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Copy size={20} />
                </button>
              </div>
              {isCopied && <p className="text-green-500 text-sm mb-4">Copied to clipboard!</p>}
            </>
          )}

          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
