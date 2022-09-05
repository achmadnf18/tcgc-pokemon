type FilterParam =
  | { q?: string }
  | { name: string }
  | { set: string }
  | { types: string }
  | { subtypes: string }
  | { supertype: string }
  | { rarity: string };

export const getFilterParam = () => {
  const queryString = new URLSearchParams(window.location.search);

  const q = queryString.get('q');
  const name = queryString.get('name');
  const set = queryString.get('set');
  const types = queryString.get('types');
  const subtypes = queryString.get('subtypes');
  const supertype = queryString.get('supertype');
  const rarity = queryString.get('rarity');

  return { q, name, set, types, subtypes, supertype, rarity };
};

export const getNewRoute = (param: FilterParam) => {
  const filterParam = getFilterParam();
  const merged = { ...filterParam, ...param };

  const temp = Object.entries(merged)
    .filter(([, value]) => value !== null && value !== '')
    .map((obj) => obj);

  const qs = temp.map(([key, value]) => `${key}=${value}`).join('&');
  return `${window.location.pathname}?${qs}`;
};
