import { access, copyFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const blogDirectory = path.join(projectRoot, 'src', 'content', 'blog');
const imageDirectory = path.join(projectRoot, 'src', 'img');
const mediaDirectory = path.join(projectRoot, 'public', 'media', 'blog');

const valueOptions = new Set(['title', 'description', 'tags', 'cover', 'author']);
const booleanOptions = new Set(['gallery', 'video', 'dry-run', 'help']);

function usage() {
  console.log(`Create a new blog post.

Usage:
  pnpm blog:new
  pnpm blog:new <slug> [options]

Options:
  --title <title>              Override the title generated from the slug
  --description <description>  Set the initial description
  --tags <tag,tag>             Add comma-separated tags
  --cover <file>               Copy a cover image into src/img
  --author <name>              Override the default author
  --gallery                    Include the ImageGallery import
  --video                      Include the Video import
  --dry-run                    Preview without creating files
  --help                       Show this help

Examples:
  pnpm blog:new fluid-rendering
  pnpm blog:new fluid-rendering --tags "Rust,WebGPU" --gallery --video
  pnpm blog:new fluid-rendering --cover "C:\\images\\fluid.png"`);
}

function parseArguments(args) {
  const options = {};
  const positional = [];

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (!argument.startsWith('--')) {
      positional.push(argument);
      continue;
    }

    const [rawName, inlineValue] = argument.slice(2).split('=', 2);
    if (booleanOptions.has(rawName)) {
      options[rawName] = true;
      continue;
    }

    if (!valueOptions.has(rawName)) {
      throw new Error(`Unknown option: --${rawName}`);
    }

    const value = inlineValue ?? args[index + 1];
    if (!value || (inlineValue === undefined && value.startsWith('--'))) {
      throw new Error(`Missing value for --${rawName}`);
    }

    options[rawName] = value;
    if (inlineValue === undefined) index += 1;
  }

  if (positional.length > 1) {
    throw new Error('Pass one slug, or wrap a multi-word slug in quotes.');
  }

  return { slug: positional[0], options };
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function titleFromSlug(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function currentLocalDate() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function parseTags(value = '') {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function yes(value) {
  return ['y', 'yes'].includes(value.trim().toLowerCase());
}

async function collectInteractiveOptions(initialOptions) {
  const prompt = createInterface({ input: process.stdin, output: process.stdout });

  try {
    const rawSlug = await prompt.question('Post slug: ');
    const slug = slugify(rawSlug);
    if (!slug) throw new Error('The post slug cannot be empty.');

    const defaultTitle = titleFromSlug(slug);
    const title = (await prompt.question(`Title [${defaultTitle}]: `)).trim() || defaultTitle;
    const description = (await prompt.question('Description [TODO]: ')).trim();
    const tags = (await prompt.question('Tags, comma-separated [none]: ')).trim();
    const cover = (await prompt.question('Cover image path [placeholder]: ')).trim();
    const gallery = yes(await prompt.question('Include ImageGallery import? [y/N]: '));
    const video = yes(await prompt.question('Include Video import? [y/N]: '));

    return {
      slug,
      options: {
        ...initialOptions,
        title,
        description: description || undefined,
        tags: tags || undefined,
        cover: cover || undefined,
        gallery,
        video,
      },
    };
  } finally {
    prompt.close();
  }
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function buildPost({ title, description, tags, author, coverPath, gallery, video }) {
  const tagFrontmatter = tags.length
    ? `tags:\n${tags.map((tag) => `  - ${JSON.stringify(tag)}`).join('\n')}`
    : 'tags: []';

  const imports = [];
  if (gallery) imports.push("import ImageGallery from '@components/generic/ImageGallery.astro';");
  if (video) imports.push("import Video from '@components/generic/Video.astro';");

  const importBlock = imports.length ? `${imports.join('\n')}\n\n` : '';

  return `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(description)}
pubDate: ${JSON.stringify(currentLocalDate())}
author: ${JSON.stringify(author)}
${tagFrontmatter}
imgUrl: ${coverPath}
draft: true
---

${importBlock}## About

Start writing here.
`;
}

async function main() {
  let { slug: rawSlug, options } = parseArguments(process.argv.slice(2));

  if (options.help) {
    usage();
    return;
  }

  if (!rawSlug) {
    ({ slug: rawSlug, options } = await collectInteractiveOptions(options));
  }

  const slug = slugify(rawSlug);
  if (!slug) throw new Error('The post slug cannot be empty.');
  if (slug !== rawSlug) console.log(`Using slug: ${slug}`);

  const title = options.title?.trim() || titleFromSlug(slug);
  const description = options.description?.trim() || 'TODO: Add a description.';
  const tags = parseTags(options.tags);
  const author = options.author?.trim() || 'Zachary Leong';
  const postPath = path.join(blogDirectory, `${slug}.mdx`);
  const postMediaDirectory = path.join(mediaDirectory, slug);

  if (await exists(postPath)) {
    throw new Error(`A blog post already exists at ${path.relative(projectRoot, postPath)}.`);
  }

  const markdownDirectory = path.dirname(postPath);
  let coverPath = '../../img/blog-placeholder.svg';
  let coverSource;
  let coverDestination;

  if (options.cover) {
    coverSource = path.resolve(process.cwd(), options.cover);
    if (!(await exists(coverSource))) throw new Error(`Cover image not found: ${coverSource}`);

    const extension = path.extname(coverSource).toLowerCase();
    const supportedExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);
    if (!supportedExtensions.has(extension)) {
      throw new Error(`Unsupported cover format: ${extension || '(none)'}`);
    }

    coverDestination = path.join(imageDirectory, `${slug}-thumb${extension}`);
    if (await exists(coverDestination)) {
      throw new Error(`A cover image already exists at ${path.relative(projectRoot, coverDestination)}.`);
    }
    coverPath = path.relative(markdownDirectory, coverDestination).replaceAll(path.sep, '/');
  }

  const post = buildPost({
    title,
    description,
    tags,
    author,
    coverPath,
    gallery: options.gallery,
    video: options.video,
  });

  if (options['dry-run']) {
    console.log(`\nPost: ${path.relative(projectRoot, postPath)}`);
    console.log(`Media: ${path.relative(projectRoot, postMediaDirectory)}`);
    if (coverDestination) console.log(`Cover: ${path.relative(projectRoot, coverDestination)}`);
    console.log(`\n${post}`);
    return;
  }

  await mkdir(blogDirectory, { recursive: true });
  await mkdir(postMediaDirectory, { recursive: true });
  if (coverSource && coverDestination) await copyFile(coverSource, coverDestination);
  await writeFile(postPath, post, { encoding: 'utf8', flag: 'wx' });

  console.log('Created blog post:');
  console.log(`  Post:  ${path.relative(projectRoot, postPath)}`);
  console.log(`  Media: ${path.relative(projectRoot, postMediaDirectory)}`);
  console.log(`  Cover: ${coverDestination ? path.relative(projectRoot, coverDestination) : 'src/img/blog-placeholder.svg'}`);
  console.log('\nThe post starts as a draft. Replace the placeholder description and cover before publishing.');
}

main().catch((error) => {
  console.error(`blog:new: ${error.message}`);
  process.exitCode = 1;
});
