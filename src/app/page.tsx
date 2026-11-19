import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Blogs from "@/components/sections/Blogs";
import Footer from "@/components/sections/Footer";
import { getAllBlogs } from "@/lib/blogs";

export default function Home() {
  const allBlogs = getAllBlogs();
  const featuredBlogs = allBlogs.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <main>
          <Hero />
          <Projects />
          <Blogs posts={featuredBlogs} totalCount={allBlogs.length} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
