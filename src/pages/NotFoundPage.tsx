import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center justify-center mesh-gradient-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center py-32">
        {/* Large 404 */}
        <div className="mb-12">
          <h1 className="text-[120px] md:text-[200px] font-black text-[#A8B5C7] dark:text-[#7A8A9D] leading-none opacity-30">
            404
          </h1>
        </div>

        {/* Alert Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-[#E8D5D0] dark:bg-[#9B7A75] rounded-[24px] flex items-center justify-center">
            <AlertCircle className="w-12 h-12 md:w-16 md:h-16 text-white dark:text-[#E2E8F0]" />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-[48px] md:text-[72px] font-black text-[#4A5568] dark:text-[#E2E8F0] uppercase mb-6">
          Page Not Found
        </h2>
        
        <p className="text-[24px] md:text-[28px] font-bold text-[#4A5568] dark:text-[#CBD5E1] mb-12 max-w-2xl mx-auto px-4">
          Looks like this page doesn't exist. Let's get you back on track!
        </p>

        {/* Code Snippet */}
        <div className="inline-block mb-12 p-6 bg-[#CDD7DF] dark:bg-[#2D3748] rounded-[20px]">
          <code className="font-mono text-[18px] md:text-[20px] text-[#4A5568] dark:text-[#E2E8F0]">
            Error: Route not found in router configuration
          </code>
        </div>

        {/* CTA Button */}
        <Link
          to="/"
          className="pill-button px-10 md:px-12 py-5 md:py-6 bg-[#B8C5B8] dark:bg-[#4B5563] text-[#4A5568] dark:text-[#E2E8F0] text-[24px] md:text-[28px] inline-flex items-center gap-4"
        >
          <Home className="w-6 h-6 md:w-8 md:h-8" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}