# ProjectOps Hub

This repository contains a multi-page project-management website built for operational tracking.

## Project Description

ProjectOps Hub helps project managers:

- Track client-assessed tools
- Compare SLA targets versus actual performance
- Compare KPI targets versus actual performance
- Identify internal delivery risk (low, medium, high)
- Maintain a single internal tracking board for governance reviews

Website pages:

- Home: live operational snapshot
- About: operating model and workflow
- Resume: capability framework and governance cadence
- Projects: solution modules plus interactive tracker
- Contact: support and governance channels

Tracker capabilities:

- Add client records with assessment score and review date
- Automatic SLA/KPI met or missed status
- Risk classification logic based on gaps and score
- Local persistence using browser local storage

## Technologies Used

- HTML5
- CSS3
- JavaScript (vanilla)
- Browser Local Storage API
- Git and GitHub
- GitHub Pages

## File Structure

- index.html
- about.html
- resume.html
- projects.html
- contact.html
- styles.css
- script.js
- assets/images/

## How To Update The Site

1. Open the project in VS Code.
2. Edit content in the HTML pages as needed.
3. Update tracker logic in script.js for SLA/KPI rules if your process changes.
4. Update styles in styles.css for layout or branding updates.
5. Test responsive behavior and tracker workflows in browser.
6. Commit and push your changes:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

GitHub Pages redeploys automatically after push.

## GitHub Pages Deployment Steps

1. Push this repository to GitHub.
2. Open repository Settings.
3. Go to Pages.
4. Under Build and deployment:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
5. Save settings.
6. Wait for deployment to finish.
