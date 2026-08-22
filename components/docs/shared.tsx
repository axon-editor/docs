import Link from "next/link";
import Image from "next/image";
import {
  Bot,
  Braces,
  Code2,
  GitBranch,
  Keyboard,
  MonitorCog,
  Package,
  PanelTop,
  Search,
  Settings,
  Sparkles,
  SplitSquareHorizontal,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Stagger, StaggerItem } from "./motion";

const iconMap = {
  agent: Bot,
  editor: Code2,
  git: GitBranch,
  search: Search,
  split: SplitSquareHorizontal,
  terminal: Terminal,
  settings: Settings,
  themes: Sparkles,
  keys: Keyboard,
  extensions: Package,
  lsp: Braces,
  build: Wrench,
  updates: MonitorCog,
  panel: PanelTop,
} satisfies Record<string, LucideIcon>;

type CardItem = {
  title: string;
  description: string;
  href: string;
  icon?: keyof typeof iconMap;
};

export function DocCards({ items }: { items: CardItem[] }) {
  return (
    <Stagger className="not-prose my-8 grid gap-3 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = iconMap[item.icon ?? "panel"];

        return (
          <StaggerItem key={item.href}>
            <Link
              href={item.href}
              data-doc-accent={item.icon ?? "panel"}
              className="docs-card group block h-full rounded-xl border p-5"
            >
              <div className="docs-card-icon mb-5 flex size-10 items-center justify-center rounded-lg border">
                <Icon className="size-5" />
              </div>
              <h3 className="m-0 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            </Link>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

export function Screenshot({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="docs-screenshot docs-motion-item not-prose my-10 min-w-0 max-w-full overflow-hidden rounded-xl border">
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1200}
        sizes="(min-width: 1024px) 900px, 100vw"
        className="block h-auto w-full max-w-full"
      />
      <figcaption className="border-t px-4 py-3 text-sm leading-6">
        {caption}
      </figcaption>
    </figure>
  );
}

export function CommandTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="docs-motion-item not-prose my-8 overflow-hidden rounded-xl border border-black/10 bg-zinc-50 dark:border-white/10 dark:bg-[#101012]">
      {rows.map(([command, description]) => (
        <div
          key={command}
          className="grid gap-3 border-b border-zinc-200 p-4 last:border-b-0 dark:border-zinc-800 md:grid-cols-[16rem_1fr]"
        >
          <code className="text-sm text-violet-700 dark:text-violet-300">{command}</code>
          <p className="m-0 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
      ))}
    </div>
  );
}

export function StepList({ steps }: { steps: string[] }) {
  return (
    <div className="docs-motion-item not-prose my-8 overflow-hidden rounded-xl border border-black/10 bg-zinc-50 dark:border-white/10 dark:bg-[#101012]">
      {steps.map((step, index) => (
        <div
          key={step}
          className="grid gap-4 border-b border-zinc-200 p-4 last:border-b-0 dark:border-zinc-800 md:grid-cols-[4rem_1fr]"
        >
          <span className="font-mono text-sm text-zinc-500">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="m-0 leading-7 text-zinc-700 dark:text-zinc-300">{step}</p>
        </div>
      ))}
    </div>
  );
}
