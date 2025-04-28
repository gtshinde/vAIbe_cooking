
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Recipe, MoodType, moods } from '../types';
import { sampleRecipes } from '../data/initialData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, LoaderCircle } from 'lucide-react';

interface MealSuggestionProps {
  pantryItems: string[]; // We'll just pass the names for simplicity
}

const MealSuggestion: React.FC<MealSuggestionProps> = ({ pantryItems }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState<MoodType>('anything is fine');

  const handleSuggestMeals = () => {
    setLoading(true);
    
    // Simulate API call to OpenAI
    setTimeout(() => {
      // For demo purposes, we'll just return the sample recipes
      setRecipes(sampleRecipes);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl mb-4">🍳 Today's Meal</h2>
      <Separator className="my-4" />
      
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
          <div className="w-full md:w-1/3">
            <Select value={mood} onValueChange={(value) => setMood(value as MoodType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your food mood" />
              </SelectTrigger>
              <SelectContent>
                {moods.map(mood => (
                  <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            className="w-full md:w-2/3 bg-soft-blue hover:bg-blue-600 text-white py-6 text-lg"
            onClick={handleSuggestMeals}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" /> Thinking...
              </>
            ) : (
              <>
                <Utensils className="mr-2 h-5 w-5" /> Suggest what I can make
              </>
            )}
          </Button>
        </div>
        
        {recipes.length > 0 && !loading && (
          <div className="space-y-4 mt-4">
            <h3 className="text-lg font-medium">Recipe Suggestions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recipes.map((recipe) => (
                <Card key={recipe.id} className="h-full">
                  <CardHeader>
                    <CardTitle>{recipe.title}</CardTitle>
                    <CardDescription>{recipe.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <h4 className="font-medium">Ingredients:</h4>
                      <ul className="list-disc list-inside text-sm">
                        {recipe.ingredients.map((ingredient, idx) => (
                          <li key={idx} className={pantryItems.includes(ingredient) ? "text-soft-green" : ""}>
                            {ingredient} {pantryItems.includes(ingredient) && "✓"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealSuggestion;
