# Hero media

`hero.mp4` — the homepage hero loop, referenced by `lib/media.ts` and rendered
by `components/home/hero.tsx`.

Not committed. Drop the file in here and it plays automatically; until then the
poster still (`heroPoster` in `lib/media.ts`) carries the band on its own, which
is the same still mobile, slow connections and reduced-motion users get.

Encode to:

- H.264 / MP4, no audio track, 1920×1080, 8–14 s seamless loop
- ≤ 4 MB — it is above the fold and blocks nothing, but it competes with the
  poster for bandwidth
- Graded cool and slightly desaturated to match `.graded` in `app/globals.css`;
  real mission footage only, never stock-warm lifestyle

```
ffmpeg -i source.mov -an -vf scale=1920:-2 -c:v libx264 -crf 26 \
  -preset slow -movflags +faststart -t 12 hero.mp4
```
