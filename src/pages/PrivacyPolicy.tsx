import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="p-8 max-w-3xl mx-auto text-gray-700 text-sm leading-relaxed">
      <h1 className="text-2xl font-semibold mb-4">Privacy Policy</h1>
      <p>Effective Date: June 2025</p>
      <p className="mt-4">Tipple Works Co. (“we”, “us”, or “our”) values your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
      <ul className="list-disc ml-6 mt-4 space-y-2">
        <li><strong>What we collect:</strong> Contact details, browsing behavior, and submitted inquiries.</li>
        <li><strong>How we use it:</strong> To respond to you, improve services, and provide relevant communication.</li>
        <li><strong>Data Sharing:</strong> Only with trusted tools used to run our business (analytics, forms).</li>
        <li><strong>Security:</strong> Your data is stored securely and used responsibly.</li>
        <li><strong>Your Rights:</strong> You may request access or deletion of your personal info at any time.</li>
      </ul>
      <p className="mt-4">For any queries, contact us at <a href="mailto:rohandhirwani@tippleworks.com" className="text-blue-500 underline">hello@tippleworks.com</a>.</p>
    </div>
  );
}
