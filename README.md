# Zachary Leong's Personal Website

Contact: <zleong@seas.upenn.edu>

Website Template: <https://github.com/eliancodes/brutal>

## Writing a blog post

Run `pnpm blog:new` for an interactive setup, or create one immediately:

```bash
pnpm blog:new fluid-rendering --tags "Rust,WebGPU" --gallery --video
```

The command creates a draft at `src/content/blog/<slug>.mdx` and its media folder at
`public/media/blog/<slug>/`. Pass `--cover <file>` to copy in a cover image, or replace
the generated placeholder before publishing. Drafts are visible during local development
and excluded from production pages and RSS. Run `pnpm blog:new --help` for every option.
