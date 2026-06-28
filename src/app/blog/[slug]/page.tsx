import { Children, isValidElement, type ReactNode } from "react";
import Image from "next/image";
import { getEntry } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { CodeBlock } from "@/components/CodeBlock";
import { CopyForLLM } from "@/components/CopyForLLM";

import { TocRail } from "@/components/TocRail";

const getNodeText = (children: ReactNode): string => {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child);
      if (isValidElement<{ children?: ReactNode }>(child)) return getNodeText(child.props.children);
      return "";
    })
    .join("");
};

const createHeading = (level: 2 | 3) => {
  const Heading = ({ children }: { children: ReactNode }) => {
    const text = getNodeText(children);
    const slug = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    const Tag = `h${level}` as const;

    return <Tag id={slug} className="scroll-mt-32">{children}</Tag>;
  };

  Heading.displayName = `MdxH${level}`;
  return Heading;
};

const components = {
  pre: CodeBlock,
  h2: createHeading(2),
  h3: createHeading(3),
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  console.log("RESOLVED SLUG:", resolvedParams.slug);
  const post = getEntry("blog", resolvedParams.slug);
  console.log("POST FOUND?:", !!post);
  
  if (!post) notFound();

  // Extract headings for TOC
  const headings = Array.from(post.body.matchAll(/^(#{2,3})\s+(.+)$/gm)).map(match => {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    return { text, slug, level };
  });
    
  return (
    <main className="min-h-svh flex flex-col pt-32 pb-32">
      <div className="relative flex flex-col w-full max-w-[640px] mx-auto px-6 lg:px-0">
        <Link href="/blog" className="text-sm opacity-50 hover:opacity-100 no-underline mb-12 flex items-center gap-2 w-fit">
          <ArrowLeft size={14} /> back to blogs
        </Link>

        {/* TOC Rail */}
        <div className="hidden xl:block absolute top-0 left-[calc(100%+5rem)] w-64 h-full pointer-events-none">
          <div className="sticky top-32 pointer-events-auto max-h-[calc(100vh-10rem)] overflow-y-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <TocRail headings={headings} />
          </div>
        </div>
        
        <div style={{ viewTransitionName: `blog-${post.slug}` }}>
          {post.image && (
            <div className="w-full aspect-[21/9] border border-[var(--text)]/20 mb-8 overflow-hidden relative bg-[var(--bg)]">
              <Image
                src={post.image} 
                alt={`${post.title} hero image`}
                fill
                sizes="640px"
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-[var(--text)] mix-blend-color pointer-events-none"></div>
            </div>
          )}
          <div className="flex flex-col gap-6 mb-10">
            <h1 className="text-[28px] leading-tight font-bold tracking-tight max-w-[90%]">{post.title}</h1>
            <CopyForLLM post={post} />
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-16">
              {post.tags.map(tag => (
                <span key={tag} className="text-[11px] px-2 py-1 bg-[var(--text)]/10 text-[var(--text)] border border-[var(--text)]/20 uppercase tracking-widest" style={{ fontFamily: "var(--font-geist-mono)" }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <article className="prose max-w-none text-[15px] leading-relaxed prose-p:text-[var(--text)] prose-headings:text-[var(--text)] prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--text)] prose-a:underline-offset-4 hover:prose-a:opacity-70 prose-strong:text-[var(--text)] prose-blockquote:border-l-[var(--text)] prose-blockquote:text-[var(--text)] prose-blockquote:opacity-80 prose-hr:border-[var(--text)]/20 prose-li:text-[var(--text)] prose-ul:text-[var(--text)] prose-img:border prose-img:border-[var(--text)]/20 prose-img:w-full [&_:not(pre)>code]:bg-[var(--text)] [&_:not(pre)>code]:text-[var(--bg)] [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:before:content-none [&_:not(pre)>code]:after:content-none">
            <MDXRemote 
              source={post.body} 
              components={components}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [
                      rehypePrettyCode,
                      {
                        theme: {
                          light: "vitesse-light",
                          dark: "vitesse-dark"
                        },
                        keepBackground: false,
                        defaultLang: {
                          block: "plaintext"
                        }
                      }
                    ]
                  ]
                }
              }}
            />
          </article>
          
          {post.links && (
            <div className="mt-24 pt-12 border-t border-[var(--text)]/20">
              <h3 className="text-xs font-bold opacity-50 mb-8 tracking-widest" style={{ fontFamily: "var(--font-geist-mono)" }}>[ ASSOCIATED LINKS ]</h3>
              <div className="flex flex-col gap-4">
                {Object.entries(post.links).map(([label, href]) => (
                  <a key={label} href={href as string} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-5 border border-[var(--text)]/20 hover:bg-[var(--text)] hover:text-[var(--bg)] transition-colors duration-200 no-underline">
                    <span className="font-bold tracking-tight text-[15px]">{label}</span>
                    <span className="font-mono text-[13px] opacity-50 group-hover:opacity-100 group-hover:text-[var(--bg)] transition-transform duration-200 transform group-hover:translate-x-1">
                      -&gt;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
