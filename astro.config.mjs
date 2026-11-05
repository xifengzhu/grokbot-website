import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://beansmile.xifengzhu.com',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
