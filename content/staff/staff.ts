import type { Locale } from "@/lib/i18n";
import type { LocalisedStaffMember, StaffMember } from "@/types/content";
import {
  claim,
  fromStaffDirectoryV2,
  placeholder,
  type Localised,
} from "@/lib/provenance";

// Academic staff of the Department of Physical Chemistry.
//
// SOURCES: the v2 faculty staff directory (full departmental roster; see
// SOURCES.staffDirectoryV2) corroborated by the legacy official site's
// teachers page (source-materials/physchem-knu-ua/teachers_ukr.html). Both
// are secondary; every person record is `sourced`, none is verified.
//
// RECORDED CONFLICTS (do not silently resolve):
// - Казіміров В. П. (д.х.н., проф.) appears on the legacy teachers page but
//   is ABSENT from the v2 directory — possibly retired/emeritus. Not recorded
//   below; ask the department.
// - Several emails differ between sources (e.g. Усенко: nataliya_usenko@knu.ua
//   on the legacy page vs nusenko68@gmail.com in v2). Where both exist the
//   institutional @knu.ua address is recorded; confirm preferred addresses.
//
// PUBLICATION GOVERNANCE (two independent gates, see ADR-0001 + ADR-0004):
// 1. visibility — only `featured` records belong to the curated public
//    surface. The site is a curated institution, not a staff directory:
//    `internal` records exist for normalization, verification and operations,
//    and have NO public render site by design.
// 2. provenance — a featured person still renders as an honest pending
//    placeholder until their claim is flipped to verified(...).

const v2 = fromStaffDirectoryV2;
const confirmNote = "Verify current post, degree and preferred contact with the department.";

