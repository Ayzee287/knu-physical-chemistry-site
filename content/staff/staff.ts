import type { Locale } from "@/lib/i18n";
import type { LocalisedStaffMember, StaffMember } from "@/types/content";
import { claim, fromDeptProfile } from "@/lib/provenance";
import { resolvePerson } from "@content/staff/publication";

// Academic staff of the Department of Physical Chemistry.
//
// SOURCES, strongest first: the v3 department profile (SOURCES.deptProfile —
// per-person ORCID, rooms, focus lines; cites infopacket.knu.ua and
// vstup.chem.knu.ua, June 2026), corroborated by the v2 faculty directory and
// the legacy site's teachers page. Secondary sources; nothing here is
// independently verified yet.
//
// RECORDED CONFLICTS (do not silently resolve):
// - Казіміров В. П. (legacy page) is absent from v2 AND v3 — treat as no
//   longer on the roster; ask the department for the record.
// - Emails differed across sources; v3 settles most (institutional where the
//   department itself lists one). Remaining personal-domain addresses are the
//   department's own listing.
//
// PUBLICATION GOVERNANCE (ADR-0004 + ADR-0005, extended by ADR-0012):
// - visibility gate (three tiers):
//     featured — head + the leading faculty (Іщенко, Олексенко, Роїк, Усенко).
//                Render on the curated homepage AND on /staff (sections 1-2).
//     staff    — the department's other teaching & research staff. Render on
//                /staff section 3 ("Викладацький та науковий склад") so the
//                page is the COMPLETE teaching-staff directory (ADR-0012),
//                but NOT on the curated homepage.
//     internal — no public render path (used by faculty-level records in
//                leadership.ts, not here).
// - provenance gate (amended): records publish with their `sourced`
//   provenance; review marks expose the trust state until verification flips
//   claims to verified(...). Volatile bio statistics are NOT recorded as
//   publishable fields.
// Standalone informational lines (degree / honours / focus) begin with a
// capital letter — they are subtitles, not mid-sentence terminology (the
// scientific terms inside them stay as written). Casing audit, 2026-06-15.

const src = fromDeptProfile;
const confirmNote = "Verify with the department; published as sourced under ADR-0005.";

