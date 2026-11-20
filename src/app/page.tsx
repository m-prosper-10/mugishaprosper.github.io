import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import HomeTabs from "@/components/sections/HomeTabs";
import Footer from "@/components/sections/Footer";
import { getAllBlogs } from "@/lib/blogs";

export default function Home() {
  const allBlogs = getAllBlogs();
  const featuredBlogs = allBlogs.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <main>
          <Hero />
          <HomeTabs posts={featuredBlogs} totalCount={allBlogs.length} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