export const staff: StaffMember[] = [
  {
    id: "head",
    rank: "head",
    visibility: "featured",
    role: { ua: "Завідувач кафедри", en: "Head of Department" },
    person: claim(
      {
        name: { ua: "Фрицький Ігор Олегович", en: "Igor O. Fritsky" },
        degree: {
          ua: "доктор хімічних наук, професор",
          en: "Dr. Sc. (Chemistry), Professor",
        },
        honours: {
          ua: "член-кореспондент НАН України",
          en: "Corresponding Member, NAS of Ukraine",
        },
        focus: {
          ua: "координаційна хімія та хімія поліядерних комплексів",
          en: "coordination chemistry and the chemistry of polynuclear complexes",
        },
      },
      v2(
        "Named head in: v1+v2 directories, legacy dept site (head since 2005, own group subsection). " +
          "NOTE: v2 staff section lists him WITHOUT the NAS honour; the v2 heads section includes it — " +
          "internal inconsistency in the source. Confirm the honour against the NAS register. " +
          "Confirm EN transliteration. Strong sourcing; needs one present-day confirmation.",
      ),
    ),
    email: claim("ifritsky@univ.kiev.ua", v2("Legacy univ.kiev.ua domain; confirm current address.")),
  },
  {
    id: "ishchenko",
    rank: "professor",
    visibility: "internal",
    role: { ua: "Професор кафедри", en: "Professor" },
    person: claim(
      {
        name: { ua: "Іщенко Олена Вікторівна", en: "Olena V. Ishchenko" },
        degree: { ua: "доктор хімічних наук, професор", en: "Dr. Sc. (Chemistry), Professor" },
      },
      v2(`${confirmNote} Also on legacy teachers page (room 102). Candidate for featured once verified.`),
    ),
    email: claim("elischenko58@gmail.com", v2("Personal address in both sources.")),
  },
  {
    id: "oleksenko",
    rank: "professor",
    visibility: "internal",
    role: { ua: "Професор кафедри", en: "Professor" },
    person: claim(
      {
        name: { ua: "Олексенко Людмила Петрівна", en: "Liudmyla P. Oleksenko" },
        degree: { ua: "доктор хімічних наук, професор", en: "Dr. Sc. (Chemistry), Professor" },
      },
      v2(`${confirmNote} Also on legacy teachers page and groups page (own group). Candidate for featured once verified.`),
    ),
    email: claim("olexludmil@ukr.net", v2()),
  },
  {
    id: "roik",
    rank: "professor",
    visibility: "internal",
    role: { ua: "Професор кафедри", en: "Professor" },
    person: claim(
      {
        name: { ua: "Роїк Олександр Сергійович", en: "Oleksandr S. Roik" },
        degree: { ua: "доктор хімічних наук, професор", en: "Dr. Sc. (Chemistry), Professor" },
      },
      v2(
        `${confirmNote} Legacy page lists oleksandr_roik@knu.ua; v2 lists a gmail address — conflict recorded, knu.ua preferred.`,
      ),
    ),
    email: claim("oleksandr_roik@knu.ua", v2("From legacy teachers page (institutional domain preferred over v2 gmail).")),
  },
  {
    id: "usenko",
    rank: "docent",
    visibility: "internal",
    role: {
      ua: "Доцент кафедри · заступник декана з навчальної роботи",
      en: "Associate Professor · Vice-Dean for Education",
    },
    person: claim(
      {
        name: { ua: "Усенко Наталія Ігорівна", en: "Nataliia I. Usenko" },
        degree: { ua: "кандидат хімічних наук, доцент", en: "Cand. Sc. (Chemistry), Associate Professor" },
      },
      v2(
        `${confirmNote} Triple-sourced (v1 dean's office, v2 roster, legacy teachers page) — strongest-corroborated record after the head.`,
      ),
    ),
    email: claim("nataliya_usenko@knu.ua", v2("Institutional address from v1/legacy; v2 lists a gmail — conflict recorded.")),
  },
  {
    id: "haidai",
    rank: "docent",
    visibility: "internal",
    role: { ua: "Доцент кафедри · секретар кафедри", en: "Associate Professor · Department Secretary" },
    person: claim(
      {
        name: { ua: "Гайдай Сніжана Вікторівна", en: "Snizhana V. Haidai" },
        degree: { ua: "кандидат хімічних наук, доцент", en: "Cand. Sc. (Chemistry), Associate Professor" },
      },
      v2(`${confirmNote} Also on legacy teachers page; co-author in the school's 2012 textbook entry.`),
    ),
    email: claim("gaidaisv77@ukr.net", v2()),
  },
  {
    id: "malysheva",
    rank: "docent",
    visibility: "internal",
    role: { ua: "Доцент кафедри", en: "Associate Professor" },
    person: claim(
      {
        name: { ua: "Малишева Марія Львівна", en: "Mariia L. Malysheva" },
        degree: { ua: "кандидат хімічних наук, доцент", en: "Cand. Sc. (Chemistry), Associate Professor" },
      },
      v2(`${confirmNote} Email differs across sources (univ.kiev.ua vs gmail).`),
    ),
    email: claim("malysheva.silica@gmail.com", v2()),
  },
  {
    id: "diyuk",
    rank: "docent",
    visibility: "internal",
    role: { ua: "Доцент кафедри", en: "Associate Professor" },
    person: claim(
      {
        name: { ua: "Діюк Віталій Євгенович", en: "Vitalii Ye. Diyuk" },
        degree: { ua: "кандидат хімічних наук, доцент", en: "Cand. Sc. (Chemistry), Associate Professor" },
      },
      v2(`${confirmNote} Legacy page lists vitalii_diyuk@knu.ua; v2 a gmail — knu.ua preferred.`),
    ),
    email: claim("vitalii_diyuk@knu.ua", v2("Institutional address from legacy page.")),
  },
  {
    id: "boldyrieva",
    rank: "docent",
    visibility: "internal",
    role: { ua: "Доцент кафедри", en: "Associate Professor" },
    person: claim(
      {
        name: { ua: "Болдирєва Ольга Юріївна", en: "Olha Yu. Boldyrieva" },
        degree: { ua: "кандидат хімічних наук, доцент", en: "Cand. Sc. (Chemistry), Associate Professor" },
      },
      v2(confirmNote),
    ),
    email: claim("2017chem@ukr.net", v2()),
  },
  {
    id: "yatsymyrskyi",
    rank: "docent",
    visibility: "internal",
    role: { ua: "Доцент кафедри", en: "Associate Professor" },
    person: claim(
      {
        name: { ua: "Яцимирський Андрій Віталійович", en: "Andrii V. Yatsymyrskyi" },
        degree: { ua: "кандидат хімічних наук, доцент", en: "Cand. Sc. (Chemistry), Associate Professor" },
      },
      v2(`${confirmNote} Legacy page lists andrii_yatsymyrskyi@knu.ua; v2 a gmail — knu.ua preferred.`),
    ),
    email: claim("andrii_yatsymyrskyi@knu.ua", v2("Institutional address from legacy page.")),
  },
  {
    id: "guralskyi",
    rank: "docent",
    visibility: "internal",
    role: { ua: "Доцент кафедри", en: "Associate Professor" },
    person: claim(
      {
        name: { ua: "Гуральський Ілля Олександрович", en: "Illia O. Guralskyi" },
        degree: { ua: "кандидат хімічних наук, доцент", en: "Cand. Sc. (Chemistry), Associate Professor" },
      },
      v2(`${confirmNote} Present in v2 only (NOT on the legacy teachers page) — newest roster addition; confirm.`),
    ),
    email: claim("illia.guralskyi@univ.kiev.ua", v2("Legacy univ.kiev.ua domain; confirm current address.")),
  },
];

// Honest stand-in for a withheld (unverified) person.
const namePending: Localised = {
  ua: "Ім’я уточнюється",
  en: "Name to be confirmed",
};
const personWithheld = placeholder(
  "Person sourced from the staff directories but unverified; name, degree and honours withheld from publication until independently confirmed.",
);

function resolve(member: StaffMember, lang: Locale): LocalisedStaffMember {
  const isVerified = member.person.provenance.state === "verified";
  if (!isVerified) {
    return {
      id: member.id,
      role: member.role[lang],
      name: namePending[lang],
      degree: null,
      honours: null,
      email: null,
      orcid: null,
      provenance: personWithheld,
      photo: member.photo,
    };
  }
  const person = member.person.value;
  return {
    id: member.id,
    role: member.role[lang],
    name: person.name[lang],
    degree: person.degree?.[lang] ?? null,
    honours: person.honours?.[lang] ?? null,
    email: member.email?.value ?? null,
    orcid: member.orcid?.value ?? null,
    provenance: member.person.provenance,
    photo: member.photo,
  };
}

/**
 * The CURATED public view: featured records only, each still passing through
 * the verified-or-withheld gate. Internal records have no render path — that
 * is the editorial governance, not an accident.
 */
export function getStaff(lang: Locale): LocalisedStaffMember[] {
  return staff.filter((m) => m.visibility === "featured").map((m) => resolve(m, lang));
}

/** The head-of-department entry, used by the dedicated section on /staff. */
export function getHead(lang: Locale): LocalisedStaffMember {
  const head = staff.find((m) => m.id === "head") ?? staff[0];
  return resolve(head, lang);
}
