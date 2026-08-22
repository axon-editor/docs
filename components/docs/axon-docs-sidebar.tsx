"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTreeContext } from "fumadocs-ui/contexts/tree";
import { useDocsLayout } from "fumadocs-ui/layouts/docs";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
  type SidebarProps,
} from "fumadocs-ui/layouts/docs/slots/sidebar";
import type * as PageTree from "fumadocs-core/page-tree";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  GitBranch,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

export const axonDocsSidebarSlots = {
  provider: SidebarProvider,
  root: AxonDocsSidebar,
  trigger: SidebarTrigger,
  useSidebar,
};

export function AxonDocsSidebar({ banner, footer }: SidebarProps) {
  const { root } = useTreeContext();
  const { open, setOpen } = useSidebar();
  const { slots } = useDocsLayout();

  useEffect(() => {
    if (!open) return;

    // The custom mobile drawer is fixed over the page. Locking body overflow
    // prevents the document beneath it from moving while the user navigates,
    // and restoring the exact previous value avoids breaking other overlays.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const content = (
    <>
      <div className="axon-sidebar-brand">
        <Link href="/docs" className="axon-sidebar-logo" onClick={() => setOpen(false)}>
          <Image src="/media/icons/axon.png" alt="" width={30} height={30} />
          <span>
            <strong>Axon</strong>
            <small>Documentation</small>
          </span>
        </Link>
        <button
          type="button"
          className="axon-sidebar-mobile-close"
          aria-label="Close documentation navigation"
          onClick={() => setOpen(false)}
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="axon-sidebar-search">
        {slots.searchTrigger ? <slots.searchTrigger.full hideIfDisabled /> : null}
      </div>

      {banner}

      <nav className="axon-sidebar-nav" aria-label="Documentation navigation">
        <p className="axon-sidebar-nav-label">Browse documentation</p>
        {root.children.map((node) => (
          <SidebarNode key={node.$id ?? getNodeKey(node)} node={node} close={() => setOpen(false)} />
        ))}
      </nav>

      {footer}
    </>
  );

  return (
    <>
      <aside id="nd-sidebar" className="axon-sidebar-desktop">
        {content}
      </aside>

      <button
        type="button"
        aria-label="Close documentation navigation"
        className="axon-sidebar-overlay"
        data-open={open}
        onClick={() => setOpen(false)}
      />
      <aside id="nd-sidebar-mobile" className="axon-sidebar-mobile" data-open={open}>
        {content}
      </aside>
    </>
  );
}

function SidebarNode({ node, close }: { node: PageTree.Node; close: () => void }) {
  if (node.type === "separator") {
    return <p className="axon-sidebar-separator">{node.name}</p>;
  }

  if (node.type === "folder") {
    return <SidebarFolder node={node} close={close} />;
  }

  return <SidebarPage node={node} close={close} />;
}

function SidebarFolder({ node, close }: { node: PageTree.Folder; close: () => void }) {
  const pathname = usePathname();
  const folderActive = isFolderActive(node, pathname);
  const [userExpanded, setUserExpanded] = useState(node.defaultOpen === true);
  const expanded = folderActive || userExpanded;

  const title = (
    <>
      <span className="axon-sidebar-group-icon">{node.icon}</span>
      <span>{node.name}</span>
    </>
  );

  return (
    <section className="axon-sidebar-group" data-active={folderActive}>
      <div className="axon-sidebar-group-heading">
        {node.index ? (
          <Link href={node.index.url} onClick={close} className="axon-sidebar-group-title">
            {title}
          </Link>
        ) : (
          <button
            type="button"
            className="axon-sidebar-group-title"
            onClick={() => setUserExpanded((current) => !current)}
          >
            {title}
          </button>
        )}
        <button
          type="button"
          className="axon-sidebar-group-toggle"
          aria-label={`${expanded ? "Collapse" : "Expand"} ${String(node.name)}`}
          aria-expanded={expanded}
          onClick={() => setUserExpanded((current) => !current)}
        >
          <ChevronDown className="size-3.5" />
        </button>
      </div>
      <div className="axon-sidebar-group-content" data-open={expanded}>
        <div>
          {node.children.map((child) => (
            <SidebarNode key={child.$id ?? getNodeKey(child)} node={child} close={close} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SidebarPage({ node, close }: { node: PageTree.Item; close: () => void }) {
  const pathname = usePathname();
  const active = pathname === node.url;

  return (
    <Link
      href={node.url}
      className="axon-sidebar-page"
      data-active={active}
      onClick={close}
      target={node.external ? "_blank" : undefined}
      rel={node.external ? "noreferrer noopener" : undefined}
    >
      {node.icon ? <span className="axon-sidebar-page-icon">{node.icon}</span> : null}
      <span>{node.name}</span>
      {node.external ? <ExternalLink className="ml-auto size-3" /> : null}
    </Link>
  );
}

function isFolderActive(node: PageTree.Folder, pathname: string): boolean {
  if (node.index?.url === pathname) return true;
  return node.children.some((child) => {
    if (child.type === "page") return child.url === pathname;
    if (child.type === "folder") return isFolderActive(child, pathname);
    return false;
  });
}

function getNodeKey(node: PageTree.Node): string {
  if (node.type === "page") return node.url;
  return String(node.name);
}

export function DocsSidebarBanner() {
  return (
    <Link href="/docs/getting-started" className="axon-sidebar-start">
      <span>
        <small>First time here?</small>
        <strong>Set up Axon in minutes</strong>
      </span>
      <ArrowRight className="size-4" />
    </Link>
  );
}

export function DocsSidebarFooter() {
  return (
    <div className="axon-sidebar-footer">
      <Link href="https://axoneditor.com">
        <ExternalLink className="size-3.5" /> Product
      </Link>
      <Link href="https://github.com/axon-editor/axon">
        <GitBranch className="size-3.5" /> GitHub
      </Link>
    </div>
  );
}
