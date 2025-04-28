
import { PantryItem, GroceryItem } from '../types';

export const initialPantryItems: PantryItem[] = [
  { id: '1', name: 'Tomatoes', quantity: '5 pcs' },
  { id: '2', name: 'Milk', quantity: '1L' },
  { id: '3', name: 'Bread', quantity: '2 loaves' },
  { id: '4', name: 'Eggs', quantity: '2 dozen' },
  { id: '5', name: 'Cheese', quantity: '500g' },
  { id: '6', name: 'Chicken', quantity: '1 kg' },
  { id: '7', name: 'Pasta', quantity: '500g' },
  { id: '8', name: 'Onions', quantity: '3 pcs' },
];

export const initialGroceryItems: GroceryItem[] = [
  { id: '1', name: 'Rice', completed: false },
  { id: '2', name: 'Yogurt', completed: false },
  { id: '3', name: 'Butter', completed: false },
];

export const sampleRecipes = [
  {
    id: '1',
    title: 'Tomato & Egg Stir-fry',
    description: 'A quick and comforting dish with tomatoes and eggs.',
    ingredients: ['Tomatoes', 'Eggs', 'Salt', 'Pepper', 'Cooking oil'],
    instructions: [
      'Beat eggs in a bowl.',
      'Slice tomatoes into wedges.',
      'Heat oil in a pan, scramble eggs until 70% done, then remove.',
      'In the same pan, stir-fry tomatoes until soft.',
      'Add back eggs, season with salt and pepper, and cook for 1 more minute.'
    ]
  },
  {
    id: '2',
    title: 'Simple Pasta with Cheese',
    description: 'A basic pasta dish that\'s quick and satisfying.',
    ingredients: ['Pasta', 'Cheese', 'Milk', 'Butter', 'Salt', 'Pepper'],
    instructions: [
      'Cook pasta according to package directions.',
      'In a saucepan, melt butter and add milk.',
      'Add grated cheese and stir until melted.',
      'Season with salt and pepper.',
      'Pour sauce over drained pasta and mix well.'
    ]
  },
  {
    id: '3',
    title: 'Chicken Sandwich',
    description: 'A simple sandwich perfect for lunch or a light dinner.',
    ingredients: ['Bread', 'Chicken', 'Tomatoes', 'Cheese', 'Butter'],
    instructions: [
      'Butter the bread slices.',
      'Layer chicken, sliced tomatoes, and cheese.',
      'Top with another slice of bread.',
      'Grill or toast until bread is golden and cheese melts.'
    ]
  }
];
