"use client";

import { ChevronDown, Folder, FolderOpen, Minus, Plus } from "lucide-react";
import { useId, useMemo, useState, type CSSProperties } from "react";

type ProjectFile = {
  type: "file";
  name: string;
  description: string;
};

type ProjectFolder = {
  type: "folder";
  name: string;
  description: string;
  children: ProjectTreeNode[];
};

export type ProjectTreeNode = ProjectFile | ProjectFolder;

type ProjectTreeProps = {
  root: ProjectFolder;
  defaultOpenPaths?: string[];
};

const file = (name: string, description: string): ProjectFile => ({ type: "file", name, description });
const folder = (name: string, description: string, children: ProjectTreeNode[]): ProjectFolder => ({
  type: "folder",
  name,
  description,
  children,
});

const axonProject = folder("axon", "Repository root", [
  file("CHANGELOG.md", "Tracks notable changes across Axon releases."),
  file("CONTRIBUTING.md", "Explains contribution workflow and repository expectations."),
  file("LICENSE", "Contains Axon's open-source license."),
  file("README.md", "Provides the project overview and contributor entry point."),
  file("architecture.md", "Describes the editor's high-level process architecture."),
  file("eslint.config.mjs", "Configures repository-wide JavaScript and TypeScript linting."),
  file("package-lock.json", "Locks exact npm dependency versions for reproducible installs."),
  file("package.json", "Defines root workspace scripts and package boundaries."),
  folder("apps", "Desktop applications", [
    folder("editor", "Electron editor application", [
      folder("src", "Application source", [
        folder("main", "Electron main process and native services", [
          folder("app", "Application lifecycle handlers", [
            file("handlers.ts", "Registers application-level IPC handlers."),
            file("cliOpenFolder.ts", "Handles folders opened through the Axon CLI."),
          ]),
          folder("fs", "Workspace filesystem services", [
            file("watcher.ts", "Tracks external file and folder changes."),
            file("workspaceIndex.ts", "Maintains the searchable workspace file index."),
          ]),
          folder("lsp", "Language-server lifecycle and routing", [
            file("handlers.ts", "Connects renderer language requests to active servers."),
            file("session.ts", "Owns language-server process sessions."),
          ]),
          file("index.ts", "Bootstraps the Electron main process."),
          file("appMain.ts", "Starts Axon's main-process subsystems."),
        ]),
        folder("preload", "Safe renderer-to-main bridge", [
          file("index.ts", "Exposes Axon's validated IPC surface to the renderer."),
        ]),
        folder("renderer", "React entry point and global presentation", [
          file("App.tsx", "Mounts the renderer application shell."),
          file("main.tsx", "Creates the React root and renderer providers."),
          file("index.css", "Defines global renderer styles and theme variables."),
        ]),
        folder("workbench", "Editor shell, panes, views, and contributions", [
          folder("app", "Top-level workbench composition", [
            file("AxonApp.tsx", "Coordinates workbench state and application services."),
            file("AxonAppView.tsx", "Renders the visible editor workbench."),
          ]),
        ]),
        folder("platform", "Shared workbench platform services", [
          folder("panel", "Bottom-panel state", [
            file("bottomPanel.ts", "Models the terminal, output, and Problems panel."),
          ]),
          folder("terminal", "Terminal renderer protocol", [
            file("terminalProtocol.ts", "Defines terminal delivery and acknowledgement messages."),
            file("terminalSessionIo.ts", "Applies ordered PTY output to terminal sessions."),
          ]),
        ]),
        folder("shared", "Renderer and main-process contracts", [
          file("commands.ts", "Declares stable command identifiers."),
          file("fs.ts", "Defines workspace filesystem request types."),
          file("git.ts", "Defines source-control data contracts."),
          file("lsp.ts", "Defines language intelligence messages."),
        ]),
      ]),
      folder("scripts", "Build and packaging preparation", [
        file("build-core.mjs", "Builds the Go services used by the desktop app."),
        file("build-dev-cli.mjs", "Prepares the development Axon CLI."),
        file("verify-language-servers.mjs", "Validates packaged language-server assets."),
      ]),
      file("package.json", "Defines editor scripts, dependencies, and release targets."),
      file("vite.config.ts", "Configures Vite and Electron development builds."),
    ]),
  ]),
  folder("services", "Native backend services", [
    folder("core", "Go workspace, PTY, filesystem, and agent services", [
      folder("cmd", "Executable entry points", [
        folder("axon", "Project-aware command-line client", [
          file("main.go", "Starts the Axon CLI."),
        ]),
        folder("axon-agent", "Local agent service entry point", [
          file("main.go", "Starts the standalone agent process."),
        ]),
        folder("axon-pty-host", "Dedicated terminal process host", [
          file("main.go", "Starts the authenticated PTY host."),
          file("control_listener_unix.go", "Creates the Unix control listener."),
        ]),
      ]),
      folder("internal", "Core implementation packages", [
        folder("ai", "Local AI runtime and tools", [
          file("runtime.go", "Runs local model requests and streaming."),
          file("project_tools.go", "Provides workspace-aware agent tools."),
        ]),
        folder("fs", "Filesystem and search services", [
          file("fs.go", "Implements guarded filesystem operations."),
          file("search.go", "Runs cancellable workspace searches."),
        ]),
        folder("server", "Core HTTP and streaming server", [
          file("server.go", "Registers Core routes and service dependencies."),
          file("ai_stream.go", "Streams agent responses to desktop clients."),
        ]),
        folder("terminal", "Terminal session ownership", [
          file("terminal.go", "Manages terminal process sessions."),
          file("resize.go", "Applies terminal dimension changes."),
        ]),
      ]),
      file("go.mod", "Defines the Go module for Axon's native services."),
      file("README.md", "Documents Core development and service boundaries."),
    ]),
  ]),
  folder("packages", "Shared TypeScript contracts", [
    folder("config", "Shared repository configuration", [
      file("package.json", "Declares the shared configuration package."),
      folder("src", "Package source", [
        file("index.ts", "Exports configuration contracts."),
      ]),
    ]),
    folder("extension-api", "Public extension contribution API", [
      file("package.json", "Declares the public extension API package."),
      folder("src", "Package source", [
        file("manifest.ts", "Defines extension manifest fields."),
        file("runtime.ts", "Defines extension runtime capabilities."),
        file("validation.ts", "Validates third-party extension metadata."),
      ]),
    ]),
    folder("ipc", "Typed inter-process contracts", [
      file("package.json", "Declares the shared IPC package."),
      folder("src", "Package source", [
        file("index.ts", "Exports the shared IPC channel contracts."),
      ]),
    ]),
    folder("protocol", "Shared service protocol types", [
      file("package.json", "Declares the shared protocol package."),
      folder("src", "Package source", [
        file("index.ts", "Exports Core and renderer protocol messages."),
      ]),
    ]),
  ]),
  folder("extensions", "Built-in and marketplace extensions", [
    folder("builtin", "Features and language support shipped with Axon", [
      folder("agent", "Axon Agent contribution", [
        file("axon.extension.json", "Registers the built-in Agent surface."),
      ]),
      folder("git", "Source-control contribution", [
        file("axon.extension.json", "Registers Git commands and views."),
      ]),
      folder("language-typescript", "TypeScript language contribution", [
        file("axon.extension.json", "Registers TypeScript language metadata."),
      ]),
      folder("terminal", "Integrated terminal contribution", [
        file("axon.extension.json", "Registers terminal commands and views."),
      ]),
    ]),
    folder("marketplace", "Local marketplace metadata", [
      file("README.md", "Documents the local extension marketplace layout."),
    ]),
  ]),
  folder("build", "Repository build orchestration", [
    file("build-packages.mjs", "Builds shared workspace packages in dependency order."),
    file("build-diagnostics.mjs", "Collects diagnostics for failed builds."),
  ]),
  folder("tools", "Maintenance and validation scripts", [
    file("check-extension-examples.mjs", "Validates example extension manifests."),
    file("check-file-lines.mjs", "Enforces the repository line-count baseline."),
    file("line-count-baseline.json", "Stores accepted file-size boundaries."),
  ]),
  folder("docs", "Engineering notes and release history", [
    folder("releases", "Versioned release notes", [
      file("v1.3.6.md", "Documents the current Axon release."),
    ]),
    file("EXTENSIONS.md", "Explains Axon's extension architecture."),
    file("LANGUAGE_SERVERS.md", "Documents supported language tooling."),
    file("TOKEN_COLORING_ARCHITECTURE.md", "Explains Axon's syntax-color pipeline."),
  ]),
]);

