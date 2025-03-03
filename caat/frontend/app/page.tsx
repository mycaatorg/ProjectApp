import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 rounded shadow-lg bg-white">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-6">Welcome to CAAT</h1>
        <p className="mb-8 text-gray-600">Your ultimate College Admission Assistance Tool!</p>

        {/* Buttons */}
        <div className="flex space-x-4 justify-center">
          <Link
            href="/auth/login"
            className="px-6 py-3 rounded-md bg-red-500 text-white font-medium hover:bg-gray-600"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="px-6 py-3 rounded-md bg-red-500 text-white font-medium hover:bg-gray-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
