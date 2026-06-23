import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const siteConfigUrl = new URL('./generated/site-config.json', import.meta.url);
const siteConfig = fs.existsSync(siteConfigUrl)
  ? JSON.parse(fs.readFileSync(siteConfigUrl, 'utf8'))
  : {};

function deSlugify(slug) {
  return slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function buildSidebar(dir, prefix = '') {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => !e.name.startsWith('_') && !e.name.startsWith('.'))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(entry => {
      if (entry.isDirectory()) {
        const slug = prefix ? `${prefix}/${entry.name}` : entry.name;
        return {
          label: deSlugify(entry.name),
          items: buildSidebar(path.join(dir, entry.name), slug),
        };
      }
      const slug = (prefix ? `${prefix}/` : '') + entry.name.replace(/\.md$/, '');
      return { slug: slug === 'index' ? '' : slug };
    });
}

const docsDir = fileURLToPath(new URL('./src/content/docs', import.meta.url));
const sidebar = buildSidebar(docsDir);

export default defineConfig({
  site: siteConfig.siteUrl,
  integrations: [
    starlight({
      title: siteConfig.title ?? 'Foam Site',
      description:
        siteConfig.description ??
        'Published from a Foam knowledge base.',
      social: [],
      sidebar,
      components: {
        Footer: './src/components/FoamFooter.astro',
        PageFrame: './src/components/FoamPageFrame.astro',
        PageSidebar: './src/components/FoamPageSidebar.astro',
        Sidebar: './src/components/FoamSidebar.astro',
      },
      pagination: false,
      favicon: '/favicon.svg',
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});
