import React, { useState, useRef, useEffect } from 'react';
import { GroceryItem } from '../types';
import { Separator } from '@/components/ui/separator';
import { X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '../utils/supabase-client';


interface GroceryListProps {
  items: GroceryItem[];
  onUpdateItems: (items: GroceryItem[]) => void;
}

const GroceryList: React.FC<GroceryListProps> = ({ items, onUpdateItems }) => {
  const [newItemText, setNewItemText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleToggleComplete = async (id: string) => {
    // get the item which needs to be updated
    const itemToUpdate = items.find(item => item.id === id);
    if (!itemToUpdate) return;

    //update supabase
    const { error } = await supabase
      .from("Grocery")
      .update({ is_completed: !itemToUpdate.is_completed}) // basically toggle the is_completed value
      .eq("id", id);

      if (error) {
        console.log("Error updating item in Supabase:", error);
        toast({
          description: "Error updating item in Supabase",
        });
        return;
      }

    const updatedItems = items.map(item => 
      item.id === id ? { ...item, is_completed: !item.is_completed } : item
    );
    onUpdateItems(updatedItems);

    toast({
      description: "Item status updated in grocery list"
    })
  };

  const handleDeleteItem = async (id: string) => {
    const {error} = await supabase
                            .from("Grocery")
                            .delete()
                            .eq("id", id);

    if(error){
      console.log("Error deleting item from Supabase:", error);
      toast({
        description: "Error deleting item from Supabase"
      });
      return;
    }

    const updatedItems = items.filter(item => item.id !== id);
    onUpdateItems(updatedItems);

    toast({
      description: "Item removed from grocery list"
    });
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    // Check if the input is empty
    if (newItemText.trim() === '') return;

    // Find the highest id in the current items
    const maxId = items.length > 0 ? Math.max(...items.map(item => parseInt(item.id))) : 0;

    const newItem: GroceryItem = {
      id: (maxId+1).toString(),
      created_at: new Date(),
      item: newItemText.trim(),
      is_completed: false
    };
    
    // insert new item into supabase
    const {data, error} = await supabase
                                  .from("Grocery")
                                  .insert([newItem]);

    if(error) {
      console.log("Error inserting new item:", error);
      toast({
        description: "Error adding item to Supabase",
      });
      return;
    }

    onUpdateItems([...items, newItem]);
    setNewItemText('');
    
    toast({
      description: "Item added to grocery list",
    });
  };

  // Keep focus on input after adding item
  useEffect(() => {
    if (newItemText === '' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [newItemText]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl mb-4">📝 Grocery Shopping List</h2>
      <Separator className="my-4" />
      
      <ul className="space-y-2 mb-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-2 py-2">
            <button 
              onClick={() => handleToggleComplete(item.id)} 
              className={cn(
                "w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center",
                item.is_completed ? "bg-soft-blue border-soft-blue" : "border-gray-300"
              )}
            >
              {item.is_completed && <Check size={14} className="text-white" />}
            </button>
            
            <span className={cn(
              "flex-grow",
              item.is_completed && "line-through text-medium-gray"
            )}>
              {item.item}
            </span>
            
            <button 
              onClick={() => handleDeleteItem(item.id)}
              className="text-medium-gray hover:text-dark-charcoal"
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>
      
      <form onSubmit={handleAddItem} className="flex items-center border-t pt-4">
        <span className="text-medium-gray mr-2">➕</span>
        <input
          ref={inputRef}
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add new item here (enter to add)"
          className="flex-grow bg-transparent outline-none"
        />
      </form>
    </div>
  );
};

export default GroceryList;
