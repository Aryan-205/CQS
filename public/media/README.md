# Hero media

`hero.mp4` — the homepage hero loop, referenced by `lib/media.ts` and rendered
by `components/home/hero.tsx`. `hero-poster.jpg` is a frame lifted from that
file at t=6s, so the still and the footage are the same shot; regenerate it
whenever the video changes, or the two will disagree on mobile and under
`prefers-reduced-motion`.

## Current file — placeholder, not cleared for launch

The clip in place is Northrop Grumman's B-21 Raider spot, pulled from
`media.northropgrumman.com` (13.3 s, 1920×1080, 5.4 MB, H.264, faststart).
It is another defence contractor's marketing asset: **CompQsoft has no licence
to it**, and a caption reading "UTAH SALT FLATS" appears around t=2 s. Replace
it with owned or licensed footage before the site goes live.

Encode the replacement to:

- H.264 / MP4, no audio track, 1920×1080, 8–14 s seamless loop
- ≤ 4 MB — it is above the fold and blocks nothing, but it competes with the
  poster for bandwidth
- Bright daylight footage gets pulled down by `.graded-deep` in
  `app/globals.css` before the scrim sees it; darker footage may want the
  lighter `.graded` instead

```
ffmpeg -i source.mov -an -vf scale=1920:-2 -c:v libx264 -crf 26 \
  -preset slow -movflags +faststart -t 12 hero.mp4
ffmpeg -i hero.mp4 -ss 6 -frames:v 1 -q:v 4 hero-poster.jpg
```
