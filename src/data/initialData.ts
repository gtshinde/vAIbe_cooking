
import { PantryItem, GroceryItem, Recipe } from '../types';

export const initialPantryItems: PantryItem[] = [
  { id: '1', item: 'Tomatoes' , created_at: new Date() },
  { id: '2', item: 'Milk', created_at: new Date() },
  { id: '3', item: 'Bread' , created_at: new Date() },
  { id: '4', item: 'Eggs' , created_at: new Date() },
  { id: '5', item: 'Cheese', created_at: new Date() },
  { id: '6', item: 'Chicken' , created_at: new Date() },
  { id: '7', item: 'Pasta', created_at: new Date() },
  { id: '8', item: 'Onions' , created_at: new Date() },
];

export const initialGroceryItems: GroceryItem[] = [
  { id: '1', item: 'Rice', is_completed: false, created_at: new Date() },
  { id: '2', item: 'Yogurt', is_completed: false, created_at: new Date() },
  { id: '3', item: 'Butter', is_completed: false, created_at: new Date() },
];

export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    youtube_url: "https://www.youtube.com/watch?v=yzJp59jx4UY",
    title: "Crunchy Potato and Cornflake Cutlets",
    time: "25 minutes",
    steps: "1. Boil and mash the potatoes.\n2. Mix in finely chopped onions, boiled green peas, and corn.\n3. Add crushed chili peppers and salt to taste.\n4. Shape the mixture into cutlets.\n5. Crush the cornflakes and coat the cutlets with them.\n6. Shallow fry or bake until golden brown and crunchy.",
    ingredients: [
      "Potatoes",
      "Cereals - Cornflakes",
      "Onions",
      "Green Peas",
      "Corn",
      "Crushed Chili Peppers",
      "Salt"
    ],
    query: "crunchy potato cornflake cutlets"
  },
  {
    id: "2",
    youtube_url: "https://www.youtube.com/watch?v=0MShTeCsuQM",
    title: "Masala Poha with Peanuts and Potato Chips",
    time: "15 minutes",
    steps: "1. Rinse the poha and set aside.\n2. Sauté mustard seeds and chopped onions.\n3. Add peanuts and sauté for a minute.\n4. Mix in the poha, crushed potato chips, crushed chili peppers, and salt.\n5. Cook for a few minutes until heated through.",
    ingredients: [
      "Poha",
      "Onions",
      "Mustard Seeds",
      "Peanuts",
      "Potato Chips",
      "Crushed Chili Peppers",
      "Salt"
    ],
    query: "with peanuts potato chips"
  },
  {
    id: "3",
    youtube_url: "https://www.youtube.com/watch?v=ZmxQmldGLOw",
    title: "Cornflake Crusted Egg Omelette",
    time: "10 minutes",
    steps: "1. Whisk the eggs with chopped onions, bell peppers, crushed chili peppers, and salt.\n2. Crush the cornflakes\n3. Pour egg mixture into a pan. Sprinkle crushed cornflakes and place a cheese slice on top while cooking.\n4. Cook until the omelette is set and the cheese is melted.",
    ingredients: [
      "Eggs",
      "Cereals - Cornflakes",
      "Onions",
      "Bell Peppers",
      "Cheese Slices",
      "Crushed Chili Peppers",
      "Salt"
    ],
    query: "cornflake crusted egg omelette"
  }
];
