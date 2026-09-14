# M Rayhan Ferdous Faisal — Portfolio

Responsive academic portfolio hosted with GitHub Pages.

## Project structure

```text
portfolio/
├── index.html                 # Redirects to the About page
├── about/
│   └── index.html
├── resume/
│   └── index.html
├── projects/
│   └── index.html
├── achievements/
│   └── index.html
├── leadership/
│   └── index.html
├── contact/
│   └── index.html
├── assets/
│   ├── css/
│   │   └── style.css          # Shared design and responsive rules
│   ├── images/
│   │   └── README.md          # Image filenames and upload instructions
│   └── js/
│       ├── resources.js       # Images, videos, email and profile links
│       └── main.js            # Shared resource and contact behavior
└── .github/workflows/
    └── pages.yml              # Automatic deployment
```

## Add photos, videos and links

1. Upload images to `assets/images/`.
2. Open `assets/js/resources.js`.
3. Put each image path or URL in its named field.
4. Add video, LinkedIn, Scholar, project and email values under `links`.
5. Commit the changes. GitHub Pages deploys automatically.

Empty resource values preserve the styled placeholder, so missing images do not break the layout.

## Content editing

Edit each section in its matching subpage, such as `projects/index.html` or `leadership/index.html`. The sidebar and navigation markup is shared consistently across those pages. Edit colors, spacing and responsive behavior in `assets/css/style.css`.

## Local preview

Preview the linked subpages through a simple local web server instead of opening the files directly. For example, run `python -m http.server 8000` in the repository and open `http://localhost:8000`. No package installation or build step is required.

## Hosted Preview
https://rf-faisal.github.io/portfolio/
