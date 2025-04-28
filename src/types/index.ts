
export interface PantryItem {
  id: string;
  name: string;
  quantity: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  completed: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

export type MoodType = 
  | 'bored'
  | 'anything is fine'
  | 'spicy'
  | 'crunchy'
  | 'bland'
  | 'simple'
  | 'homely'
  | 'comforting';

export const moods: MoodType[] = [
  'bored',
  'anything is fine',
  'spicy',
  'crunchy', 
  'bland',
  'simple',
  'homely',
  'comforting'
];
