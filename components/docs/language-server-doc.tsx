import { notFound } from 'next/navigation';
import {
  Braces,
  CheckCircle2,
  PackageCheck,
  Power,
  ServerCog,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

type LanguageServer = {
  title: string;
  description: string;
  server: string;
  delivery: string;
  activation: string;
  capabilities: string[];
  setup: string[];
  troubleshooting: string[];
};

const languageServers = {
  typescript: {
    title: 'TypeScript and JavaScript',
    description:
      'Project-aware completions, hover, diagnostics, definitions, references, rename, formatting, symbols, and code actions for web projects.',
    server: 'typescript-language-server with TypeScript',
    delivery: 'bundled npm server',
    activation: '.ts, .tsx, .js, .jsx, package.json, tsconfig.json, and jsconfig.json',
    capabilities: [
      'Understands imports, JSX, project types, path aliases, workspace symbols, and external package APIs.',
      'Uses tsconfig.json or jsconfig.json ownership to resolve module settings and included files.',
      'Supports completions, hover, definition, references, rename, diagnostics, formatting, and code actions.',
    ],
    setup: [
      'Open the folder that owns package.json and tsconfig.json or jsconfig.json.',
      'Install dependencies before judging unresolved imported types.',
      'Use config paths for aliases such as @/components or ~/lib.',
    ],
    troubleshooting: [
      'If completions feel basic, verify the language server is attached to the active file model.',
      'If definitions do not cross files, check workspace root and config ownership.',
      'If local types are missing, confirm dependencies are installed and the file belongs to the expected config.',
    ],
  },
  python: {
    title: 'Python',
    description:
      'Python language intelligence for imports, virtual environments, diagnostics, completions, hover, navigation, formatting, and project symbols.',
    server: 'pyright / Python language tooling',
    delivery: 'bundled server with project runtime awareness',
    activation: '.py files and Python workspaces',
    capabilities: [
      'Resolves imports from the selected project environment.',
      'Provides diagnostics, completions, hover, definition, references, rename, symbols, and formatting hooks.',
      'Works best when the opened root contains pyproject.toml, requirements files, or the active virtual environment.',
    ],
    setup: [
      'Open the repository root, not only a nested package folder.',
      'Select or activate the virtual environment used by the project.',
      'Install project dependencies so import analysis can see real packages.',
    ],
    troubleshooting: [
      'Missing imports usually mean the wrong virtual environment is selected.',
      'Weak completions often mean Axon opened the wrong folder root.',
      'Diagnostics can lag behind if the server is still indexing a large environment.',
    ],
  },
  go: {
    title: 'Go',
    description:
      'Go support for module-aware navigation, diagnostics, symbols, references, formatting, and code actions.',
    server: 'gopls',
    delivery: 'system or bundled resolver depending on build',
    activation: '.go files and go.mod workspaces',
    capabilities: [
      'Uses go.mod and workspace metadata for package-aware completions and navigation.',
      'Supports diagnostics, hover, definitions, references, rename, formatting, and organize imports.',
      'Surfaces project problems through Axon Problems and editor diagnostics.',
    ],
    setup: [
      'Install Go and make sure gopls can run for the target project.',
      'Open the folder that owns go.mod or go.work.',
      'Run go mod download when dependencies are not available locally.',
    ],
    troubleshooting: [
      'If packages do not resolve, check go.mod, go.work, and module downloads.',
      'If formatting fails, confirm the Go toolchain is on PATH.',
      'If references are incomplete, wait for gopls indexing or open the module root.',
    ],
  },
  rust: {
    title: 'Rust',
    description:
      'Rust language intelligence for Cargo projects, crate symbols, diagnostics, proc macro context, and code navigation.',
    server: 'rust-analyzer',
    delivery: 'bundled or system rust-analyzer',
    activation: '.rs files and Cargo.toml workspaces',
    capabilities: [
      'Reads Cargo metadata to understand crates, features, modules, tests, and examples.',
      'Provides completions, hover, diagnostics, definitions, references, rename, and code actions.',
      'Works with project toolchains, targets, proc macros, and build scripts when the Rust setup is complete.',
    ],
    setup: [
      'Install the Rust toolchain needed by the project.',
      'Open the folder that owns Cargo.toml.',
      'Check Cargo metadata errors when completions are missing crate symbols.',
    ],
    troubleshooting: [
      'Missing crate symbols usually mean Cargo metadata failed.',
      'Proc macro diagnostics depend on the project toolchain and targets.',
      'Release packaging must include an executable rust-analyzer for the target platform.',
    ],
  },
  html: {
    title: 'HTML',
    description: 'HTML support for markup completions, hover, formatting, linked resources, and diagnostics.',
    server: 'vscode-html-language-server',
    delivery: 'bundled npm server',
    activation: '.html and related template files',
    capabilities: [
      'Completes elements, attributes, ARIA attributes, and common markup patterns.',
      'Provides hover details, document symbols, formatting, and validation.',
      'Pairs well with CSS, Tailwind, and TypeScript language servers in web projects.',
    ],
    setup: [
      'Open the project root so linked files and framework context are available.',
      'Use the correct language mode for template files.',
      'Keep malformed markup visible through Problems instead of relying only on syntax colors.',
    ],
    troubleshooting: [
      'If completions are missing, check the file language mode.',
      'If formatting is odd, inspect embedded script or style blocks.',
      'If linked resources do not resolve, open the workspace root.',
    ],
  },
  css: {
    title: 'CSS',
    description: 'CSS language support for stylesheets, custom properties, diagnostics, completions, hover, and formatting.',
    server: 'vscode-css-language-server',
    delivery: 'bundled npm server',
    activation: '.css, .scss, .less, and style blocks',
    capabilities: [
      'Completes properties, values, selectors, custom properties, and at-rules.',
      'Provides hover details, diagnostics, document symbols, colors, and formatting.',
      'Handles normal stylesheet intelligence separately from Tailwind utility-class intelligence.',
    ],
    setup: [
      'Open the app root so imports and framework files can be resolved.',
      'Use Tailwind support for utility classes and CSS support for stylesheet syntax.',
      'Keep generated folders excluded from workspace search and diagnostics when needed.',
    ],
    troubleshooting: [
      'If CSS variables do not resolve, check file relationships and imports.',
      'If Tailwind classes are missing, use the Tailwind server page instead.',
      'If style blocks are plain text, check the embedded language mode.',
    ],
  },
  tailwind: {
    title: 'Tailwind CSS',
    description:
      'Utility-class completions, hover previews, color previews, variants, and class-name diagnostics in Tailwind projects.',
    server: '@tailwindcss/language-server',
    delivery: 'bundled npm server',
    activation: 'Tailwind config or Tailwind usage in supported files',
    capabilities: [
      'Completes spacing, color, layout, typography, responsive variants, states, and project theme values.',
      'Shows generated CSS in hover previews and validates invalid class names.',
      'Works inside HTML, JSX, TSX, configured class attributes, and supported class-like strings.',
    ],
    setup: [
      'Open the folder that owns tailwind.config.*, package.json, and source files.',
      'Install project dependencies so theme values match the actual app.',
      'Keep suggestions scoped to class contexts so they do not pollute normal strings.',
    ],
    troubleshooting: [
      'No class completions usually means the server did not detect Tailwind project context.',
      'Wrong-place completions mean the editor integration needs tighter context filtering.',
      'Missing theme values usually mean the project config was not found.',
    ],
  },
  json: {
    title: 'JSON',
    description: 'JSON editing with schema-aware completions, validation, hover, formatting, and document symbols.',
    server: 'vscode-json-language-server',
    delivery: 'bundled npm server',
    activation: '.json and JSON-with-comments configuration files',
    capabilities: [
      'Validates structure, required fields, value types, and schema-defined enum values.',
      'Completes known package, TypeScript, ESLint, and tool configuration fields when schemas match.',
      'Formats configuration files and shows document symbols for navigation.',
    ],
    setup: [
      'Keep common config files at expected names so schemas can match automatically.',
      'Use comments only in JSONC-aware files.',
      'Open the repository root for package and tool context.',
    ],
    troubleshooting: [
      'Generic completions usually mean no schema matched the file.',
      'Validation failures can come from JSON comments in strict JSON files.',
      'Packaging errors often involve missing npm server dependencies.',
    ],
  },
  yaml: {
    title: 'YAML',
    description:
      'Schema-aware YAML support for CI pipelines, Docker Compose, Kubernetes manifests, deployment config, and tool settings.',
    server: 'yaml-language-server',
    delivery: 'bundled npm server',
    activation: '.yaml and .yml files',
    capabilities: [
      'Validates indentation, structure, known fields, schema requirements, and malformed values.',
      'Completes schema-backed fields for recognized workflow, compose, Kubernetes, and deployment files.',
      'Reports YAML problems through the Problems panel and editor diagnostics.',
    ],
    setup: [
      'Open the repository root because YAML meaning often depends on folder location.',
      'Rely on schema matching for practical, tool-specific validation.',
      'Treat release packaging errors as real dependency inclusion problems.',
    ],
    troubleshooting: [
      'No schema completions usually means the file does not match a known schema.',
      'Generic diagnostics mean parsing works but tool-specific schema validation is unavailable.',
      'Release failures can come from missing language-server runtime modules.',
    ],
  },
  docker: {
    title: 'Docker',
    description: 'Dockerfile and Compose support for container configuration, build files, diagnostics, and completions.',
    server: 'Docker language tooling',
    delivery: 'bundled language tooling where available',
    activation: 'Dockerfile, docker-compose.yml, compose.yml, and related files',
    capabilities: [
      'Improves Dockerfile instruction completions, hover, symbols, and validation.',
      'Works with YAML schema support for Compose files.',
      'Helps catch common image, instruction, and configuration mistakes before builds run.',
    ],
    setup: [
      'Open the project root where Dockerfile and compose files live.',
      'Keep compose files named conventionally so schemas and tooling can identify them.',
      'Use terminal builds for final validation because Docker semantics depend on the daemon and context.',
    ],
    troubleshooting: [
      'If Compose completions are generic, check YAML schema matching.',
      'If Dockerfile mode is plain text, check file naming and language mode.',
      'If builds fail despite clean diagnostics, inspect the Docker daemon and build context.',
    ],
  },
  java: {
    title: 'Java',
    description: 'Java project support for Maven/Gradle workspaces, diagnostics, navigation, symbols, and refactors.',
    server: 'Java language server',
    delivery: 'requires Java runtime and server resources',
    activation: '.java files and Java project metadata',
    capabilities: [
      'Understands packages, imports, classes, methods, diagnostics, symbols, and refactors.',
      'Works best with Maven or Gradle project metadata.',
      'Uses the installed JDK for project analysis.',
    ],
    setup: [
      'Install a compatible JDK.',
      'Open the folder that owns pom.xml, build.gradle, or settings.gradle.',
      'Allow the server time to import larger projects.',
    ],
    troubleshooting: [
      'Missing symbols often mean the project import failed.',
      'Wrong JDK versions can create noisy diagnostics.',
      'Large projects may need indexing time before navigation is complete.',
    ],
  },
  cpp: {
    title: 'C and C++',
    description: 'C/C++ support for diagnostics, navigation, symbols, formatting, and compile-database-aware intelligence.',
    server: 'clangd',
    delivery: 'system or bundled clangd depending on platform',
    activation: '.c, .cc, .cpp, .h, .hpp, and compile_commands.json',
    capabilities: [
      'Uses compile_commands.json for include paths, macros, standards, and build flags.',
      'Provides completions, hover, diagnostics, definitions, references, symbols, and formatting.',
      'Works best when the build system exports an accurate compile database.',
    ],
    setup: [
      'Install clangd or use a build that bundles it.',
      'Generate compile_commands.json from CMake, Ninja, Bear, or your build system.',
      'Open the folder where clangd can find that compile database.',
    ],
    troubleshooting: [
      'False missing includes usually mean compile_commands.json is absent or stale.',
      'Wrong standard diagnostics come from missing build flags.',
      'Header-only navigation improves when the including translation units are known.',
    ],
  },
  csharp: {
    title: 'C#',
    description: 'C# support for solution-aware completions, diagnostics, navigation, symbols, and refactors.',
    server: 'C# language server',
    delivery: 'requires .NET runtime and server resources',
    activation: '.cs files, .csproj files, and .sln workspaces',
    capabilities: [
      'Reads project and solution files to understand references, target frameworks, and generated context.',
      'Provides completions, hover, diagnostics, definitions, references, rename, and symbols.',
      'Works best when the .NET SDK for the project is installed.',
    ],
    setup: [
      'Install the .NET SDK required by the project.',
      'Open the solution or project root.',
      'Restore packages before judging unresolved references.',
    ],
    troubleshooting: [
      'Unresolved project references often mean restore has not run.',
      'Wrong SDK versions can produce misleading diagnostics.',
      'Generated files may appear only after the project has built once.',
    ],
  },
  kotlin: {
    title: 'Kotlin',
    description: 'Kotlin support for Gradle projects, diagnostics, navigation, symbols, and completions.',
    server: 'Kotlin language server',
    delivery: 'requires Java runtime and Kotlin tooling',
    activation: '.kt and .kts files',
    capabilities: [
      'Understands Kotlin files, packages, classes, functions, symbols, and project diagnostics.',
      'Works with Gradle project metadata for dependencies and source sets.',
      'Supports completions, hover, navigation, and formatting where the server supports it.',
    ],
    setup: [
      'Install a compatible JDK.',
      'Open the Gradle project root.',
      'Let Gradle metadata load before judging unresolved symbols.',
    ],
    troubleshooting: [
      'Missing dependencies usually mean Gradle import failed.',
      'Script files can need extra project context.',
      'Server behavior varies by Kotlin language-server maturity.',
    ],
  },
  lua: {
    title: 'Lua',
    description: 'Lua support for completions, diagnostics, hover, symbols, formatting, and runtime-aware configuration.',
    server: 'Lua language server',
    delivery: 'bundled or system server depending on build',
    activation: '.lua files',
    capabilities: [
      'Provides completions, hover, diagnostics, definitions, references, symbols, and formatting.',
      'Can be tuned for runtime globals, libraries, and project-specific APIs.',
      'Useful for Neovim, game, plugin, and scripting projects.',
    ],
    setup: [
      'Open the folder containing the Lua project configuration or scripts.',
      'Configure known globals for host environments when needed.',
      'Add library paths for project-specific APIs.',
    ],
    troubleshooting: [
      'Unknown globals often need runtime configuration.',
      'Missing library completions usually mean library paths are not configured.',
      'Formatting depends on the server configuration and style settings.',
    ],
  },
  php: {
    title: 'PHP',
    description: 'PHP support for Composer projects, diagnostics, navigation, symbols, and completions.',
    server: 'PHP language server',
    delivery: 'requires PHP runtime and server resources',
    activation: '.php files and composer.json workspaces',
    capabilities: [
      'Understands classes, namespaces, functions, methods, symbols, and diagnostics.',
      'Uses Composer metadata and installed dependencies for project-aware navigation.',
      'Supports completions, hover, definitions, references, rename, and formatting where available.',
    ],
    setup: [
      'Install PHP and Composer for the project.',
      'Run composer install before judging unresolved vendor types.',
      'Open the folder that owns composer.json.',
    ],
    troubleshooting: [
      'Missing vendor symbols usually mean dependencies are not installed.',
      'Wrong PHP versions can create false diagnostics.',
      'Framework magic may need stubs or framework-specific tooling.',
    ],
  },
} satisfies Record<string, LanguageServer>;

export function LanguageServerDoc({ id }: { id: keyof typeof languageServers }) {
  const doc = languageServers[id];
  if (!doc) notFound();

  return (
    <div className="not-prose my-8 space-y-8">
      <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-5 shadow-sm shadow-black/40">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-cyan-950/40 text-cyan-300">
            <ServerCog className="size-5" />
          </div>
          <div>
            <h2 className="m-0 text-lg font-semibold text-zinc-50">{doc.title}</h2>
            <p className="m-0 text-sm text-zinc-500">{doc.server}</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-zinc-300">{doc.description}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <Info icon={PackageCheck} label="Delivery" value={doc.delivery} />
          <Info icon={Power} label="Activation" value={doc.activation} />
        </div>
      </div>

      <ListBlock icon={CheckCircle2} title="Capabilities" items={doc.capabilities} />
      <ListBlock icon={Wrench} title="Setup" items={doc.setup} />
      <ListBlock icon={Braces} title="Troubleshooting" items={doc.troubleshooting} />
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-md border border-zinc-800 bg-black/30 p-4">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase text-zinc-500">
        <Icon className="size-4" />
        {label}
      </div>
      <p className="m-0 text-sm leading-6 text-zinc-300">{value}</p>
    </div>
  );
}

function ListBlock({
  icon: Icon,
  title,
  items,
}: {
  icon: LucideIcon;
  title: string;
  items: string[];
}) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-zinc-50">
        <Icon className="size-5 text-cyan-300" />
        {title}
      </h2>
      <div className="grid gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-md border border-zinc-800 bg-zinc-950/80 p-4 text-sm leading-6 text-zinc-300"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
