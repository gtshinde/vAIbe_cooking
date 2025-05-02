
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CalendarCheck } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

interface GroceryRunProps {
  onGroceryRun: () => void;
  lastGroceryRunDate: Date | null;
}

const GroceryRun: React.FC<GroceryRunProps> = ({ onGroceryRun, lastGroceryRunDate }) => {
  const { toast } = useToast();

  const handleGroceryRun = () => {
    onGroceryRun();
    
    toast({
      title: "Success",
      description: "Pantry updated successfully!"
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl mb-4">🛒 Grocery Run</h2>
      <Separator className="my-4" />
      
      <div className="flex flex-col items-center">
        <Button 
          className="bg-soft-green hover:bg-green-500 text-white w-full py-6 mb-3"
          onClick={handleGroceryRun}
        >
          <CalendarCheck className="mr-2 h-5 w-5" /> Yes, I restocked today! ✅
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
