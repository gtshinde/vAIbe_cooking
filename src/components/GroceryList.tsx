import React, { useState, useRef, useEffect } from 'react';
import { GroceryItem } from '../types';
import { Separator } from '@/components/ui/separator';
import { X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface GroceryListProps {
  items: GroceryItem[];
  onUpdateItems: (items: GroceryItem[]) => void;
}

const GroceryList: React.FC<GroceryListProps> = ({ items, onUpdateItems }) => {
  const [newItemText, setNewItemText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleToggleComplete = (id: string) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    onUpdateItems(updatedItems);
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    onUpdateItems(updatedItems);
    toast({
      description: "Item removed from grocery list",
    });
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim() === '') return;
    
    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: newItemText.trim(),
      completed: false
    };
    
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
                item.completed ? "bg-soft-blue border-soft-blue" : "border-gray-300"
              )}
            >
              {item.completed && <Check size={14} className="text-white" />}
            </button>
            
            <span className={cn(
              "flex-grow",
              item.completed && "line-through text-medium-gray"
            )}>
              {item.name}
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
