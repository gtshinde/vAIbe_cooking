
import React, { useState, useEffect } from 'react';
import PantryList from '@/components/PantryList';
import GroceryList from '@/components/GroceryList';
import MealSuggestion from '@/components/MealSuggestion';
import GroceryRun from '@/components/GroceryRun';
import { PantryItem, GroceryItem } from '@/types';
import { initialPantryItems, initialGroceryItems } from '@/data/initialData';

const Index = () => {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(initialPantryItems);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(initialGroceryItems);
  const [lastGroceryRunDate, setLastGroceryRunDate] = useState<Date | null>(null);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedPantryItems = localStorage.getItem('pantryItems');
    const savedGroceryItems = localStorage.getItem('groceryItems');
    const savedLastGroceryRunDate = localStorage.getItem('lastGroceryRunDate');
    
    if (savedPantryItems) {
      setPantryItems(JSON.parse(savedPantryItems));
    }
    
    if (savedGroceryItems) {
      setGroceryItems(JSON.parse(savedGroceryItems));
    }
    
    if (savedLastGroceryRunDate) {
      setLastGroceryRunDate(new Date(savedLastGroceryRunDate));
    }
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pantryItems', JSON.stringify(pantryItems));
    localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
    if (lastGroceryRunDate) {
      localStorage.setItem('lastGroceryRunDate', lastGroceryRunDate.toISOString());
    }
  }, [pantryItems, groceryItems, lastGroceryRunDate]);
  
  const handleGroceryRun = () => {
    // Reset pantry to default values
    setPantryItems(initialPantryItems);
    
    // Clean up completed items from grocery list
    const updatedGroceryItems = groceryItems.filter(item => !item.completed);
    setGroceryItems(updatedGroceryItems);
    
    // Update last grocery run date
    setLastGroceryRunDate(new Date());
  };

  // Extract just the pantry item names for recipe matching
  const pantryItemNames = pantryItems.map(item => item.name);

  return (
    <div className="min-h-screen bg-very-light-gray">
      <div className="container max-w-5xl mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-poppins font-semibold">🍽️ Meal Planner Dashboard</h1>
          <p className="text-xl mt-4">👋 Hi User</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PantryList items={pantryItems} />
          
          <GroceryList 
            items={groceryItems} 
            onUpdateItems={setGroceryItems} 
          />
        </div>
        
        <div className="mt-6">
          <MealSuggestion pantryItems={pantryItemNames} />
        </div>
        
        <div className="mt-6">
          <GroceryRun 
            onGroceryRun={handleGroceryRun} 
            lastGroceryRunDate={lastGroceryRunDate} 
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
