"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Braces,
  CodeXml,
  Command,
  FileText,
  GitBranch,
  Keyboard,
  Package,
  PanelLeft,
  Search,
  Settings,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type DocLink = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

const quickstart = [
  {
    title: "Install Axon",
    href: "/docs/getting-started/installation",
    description: "Pick the right release asset and understand platform notes.",
  },
  {
    title: "Open a project",
    href: "/docs/getting-started/first-project",
    description:
      "Start from the workspace root so Git, terminal, and LSP state line up.",
  },
  {
    title: "Use Axon Agent",
    href: "/docs/features/axon-agent",
    description:
      "Run project-aware terminal sessions, slash commands, and commit drafts.",
  },
];

const explore: DocLink[] = [
  {
    title: "Editor",
    description:
      "Tabs, panes, previews, dirty-state protection, hover, and find-in-file behavior.",
    href: "/docs/features/editor",
    icon: CodeXml,
  },
  {
    title: "Terminal",
    description:
      "PTY-backed terminal tabs, replay, reconnect behavior, and CLI usage.",
    href: "/docs/features/terminal",
    icon: Terminal,
  },
  {
    title: "Search",
    description:
      "Workspace search, quick find, result navigation, and default exclusions.",
    href: "/docs/features/search",
    icon: Search,
  },
  {
    title: "Git",
    description:
      "Status, diffs, history, branch context, and agent-assisted commits.",
    href: "/docs/features/git",
    icon: GitBranch,
  },
  {
    title: "Language Servers",
    description:
      "TypeScript, Python, Go, Rust, Tailwind, JSON, YAML, Docker, and more.",
    href: "/docs/language-servers",
    icon: Braces,
  },
  {
    title: "Customization",
    description:
      "Settings, themes, keybindings, and extension package structure.",
    href: "/docs/customization/settings",
    icon: Settings,
  },
];

const references: DocLink[] = [
  {
    title: "Extensions",
    description:
      "Manifest schema, contribution types, activation, and extension boundaries.",
    href: "/docs/extensions",
    icon: Package,
  },
  {
    title: "Updates",
    description:
      "GitHub Releases, platform assets, unsigned macOS builds, and update flow.",
    href: "/docs/updates",
    icon: FileText,
  },
  {
    title: "Build from source",
    description:
      "Run the Go backend, Electron app, production builds, and language-server bundles.",
    href: "/docs/development/building",
    icon: Wrench,
  },
];

export function AxonHome() {
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <section className="border-b border-zinc-900 px-6 py-20 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_420px] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs font-medium text-zinc-400">
              <PanelLeft className="size-3.5 text-cyan-300" />
              Axon documentation
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
              Build with Axon.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              Axon is a desktop code editor for workspace-aware development:
              files, panes, terminals, Git, language servers, settings,
              extensions, and a local project-aware agent.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-md border border-cyan-400/70 bg-cyan-950/30 px-4 py-2.5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-900/35"
              >
                Start reading
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="https://github.com/GordenArcher/axon"
                className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-zinc-700 hover:bg-zinc-900"
              >
                <Command className="size-4" />
                GitHub
              </Link>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-lg border border-zinc-800 bg-zinc-950/80 shadow-2xl shadow-black/40"
          >
            <div className="border-b border-zinc-800 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                <Terminal className="size-4 text-cyan-300" />
                Quick commands
              </div>
            </div>
            <div className="space-y-5 p-5 font-mono text-sm">
              <CommandLine
                command="axon ."
                description="Open the current directory in Axon."
              />
              <CommandLine
                command="axon"
                description="Start a workspace-scoped Agent session."
              />
              <CommandLine
                command="axon commit"
                description="Draft a commit from staged changes."
              />
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="border-b border-zinc-900 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Quickstart"
            title="Get Axon set up in a project."
            description="Start with the minimum path that makes the editor useful: install, open a real workspace root, then attach the agent and project tooling."
          />
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {quickstart.map((item, index) => (
              <NumberedCard key={item.href} index={index + 1} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Explore"
            title="Learn the editor surfaces."
            description="Each page focuses on a real Axon workflow instead of marketing copy."
          />
          <LinkGrid items={explore} />
        </div>
      </section>

      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Reference"
            title="Customize, extend, and ship."
            description="Use these pages when you are configuring Axon itself or working on the editor."
          />
          <LinkGrid items={references} compact />
        </div>
      </section>
    </main>
  );
}

function CommandLine({
  command,
  description,
}: {
  command: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-zinc-100">
        <span className="text-cyan-300">$</span>
        <span>{command}</span>
      </div>
      <p className="mt-1 pl-4 text-xs leading-5 text-zinc-500">{description}</p>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-cyan-300">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
        {description}
      </p>
    </div>
  );
}

function NumberedCard({
  index,
  title,
  description,
  href,
}: {
  index: number;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border border-zinc-800 bg-zinc-950/70 p-5 transition hover:border-zinc-700 hover:bg-zinc-900/70"
    >
      <span className="font-mono text-xs text-zinc-500">0{index}</span>
      <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
      <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-300">
        Open
        <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

function LinkGrid({
  items,
  compact = false,
}: {
  items: DocLink[];
  compact?: boolean;
}) {
  return (
    <div
      className={`mt-6 grid gap-3 ${compact ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"}`}
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="group flex gap-4 rounded-lg border border-zinc-800 bg-zinc-950/60 p-5 transition hover:border-zinc-700 hover:bg-zinc-900/70"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-black text-zinc-300 group-hover:text-cyan-300">
              <Icon className="size-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-zinc-400">
                {item.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
