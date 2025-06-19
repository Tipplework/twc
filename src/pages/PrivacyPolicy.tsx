import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="p-8 max-w-3xl mx-auto text-gray-700 text-sm leading-relaxed">
      <h1 className="text-2xl font-semibold mb-4">Privacy Policy</h1>
      <p>Effective Date: June 2025</p>
      <p className="mt-4">
        Tipple Works Co. (“we”, “us”, or “our”) values your privacy...
      </p>
      <ul className="list-disc ml-6 mt-4 space-y-2">
        <li><strong>What we collect:</strong> ...</li>
        <li><strong>How we use it:</strong> ...</li>
        <li><strong>Data Sharing:</strong> ...</li>
        <li><strong>Security:</strong> ...</li>
        <li><strong>Your Rights:</strong> ...</li>
      </ul>
      <p className="mt-4">
        For any queries, contact us at <a href="mailto:rohandhirwani@tippleworks.com" className="text-blue-500 underline">rohandhirwani@tippleworks.com</a>.
      </p>
    </div>
  );
}
