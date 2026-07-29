# British Scholars website

The production website for [britishscholars.ae](https://britishscholars.ae).

## Automatic deployment

GitHub Actions validates the website whenever a change is pushed to `main`.
The connected Netlify project then deploys the validated repository automatically.

No manual Netlify upload or deployment credentials are required.

## Updating the website

Edit `index.html` and commit the change to `main`. GitHub Actions checks the
required website and SEO files, and Netlify publishes the new production version.
