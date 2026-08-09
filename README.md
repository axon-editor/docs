# Axon Docs

Documentation for [Axon](https://github.com/axon-editor/axon), covering installation, workspaces, editor behavior, language tooling, extensions, security, releases, and Axon Agent.

## Run Locally

Prerequisite: Node.js 22.

```bash
git clone https://github.com/axon-editor/docs.git
cd docs
npm ci
npm run dev
```

The local Next.js server is available at `http://localhost:3000` unless that port is already occupied.

## Validate

```bash
npm run types:check
npm run lint
npm run build
```

## Contributing

Found something unclear, outdated, or missing? Open a PR. Documentation contributions do not need an issue first, and small fixes are welcome directly.

For larger restructuring (new sections, navigation changes), open an issue first to discuss.

## License

Same license as [`axon`](https://github.com/axon-editor/axon).
