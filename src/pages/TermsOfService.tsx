import React from 'react';

export default function TermsOfService() {
  return (
    <section className="bg-black text-white min-h-screen py-20 px-6 md:px-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Terms of Service</h1>
      <p className="mb-4 text-gray-300">Effective Date: June 2025</p>
      <p className="mb-6 text-gray-400">
        By using our website or services, you agree to the following terms:
      </p>

      <ul className="list-disc space-y-4 text-gray-300 ml-6">
        <li>Content and visuals on this site are the property of Tipple Works Co.</li>
        <li>Service engagements are governed by mutual agreements or project scopes.</li>
        <li>We are not liable for external links or third-party actions.</li>
        <li>We may change or update these terms at our discretion.</li>
      </ul>

      <p className="mt-8 text-gray-300">
        For any concerns, reach out to <a href="mailto:hello@tippleworks.com" className="text-blue-400 underline">hello@tippleworks.com</a>.
      </p>
    </section>
  );
}