export const staff: StaffMember[] = [
  {
    id: "head",
    slug: "fritskyi",
    rank: "head",
    visibility: "featured",
    role: { ua: "Завідувач кафедри", en: "Head of Department" },
    person: claim(
      {
        name: { ua: "Фрицький Ігор Олегович", en: "Igor O. Fritsky" },
        degree: {
          ua: "Доктор хімічних наук, професор",
          en: "Dr. Sc. (Chemistry), Professor",
        },
        honours: {
          ua: "Член-кореспондент НАН України (2021)",
          en: "Corresponding Member, NAS of Ukraine (2021)",
        },
        focus: {
          ua: "Координаційна хімія, спінові переходи та поліядерні комплекси",
          en: "Coordination chemistry, spin crossover and polynuclear complexes",
        },
      },
      src(
        "Head since 2005 (room 218). v3 resolves the v2 inconsistency: NAS corresponding membership dated 2021. " +
          "Convergent across v1/v2/v3 + legacy dept site. Bio statistics (460+ publications, h=27, prizes) " +
          "kept in source only — not publishable fields. " +
          confirmNote,
      ),
    ),
    email: claim("ifritsky@univ.kiev.ua", src("Listed by the department as the departmental contact mailbox.")),
    orcid: claim("0000-0002-1092-8035", src()),
    photo: "head",
  },
  {
    id: "ishchenko",
    slug: "ishchenko",
    rank: "professor",
    visibility: "featured",
    role: { ua: "Професор кафедри", en: "Professor" },
    person: claim(
      {
        name: { ua: "Іщенко Олена Вікторівна", en: "Olena V. Ishchenko" },
        degree: { ua: "Доктор хімічних наук, професор", en: "Dr. Sc. (Chemistry), Professor" },
        focus: {
          ua: "Фізико-хімія гетерогенних каталізаторів",
          en: "Physical chemistry of heterogeneous catalysts",
        },
      },
      src(`Leads the heterogeneous-catalysis unit (room 102). ${confirmNote}`),
    ),
    email: claim("elischenko58@gmail.com", src("Address as listed by the department.")),
    orcid: claim("0000-0001-9782-1769", src()),
    photo: "ishchenko",
  },
  {
    id: "oleksenko",
    slug: "oleksenko",
    rank: "professor",
    visibility: "featured",
    role: { ua: "Професор кафедри", en: "Professor" },
    person: claim(
      {
        name: { ua: "Олексенко Людмила Петрівна", en: "Liudmyla P. Oleksenko" },
        degree: { ua: "Доктор хімічних наук, професор", en: "Dr. Sc. (Chemistry), Professor" },
        focus: {
          ua: "Металовмісні каталітичні системи та напівпровідникові газові сенсори",
          en: "Metal-containing catalytic systems and semiconductor gas sensors",
        },
      },
      src(`Room 202. ${confirmNote}`),
    ),
    email: claim("olexludmil@ukr.net", src("Address as listed by the department.")),
    orcid: claim("0000-0002-7970-6895", src()),
    photo: "oleksenko",
  },
  {
    id: "roik",
    slug: "roik",
    rank: "professor",
    visibility: "featured",
    role: { ua: "Професор кафедри", en: "Professor" },
    person: claim(
      {
        name: { ua: "Роїк Олександр Сергійович", en: "Oleksandr S. Roik" },
        degree: {
          ua: "Доктор хімічних наук (2021), професор",
          en: "Dr. Sc. (Chemistry, 2021), Professor",
        },
        focus: {
          ua: "Структура рідких металів і металічних розплавів",
          en: "Structure of liquid metals and metallic melts",
        },
      },
      src(`Room 106. v3 confirms the institutional email over v2's personal one. ${confirmNote}`),
    ),
    email: claim("oleksandr_roik@knu.ua", src()),
    orcid: claim("0000-0001-9705-1100", src()),
    photo: "roik",
  },
  {
    id: "usenko",
    slug: "usenko",
    rank: "docent",
    visibility: "featured",
    role: {
      ua: "Доцент кафедри · заступник декана з навчальної роботи",
      en: "Associate Professor · Vice-Dean for Education",
    },
    person: claim(
      {
        name: { ua: "Усенко Наталія Ігорівна", en: "Nataliia I. Usenko" },
        degree: { ua: "Кандидат хімічних наук, доцент", en: "Cand. Sc. (Chemistry), Associate Professor" },
      },
      src(
        `Room 241. The most cross-corroborated record (v1 dean's office, v2, v3, legacy page). ${confirmNote}`,
      ),
    ),
    email: claim("nataliya_usenko@knu.ua", src("Institutional address (v1/legacy); v3 also lists a personal one.")),
    orcid: claim("0000-0002-8342-1884", src()),
    photo: "usenko",
  },
  {
    id: "haidai",
    slug: "haidai",
    rank: "docent",
    visibility: "staff",
    role: { ua: "Доцент кафедри · секретар кафедри", en: "Associate Professor · Department Secretary" },
    person: claim(
      {
        name: { ua: "Гайдай Сніжана Вікторівна", en: "Snizhana V. Haidai" },
        degree: { ua: "Кандидат хімічних наук, доцент", en: "Cand. Sc. (Chemistry), Associate Professor" },
        focus: {
          ua: "Гетерогенний каталіз: CO₂-метанізація та синтез аміаку",
          en: "Heterogeneous catalysis: CO₂ methanation and ammonia synthesis",
        },
      },
      src("Room 102; CO2-methanation work within the Ishchenko group. Focus stated as the group area she publishes in (source bio)."),
    ),
    email: claim("gaidaisv77@ukr.net", src()),
    orcid: claim("0000-0001-7742-5830", src()),
    photo: "haidai",
  },
  {
    id: "malysheva",
    slug: "malysheva",
    rank: "docent",
    visibility: "staff",
    role: { ua: "Доцент кафедри", en: "Associate Professor" },
    person: claim(
      {
        name: { ua: "Малишева Марія Львівна", en: "Mariia L. Malysheva" },
        degree: { ua: "Кандидат хімічних наук, доцент", en: "Cand. Sc. (Chemistry), Associate Professor" },
        focus: {
          ua: "Стійкість і коагуляція дисперсних систем",
          en: "Stability and coagulation of dispersed systems",
        },
      },
      src("Room 240; leads the dispersed-systems group (appears on /research in group designation, ADR-0005)."),
    ),
    email: claim("maria_malysheva@univ.kiev.ua", src()),
    orcid: claim("0000-0002-4363-3284", src()),
    photo: "malysheva",
  },
  {
    id: "diyuk",
    slug: "diyuk",
    rank: "docent",
    visibility: "staff",
    role: { ua: "Доцент кафедри", en: "Associate Professor" },
    person: claim(
      {
        name: { ua: "Діюк Віталій Євгенович", en: "Vitalii Ye. Diyuk" },
        degree: { ua: "Кандидат хімічних наук, доцент", en: "Cand. Sc. (Chemistry), Associate Professor" },
        focus: {
          ua: "Фізико-хімія модифікованих вуглецевих матеріалів",
          en: "Physical chemistry of modified carbon materials",
        },
      },
      src("Room 207; leads the carbon-materials group (appears on /research in group designation, ADR-0005)."),
    ),
    email: claim("vitalii_diyuk@knu.ua", src()),
    orcid: claim("0000-0001-5183-5444", src()),
    photo: "diyuk",
  },
  {
    id: "boldyrieva",
    slug: "boldyrieva",
    rank: "docent",
    visibility: "staff",
    role: { ua: "Доцент кафедри", en: "Associate Professor" },
    person: claim(
      {
        name: { ua: "Болдирєва Ольга Юріївна", en: "Olha Yu. Boldyrieva" },
        degree: { ua: "Кандидат хімічних наук, доцент", en: "Cand. Sc. (Chemistry), Associate Professor" },
      },
      src("Room 204. Source bio gives no specific research direction — focus left empty rather than invented."),
    ),
    email: claim("2017chem@ukr.net", src()),
    orcid: claim("0000-0003-4756-3073", src()),
    photo: "boldyrieva",
  },
  {
    id: "yatsymyrskyi",
    slug: "yatsymyrskyi",
    rank: "docent",
    visibility: "staff",
    role: { ua: "Доцент кафедри", en: "Associate Professor" },
    person: claim(
      {
        name: { ua: "Яцимирський Андрій Віталійович", en: "Andrii V. Yatsymyrskyi" },
        degree: { ua: "Кандидат хімічних наук, доцент", en: "Cand. Sc. (Chemistry), Associate Professor" },
        focus: {
          ua: "Квантово-хімічні розрахунки адсорбції на металевих поверхнях",
          en: "Quantum-chemical modelling of adsorption on metal surfaces",
        },
      },
      src("Room 102; son of the school's long-time leader V. K. Yatsymyrskyi (source note)."),
    ),
    email: claim("andrii_yatsymyrskyi@knu.ua", src()),
    orcid: claim("0000-0001-5050-8281", src()),
    photo: "yatsymyrskyi",
  },
  {
    id: "guralskyi",
    slug: "guralskyi",
    rank: "docent",
    visibility: "staff",
    role: { ua: "Доцент кафедри", en: "Associate Professor" },
    person: claim(
      {
        name: { ua: "Гуральський Ілля Олександрович", en: "Illia O. Guralskyi" },
        degree: { ua: "Кандидат хімічних наук, доцент", en: "Cand. Sc. (Chemistry), Associate Professor" },
        focus: {
          ua: "Координаційна хімія перехідних металів",
          en: "Coordination chemistry of transition metals",
        },
      },
      src("Member of the head's group per v3; absent from the legacy page (newest addition). No ORCID listed by the department."),
    ),
    email: claim("illia.guralskyi@univ.kiev.ua", src()),
    photo: "guralskyi",
  },
];

