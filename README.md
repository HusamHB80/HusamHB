# Husam Habboub — Jekyll Portfolio

A cinematic, static Jekyll portfolio for GitHub Pages.

## Run locally

```bash
gem install bundler jekyll
bundle install
bundle exec jekyll serve --livereload
```

Open http://localhost:4000

## Add a project

Create a new Markdown file inside `_projects/` with front matter similar to the existing project files.

Set `featured: true` for work that should appear in the first four projects on the homepage.

Add thumbnails to `assets/thumbs/` and videos to `assets/videos/`, or use hosted URLs.

## GitHub Pages

This project includes a GitHub Actions workflow at `.github/workflows/pages.yml` using GitHub's current Pages actions.

1. Create a repository named `husam-habboub-portfolio` (or change `baseurl` in `_config.yml` to match your repository name).
2. Push the entire repository to the `main` branch.
3. In **Settings → Pages**, set **Source** to **GitHub Actions**.
4. GitHub Actions will build and deploy the Jekyll site on every push to `main`.

GitHub recommends GitHub Actions for Jekyll Pages deployments. See the official documentation for the current workflow and Pages settings.
