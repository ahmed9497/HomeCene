export default function Loading() {
  return (
   
    <>
      <div className="container pb-20 page">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-16">
          <div className="col-span-1 sm:cols-span-2  pt-4 sm:p-4">
          <div className="w-3/4 h-6 bg-gray-300 animate-pulse my-4 rounded"></div>
            <div className="w-full h-10 mb-5 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="w-full h-10 mb-5 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="w-full h-10 mb-5 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="w-full h-10 mb-5 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="w-full h-10 mb-5 bg-gray-300 animate-pulse rounded-lg"></div>
          </div>
          <div className="cols-span-1 sm:col-span-3  sm:p-4">
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-5">
              {Array.from(Array(21).keys()).map((product, index) => (
                <div key={index}>
                   <div className="w-full h-72 bg-gray-300 animate-pulse rounded-md"></div>
                  </div>
              
              ))}
            </div>

            <div className="my-16 flex justify-center space-x-4">
              <div className="w-32 h-10 bg-gray-300 animate-pulse my-5 rounded"></div>
              <div className="w-32 h-10 bg-gray-300 animate-pulse my-5 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
