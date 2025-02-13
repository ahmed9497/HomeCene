import Image from "next/image";

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <Image src={'/not-found.svg'} height={300} width={300} alt="Not-found"/>
        <h1 className="mt-6 text-2xl sm:text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-md sm:text-lg mt-2">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="mt-4 px-10 py-2 bg-primary text-white rounded">Go Home</a>
      </div>
    );
  }
  