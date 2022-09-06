export type TcgCardData = {
  id: string;
  name: string;
  images: { small: string; large: string };
  number: string;
  types: string[];
  supertype: string;
  subtypes: string[];
  rarity: string;
  hp: string;
  abilities: { name: string; text: string; type: string }[];
  attacks: { name: string; text: string; damage: string; convertedEnergyCost: string }[];
  weaknesses: { type: string; value: string }[];
  resistances: { type: string; value: string }[];
  set: { name: string; series: string };
};
