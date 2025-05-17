import React, { useState, useRef, useEffect } from 'react';
import { GroceryItem } from '../types';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { X, Check, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '../utils/supabase-client';
import GroceryRun from '@/components/GroceryRun';

interface GroceryListProps {
  items: GroceryItem[];
  onUpdateItems: (items: GroceryItem[]) => void;
  onGroceryRun: () => Promise<number>;
  lastGroceryRunDate: Date | null;
}

const GroceryList: React.FC<GroceryListProps> = ({ items, onUpdateItems, onGroceryRun, lastGroceryRunDate }) => {
  const [newItemText, setNewItemText] = useState('');
  const [viewMode, setViewMode] = useState<'List' | 'Receipt'>('List');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

    // convert the newItemText to init caps
    const formattedItemText = newItemText
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Find the highest id in the current items
    const maxId = items.length > 0 ? Math.max(...items.map(item => parseInt(item.id))) : 0;

    const newItem: GroceryItem = {
      id: (maxId+1).toString(),
      created_at: new Date(),
      item: formattedItemText.trim(),
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitFile = async () => {
    if (!uploadedFile) {
      toast({description: "Please upload a file first." });
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const response = await fetch(import.meta.env.VITE_N8N_FILE_UPLOAD_TEST_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({ description: "File sent to n8n successfully!" });
        setUploadedFile(null);
      } else {
        toast({ description: "Failed to send file to n8n." });
      }
    } catch (error) {
      toast({ description: "Error sending file to n8n." });
      console.error(error);
    }
  };

  // Keep focus on input after adding item
  useEffect(() => {
    if (newItemText === '' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [newItemText]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-center items-center space-x-4 mb-4">
        <div className="flex items-center bg-gray-200 rounded-full p-1">
          <button
            className={`px-4 py-1 rounded-full ${
              viewMode === 'List' ? 'bg-soft-blue text-white' : 'text-gray-700'
            }`}
            onClick={() => setViewMode('List')}
          >
            📝 Grocery Shopping List
          </button>
          <button
            className={`px-4 py-1 rounded-full ${
              viewMode === 'Receipt' ? 'bg-soft-blue text-white' : 'text-gray-700'
            }`}
            style={{ width: '16rem' }}
            onClick={() => setViewMode('Receipt')}
          >
            🔗 Upload Receipt
          </button>
        </div>
      </div>
      <Separator className="my-4" />

      {viewMode === 'List' ? (
        <>
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
          <div className="mt-6">
              <GroceryRun 
                onGroceryRun={onGroceryRun} 
                lastGroceryRunDate={lastGroceryRunDate} 
              />
            </div>
        </>
      ) : (
        <div className="text-center text-medium-gray py-12">
          <span>Already purchased items from Walmart? <br /> </span>
          <span> <br /> 
            <div className="flex flex-col items-center">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf,.txt,.csv" // adjust as needed
            />
            <Button
              className="bg-soft-blue hover:bg-blue-500 text-white w-full py-6 mb-3 width:auto"
              onClick={handleUploadClick}
              type="button"
              style={{ width: 'auto' }}
            >
              Upload Receipt <Link2 className="ml-2" />
            </Button>
            {uploadedFile && (
              <div className="mt-2 text-sm text-soft-green">
                <strong> Selected: {uploadedFile.name} ✓ </strong>
              </div>
            )}
            <Button
              className="bg-soft-green hover:bg-green-500 text-white w-full py-6 mt-3"
              onClick={handleSubmitFile}
              type="button"
              style={{ width: 'auto' }}
            >
              Submit! &nbsp;&nbsp;✅
            </Button>
            </div>
          </span>
        </div>
      )}
    </div>
  );
};

export default GroceryList;
