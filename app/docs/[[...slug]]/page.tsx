import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { gitConfig } from '@/lib/shared';
import { DocsPageFooter } from '@/components/docs/page-footer';
import { DocsPageShell } from '@/components/docs/page-shell';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`;
  const section = page.url.split('/').filter(Boolean)[1]?.replaceAll('-', ' ') ?? 'overview';

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsPageShell>
        <div className="docs-page-heading">
          <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f0a06b]">
            <span className="h-px w-8 bg-[#f0a06b]" />
            <span className="capitalize">{section}</span>
          </div>
          <DocsTitle>{page.data.title}</DocsTitle>
          <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
          <div className="docs-heading-actions mt-7 flex flex-row items-center gap-2 border-t border-white/[0.08] pt-5">
            <MarkdownCopyButton markdownUrl={markdownUrl} />
            <ViewOptionsPopover markdownUrl={markdownUrl} githubUrl={githubUrl} />
          </div>
        </div>
        <DocsBody>
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
        <DocsPageFooter editUrl={githubUrl} />
      </DocsPageShell>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
