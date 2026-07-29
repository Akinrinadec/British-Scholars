# British Scholars website

The production website for [britishscholars.ae](https://britishscholars.ae).

## Automatic deployment

The GitHub Actions workflow validates the website and deploys it to the existing
Netlify site whenever a change is pushed to `main`.

Add these two repository secrets under **Settings → Secrets and variables →
Actions**:

- `NETLIFY_AUTH_TOKEN`: a Netlify personal access token
- `NETLIFY_SITE_ID`: the API ID of the existing British Scholars Netlify site

Until both secrets are present, validation still runs but the deployment step is
safely skipped.

## Updating the website

Edit `index.html` and commit the change to `main`. GitHub Actions will validate
the required website and SEO files, then publish the new version to Netlify.
