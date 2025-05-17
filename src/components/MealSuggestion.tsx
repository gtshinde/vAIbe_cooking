
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Recipe, MoodType, moods } from '../types';
import { sampleRecipes } from '../data/initialData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, LoaderCircle } from 'lucide-react';
import { toast } from "sonner";
import { MultiSelect } from 'primereact/multiselect';

interface MealSuggestionProps {
  pantryItems: string[];
}

const MealSuggestion: React.FC<MealSuggestionProps> = ({ pantryItems }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState<MoodType[]>(['anything']);
  const [recipeViewMode, setRecipeViewMode] = useState<'Text' | 'Video'>('Text');

  const handleMoodChange = (selectedMoods: MoodType[]) => {
    if(selectedMoods.length > 0){
      setMood(selectedMoods);
    } else{
      setMood(['anything']);
    }
    toast.success('Food mood updated!');
  };

  const handleSuggestMeals = async () => {
    setLoading(true);

    try {
      // Send mood and fetch recipes from n8n webhook
      const response = await fetch('https://reddit-grocery-apps.app.n8n.cloud/webhook-test/59f9d156-fa42-40a2-8fee-19d1b7d07d40', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // mode: 'no-cors', 
        body: JSON.stringify({
          "kitchen_inventory": pantryItems,
          mood: mood,
          timestamp: new Date().toISOString(),
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response:', response);

      if(!response.ok){
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      // console.log('Received recipes:', data);
      console.log(data.output.recipes);

      setRecipes(data.output.recipes);
      toast.success('Recipes retrieved successfully!');
    } catch (error) {
      console.log('Error retrieving recipes:', error);
      toast.error('Failed to retrieve recipes. Please try again.');
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl mb-4">🍳 What's your food mood?</h2>
      <i className="text-medium text-medium-gray mb-4">
        Select up-to two food moods and let us suggest some recipes based on your pantry items.
      </i>
      <Separator className="my-4" />
      
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
          <div className="w-full md:w-1/3">
            <MultiSelect 
              value={mood || []}
              options={moods}
              onChange={(e) => handleMoodChange(e.value || [])}
              placeholder="What's your food mood?"
              display='chip'
              selectionLimit={2}
              selectAll={false}
              showSelectAll={false}
              // selectAllLabel="Select up-to two moods"
              
             />
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
                    <br />
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center bg-gray-200 rounded-full p-1">
                        <button className={`px-4 py-1 rounded-full ${
                          recipeViewMode === 'Text' ? 'bg-soft-blue text-white' : 'text-gray-700'
                          }`}
                          onClick={() => setRecipeViewMode('Text')}
                        >
                          Text
                        </button>
                        <button className={`px-4 py-1 rounded-full ${
                          recipeViewMode === 'Video' ? 'bg-soft-blue text-white' : 'text-gray-700'
                          }`}
                          onClick={() => setRecipeViewMode('Video')}
                        >
                          Video
                        </button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {recipeViewMode === 'Text' ? (
                      <div>
                        <CardDescription>{recipe.steps}</CardDescription>
                        <br />
                        <strong>
                          <CardDescription>⏱️ Time: {recipe.time}</CardDescription>
                        </strong>
                        <br />
                        <div>
                          <h4 className="font-medium">Ingredients:</h4>
                          <ul className="list-disc list-inside text-sm">
                            {recipe.ingredients.map((ingredient, idx) => (
                              <li key={idx} className={pantryItems.includes(ingredient) ? "text-soft-green" : "text-soft-orange"}>
                                {ingredient} {pantryItems.includes(ingredient) && "✓"}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <iframe
                          width="100%"
                          height="200"
                          src={`https://www.youtube.com/embed/${recipe.youtube_url.split('v=')[1]}`}
                          title={recipe.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
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
