// The PantryItem should be defined based on the structure of the data in the Supabase database.
export interface PantryItem {
  id: string;
  item: string;
  created_at: Date;
}

export interface GroceryItem {
  id: string;
  created_at: Date;
  item: string;
  is_completed: boolean;
}

export interface Recipe {
  id: string;
  youtube_url: string;
  title: string;
  steps: string;
  time: string;
  ingredients: string[];
  query: string;
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
