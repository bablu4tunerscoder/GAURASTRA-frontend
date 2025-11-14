import HeroBanner from "@/components/HeroBanner";
import Image from "next/image";

export default function BlogsPage() {
  const blogs = [
    {
      id: 1,
      title: "The Art of Custom Clothing: Redefining Personal Style",
      author: "Riya Sharma",
      date: "Oct 25, 2025",
      image:
        "/assets/bg3.webp",
    },
    {
      id: 2,
      title: "Sustainable Fabrics: Fashion with a Conscience",
      author: "Aarav Patel",
      date: "Nov 3, 2025",
      image:
        "/assets/bg3.webp",
    },
    {
      id: 3,
      title: "Modern Ethnic Wear Trends for 2025",
      author: "Neha Kapoor",
      date: "Nov 8, 2025",
      image:
        "/assets/bg3.webp",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50">
      {/* 🔹 Hero Section */}
      <HeroBanner imgUrl="/assets/bg3.webp" title="Blogs" />

      {/* 🔹 Blog Section */}
      <div className="py-16 px-6 md:px-12 lg:px-20">
        <div className="text-center mb-12">
          <p className="text-gray-600 text-lg">
            Insights, inspiration, and stories from the world of custom fashion.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {/* Blog Image */}
              <div className="h-56 w-full overflow-hidden relative">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>


              {/* Blog Info */}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition line-clamp-2">
                  {blog.title}
                </h2>
                <div className="text-sm text-gray-500 flex justify-between items-center">
                  <span>By {blog.author}</span>
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
