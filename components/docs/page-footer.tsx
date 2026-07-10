import Link from "next/link";
import { SquarePen, ThumbsDown, ThumbsUp } from "lucide-react";

export function DocsPageFooter({ editUrl }: { editUrl: string }) {
  return (
    <footer className="mt-16 border-t border-white/[0.08] pt-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={editUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex w-fit items-center gap-2 rounded-md border border-white/10 bg-[#070707] px-3 py-2 text-sm font-medium text-zinc-400 transition hover:border-violet-400/30 hover:text-white"
        >
          <SquarePen className="size-4" />
          Edit this page
        </Link>

        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <span>Was this page helpful?</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-[#070707] px-3 py-2 text-sm font-medium text-zinc-400 transition hover:border-violet-400/30 hover:text-white"
            >
              <ThumbsUp className="size-4" />
              Yes
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-[#070707] px-3 py-2 text-sm font-medium text-zinc-400 transition hover:border-violet-400/30 hover:text-white"
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
