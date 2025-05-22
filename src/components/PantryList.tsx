
import React, { useState, useRef, useEffect } from 'react';
import { PantryItem } from '../types';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';
import { supabase } from '../utils/supabase-client';
import { useToast } from '@/components/ui/use-toast';

interface PantryListProps {
  items: PantryItem[];
  onUpdateItems: (items: PantryItem[]) => void;
}

const PantryList: React.FC<PantryListProps> = ({ items, onUpdateItems }) => {

  const { toast } = useToast();

  const handleDeleteItem = async (id: string) => {
    // delete pantry item from supabase
    const { error } = await supabase
                            .from("Pantry")
                            .delete()
                            .eq("id", id);
    if(error){
      console.log("Error deleting item from Supabase:", error);
      toast({
        description: "Error deleting item from Supabase"
      });
      return;
    }

    // remove item from local state
    const updatedItems = items.filter(item => item.id !== id);
    onUpdateItems(updatedItems);

    toast({
      description: "Item deleted from pantry list"
    });
  };

  

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl mb-4">🥫 In Your Kitchen...</h2>
      <Separator className="my-4" />
      
      {items.length === 0 ? (
        <p className="text-medium-gray text-center py-4">Your pantry is empty.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center py-2">
              <span>{item.item}</span>
              <button 
                onClick={() => handleDeleteItem(item.id)}
                className='text-medium-gray hover:text-dark-charcoal'
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PantryList;
