# M Rayhan Ferdous Faisal — Portfolio

Responsive academic portfolio hosted with GitHub Pages.

## Project structure

```text
portfolio/
├── index.html                 # Page content and card markup
├── assets/
│   ├── css/
│   │   └── style.css          # All visual styling and responsive rules
│   ├── images/
│   │   └── README.md          # Image filenames and upload instructions
│   └── js/
│       ├── resources.js       # Edit image paths, videos, email and profile links here
│       └── main.js            # Navigation and resource-loading behavior
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

Edit headings, descriptions, dates and card order in `index.html`. Edit colors, spacing and responsive behavior in `assets/css/style.css`.

## Local preview

Open `index.html` in a browser. No package installation or build command is required.
