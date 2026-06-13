import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase">
        Small Catering search Platform
      </h1>
      <Link
        href="/caterers"
        className="px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg shadow-md hover:bg-yellow-600 transition duration-200"
      >
        Explore Caterers
      </Link>
    </div>
  );
}
