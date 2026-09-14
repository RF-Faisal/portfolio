# M Rayhan Ferdous Faisal — Portfolio

A responsive academic portfolio inspired by the card-based interaction style of vCard and the content organization of an academic research portfolio.

## Publish with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select the **main** branch and **/(root)** folder, then save.
4. GitHub will provide the public URL after deployment.

## Replace photos and videos

Everything is currently self-contained in `index.html`.

- Profile photo: replace the `<div class="portrait">…</div>` block with an image.
- Project media: replace a `<div class="media">…</div>` block with an image, video or iframe.
- Links: search for `href="#"` and replace each placeholder.
- Email: search for `Add your email` and replace both the visible text and `mailto:` value.

Suggested profile image markup:

```html
<div class="portrait">
  <img src="assets/profile.jpg" alt="M Rayhan Ferdous Faisal">
</div>
```

Add this CSS:

```css
.portrait img { width: 100%; height: 100%; object-fit: cover; }
```

## Content note

The portfolio describes application-level Samsung Health Monitor work and does not claim development of diagnostic algorithms. The Mars Rover experience is worded as a contribution to autonomous navigation rather than a leadership claim.
