export default function LandingPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          Discover the best digital tools and products at&nbsp;
          <code className="font-mono font-bold">LeafMart</code>
        </p>
      </div>

      <div className="relative flex place-items-center mt-8">
        <h1 className="text-6xl font-bold text-center">
          Your One-Stop Digital Marketplace
        </h1>
      </div>

      <div className="mt-8">
        <a
          href="/products"
          className="rounded-md bg-black px-6 py-3 text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          Browse Products
        </a>
      </div>
    </main>
    </>
  );
}
