"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { BackgroundRipple } from "@/components/ui/background-ripple";
import {
  ArrowRight,
  Bot,
  Braces,
  Check,
  ChevronRight,
  Code2,
  Command,
  FileText,
  GitBranch,
  Keyboard,
  Package,
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
  accent: string;
};

const quickstart = [
  { title: "Install Axon", href: "/docs/getting-started/installation" },
  {
    title: "Open your first project",
    href: "/docs/getting-started/first-project",
  },
  { title: "Work with Axon Agent", href: "/docs/features/axon-agent" },
];

const explore: DocLink[] = [
  {
    title: "Editor",
    description:
      "Tabs, panes, previews, code snapshots, formatting controls, and workspace-native editing.",
    href: "/docs/features/editor",
    icon: Code2,
    accent: "text-violet-700 dark:text-violet-300",
  },
  {
    title: "Axon Agent",
    description:
      "Project-aware terminal sessions, commands, and commit drafts.",
    href: "/docs/features/axon-agent",
    icon: Bot,
    accent: "text-violet-700 dark:text-violet-300",
  },
  {
    title: "Terminal",
    description: "PTY-backed tabs, replay, reconnect behavior, and CLI usage.",
    href: "/docs/features/terminal",
    icon: Terminal,
    accent: "text-emerald-700 dark:text-emerald-300",
  },
  {
    title: "Search",
    description: "Workspace search, quick find, results, and smart exclusions.",
    href: "/docs/features/search",
    icon: Search,
    accent: "text-blue-700 dark:text-blue-300",
  },
  {
    title: "Git",
    description: "Status, diffs, history, branches, and assisted commits.",
    href: "/docs/features/git",
    icon: GitBranch,
    accent: "text-orange-700 dark:text-orange-300",
  },
  {
    title: "Language servers",
    description: "TypeScript, Python, Go, Rust, Tailwind, Docker, and more.",
    href: "/docs/language-servers",
    icon: Braces,
    accent: "text-pink-700 dark:text-pink-300",
  },
];

const references = [
  {
    title: "Customization",
    href: "/docs/customization/settings",
    icon: Settings,
  },
  { title: "Extensions", href: "/docs/extensions", icon: Package },
  {
    title: "Keybindings",
    href: "/docs/customization/keybindings",
    icon: Keyboard,
  },
  {
    title: "Build from source",
    href: "/docs/development/building",
    icon: Wrench,
  },
  { title: "Release updates", href: "/docs/updates", icon: FileText },
];

const ease = [0.22, 1, 0.36, 1] as const;
const heroMessages = [
  "Learn every surface.",
  "Master your workflow.",
  "Build with context.",
  "Move at your pace.",
  "Make Axon yours.",
];

