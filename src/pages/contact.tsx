import React, { useState } from "react";
import Header from "../components/header";

const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const telegramId = "the_private_account_for_manager";
  const telegramUrl = "https://t.me/the_private_account_for_manager";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(telegramId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <main>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-start pt-[5rem] justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
          <header className="text-center p-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-black p-4">
              <svg
                className="w-full h-full text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-black mb-2">
              Contact Us on Telegram
            </h1>
            <p className="text-gray-600 text-sm">
              Connect with us instantly through our Telegram channel
            </p>
          </header>
          <div className="p-6 space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between relative">
              <code className="text-sm font-mono text-black">{telegramId}</code>
              <button
                className="p-1 hover:bg-gray-200 rounded-md transition-colors duration-200"
                onClick={copyToClipboard}
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span className="sr-only">Copy Telegram ID</span>
              </button>
              {copied && (
                <div className="absolute right-0 mr-10 -mt-8 bg-black text-white text-xs px-2 py-1 rounded">
                  Copied!
                </div>
              )}
            </div>

            <button
              className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-md text-sm font-medium flex items-center justify-center transition-colors duration-200"
              onClick={() => window.open(telegramUrl, "_blank")}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Open in Telegram
            </button>

            <p className="text-xs text-center text-gray-500 mt-6">
              We typically respond within a few hours
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
