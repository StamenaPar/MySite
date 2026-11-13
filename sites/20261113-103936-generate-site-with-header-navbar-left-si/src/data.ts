export type GroupId = 'fruit' | 'vegetables';

export type ItemId =
  | 'apple'
  | 'pear'
  | 'banana'
  | 'carrots'
  | 'onions'
  | 'garlic'
  | 'cabbage'
  | 'potatoes';

export interface Characteristic {
  label: string;
  value: string;
}

export interface Item {
  id: ItemId;
  name: string;
  group: GroupId;
  price: number;
  unit: string;
  tagline: string;
  description: string;
  characteristics: Characteristic[];
}

export interface Group {
  id: GroupId;
  name: string;
  itemIds: ItemId[];
}

export const groups: Group[] = [
  { id: 'fruit', name: 'Fruit', itemIds: ['apple', 'pear', 'banana'] },
  { id: 'vegetables', name: 'Vegetables', itemIds: ['carrots', 'onions', 'garlic', 'cabbage', 'potatoes'] },
];

export const items: Item[] = [
  {
    id: 'apple',
    name: 'Apple',
    group: 'fruit',
    price: 2.49,
    unit: 'per kg',
    tagline: 'Crisp, juicy and sweet with a gentle tartness.',
    description:
      'A classic all-rounder: great for snacking, baking into pies or slicing into salads. Keeps well in a cool place for weeks.',
    characteristics: [
      { label: 'Colour', value: 'Red with a yellow blush' },
      { label: 'Taste', value: 'Sweet, lightly tart' },
      { label: 'Texture', value: 'Crisp and juicy' },
      { label: 'Season', value: 'August - November' },
      { label: 'Energy', value: '52 kcal / 100 g' },
      { label: 'Storage', value: 'Cool and dark, up to 4 weeks' },
    ],
  },
  {
    id: 'pear',
    name: 'Pear',
    group: 'fruit',
    price: 3.19,
    unit: 'per kg',
    tagline: 'Soft, fragrant and honey-sweet when ripe.',
    description:
      'Pears ripen from the inside out, so check the neck for softness. Lovely fresh, poached, or paired with cheese.',
    characteristics: [
      { label: 'Colour', value: 'Yellow-green' },
      { label: 'Taste', value: 'Honey-sweet, floral' },
      { label: 'Texture', value: 'Buttery and soft' },
      { label: 'Season', value: 'September - January' },
      { label: 'Energy', value: '57 kcal / 100 g' },
      { label: 'Storage', value: 'Ripen at room temperature, then chill' },
    ],
  },
  {
    id: 'banana',
    name: 'Banana',
    group: 'fruit',
    price: 1.79,
    unit: 'per kg',
    tagline: 'Creamy, naturally sweet energy in its own wrapper.',
    description:
      'The perfect grab-and-go snack. Use spotty overripe ones for banana bread, pancakes or smoothies.',
    characteristics: [
      { label: 'Colour', value: 'Bright yellow' },
      { label: 'Taste', value: 'Sweet and mellow' },
      { label: 'Texture', value: 'Creamy' },
      { label: 'Season', value: 'All year round' },
      { label: 'Energy', value: '89 kcal / 100 g' },
      { label: 'Storage', value: 'Room temperature, away from other fruit' },
    ],
  },
  {
    id: 'carrots',
    name: 'Carrots',
    group: 'vegetables',
    price: 1.29,
    unit: 'per kg',
    tagline: 'Crunchy, earthy-sweet roots full of colour.',
    description:
      'Eat them raw, roast them until caramelised, or simmer them into soups and stews. A dependable kitchen staple.',
    characteristics: [
      { label: 'Colour', value: 'Deep orange' },
      { label: 'Taste', value: 'Earthy and sweet' },
      { label: 'Texture', value: 'Firm and crunchy' },
      { label: 'Season', value: 'June - November' },
      { label: 'Energy', value: '41 kcal / 100 g' },
      { label: 'Storage', value: 'Fridge drawer, up to 3 weeks' },
    ],
  },
  {
    id: 'onions',
    name: 'Onions',
    group: 'vegetables',
    price: 0.99,
    unit: 'per kg',
    tagline: 'The savoury base of almost every great dish.',
    description:
      'Sharp when raw and wonderfully sweet when slowly cooked. Fry, roast, pickle or caramelise them.',
    characteristics: [
      { label: 'Colour', value: 'Red-purple skin, white flesh' },
      { label: 'Taste', value: 'Pungent raw, sweet cooked' },
      { label: 'Texture', value: 'Crisp layers' },
      { label: 'Season', value: 'July - October' },
      { label: 'Energy', value: '40 kcal / 100 g' },
      { label: 'Storage', value: 'Dry, airy place, up to 2 months' },
    ],
  },
  {
    id: 'garlic',
    name: 'Garlic',
    group: 'vegetables',
    price: 0.69,
    unit: 'per bulb',
    tagline: 'Small cloves, big aromatic flavour.',
    description:
      'Crush it for punch, slice it for subtlety, or roast a whole bulb until soft and spreadable.',
    characteristics: [
      { label: 'Colour', value: 'Ivory white' },
      { label: 'Taste', value: 'Pungent, mellow when roasted' },
      { label: 'Texture', value: 'Firm cloves' },
      { label: 'Season', value: 'June - August' },
      { label: 'Energy', value: '149 kcal / 100 g' },
      { label: 'Storage', value: 'Dry and ventilated, up to 3 months' },
    ],
  },
  {
    id: 'cabbage',
    name: 'Cabbage',
    group: 'vegetables',
    price: 1.49,
    unit: 'per head',
    tagline: 'Tightly packed leaves with a fresh, peppery bite.',
    description:
      'Shred it for slaw, ferment it into sauerkraut, or braise it gently with butter. Great value and long lasting.',
    characteristics: [
      { label: 'Colour', value: 'Pale to mid green' },
      { label: 'Taste', value: 'Mild and slightly peppery' },
      { label: 'Texture', value: 'Crunchy leaves' },
      { label: 'Season', value: 'September - March' },
      { label: 'Energy', value: '25 kcal / 100 g' },
      { label: 'Storage', value: 'Fridge, up to 2 weeks' },
    ],
  },
  {
    id: 'potatoes',
    name: 'Potatoes',
    group: 'vegetables',
    price: 1.09,
    unit: 'per kg',
    tagline: 'Comforting, versatile and filling.',
    description:
      'Mash, roast, boil, bake or fry: potatoes do it all. Keep them in the dark to stop them turning green.',
    characteristics: [
      { label: 'Colour', value: 'Golden-brown skin, cream flesh' },
      { label: 'Taste', value: 'Mild and earthy' },
      { label: 'Texture', value: 'Fluffy when cooked' },
      { label: 'Season', value: 'July - October' },
      { label: 'Energy', value: '77 kcal / 100 g' },
      { label: 'Storage', value: 'Cool, dark and dry, up to 2 months' },
    ],
  },
];

export function getItem(id: string | undefined): Item | undefined {
  return items.find((item) => item.id === id);
}

export function getGroup(id: GroupId): Group | undefined {
  return groups.find((group) => group.id === id);
}

const priceFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}
