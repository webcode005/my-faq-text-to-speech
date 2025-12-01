

import FAQ from "./components/FAQ";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Help Center</h1>
      <p className="text-gray-700 mb-8">
        Frequently asked questions — click a card to expand and use the speaker icon to read aloud.
      </p>

      <FAQ />
    </div>
  );
}
