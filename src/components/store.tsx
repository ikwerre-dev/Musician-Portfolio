import React, { useState, useEffect } from "react";
import { ShoppingCart, X, Star, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { CardPreview } from "./components/CardPreview";
import { PaymentModal } from "./components/PaymentModal";

interface Plan {
  id: number;
  name: string;
  price: number;
  type: "fan-card" | "meet-greet";
  description?: string;
  features?: string[];
}

interface CartItem extends Plan {
  quantity: number;
}

const plans: Plan[] = [
  {
    id: 1,
    name: "Basic Fan Card",
    price: 1200,
    type: "fan-card",
    features: [
      "Digital fan card",
      "Exclusive online content",
      "Monthly newsletter",
    ],
  },
  {
    id: 2,
    name: "Exclusive Fan Card",
    price: 2500,
    type: "fan-card",
    features: [
      "Physical & digital fan card",
      "Exclusive merchandise",
      "Priority ticket access",
    ],
  },
  {
    id: 3,
    name: "Collector's Edition Fan Card",
    price: 4850,
    type: "fan-card",
    features: [
      "Limited edition fan card",
      "Signed memorabilia",
      "VIP event invitations",
    ],
  },
  {
    id: 4,
    name: "Premium VIP Gold Fan Card",
    price: 6500,
    type: "fan-card",
    features: [
      "Gold-plated fan card",
      "Backstage passes",
      "Personal video message",
    ],
  },
  {
    id: 5,
    name: "Standard Meet & Greet",
    price: 5000,
    type: "meet-greet",
    description: "A quick photo and autograph session",
    features: [
      "Photo opportunity",
      "Autograph session",
      "15-minute meet & greet",
    ],
  },
  {
    id: 6,
    name: "Premium Meet & Greet",
    price: 10000,
    type: "meet-greet",
    description: "Includes a photo, autograph, and a brief chat (3 hours)",
    features: [
      "Extended photo session",
      "Personalized autographs",
      "3-hour interactive experience",
    ],
  },
  {
    id: 7,
    name: "VIP Experience",
    price: 20000,
    type: "meet-greet",
    description:
      "A longer session (3 Days), exclusive merchandise, a signed item, and priority access",
    features: [
      "3-day immersive experience",
      "Exclusive VIP merchandise",
      "Behind-the-scenes access",
    ],
  },
];

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFinalStage, setIsFinalStage] = useState(false);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  const [name, setName] = useState("");

  useEffect(() => {
    const savedCart = Cookies.get("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cartItems), { expires: 7 });
  }, [cartItems]);

  const addToCart = (plan: Plan) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === plan.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === plan.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { ...plan, quantity: 1 }];
    });
  };

  const reduceToCart = (plan: Plan) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === plan.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === plan.id ? { ...item, quantity: item.quantity - 1 } : item,
        );
      }
      return [...prev, { ...plan, quantity: 1 }];
    });
  };

  const removeFromCart = (planId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== planId));
  };

  const updateQuantity = (planId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(planId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === planId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const handlePayment = (method: string) => {
    setSelectedPaymentMethod(method);
    setIsPaymentModalOpen(true);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const hasFanCard = cartItems.some((item) => item.type === "fan-card");

  return (
    <div className="min-h-screen bg-gray-100 pt-[2rem] text-gray-800">
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
            >
              {totalItems}
            </motion.span>
          )}
        </button>
      </motion.div>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Fan Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans
              .filter((plan) => plan.type === "fan-card")
              .map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onAddToCart={() => addToCart(plan)}
                  onRemoveToCart={() => reduceToCart(plan)}
                  quantity={
                    cartItems.find((item) => item.id === plan.id)?.quantity || 0
                  }
                />
              ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Meet & Greet Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans
              .filter((plan) => plan.type === "meet-greet")
              .map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onAddToCart={() => addToCart(plan)}
                  onRemoveToCart={() => reduceToCart(plan)}
                  quantity={
                    cartItems.find((item) => item.id === plan.id)?.quantity || 0
                  }
                />
              ))}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {isCartOpen && (
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
              className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between border-b pb-4"
                      >
                        <div>
                          <h3 className="text-gray-800 font-semibold">
                            {item.name}
                          </h3>
                          <p className="text-gray-600">
                            ${item.price.toLocaleString()} x {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="text-blue-500 hover:text-blue-600 p-1"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="text-blue-500 hover:text-blue-600 p-1"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Total: ${totalPrice.toLocaleString()}
                    </h3>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                  >
                    Proceed to Checkout
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCheckoutOpen && (
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
              className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <ul className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex justify-between">
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span>
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-xl font-semibold">
                    Total: ${totalPrice.toLocaleString()}
                  </div>
                </div>

                <div>
                  {!isFinalStage && (
                    <>
                      {hasFanCard && (
                        <div className="mb-6">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Name for Fan Card
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                          />
                        </div>
                      )}
                    </>
                  )}
                  {hasFanCard && name && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-2">
                        Fan Card Preview
                      </h4>
                      <CardPreview name={name} />
                    </div>
                  )}

                  {!isFinalStage ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                      onClick={() => {
                        setIsFinalStage(true);
                      }}
                    >
                      Complete Purchase
                    </motion.button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        onClick={() => {
                          handlePayment("crypto");
                          setIsCheckoutOpen(false);
                          setIsFinalStage(true);
                        }}
                      >
                        Pay With Crypto
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        onClick={() => {
                          handlePayment("telegram");
                          setIsCheckoutOpen(false);
                          setIsFinalStage(true);
                        }}
                      >
                        Pay With Giftcard
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        onClick={() => {
                          handlePayment("telegram");
                          setIsCheckoutOpen(false);
                          setIsFinalStage(true);
                        }}
                      >
                        Pay via Management
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        paymentMethod={selectedPaymentMethod}
        totalPrice={totalPrice}
      />
    </div>
  );
};

interface PlanCardProps {
  plan: Plan;
  onAddToCart: () => void;
  onRemoveToCart: () => void;
  quantity: number;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  onAddToCart,
  onRemoveToCart,
  quantity,
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
      whileHover={{ y: -5 }}
    >
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{plan.name}</h3>
        {plan.description && (
          <p className="text-gray-600 mb-4">{plan.description}</p>
        )}
        <div className="flex-grow">
          <ul className="text-sm text-gray-600 mb-6">
            {plan.features &&
              plan.features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Star size={16} className="text-yellow-500 mr-2" />
                  {feature}
                </motion.li>
              ))}
          </ul>
        </div>
        <div className="mt-auto">
          <span className="text-3xl font-bold text-gray-800 block mb-4">
            ${plan.price.toLocaleString()}
          </span>
          {quantity === 0 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddToCart}
              className="w-full bg-black text-white px-4 py-2 rounded-full hover:bg-[#121212] transition-colors duration-300"
            >
              Add to Cart
            </motion.button>
          ) : (
            <div className="flex items-center justify-between bg-black rounded-full p-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onRemoveToCart}
                className="bg-black text-white p-2 rounded-full hover:bg-[#ccc] transition-colors duration-300"
              >
                <Minus size={16} />
              </motion.button>
              <span className="text-white font-semibold">
                {quantity} in cart
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onAddToCart}
                className="bg-white text-black p-2 rounded-full hover:bg-[#ccc] transition-colors duration-300"
              >
                <Plus size={16} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default App;
