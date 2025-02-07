export default function Loading() {
  return (
    <>
      <main className="container page min-h-[900px] pb-20">
        <div className="my-10 bg-primary items-center capitalize bg-opacity-20  px-2 py-1 rounded-md gap-x-1">
          <div className="w-full h-4 bg-gray-300 animate-pulse my-2 rounded"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
          <div className="w-full h-[600px] bg-gray-300 animate-pulse rounded-lg"></div>

          <div className="col-span-1">
            <div>
              <div className="w-3/4 h-6 bg-gray-300 animate-pulse my-4 rounded"></div>
            </div>

            <div className="mt-1">
              <div className="w-3/4 h-6 bg-gray-300 animate-pulse my-4 rounded"></div>
              <div className="w-3/4 h-10 bg-gray-300 animate-pulse my-4 rounded"></div>
              <div className="w-3/4 h-6 bg-gray-300 animate-pulse my-4 rounded"></div>
              <div className="w-full h-16 bg-gray-300 animate-pulse my-2 rounded"></div>
              <div className="w-full h-4 bg-gray-300 animate-pulse my-2 rounded"></div>
            </div>
            <div className="text-black basis-1/4 mt-10 text-sm font-extrabold uppercase">
              <div className="w-full h-4 bg-gray-300 animate-pulse my-2 rounded"></div>
              <div className="w-full h-8 bg-gray-300 animate-pulse my-2 rounded"></div>
            </div>

            <div className="mt-10">
              <div className="text-black basis-1/4 text-sm font-extrabold uppercase">
                <div className="w-full h-4 bg-gray-300 animate-pulse my-2 rounded"></div>
              </div>

              <div className="flex items-center justify-between mt-2 sm:w-3/5">
                <div className="w-full h-4 bg-gray-300 animate-pulse my-2 rounded"></div>
              </div>
              <div className="mt-12">
                <div className="w-full h-4 bg-gray-300 animate-pulse my-2 rounded"></div>

                <div className="w-full h-4 bg-gray-300 animate-pulse my-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