export function AxonHome() {
  const reduceMotion = useReducedMotion();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % heroMessages.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-zinc-900 transition-colors dark:bg-black dark:text-zinc-100">
      <BackgroundRipple />
      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease }}
        className="pointer-events-none absolute left-1/2 top-0 h-[44rem] w-[72rem] -translate-x-1/2 [background:radial-gradient(ellipse_at_50%_0%,rgb(0_0_0/0.2)_0%,rgb(0_0_0/0.08)_42%,transparent_74%)] dark:[background:radial-gradient(ellipse_at_50%_0%,rgb(255_255_255/0.24)_0%,rgb(255_255_255/0.09)_42%,transparent_74%)]"
      />

      <section className="relative px-5 pb-24 pt-20 sm:px-8 sm:pt-28 lg:pb-32 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mx-auto max-w-4xl text-center"
          >
            <Link
              href="/docs/updates"
              className="group mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:border-black/20 hover:text-zinc-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-zinc-200"
            >
              Documentation for the latest Axon release
              <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <h1 className="text-balance text-2xl font-semibold tracking-normal text-zinc-950 dark:text-white sm:text-4xl md:text-6xl lg:text-[5.5rem] lg:leading-[0.98]">
              Everything about Axon.
              <span className="relative mt-1 block h-[1.08em] overflow-hidden text-zinc-500 dark:text-zinc-400">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={heroMessages[messageIndex]}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: "55%", filter: "blur(8px)" }
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={
                      reduceMotion
                        ? undefined
                        : { opacity: 0, y: "-45%", filter: "blur(8px)" }
                    }
                    transition={{ duration: 0.9, ease }}
                    className="absolute inset-x-0 top-0 block whitespace-nowrap"
                  >
                    {heroMessages[messageIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg sm:leading-8">
              Learn the editor, master its workspace tools, and extend your
              development environment, from your first project to a custom
              setup.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/docs"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Get started <ArrowRight className="size-4" />
              </Link>
              <Link
                href="https://github.com/axon-editor/axon"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-black/10 bg-black/[0.03] px-5 text-sm font-medium text-zinc-700 transition hover:border-black/20 hover:bg-black/[0.06] dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:border-white/20 dark:hover:bg-white/[0.08]"
              >
                <GitBranch className="size-4" /> View on GitHub
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="relative mx-auto mt-16 max-w-5xl sm:mt-20"
          >
            <div className="relative overflow-hidden rounded-xl border border-white/15 bg-zinc-950 p-1.5">
              <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.07] px-3">
                <span className="size-2.5 rounded-full bg-zinc-700" />
                <span className="size-2.5 rounded-full bg-zinc-700" />
                <span className="size-2.5 rounded-full bg-zinc-700" />
                <span className="ml-auto font-mono text-[10px] text-zinc-600">
                  AXON / WORKSPACE
                </span>
              </div>
              <Image
                src="/media/screenshots/axon-latest-14.png"
                alt="The Axon editor showing a development workspace"
                width={1920}
                height={1080}
                priority
                className="h-auto w-full rounded-b-lg opacity-90"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative border-y border-black/[0.07] bg-zinc-50 px-5 py-20 dark:border-white/[0.07] dark:bg-zinc-950/30 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <SectionHeader
            eyebrow="Start here"
            title="From zero to flow in three steps."
            description="A focused path through installation, workspace setup, and the tools that make Axon feel fast."
          />
          <div className="overflow-hidden rounded-lg border border-black/[0.1] bg-white divide-y divide-black/[0.09] dark:divide-white/[0.08] dark:border-white/[0.08] dark:bg-black/20">
            {quickstart.map((item, index) => (
              <motion.div
                key={item.href}
                initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.06, ease }}
              >
                <Link
                  href={item.href}
                  className="group flex items-center gap-5 px-4 py-5 transition-colors hover:bg-zinc-100 dark:hover:bg-white/[0.035] sm:px-5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] font-mono text-xs text-zinc-600 transition group-hover:border-violet-600/40 group-hover:text-violet-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-500 dark:group-hover:border-violet-400/40 dark:group-hover:text-violet-300">
                    0{index + 1}
                  </span>
                  <span className="font-medium text-zinc-800 transition group-hover:text-black dark:text-zinc-200 dark:group-hover:text-white">
                    {item.title}
                  </span>
                  <ArrowRight className="ml-auto size-4 text-zinc-500 transition group-hover:translate-x-1 group-hover:text-black dark:text-zinc-600 dark:group-hover:text-white" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Explore the platform"
            title="Built for the whole development loop."
            description="Detailed guides for every part of Axon, with real workflows and the reasoning behind them."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {explore.map((item, index) => (
              <FeatureCard
                key={item.href}
                item={item}
                index={index}
                reduceMotion={Boolean(reduceMotion)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/[0.07] px-5 py-20 dark:border-white/[0.07] sm:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-black/10 bg-zinc-50 dark:border-white/10 dark:bg-[#050505] lg:grid-cols-2">
          <div className="p-7 sm:p-10 lg:p-12">
            <div className="mb-6 flex size-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
              <Command className="size-5" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
              The shortest path to productive.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Open the current directory, keep your tools scoped to the
              workspace, and let Axon carry project context across the editor.
            </p>
            <div className="mt-7 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              {[
                "Workspace-aware from the first command",
                "Integrated Git, terminal, and language tooling",
                "Local agent sessions that understand the project",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-black/10 bg-white p-7 dark:border-white/10 dark:bg-black/40 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#070707]">
              <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3 text-xs text-zinc-500">
                <Terminal className="size-3.5" /> terminal
              </div>
              <div className="space-y-5 p-5 font-mono text-sm">
                <CommandLine
                  command="axon ."
                  result="Opening workspace in Axon…"
                  delay={0}
                />
                <CommandLine
                  command="axon"
                  result="Agent ready · workspace attached"
                  delay={0.12}
                />
                <CommandLine
                  command="axon commit"
                  result="Drafting from staged changes…"
                  delay={0.24}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/[0.07] px-5 py-16 dark:border-white/[0.07] sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
            Reference &amp; resources
          </p>
          <div className="grid border-l border-t border-black/[0.09] dark:border-white/[0.08] sm:grid-cols-2 lg:grid-cols-5">
            {references.map(({ title, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 border-b border-r border-black/[0.09] p-4 text-sm text-zinc-700 transition hover:bg-black/[0.04] hover:text-black dark:border-white/[0.08] dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-white"
              >
                <Icon className="size-4 text-zinc-600 transition group-hover:text-violet-700 dark:group-hover:text-violet-300" />
                {title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
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
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-400">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-zinc-950 dark:text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function FeatureCard({
  item,
  index,
  reduceMotion,
}: {
  item: DocLink;
  index: number;
  reduceMotion: boolean;
}) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease }}
    >
      <Link
        href={item.href}
        className="group relative block h-full overflow-hidden rounded-xl border border-black/[0.09] bg-zinc-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-black/20 dark:border-white/[0.09] dark:bg-[#070707] dark:hover:border-white/20"
      >
        <div
          className={`relative flex size-10 items-center justify-center rounded-lg border border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03] ${item.accent}`}
        >
          <Icon className="size-4.5" />
        </div>
        <div className="relative mt-8 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600 transition dark:text-zinc-500 dark:group-hover:text-zinc-400">
              {item.description}
            </p>
          </div>
          <ArrowRight className="mt-1 size-4 shrink-0 -translate-x-1 text-zinc-700 opacity-0 transition group-hover:translate-x-0 group-hover:text-zinc-900 group-hover:opacity-100 dark:group-hover:text-zinc-300" />
        </div>
      </Link>
    </motion.div>
  );
}

function CommandLine({
  command,
  result,
  delay,
}: {
  command: string;
  result: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="text-zinc-200">
        <span className="mr-2 text-violet-400">›</span>
        {command}
      </div>
      <p className="mt-1 pl-4 text-xs text-zinc-600">{result}</p>
    </motion.div>
  );
}
