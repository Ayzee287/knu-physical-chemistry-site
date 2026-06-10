// Site identity — the institutional constants every surface composes from.
// Names are structural/editorial; the official URLs are claims of record whose
// provenance lives with the contacts collection (content/contacts).

import type { Localised } from "@/lib/provenance";

export const site = {
  department: {
    ua: "Кафедра фізичної хімії",
    en: "Department of Physical Chemistry",
  } satisfies Localised,

  faculty: {
    ua: "Хімічний факультет",
    en: "Faculty of Chemistry",
  } satisfies Localised,

  university: {
    ua: "Київський національний університет імені Тараса Шевченка",
    en: "Taras Shevchenko National University of Kyiv",
  } satisfies Localised,

  location: {
    ua: "Київ, Україна",
    en: "Kyiv, Ukraine",
  } satisfies Localised,
} as const;