/**
 * The CURATED leadership view: featured records only (head + leading faculty,
 * ADR-0004/0005). Drives /staff sections 1-2 and the homepage. Trust
 * resolution is the shared gate in @content/staff/publication.
 */
export function getStaff(lang: Locale): LocalisedStaffMember[] {
  return staff
    .filter((m) => m.visibility === "featured")
    .map((m) => resolvePerson(m, lang));
}

/**
 * The department's teaching & research staff (ADR-0012): the `staff`-tier
 * records that complete the /staff directory below the leadership sections.
 * NOT shown on the curated homepage. Array order is preserved.
 */
export function getTeachingStaff(lang: Locale): LocalisedStaffMember[] {
  return staff
    .filter((m) => m.visibility === "staff")
    .map((m) => resolvePerson(m, lang));
}

/** The head-of-department entry, used by the dedicated section on /staff. */
export function getHead(lang: Locale): LocalisedStaffMember {
  const head = staff.find((m) => m.id === "head") ?? staff[0];
  return resolvePerson(head, lang);
}

// Research leaders — the homepage join between people and directions.
//
// The set is the head plus the featured professors who lead research groups,
// each mapped to the direction their group carries on /research (anchors per
// content/research/research.ts). Усенко stays off this surface on purpose:
// her featured role is administrative (vice-dean), and this section presents
// research identity, not the roster. Both standing gates still apply —
// featured visibility (ADR-0004) and the shared person-publication gate.
const leaderAreaById: Record<string, string> = {
  head: "coordination-spin",
  ishchenko: "heterogeneous-catalysis",
  oleksenko: "gas-sensors",
  roik: "melts-disordered",
};

export type ResearchLeader = LocalisedStaffMember & { areaId: string };

export function getResearchLeaders(lang: Locale): ResearchLeader[] {
  return staff
    .filter((m) => m.visibility === "featured" && leaderAreaById[m.id])
    .map((m) => ({ ...resolvePerson(m, lang), areaId: leaderAreaById[m.id] }));
}

// ── Profile routing (ADR-0014) ──────────────────────────────────────────────
//
// Every PUBLISHED member (featured + staff) has a `/staff/<slug>` profile page.
// `internal` records never route (no public render path). These helpers are the
// single source of "who is routable" — the route's generateStaticParams and the
// sitemap both derive from them, so the route set cannot drift from the policy.

/** Members that have a public profile page: the visible directory (not internal). */
const routable = (m: StaffMember): boolean =>
  m.visibility === "featured" || m.visibility === "staff";

/** Profile slugs of every published member — drives generateStaticParams. */
export function getRoutableStaffSlugs(): string[] {
  return staff.filter(routable).map((m) => m.slug);
}

/** Indexable profile app-paths (`/staff/<slug>`) — appended to the sitemap. */
export function getStaffProfilePaths(): string[] {
  return getRoutableStaffSlugs().map((slug) => `/staff/${slug}`);
}

/** Resolve a published member by profile slug; undefined when unknown/internal. */
export function findStaffBySlug(
  slug: string,
  lang: Locale,
): LocalisedStaffMember | undefined {
  const member = staff.find((m) => m.slug === slug && routable(m));
  return member ? resolvePerson(member, lang) : undefined;
}
