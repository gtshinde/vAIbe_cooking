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
  nutrition: string[];
  fun_fact: string;
  url: string;
}

export type MoodType = 
  | '🍽️ anything'
  | '🤒 bland'
  | '🤤 crunchy'
  | '🧘 healthy'
  | '😇 homely'
  | '🤪 go crazy'
  | '🥗 light'
  | '🥱 lazy'
  | '🍾 party'
  | '🍩 sweet'
  | '🌶️ spicy'
  | '🥫 simple'
  | '🤩 surprise me!'
  ;

export const moods: MoodType[] = [
  '🍽️ anything',
  '🤒 bland',
  '🤤 crunchy',
  '🧘 healthy',
  '😇 homely',
  '🤪 go crazy',
  '🥗 light',
  '🥱 lazy',
  '🍾 party',
  '🍩 sweet',
  '🌶️ spicy',
  '🥫 simple',
  '🤩 surprise me!'
];
