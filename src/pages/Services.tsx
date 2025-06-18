import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Services() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tipple Works Co.',
          text: 'Check out Tipple Works Co.',
          url: 'https://tippleworks.com/services',
        });
      } catch (error) {
        console.error('Sharing failed:', error);
      }
    } else {
      navigator.clipboard.writeText('https://tippleworks.com/services');
      alert('Link copied to clipboard');
    }
  };

  const handleDeckClick = () => {
    window.open('https://your-deck-link.com', '_blank'); // 🔁 Replace with actual deck link
  };

  return (
    <>
      <Header />
      <main className="bg-black text-white flex flex-col justify-center items-center h-[calc(100vh-120px)] px-4 text-center">
        {/* Logo */}
        <img
          src="/twc-logo.png"
          alt="Tipple Works Logo"
          className="w-[260px] md:w-[360px] lg:w-[420px] mb-8"
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleDeckClick}
            className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium hover:bg-gray-100 transition"
          >
            View Our Deck
          </button>
          <button
            onClick={handleShare}
            className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium hover:bg-gray-100 transition"
          >
            Share
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