const defaultOpenPaths = ["axon"];

export function AxonProjectStructure() {
  return <ProjectTree root={axonProject} defaultOpenPaths={defaultOpenPaths} />;
}

export function ProjectTree({ root, defaultOpenPaths = [] }: ProjectTreeProps) {
  const treeId = useId().replaceAll(":", "");
  const folderPaths = useMemo(() => collectFolderPaths(root), [root]);
  const [openFolders, setOpenFolders] = useState(() => new Set(defaultOpenPaths));
  const [openFiles, setOpenFiles] = useState(() => new Set<string>());

  const toggleFolder = (path: string) => {
    setOpenFolders((current) => toggleSetValue(current, path));
  };

  const toggleFile = (path: string) => {
    setOpenFiles((current) => toggleSetValue(current, path));
  };

  return (
    <section className="project-tree docs-motion-item not-prose" aria-label="Axon project structure">
      <header className="project-tree-header">
        <div>
          <span className="project-tree-eyebrow">Repository explorer</span>
          <p>Select a folder to expand it or a file to inspect its role.</p>
        </div>
        <div className="project-tree-actions">
          <button type="button" onClick={() => setOpenFolders(new Set(folderPaths))}>
            <Plus className="size-3.5" /> Expand all
          </button>
          <button type="button" onClick={() => setOpenFolders(new Set())}>
            <Minus className="size-3.5" /> Collapse all
          </button>
        </div>
      </header>

      <div className="project-tree-viewport" role="tree">
        <TreeNode
          node={root}
          path={root.name}
          depth={0}
          treeId={treeId}
          openFolders={openFolders}
          openFiles={openFiles}
          toggleFolder={toggleFolder}
          toggleFile={toggleFile}
        />
      </div>
    </section>
  );
}

