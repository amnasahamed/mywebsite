import { useEffect, useState } from 'react';
import type { Theme } from '../types';

type BlogPost = {
  title: string;
  slug: string;
  url: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt?: string;
};

export const BlogContent = ({ theme }: { theme?: Theme }) => {
  const isMacos = theme === 'macos';
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch('/blog/posts.json', { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : []))
      .then((data: BlogPost[]) => {
        if (active) {
          setPosts(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        if (active) {
          setPosts([]);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={`space-y-6 ${isMacos ? 'text-gray-800' : 'font-retro text-black'}`} id="blog">
      <div className="flex flex-col gap-1">
        <h2 className={`text-2xl font-bold tracking-tight ${isMacos ? 'text-black' : ''}`}>Community Notes</h2>
        <p className="text-sm opacity-60 font-medium">Public-safe essays, guides, and lessons from useful conversations</p>
      </div>

      {loading ? (
        <div className={isMacos ? 'rounded-2xl bg-gray-50 p-4 text-sm' : 'retro-border-thin bg-[#f0f0f0] p-4 text-sm'}>
          Loading notes...
        </div>
      ) : posts.length === 0 ? (
        <div className={isMacos ? 'rounded-2xl bg-blue-50/60 p-4 text-sm text-gray-700' : 'retro-border-thin bg-[#ffffcc] p-4 text-sm'}>
          No public notes yet. Publish from Community Insights and they will appear here.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <article
              key={post.slug}
              className={`p-4 transition-all ${
                isMacos
                  ? 'rounded-[18px] border border-black/5 bg-white/65 shadow-sm hover:border-blue-200 hover:shadow-md'
                  : 'retro-border-thin bg-[#fafafa]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <h3 className={`text-lg font-bold ${isMacos ? 'text-blue-600' : 'text-[#000080]'}`}>
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-75">{post.excerpt}</p>
                </div>
                <span
                  className={`shrink-0 px-2 py-0.5 text-[10px] font-bold ${
                    isMacos ? 'rounded-full bg-blue-100 text-blue-700' : 'retro-border-thin bg-blue-100 text-blue-800'
                  }`}
                >
                  {post.category}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-0.5 text-[10px] font-bold ${
                      isMacos ? 'rounded-md border border-black/5 bg-white/70' : 'retro-border-thin bg-white'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                <a
                  href={post.url}
                  className={`ml-auto text-xs font-bold underline ${isMacos ? 'text-blue-500' : 'text-blue-600'}`}
                >
                  Read note
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
