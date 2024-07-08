import Link from "next/link";

export default function PageNotFound() {
    return (
      <div className="flex flex-col mt-[10%]">
        <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-gray-700 mb-4">Sorry, the page you are looking for does not exist.</p>
          <Link href="/" className="text-blue-500">
            Go back to the homepage
          </Link>
        </main>
      </div>
    );
  };
  
 