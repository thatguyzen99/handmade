/**
 * Studio photography and portrait paths. Swap `/images/melvin.jpg` to
 * update every Melvin Z. Freeman avatar in the studio at once.
 * Photos are free-licensed from Pexels (see THIRD_PARTY_NOTICES).
 */

export type Person = {
  name: string;
  initials: string;
  src: string;
  alt: string;
  /** object-position for circular avatars and cropped covers */
  objectPosition?: string;
};

export const people = {
  melvin: {
    name: "Melvin Z. Freeman",
    initials: "MF",
    src: "/images/melvin.jpg",
    alt: "Melvin Z. Freeman",
    // Face sits in the upper half; tune this if the source portrait changes.
    objectPosition: "50% 22%",
  },
  ama: { name: "Ama Owusu", initials: "AO", src: "/images/people/ama.webp", alt: "Ama Owusu", objectPosition: "50% 30%" },
  kojo: { name: "Kojo Mensah", initials: "KM", src: "/images/people/kojo.webp", alt: "Kojo Mensah", objectPosition: "40% 28%" },
  lena: { name: "Lena Park", initials: "LP", src: "/images/people/lena.webp", alt: "Lena Park", objectPosition: "48% 28%" },
  telling: { name: "Telling", initials: "TE", src: "/images/people/telling.webp", alt: "Telling", objectPosition: "50% 32%" },
  ava: { name: "Ava Laurent", initials: "AL", src: "/images/people/ava.webp", alt: "Ava Laurent", objectPosition: "50% 30%" },
  milo: { name: "Milo Kovac", initials: "MK", src: "/images/people/milo.webp", alt: "Milo Kovac", objectPosition: "50% 28%" },
  jun: { name: "Jun Sato", initials: "JS", src: "/images/people/jun.webp", alt: "Jun Sato", objectPosition: "50% 28%" },
  rae: { name: "Rae Wilson", initials: "RW", src: "/images/people/rae.webp", alt: "Rae Wilson", objectPosition: "45% 28%" },
  esther: { name: "Esther Boateng", initials: "EP", src: "/images/people/esther.webp", alt: "Esther Boateng", objectPosition: "45% 30%" },
  kemi: { name: "Kemi Adeyemi", initials: "KA", src: "/images/people/kemi.webp", alt: "Kemi Adeyemi", objectPosition: "50% 36%" },
} as const satisfies Record<string, Person>;

export type PersonId = keyof typeof people;

export const photos = {
  accraSkyline: "/images/accra-skyline.webp",
  accraCity: "/images/accra-city.webp",
  mosaik: "/images/mosaik.webp",
  cafe: "/images/cafe.webp",
  desk: "/images/desk.webp",
  coffee: "/images/coffee.webp",
  vinyl: "/images/vinyl.webp",
  score: "/images/score.webp",
  record: "/images/record.webp",
  sky: "/images/sky.webp",
  dawn: "/images/dawn.webp",
  nightCity: "/images/night-city.webp",
  workspace: "/images/workspace.webp",
  clearSky: "/images/clear-sky.webp",
  cover: "/images/accra-skyline.webp",
  weather: "/images/accra-city.webp",
  hero: "/images/mosaik.webp",
  album: "/images/vinyl.webp",
} as const;

export const photoCredits: { file: string; photographer: string; href: string; note: string }[] = [
  { file: "people/ama.webp", photographer: "Ramy Photographer", href: "https://www.pexels.com/photo/36551042/", note: "Portrait" },
  { file: "people/telling.webp", photographer: "Akorede Daramola", href: "https://www.pexels.com/photo/35644501/", note: "Portrait" },
  { file: "people/lena.webp", photographer: "Kindel Media", href: "https://www.pexels.com/photo/7688203/", note: "Portrait" },
  { file: "people/ava.webp", photographer: "Christina Morillo", href: "https://www.pexels.com/photo/1181519/", note: "Portrait" },
  { file: "people/rae.webp", photographer: "Christina Morillo", href: "https://www.pexels.com/photo/1181686/", note: "Portrait" },
  { file: "people/esther.webp", photographer: "Muhammad-Taha Ibrahim", href: "https://www.pexels.com/photo/33837391/", note: "Portrait" },
  { file: "people/kemi.webp", photographer: "Korede Adenola", href: "https://www.pexels.com/photo/18460107/", note: "Portrait" },
  { file: "people/kojo.webp", photographer: "Mikhail Nilov", href: "https://www.pexels.com/photo/9301743/", note: "Portrait" },
  { file: "people/milo.webp", photographer: "victor Wellrich", href: "https://www.pexels.com/photo/17556066/", note: "Portrait, Accra" },
  { file: "people/jun.webp", photographer: "Philip Boakye", href: "https://www.pexels.com/photo/6673189/", note: "Portrait" },
  { file: "accra-skyline.webp", photographer: "Prince Enos", href: "https://www.pexels.com/photo/31782030/", note: "Accra skyline" },
  { file: "accra-city.webp", photographer: "Prince Enos", href: "https://www.pexels.com/photo/31781975/", note: "Accra, modern tower" },
  { file: "mosaik.webp", photographer: "Clément GADO", href: "https://www.pexels.com/photo/27981484/", note: "Mosaïk, Accra" },
  { file: "cafe.webp", photographer: "Connor Forsyth", href: "https://www.pexels.com/photo/26492562/", note: "Café interior" },
  { file: "vinyl.webp", photographer: "Oleksii Piekhov", href: "https://www.pexels.com/photo/18337073/", note: "Record player" },
  { file: "desk.webp", photographer: "Pexels", href: "https://www.pexels.com/photo/196644/", note: "Wireframe notebook" },
  { file: "coffee.webp", photographer: "Pexels", href: "https://www.pexels.com/", note: "Latte" },
  { file: "score.webp", photographer: "Pexels", href: "https://www.pexels.com/", note: "Sheet music" },
  { file: "record.webp", photographer: "Pexels", href: "https://www.pexels.com/", note: "Vinyl close-up" },
  { file: "sky.webp", photographer: "Pexels", href: "https://www.pexels.com/photo/912110/", note: "Blue sky" },
  { file: "dawn.webp", photographer: "Pexels", href: "https://www.pexels.com/", note: "Alpine dawn" },
  { file: "night-city.webp", photographer: "Pexels", href: "https://www.pexels.com/", note: "City at night" },
  { file: "workspace.webp", photographer: "Pexels", href: "https://www.pexels.com/", note: "Studio meeting" },
  { file: "clear-sky.webp", photographer: "Pexels", href: "https://www.pexels.com/", note: "Clear sky" },
];
