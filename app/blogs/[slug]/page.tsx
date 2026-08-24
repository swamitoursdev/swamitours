"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageShell from "@/components/layout/PageShell";
import { Loader2, Calendar, Clock, ArrowLeft, User } from "lucide-react";

interface BlogPost {
  title: string;
  slug: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  readTime?: string;
  createdAt?: Timestamp | string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          where("slug", "==", slug),
          where("status", "==", "Published")
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setPost(querySnapshot.docs[0].data() as BlogPost);
        } else {
          const docRef = doc(db, "blogs", slug);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().status === "Published") {
            setPost(docSnap.data() as BlogPost);
          } else {
            setPost(null);
          }
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateVal?: Timestamp | string) => {
    if (!dateVal) return "Recently";
    if (dateVal instanceof Timestamp) {
      return dateVal.toDate().toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      });
    }
    return String(dateVal);
  };

  return (
    <div className="flex min-h-screen flex-col bg-sand-50 text-ink">
      <Header />

      <main className="flex-1">
        {loading ? (
          <div className="flex min-h-[60vh] items-center justify-center text-ink/50 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading article...</span>
          </div>
        ) : !post ? (
          <PageShell
            eyebrow="Not Found"
            title="Article Not Found"
            description="The story or guide you are looking for does not exist or has been removed."
          >
            <div className="text-center py-12">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm font-semibold text-saffron-dark hover:underline"
              >
                <ArrowLeft className="w-4 h-4" /> Return to all blogs
              </Link>
            </div>
          </PageShell>
        ) : (
          <article className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            <div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-saffron-dark hover:underline mb-6"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
              </Link>

              <div className="flex items-center gap-3 text-xs text-ink/60 mb-3">
                <span className="font-semibold text-saffron-dark bg-saffron/10 px-2.5 py-0.5 rounded">
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

              <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-2 mt-4 text-xs text-ink/70 font-medium">
                <User className="w-3.5 h-3.5" />
                <span>By {post.author || "Swami Tours Editorial"}</span>
              </div>
            </div>

            {post.coverImage && (
              <div className="relative aspect- aspect-video w-full overflow-hidden rounded-2xl bg-ink/5 border border-ink/10 shadow-sm">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {post.excerpt && (
              <p className="text-base text-ink/80 italic border-l-4 border-saffron-dark pl-4 py-1 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="text-ink/90 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
              {post.content}
            </div>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
}