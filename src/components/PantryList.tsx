
import React from 'react';
import { PantryItem } from '../types';
import { Separator } from '@/components/ui/separator';

interface PantryListProps {
  items: PantryItem[];
}

const PantryList: React.FC<PantryListProps> = ({ items }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl mb-4">🥫 Pantry List (Home Stock)</h2>
      <Separator className="my-4" />
      
      {items.length === 0 ? (
        <p className="text-medium-gray text-center py-4">Your pantry is empty.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center py-2">
              <span>{item.item}</span>
              <span className="text-medium-gray">{item.qty}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PantryList;
