import React from 'react';

export default function PrivacyPolicy() {
  return (
    <section className="bg-black text-white min-h-screen py-20 px-6 md:px-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-gray-300">Effective Date: June 2025</p>
      <p className="mb-6 text-gray-400">
        Tipple Works Co. (“we”, “us”, or “our”) values your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you interact with our website or services.
      </p>

      <ul className="list-disc space-y-4 text-gray-300 ml-6">
        <li><strong>What we collect:</strong> Contact details, browsing behavior, and submitted inquiries.</li>
        <li><strong>How we use it:</strong> To respond to you, improve services, and provide relevant communication.</li>
        <li><strong>Data Sharing:</strong> Only with trusted tools used to run our business (analytics, forms).</li>
        <li><strong>Security:</strong> Your data is stored securely and used responsibly.</li>
        <li><strong>Your Rights:</strong> You may request access or deletion of your personal info at any time.</li>
      </ul>

      <p className="mt-8 text-gray-300">
        For any queries, contact us at <a href="mailto:admin@tippleworks.com" className="text-blue-400 underline">admin@tippleworks.com</a>.
      </p>
    </section>
  );
}
