// The PantryItem should be defined based on the structure of the data in the Supabase database.
export interface PantryItem {
  id: string;
  item: string;
  qty: string;
}

export interface GroceryItem {
  id: string;
  created_at: Date;
  item: string;
  is_completed: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  steps: string;
  ingredients: string[];
  // instructions: string[];
}

export type MoodType = 
  | 'sweet'
  | 'anything'
  | 'spicy'
  | 'crunchy'
  | 'bland'
  | 'simple'
  | 'homely'
  ;

export const moods: MoodType[] = [
  'sweet',
  'anything',
  'spicy',
  'crunchy', 
  'bland',
  'simple',
  'homely'
];
