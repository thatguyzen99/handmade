# Third-party notices

Handmade's own code is MIT-licensed (see [LICENSE](LICENSE)). It builds on the following work, each under its own license.

## Upstream

Built on Cards by Oliur (MIT). Handmade is a modified version of [Cards](https://github.com/oliur/cards), Copyright (c) 2026 Oliur, used under the MIT License. The original copyright and permission notice are kept in [LICENSE](LICENSE).

## Design references

| Project | License | How it's used |
| --- | --- | --- |
| [shadcn/ui](https://ui.shadcn.com) | MIT | Component conventions (Radix + cva + `cn()`, `data-slot`). No shadcn source is vendored. |
| [Tailwind CSS](https://tailwindcss.com) | MIT | The neutral ramps and state-color values (red, orange, green, blue, violet, amber) derive from Tailwind's default palette. |
| [tactile-design](https://github.com/kosta4a/tactile-design) | MIT | The rules and values behind buttons, badges and dropdowns (edges, drops, press, menu motion). License below. No files are vendored. |

## Runtime dependencies

| Package | License |
| --- | --- |
| next, react, react-dom, radix-ui, clsx, culori, tailwind-merge, tailwindcss | MIT |
| [sonner](https://github.com/emilkowalski/sonner), [cmdk](https://github.com/pacocoursey/cmdk), [input-otp](https://github.com/guilhermerodz/input-otp), [recharts](https://github.com/recharts/recharts) | MIT |
| class-variance-authority | Apache-2.0 |
| [lucide-react](https://lucide.dev) | ISC |

The brand logos in `src/components/ui/brand-icons.tsx` come from [Simple Icons](https://simpleicons.org) (CC0-1.0). The logos themselves remain trademarks of their owners.

## Fonts

Fonts are loaded from their hosts at runtime, not bundled in this repo.

| Font | License | Source |
| --- | --- | --- |
| Familjen Grotesk (default UI and headings) | SIL Open Font License 1.1 | [Familjen](https://fonts.google.com/specimen/Familjen+Grotesk) via Google Fonts |
| JetBrains Mono (default) | SIL Open Font License 1.1 | [JetBrains](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts |
| Inter / Inter Display, DM Mono (customizer options from upstream) | SIL Open Font License 1.1 | [rsms.me/inter](https://rsms.me/inter/), [Google Fonts](https://fonts.google.com/specimen/DM+Mono) |
| Optional Google Fonts in the customizer | Each family's own license (mostly OFL) | [fonts.google.com](https://fonts.google.com) |


## Photos

Studio photography is from [Pexels](https://www.pexels.com/license/) (free to use, attribution appreciated). Photographers:

| File | Photographer | Source |
| --- | --- | --- |
| people/ama.webp | Ramy Photographer | [Pexels 36551042](https://www.pexels.com/photo/36551042/) |
| people/telling.webp | Akorede Daramola | [Pexels 35644501](https://www.pexels.com/photo/35644501/) |
| people/lena.webp | Kindel Media | [Pexels 7688203](https://www.pexels.com/photo/7688203/) |
| people/ava.webp | Christina Morillo | [Pexels 1181519](https://www.pexels.com/photo/1181519/) |
| people/rae.webp | Christina Morillo | [Pexels 1181686](https://www.pexels.com/photo/1181686/) |
| people/esther.webp | Muhammad-Taha Ibrahim | [Pexels 33837391](https://www.pexels.com/photo/33837391/) |
| people/kemi.webp | Korede Adenola | [Pexels 18460107](https://www.pexels.com/photo/18460107/) |
| people/kojo.webp | Mikhail Nilov | [Pexels 9301743](https://www.pexels.com/photo/9301743/) |
| people/milo.webp | victor Wellrich | [Pexels 17556066](https://www.pexels.com/photo/17556066/) |
| people/jun.webp | Philip Boakye | [Pexels 6673189](https://www.pexels.com/photo/6673189/) |
| accra-skyline.webp | Prince Enos | [Pexels 31782030](https://www.pexels.com/photo/31782030/) |
| accra-city.webp | Prince Enos | [Pexels 31781975](https://www.pexels.com/photo/31781975/) |
| mosaik.webp | Clément GADO | [Pexels 27981484](https://www.pexels.com/photo/27981484/) |
| cafe.webp | Connor Forsyth | [Pexels 26492562](https://www.pexels.com/photo/26492562/) |
| vinyl.webp | Oleksii Piekhov | [Pexels 18337073](https://www.pexels.com/photo/18337073/) |
| Other stills (desk, coffee, sky, score, record, dawn, night city, workspace) | Pexels contributors | [pexels.com](https://www.pexels.com/) |

The Handmade wordmark (typographic, Familjen Grotesk) and mark (`public/brand/handmade/`) are original work by Melvin Z. Freeman. Earlier wordmark and outline-m files are kept unused in `public/brand/legacy/`.

## tactile-design license

```
MIT License

Copyright (c) 2026 the tactile-design authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
