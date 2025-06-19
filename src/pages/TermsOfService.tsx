import React from 'react';

export default function TermsOfService() {
  return (
    <div className="p-8 max-w-3xl mx-auto text-gray-700 text-sm leading-relaxed">
      <h1 className="text-2xl font-semibold mb-4">Terms of Service</h1>
      <p>Effective Date: June 2025</p>
      <p className="mt-4">By using our website or services, you agree to the following terms:</p>
      <ul className="list-disc ml-6 mt-4 space-y-2">
        <li>Content and visuals on this site are the property of Tipple Works Co.</li>
        <li>Service engagements are governed by mutual agreements or project scopes.</li>
        <li>We are not liable for external links or third-party actions.</li>
        <li>We may change or update these terms at our discretion.</li>
      </ul>
      <p className="mt-4">For any concerns, reach out to <a href="mailto:hello@tippleworks.com" className="text-blue-500 underline">hello@tippleworks.com</a>.</p>
    </div>
  );
}
