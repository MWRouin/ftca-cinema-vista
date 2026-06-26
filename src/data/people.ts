import rawPeople from "./people.json";

/** Per-locale text. `ar` to be added with the Next.js rebuild. */
export type LocalizedText = { en?: string; fr?: string };

export type MembershipStatus = "active" | "honorary";

export type ClubMembership = {
    status: MembershipStatus;
    role?: string; // 'President' | 'Treasurer' | 'Member' | 'Honorary Member' | ...
    order?: number; // display order within a status group
};

export type Person = {
    id: string; // slug, matches slugify(name)
    name: string; // canonical display name
    image?: string;
    bio?: LocalizedText;
    membership?: ClubMembership; // present iff the person is a club member
    /** Alternate spellings found in source data; used by resolvePersonId. */
    aliases?: string[];
    /** Whether the person has a public /people/:id page (Phase 2). */
    public?: boolean;
};

// Lazily-evaluated base path. Optional chaining keeps this safe in Node (tsx)
// where Vite's `import.meta.env` is undefined — the people registry is imported
// by build scripts as well as the app.
const BASE = (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL || "/";

function resolveAssetUrl(url: string | undefined): string | undefined {
    if (!url) return url;
    if (!url.startsWith("__BASE_URL__/")) return url;
    return url.replace("__BASE_URL__/", BASE);
}

function personFromJson(raw: Person): Person {
    return { ...raw, image: resolveAssetUrl(raw.image) };
}

const people: Person[] = (rawPeople as Person[]).map(personFromJson);

const byId = new Map<string, Person>(people.map((p) => [p.id, p]));

/** Normalize a name for fuzzy matching: lowercase, strip accents, collapse spaces. */
function normalizeName(name: string): string {
    return name
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
}

// name (and every alias) → person id
const byNormalizedName = new Map<string, string>();
for (const p of people) {
    byNormalizedName.set(normalizeName(p.name), p.id);
    for (const alias of p.aliases ?? []) {
        byNormalizedName.set(normalizeName(alias), p.id);
    }
}

export const getPeople = (): Person[] => people;

export const getPersonById = (id: string | undefined): Person | undefined =>
    id ? byId.get(id) : undefined;

/** Resolve a raw name (possibly a known variant spelling) to a Person id, if curated. */
export function resolvePersonId(name: string): string | undefined {
    return byNormalizedName.get(normalizeName(name));
}

const byOrder = (a: Person, b: Person) =>
    (a.membership?.order ?? 999) - (b.membership?.order ?? 999) ||
    a.name.localeCompare(b.name);

export const getMembers = (): Person[] =>
    people.filter((p) => p.membership?.status === "active").sort(byOrder);

export const getHonoraryMembers = (): Person[] =>
    people.filter((p) => p.membership?.status === "honorary").sort(byOrder);
