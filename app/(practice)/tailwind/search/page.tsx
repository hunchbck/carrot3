export default function Tailwind() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100 p-5 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100">
      <div className="flex w-full max-w-screen-sm flex-col gap-2 rounded-3xl bg-white p-5 shadow-lg md:flex-row">
        <input
          className="h-12 w-full rounded-full bg-gray-200 pl-5 outline-none ring ring-transparent transition-shadow placeholder:drop-shadow focus:ring-orange-500 focus:ring-offset-2"
          placeholder="Search here..."
          type="text"
        />
        <button className="rounded-full bg-black bg-opacity-50 py-2 font-medium text-white outline-none transition-transform active:scale-90 md:px-10">
          Search
        </button>
      </div>
    </main>
  );
}
