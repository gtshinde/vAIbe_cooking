// The PantryItem should be defined based on the structure of the data in the Supabase database.
export interface PantryItem {
  id: string;
  item: string;
  qty: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  completed: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  steps: string;
  ingredients: string[];
  // instructions: string[];
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
