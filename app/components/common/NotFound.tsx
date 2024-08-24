import Link from 'next/link';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404 Not Found</h1>
      <p className="text-lg text-gray-600 mt-4">
        The page you are looking for could not be found.
      </p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Go back to homepage
      </Link>
    </div>
  );
}

export default NotFound;