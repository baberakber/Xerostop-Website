import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import type { ArticleAuthor } from '@/types/insights';

interface AuthorBioProps {
  author: ArticleAuthor;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <section data-reveal className="rounded-xl border border-border bg-card p-6 md:p-8" aria-labelledby="author-heading">
      <h2 id="author-heading" className="mb-4 text-lg font-semibold text-foreground">
        About the Author
      </h2>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-border">
          <Image src={author.avatar.url} alt={author.avatar.alt} width={60} height={55} className="h-auto w-[60px] object-contain" />
        </div>
        <div>
          <p className="text-xl font-semibold text-foreground">{author.name}</p>
          <p className="text-sm text-primary">{author.role}</p>
          {author.bio && <p className="mt-2 text-text-secondary">{author.bio}</p>}
          {author.linkedin && (
            <a
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Linkedin className="h-5 w-5" />
              Connect on LinkedIn
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
