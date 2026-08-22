import Link from "next/link";
import { SquarePen, ThumbsDown, ThumbsUp } from "lucide-react";

export function DocsPageFooter({ editUrl }: { editUrl: string }) {
  return (
    <footer className="docs-page-footer mt-20 border-t pt-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={editUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex w-fit items-center gap-2 rounded-md border border-black/10 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-600 transition hover:border-[#f0a06b]/40 hover:text-zinc-950 dark:border-white/10 dark:bg-[#101012] dark:text-zinc-400 dark:hover:text-[#f3bb94]"
        >
          <SquarePen className="size-4" />
          Edit this page
        </Link>

        <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          <span>Was this page helpful?</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-black/10 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-600 transition hover:border-violet-500/30 hover:text-zinc-950 dark:border-white/10 dark:bg-[#070707] dark:text-zinc-400 dark:hover:text-white"
            >
              <ThumbsUp className="size-4" />
              Yes
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-black/10 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-600 transition hover:border-violet-500/30 hover:text-zinc-950 dark:border-white/10 dark:bg-[#070707] dark:text-zinc-400 dark:hover:text-white"
            >
              <ThumbsDown className="size-4" />
              No
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
