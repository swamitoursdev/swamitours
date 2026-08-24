//app\blogs\page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";
import PageShell from "@/components/layout/PageShell";
import {
  Calendar,
  Clock,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  excerpt: string;
  coverImage?: string;
  readTime?: string;
  createdAt?: Timestamp | string;
}

const POSTS_PER_PAGE = 9;

export default function Page() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch only published articles, ordered by newest first
    const blogsQuery = query(
      collection(db, "blogs"),
      where("status", "==", "Published"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      blogsQuery,
      (snapshot) => {
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BlogPost[];
        setPosts(fetched);
        setLoading(false);
      },
      (error) => {
        console.error("Failed to load blogs:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const formatDate = (dateVal?: Timestamp | string) => {
    if (!dateVal) return "Recently";
    if (dateVal instanceof Timestamp) {
      return dateVal.toDate().toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    return String(dateVal);
  };

  const categories = useMemo(() => {
    const present = new Set(posts.map((p) => p.category).filter(Boolean));
    // Keep the canonical admin ordering, only surfacing categories that have posts,
    // then append any legacy/unknown category values so nothing is hidden.
    const known = BLOG_CATEGORIES.filter((c) => present.has(c));
    const unknown = Array.from(present).filter(
      (c) => !(BLOG_CATEGORIES as readonly string[]).includes(c)
    );
    return ["All", ...known, ...unknown];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  // Feature the newest post only on page 1 of the unfiltered "All" view
  const showFeatured = activeCategory === "All" && currentPage === 1;
  const featuredPost = showFeatured ? filteredPosts[0] : undefined;
  const gridSourcePosts = showFeatured ? filteredPosts.slice(1) : filteredPosts;

  const totalPages = Math.max(
    1,
    Math.ceil(
      (showFeatured ? gridSourcePosts.length + 1 : gridSourcePosts.length) /
        POSTS_PER_PAGE
    )
  );

  const paginatedPosts = useMemo(() => {
    const perPage = showFeatured ? POSTS_PER_PAGE - 1 : POSTS_PER_PAGE;
    const start = showFeatured ? 0 : (currentPage - 1) * POSTS_PER_PAGE;
    const end = showFeatured ? perPage : start + POSTS_PER_PAGE;
    return gridSourcePosts.slice(start, end);
  }, [gridSourcePosts, currentPage, showFeatured]);

  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    const neighbors = 1;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - neighbors && i <= currentPage + neighbors)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "ellipsis") {
        pages.push("ellipsis");
      }
    }
    return pages;
  }, [totalPages, currentPage]);

  return (
    <PageShell
      eyebrow="Stories & guides"
      title="From the Swami Tours blog"
      description="Travel tips, route guides and updates from our team."
    >
      {loading ? (
        <SkeletonGrid />
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-ink/60 bg-ink/5 rounded-2xl p-8">
          <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50 text-saffron-dark" />
          <p className="text-base font-semibold text-ink">No articles published yet</p>
          <p className="text-xs text-ink/70 mt-1">
            Check back soon for upcoming travel guides and road-trip tips.
          </p>
        </div>
      ) : (
        <>
          {categories.length > 2 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                    activeCategory === cat
                      ? "bg-saffron-dark text-white border-saffron-dark"
                      : "bg-white text-ink/70 border-ink/15 hover:border-saffron-dark/50 hover:text-saffron-dark"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 text-ink/60 bg-ink/5 rounded-2xl p-8">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50 text-saffron-dark" />
              <p className="text-base font-semibold text-ink">
                No articles in “{activeCategory}” yet
              </p>
              <button
                onClick={() => handleCategoryChange("All")}
                className="mt-3 text-xs font-semibold text-saffron-dark hover:underline"
              >
                View all articles
              </button>
            </div>
          ) : (
            <>
              {featuredPost && (
                <FeaturedCard post={featuredPost} formatDate={formatDate} />
              )}

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedPosts.map((post) => (
                  <BlogCard key={post.id} post={post} formatDate={formatDate} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="Blog pagination"
                  className="mt-10 flex items-center justify-center gap-1.5"
                >
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-ink/15 text-ink/60 hover:border-saffron-dark/50 hover:text-saffron-dark disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {pageNumbers.map((p, idx) =>
                    p === "ellipsis" ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="w-9 h-9 flex items-center justify-center text-ink/40 text-sm"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => goToPage(p)}
                        aria-current={currentPage === p ? "page" : undefined}
                        className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                          currentPage === p
                            ? "bg-saffron-dark text-white"
                            : "text-ink/70 border border-ink/15 hover:border-saffron-dark/50 hover:text-saffron-dark"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-ink/15 text-ink/60 hover:border-saffron-dark/50 hover:text-saffron-dark disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              )}
            </>
          )}
        </>
      )}
    </PageShell>
  );
}

function FeaturedCard({
  post,
  formatDate,
}: {
  post: BlogPost;
  formatDate: (d?: Timestamp | string) => string;
}) {
  return (
    <Link
      href={`/blogs/${post.slug || post.id}`}
      className="group mb-8 grid overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm hover:shadow-md transition-shadow md:grid-cols-2"
    >
      {post.coverImage ? (
        <div className="relative aspect-video md:aspect-auto w-full overflow-hidden bg-ink/5">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="hidden md:block bg-saffron/10" />
      )}

      <div className="flex flex-col justify-center p-6 md:p-8">
        <div className="flex items-center gap-3 text-xs text-ink/50 mb-3">
          <span className="font-medium text-saffron-dark bg-saffron/10 px-2 py-0.5 rounded">
            {post.category || "Guide"}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.createdAt)}
          </span>
          {post.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          )}
        </div>

        <h2 className="font-display text-2xl font-semibold text-ink leading-snug">
          {post.title}
        </h2>

        <p className="mt-3 text-sm text-ink/70 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-saffron-dark">
          Read Article <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}

function BlogCard({
  post,
  formatDate,
}: {
  post: BlogPost;
  formatDate: (d?: Timestamp | string) => string;
}) {
  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div>
        {post.coverImage && (
          <div className="relative aspect-video w-full overflow-hidden bg-ink/5">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-ink/50 mb-2.5">
            <span className="font-medium text-saffron-dark bg-saffron/10 px-2 py-0.5 rounded">
              {post.category || "Guide"}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.createdAt)}
              </span>
              {post.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              )}
            </div>
          </div>

          <h2 className="font-display text-lg font-semibold text-ink line-clamp-2 leading-snug">
            {post.title}
          </h2>

          <p className="mt-2 text-sm text-ink/70 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-0">
        <Link
          href={`/blogs/${post.slug || post.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-saffron-dark hover:underline"
        >
          Read Article <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

function SkeletonGrid() {
  return (
    <div>
      <div className="mb-8 grid overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm md:grid-cols-2 animate-pulse">
        <div className="aspect-video md:aspect-auto bg-ink/10" />
        <div className="p-6 md:p-8 space-y-3">
          <div className="h-4 w-24 bg-ink/10 rounded" />
          <div className="h-6 w-4/5 bg-ink/10 rounded" />
          <div className="h-4 w-full bg-ink/10 rounded" />
          <div className="h-4 w-2/3 bg-ink/10 rounded" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm animate-pulse"
          >
            <div className="aspect-video bg-ink/10" />
            <div className="p-5 space-y-3">
              <div className="h-3 w-20 bg-ink/10 rounded" />
              <div className="h-5 w-full bg-ink/10 rounded" />
              <div className="h-4 w-full bg-ink/10 rounded" />
              <div className="h-4 w-3/4 bg-ink/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}