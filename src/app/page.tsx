import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Blogs from "@/components/sections/Blogs";
import Footer from "@/components/sections/Footer";
import { getFeaturedBlogs } from "@/lib/blogs";

export default function Home() {
  const featuredBlogs = getFeaturedBlogs(3);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main>
        <Hero />
        <Projects />
        <Blogs posts={featuredBlogs} />
      </main>
      <Footer />
    </div>
  );
}
