# Archive

Files kept with the project but not published. Only `public/` is deployed; `archive/public/` mirrors its paths, so to use a file move it back to the same place:

```sh
git mv archive/public/About/ydour.jpg public/About/ydour.jpg
```

- `public/`: media not used by the site.
- `originals/`: the full-size originals of images that `tools/resize-images.mjs` shrank in `public/`. To publish a larger version, resize from the original rather than from the published copy.

Other kinds of archived material can go in sibling folders (`archive/<name>/`).
