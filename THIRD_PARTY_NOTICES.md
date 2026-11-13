# Third-party notices

Zen Studio's own code is MIT-licensed (see [LICENSE](LICENSE)). It builds on the following work, each under its own license.

## Upstream

Built on Cards by Oliur (MIT). Zen Studio is a modified version of [Cards](https://github.com/oliur/cards), Copyright (c) 2026 Oliur, used under the MIT License. The original copyright and permission notice are kept in [LICENSE](LICENSE).

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
