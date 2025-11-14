import ProductCard from "@/components/ProductCard";

export default function WomenPage() {
  const arr = new Array(10).fill(0);

  return (
    <section>
      <h1 className="text-3xl font-semibold mb-2">Women's Page</h1>
      <p className="text-gray-600 mb-6">Welcome to the women's page.</p>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {arr.map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </section>
  );
}
