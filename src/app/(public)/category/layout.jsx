import Link from "next/link";

export default function CategoryLayout({ children }) {
  return (
    <section className="min-h-screen flex bg-white overflow-hidden">
      {/* 🔹 Sidebar */}
      <aside className="w-64 hidden md:flex flex-col border-r border-gray-200 bg-gray-50 p-6 space-y-8  overflow-y-auto sticky top-0">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          &gt; <span className="text-gray-800 font-medium">Men</span>
        </div>

        {/* Browse Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Browse by</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/category/all" className="hover:text-blue-600">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/category/new-arrivals" className="hover:text-blue-600">
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        {/* Men Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Men</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/category/men" className="hover:text-blue-600">
                All Men
              </Link>
            </li>
            <li>
              <Link href="/category/men/shirts" className="hover:text-blue-600">
                Shirts
              </Link>
            </li>
          </ul>
        </div>

        {/* Women Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Women</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/category/women" className="hover:text-blue-600">
                All Women
              </Link>
            </li>
            <li>
              <Link href="/category/women/festive-wear" className="hover:text-blue-600">
                Festive Wear
              </Link>
            </li>
            <li>
              <Link href="/category/women/short-kurti" className="hover:text-blue-600">
                Short Kurti
              </Link>
            </li>
          </ul>
        </div>

        {/* Ethnic Wear */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Ethnic Wear</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/category/ethnic-wear" className="hover:text-blue-600">
                All Ethnic Wear
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* 🔹 Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen no-scrollbar">
        {children}
      </main>
    </section>
  );
}
