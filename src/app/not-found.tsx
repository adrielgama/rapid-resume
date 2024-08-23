import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-2xl text-gray-800">Page Not Found</p>
      <p className="mt-2 text-gray-600">
        The page you are looking for doesn&rsquo;t exist.
      </p>
      <Link href="/">
        <a className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Go Back Home
        </a>
      </Link>
    </div>
  )
}
