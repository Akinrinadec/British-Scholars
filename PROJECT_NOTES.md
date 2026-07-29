# British Scholars project notes

Last updated: 29 July 2026

## Production setup

- Live website: https://britishscholars.ae
- GitHub repository: https://github.com/Akinrinadec/British-Scholars
- Production branch: `main`
- Netlify production project: `fastidious-kangaroo-7e7b76`
- Netlify production URL: https://fastidious-kangaroo-7e7b76.netlify.app
- Custom domain: `britishscholars.ae`

The production Netlify project is linked directly to the GitHub repository.
Every push to `main` triggers a new Netlify production deployment.

## Deployment process

1. Update the website files in the GitHub repository.
2. Commit the change to the `main` branch.
3. GitHub Actions validates the required website and SEO files.
4. Netlify detects the commit and automatically publishes the new version.
5. Confirm the live website after deployment.

No manual Netlify Drop upload is required. No Netlify token or GitHub repository
secret is required for the current direct GitHub-to-Netlify connection.

## Required files

- `index.html`: main British Scholars webpage
- `netlify.toml`: Netlify publishing and response-header configuration
- `robots.txt`: search-engine crawling instructions
- `sitemap.xml`: production sitemap for `britishscholars.ae`
- `.github/workflows/deploy.yml`: GitHub website validation workflow
- `README.md`: repository overview and update instructions
- `PROJECT_NOTES.md`: this handover record

## Live checks

After every material update, check:

- https://britishscholars.ae/
- https://britishscholars.ae/robots.txt
- https://britishscholars.ae/sitemap.xml

All three returned HTTP 200 after the automated deployment was established.

## Current website connections

- Parent enquiry form: https://tally.so/r/QKOA01
- Tutor application form: https://tally.so/r/D4Axvp
- WhatsApp: https://wa.me/971585123370
- Telephone: +971 58 512 3370

## Important Netlify history

The website was previously published through manual Netlify Drop uploads.

A temporary Netlify project named `delicate-croissant-c70f76` was connected to
the GitHub repository during setup. It does not own the production custom domain
and is not required for the live website.

The correct live project is `fastidious-kangaroo-7e7b76`, which owns
`britishscholars.ae` and is now connected to GitHub.

The temporary `delicate-croissant-c70f76` project can be disconnected from
GitHub or deleted after confirming it contains nothing else that is needed.

## Future update rule

Treat GitHub as the source of truth. Make future website changes in
`Akinrinadec/British-Scholars`, not through Netlify Drop. Netlify should only
publish the version stored in the repository.
