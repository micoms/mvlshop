import { currentUser } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function DashboardPage() {
  await auth.protect();
  const user = await currentUser();

  return (
    <main className="max-w-screen-xl w-full mx-auto px-4 pt-8 pb-12">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Welcome, {user?.firstName || "User"} 👋</h1>
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline"
          >
            Back to Storefront
          </Link>
        </div>
        <UserButton appearance={{ elements: { userButtonAvatarBox: "size-8" } }} />
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          { title: "My Orders", value: "12" },
          { title: "Total Spent", value: "$580.00" },
          { title: "Wishlist", value: "4 items" },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white border shadow-sm rounded-xl p-6"
          >
            <p className="text-sm text-gray-500">{card.title}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </section>

      {/* Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/orders" className="text-blue-600 hover:underline">
                View My Orders
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="text-blue-600 hover:underline">
                Manage Wishlist
              </Link>
            </li>
            <li>
              <Link href="/account" className="text-blue-600 hover:underline">
                Account Settings
              </Link>
            </li>
          </ul>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Latest Updates</h2>
          <ul className="text-sm space-y-2 text-gray-600">
            <li>🛍️ New items added to the Fall collection!</li>
            <li>🎁 Free shipping for orders above $50</li>
            <li>🔒 Improved account security</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
