import rss from '@astrojs/rss';
import {SITE_DESCRIPTION, SITE_TITLE} from '../consts';

export async function GET(context) {
  const postImportResult = import.meta.glob('../pages/posts/*.md', {eager: true});
  const posts = Object.values(postImportResult);
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      link: post.url,
      ...post.frontmatter,
    })),
  });
}
