export default function AdminApp() {
  return (
    <main className="min-h-screen bg-[#f6f4ef] px-6 py-16 text-[#141414]">
      <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Tipple Works</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.04em]">Studio desk</h1>
      <p className="mt-4 max-w-xl text-lg">
        This desk will edit the existing website: homepage, featured work, clients, testimonials, services, about, contact, and SEO. It is not connected yet.
      </p>
      <p className="mt-4 max-w-xl">
        Create a Supabase project for Tipple Works only. Do not use the Sula database. Then add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to the preview environment and apply <code>supabase/migrations/20261005150000_twc_existing_site.sql</code>.
      </p>
    </main>
  );
}
