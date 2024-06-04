export default function Tailwind() {
  return (
    <main className="flex dark:bg-gray-700 items-center justify-center h-screen p-5 bg-gray-100">
      <div className="w-full shadow-lg p-5 bg-white rounded-3xl max-w-screen-sm dark:bg-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="-mb-1 font-semibold dark:text-gray-300 text-gray-600">
              In transit
            </span>
            <span className="text-4xl dark:text-white font-semibold">
              Coolblue
            </span>
          </div>
          <div className="bg-orange-400 rounded-full size-12" />
        </div>
        <div className="my-2 flex items-center gap-2">
          <span className="px-2.5 font-medium text-white uppercase bg-green-400 rounded-full transition hover:scale-125 text-xs hover:bg-green-500 py-1.5">
            Today
          </span>
          <span className="dark:text-gray-100">9:30-10:30</span>
        </div>
        <div className="relative">
          <div className="bg-gray-200 absolute rounded-full w-full h-2" />
          <div className="bg-green-400 absolute rounded-full w-2/3 h-2" />
        </div>
        <div className="flex justify-between dark:text-gray-300 items-center mt-5 text-gray-600">
          <span>Expacted</span>
          <span>Sorting center</span>
          <span>In transit</span>
          <span className="text-gray-400 dark:text-gray-500">Delivered</span>
        </div>
      </div>
    </main>
  );
}
