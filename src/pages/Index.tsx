import React, { useState, useEffect } from 'react';
import PantryList from '@/components/PantryList';
import GroceryList from '@/components/GroceryList';
import MealSuggestion from '@/components/MealSuggestion';
import GroceryRun from '@/components/GroceryRun';
import { PantryItem, GroceryItem } from '@/types';
import { initialPantryItems, initialGroceryItems } from '@/data/initialData';
import { supabase } from '../utils/supabase-client';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();

  // const [pantryItems, setPantryItems] = useState<PantryItem[]>(initialPantryItems);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [lastGroceryRunDate, setLastGroceryRunDate] = useState<Date | null>(null);

  // Fetch pantry items from Supabase
  const fetchPantryItems = async () => {
    const {data, error} = await supabase.from("Pantry").select("*");
    if(error) {
      console.log("Error fetching pantry items:", error);
      return [];
    } else{
      // console.log("Fetched pantry items:", data);
      return data;
    }
  };

  // Fetch grocery items from Supabase
  const fetchGroceryItems = async () => {
    const {data, error} = await supabase.from("Grocery").select("*");
    if(error){
      console.log("Error fetching grocery items:", error);
      toast({
        title: "Error",
        description: "Error fetching grocery items from Supabase"
      });
      return [];
    } else{
      console.log("Fetched grocery items:", data);
      return data;
    }
  };
  
  // Load data from localStorage on component mount
  useEffect(() => {
    // const savedPantryItems = localStorage.getItem('pantryItems');
    const loadPantryItems = async () => {
      const savedPantryItems = await fetchPantryItems();
      // console.log("SavedPantryItems:", savedPantryItems);
      setPantryItems((savedPantryItems));
    }

    loadPantryItems();

    // const savedGroceryItems = localStorage.getItem('groceryItems');
    const loadGroceryItems = async () => {
      const savedGroceryItems = await fetchGroceryItems();
      setGroceryItems(savedGroceryItems);
    }

    loadGroceryItems();
    const savedLastGroceryRunDate = localStorage.getItem('lastGroceryRunDate');
    
    // if (savedPantryItems) {
    //   setPantryItems(JSON.parse(savedPantryItems));
    // }
    
    // if (savedGroceryItems) {
    //   setGroceryItems(JSON.parse(savedGroceryItems));
    // }
    
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
  
  // insert pantry items into Supabase
  const insertPantryItems = async (newPantryItems: PantryItem[]) => {
    const { error } = await supabase
      .from("Pantry")
      .insert(newPantryItems);
    if (error) {
      console.log("Error inserting pantry items:", error);
      toast({
        title: "Error",
        description: "Error inserting pantry items into Supabase"
      });
    }
  };

  // delete checked grocery items from Supabase
  const deleteGroceryItems = async (oldGroceryItems: GroceryItem[]) => {
    const { error } = await supabase
      .from("Grocery")
      .delete()
      .in("id", oldGroceryItems.map(item => item.id));
    if (error) {
      console.log("Error deleting grocery items:", error);
      toast({
        title: "Error",
        description: "Error deleting grocery items from Supabase"
      });
    }
  }

  const handleGroceryRun = async () => {
    // Reset pantry to default values
    // setPantryItems(initialPantryItems);

    // find the largest id in the pantry items
    let pantryItemCount = pantryItems.length !== 0 ? Math.max(...pantryItems.map(item => parseInt(item.id))): 0;
    
    // Clean up is_completed items from grocery list
    const updatedGroceryItems = groceryItems.filter(item => !item.is_completed);
    const purchasedGroceryItems = groceryItems.filter(item => item.is_completed);

    // converting the purchasedGroceryItems to the format of pantry items
    const newPantryItems: PantryItem[] = purchasedGroceryItems.map(item => ({
      id: (++pantryItemCount).toString(),
      item: item.item,
      created_at: new Date()
    }));

    console.log("After restocking updated pantry items:", newPantryItems);

    // insert the purchasedGroceryItems into Supabase
    await insertPantryItems(newPantryItems);

    // delete the newPantryItems from Supabase
    await deleteGroceryItems(purchasedGroceryItems);

    setGroceryItems(updatedGroceryItems);
    
    const latestGroceryItems = await fetchPantryItems();
    setPantryItems(latestGroceryItems);
    
    // Update last grocery run date
    setLastGroceryRunDate(new Date());
  };

  // Extract just the pantry item names for recipe matching
  const pantryItemNames = pantryItems.map(item => item.item);

  return (
    <div className="min-h-screen bg-very-light-gray">
      <div className="container max-w-6xl mx-auto py-8 px-1">
        <header className="mb-8">
          <h1 className="text-5xl font-georgia font-semibold text-center text-white">
          <span className="bg-gradient-to-r from-gray-400 via-blue-500 to-blue-800 text-transparent bg-clip-text animate-pulse">
            V
          </span>
            <img
              src="https://em-content.zobj.net/thumbs/240/apple/325/wine-glass_1f377.png"
              alt="🍷"
              className="inline w-8 h-8 mx-1"
            />
          <span className="bg-gradient-to-r from-gray-400 via-blue-500 to-blue-800` text-transparent bg-clip-text animate-pulse">
            BE
          </span> 
          <span className="mx-2"></span> {/* Adds space */}
          <span className="bg-gradient-to-r from-gray-800 via-blue-500 to-blue-800 text-transparent bg-clip-text animate-pulse">
            C
          </span>
            <img
              src="https://em-content.zobj.net/thumbs/240/apple/325/green-salad_1f957.png"
              alt="🥗"
              className="inline w-12 h-12"
            />
            <img
              src="https://em-content.zobj.net/thumbs/240/apple/325/shallow-pan-of-food_1f958.png"
              alt="🥘"
              className="inline w-12 h-12"
            />
              <span className="bg-gradient-to-r from-gray-400 via-blue-500 to-blue-800 text-transparent bg-clip-text animate-pulse">
                KING
              </span>
          </h1>
          <p className="text-xl mt-4">👋 Hey Master Chef!</p>
        </header>

        <div className="mt-6">
          <MealSuggestion pantryItems={pantryItemNames} />
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pass the fetched pantry items to the PantryList component */}
          <PantryList 
            items={pantryItems} 
            onUpdateItems={setPantryItems}
          />
          
          <GroceryList 
            items={groceryItems} 
            onUpdateItems={setGroceryItems} 
          />
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