type TreeNodeProps = {
  node: ProjectTreeNode;
  path: string;
  depth: number;
  treeId: string;
  openFolders: Set<string>;
  openFiles: Set<string>;
  toggleFolder: (path: string) => void;
  toggleFile: (path: string) => void;
};

function TreeNode(props: TreeNodeProps) {
  const { node, path, depth, treeId, openFolders, openFiles, toggleFolder, toggleFile } = props;
  const controlId = `${treeId}-${path.replaceAll(/[^a-zA-Z0-9_-]/g, "-")}`;

  if (node.type === "file") {
    const open = openFiles.has(path);
    return (
      <div
        className="project-tree-node project-tree-file"
        role="treeitem"
        aria-expanded={open}
        aria-selected={false}
        style={{ "--tree-depth": depth } as CSSProperties}
      >
        <button
          type="button"
          className="project-tree-row"
          aria-expanded={open}
          aria-controls={`${controlId}-details`}
          onClick={() => toggleFile(path)}
        >
          <ChevronDown className="project-tree-chevron size-3.5" />
          <FileBadge name={node.name} />
          <span className="project-tree-name">{node.name}</span>
          <span className="project-tree-summary">{node.description}</span>
        </button>
        <div id={`${controlId}-details`} className="project-tree-file-details" data-open={open}>
          <div>
            <code>{path}</code>
            <p>{node.description}</p>
          </div>
        </div>
      </div>
    );
  }

  const open = openFolders.has(path);
  return (
    <div
      className="project-tree-node project-tree-folder"
      role="treeitem"
      aria-expanded={open}
      aria-selected={false}
      style={{ "--tree-depth": depth } as CSSProperties}
    >
      <button
        type="button"
        className="project-tree-row"
        aria-expanded={open}
        aria-controls={`${controlId}-children`}
        onClick={() => toggleFolder(path)}
      >
        <ChevronDown className="project-tree-chevron size-3.5" />
        <span className="project-tree-folder-badge">
          {open ? <FolderOpen className="project-tree-folder-icon size-4" /> : <Folder className="project-tree-folder-icon size-4" />}
        </span>
        <span className="project-tree-name">{node.name}</span>
        <span className="project-tree-summary">{node.description}</span>
      </button>
      <div id={`${controlId}-children`} className="project-tree-children" data-open={open} role="group">
        <div>
          {node.children.map((child) => {
            const childPath = `${path}/${child.name}`;
            return (
              <TreeNode
                {...props}
                key={childPath}
                node={child}
                path={childPath}
                depth={depth + 1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FileBadge({ name }: { name: string }) {
  const extension = name.includes(".") ? name.split(".").pop()?.toUpperCase() : "FILE";
  const label = extension === "JSON" ? "{}" : extension === "MD" ? "MD" : extension?.slice(0, 3);
  return (
    <span className="project-tree-file-badge" data-extension={extension?.toLowerCase()}>
      <span>{label}</span>
    </span>
  );
}

function collectFolderPaths(root: ProjectFolder): string[] {
  const paths: string[] = [];
  const visit = (folder: ProjectFolder, path: string) => {
    paths.push(path);
    for (const child of folder.children) {
      if (child.type === "folder") visit(child, `${path}/${child.name}`);
    }
  };
  visit(root, root.name);
  return paths;
}

function toggleSetValue(current: Set<string>, value: string): Set<string> {
  const next = new Set(current);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}
