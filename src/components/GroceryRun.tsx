
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CalendarCheck } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

interface GroceryRunProps {
  onGroceryRun: () => Promise<number>;
  lastGroceryRunDate: Date | null;
}

const GroceryRun: React.FC<GroceryRunProps> = ({ onGroceryRun, lastGroceryRunDate }) => {
  const { toast } = useToast();

  const handleGroceryRun = async () => {
    const returnedResult = await onGroceryRun();
    
    if (returnedResult === 1) {
      toast({
        variant: "success", // This makes the toast green (success)
        title: "Success",
        description: "Pantry updated successfully!"
      });
    } else {
      toast({
        variant: "destructive", // This makes the toast red
        title: "Error",
        description: "No items in the grocery list to restock"
      });
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex flex-col items-center">
        <Button 
          className="bg-soft-green hover:bg-green-500 text-white w-full py-6 mb-3"
          onClick={handleGroceryRun}
          style={{ width: 'auto' }}
        >
          Grocery Restocked ✅
        </Button>
        
        {lastGroceryRunDate && (
          <p className="text-sm text-medium-gray mt-2">
            Last Grocery Run: {format(lastGroceryRunDate, 'MMM d, yyyy')}
          </p>
        )}
      </div>
    </div>
  );
};

export default GroceryRun;
