import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Recipe, MoodType, moods } from '../types';
import { sampleRecipes, sampleSweetRecipes } from '../data/initialData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, LoaderCircle, ChevronLeft, ChevronRight, Image as ImageIcon, Clock } from 'lucide-react';
import { toast } from "sonner";
import { MultiSelect } from 'primereact/multiselect';

interface MealSuggestionProps {
  pantryItems: string[];
}

const MealSuggestion: React.FC<MealSuggestionProps> = ({ pantryItems }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState<MoodType[]>(['anything']);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [recipeViewMode, setRecipeViewMode] = useState<'Text' | 'Video'>('Text');
  const [currentRecipeIdx, setCurrentRecipeIdx] = useState(0);

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
      const response = await fetch(import.meta.env.VITE_N8N_TEST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // mode: 'no-cors', 
        body: JSON.stringify({
          "kitchen_inventory": pantryItems,
          mood: mood,
          "special_instructions": specialInstructions,
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

  const handlePrevRecipe = () => {
    setCurrentRecipeIdx((prev) => (prev === 0 ? recipes.length - 1 : prev - 1));
  };

  const handleNextRecipe = () => {
    setCurrentRecipeIdx((prev) => (prev === recipes.length - 1 ? 0 : prev + 1));
  };

  // Reset index if recipes change
  React.useEffect(() => {
    setCurrentRecipeIdx(0);
  }, [recipes]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl mb-4">🍳 What's your food mood?</h2>
      <i className="text-medium text-medium-gray mb-4">
        Select up-to two food moods and let us suggest some recipes based on your pantry items.
      </i>
      <Separator className="my-4" />
      
      <div className="flex flex-col space-y-4">
        {/* Inputs Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-4 w-full">
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
              className="w-full border border-gray-300 rounded"
            />
          </div>
          <div className="w-full md:w-2/3">
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Optional: Add special instructions, preffered cuisine or dietary restrictions (50 characters max)"
              value={specialInstructions}
              onChange={ (e) => setSpecialInstructions(e.target.value) }
              maxLength={50}
            />
          </div>
        </div>
        {/* Button Row */}
        <div className="flex justify-center mb-4">
          <Button 
            className="md:w-1/3 bg-soft-blue hover:bg-blue-600 text-white py-6 text-lg rounded-full"
            onClick={handleSuggestMeals}
            disabled={loading || pantryItems.length === 0}
          >
            {loading ? (
              <>
                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" /> Thinking...
              </>
            ) : (
              <>
                <Utensils className="mr-2 h-5 w-5" /> Suggest What I Can Cook
              </>
            )}
          </Button>
        </div>
        
        {recipes.length > 0 && !loading && (
          <div className="flex justify-center mt-6">
            <div className="relative w-full max-w-5xl">
              {/* Left Arrow */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100"
                onClick={handlePrevRecipe}
                aria-label="Previous Recipe"
              >
                <ChevronLeft size={32} />
              </button>

              {/* Recipe Card */}
              <Card className="w-full max-w-4xl mx-auto shadow-2xl bg-white my-8">
                <CardHeader>
                  <CardTitle className="text-center text-2xl">{recipes[currentRecipeIdx].title}</CardTitle>
                  <br /> <br />
                  {/* Prep & Cook Time and Toggle Row */}
                  <div className="flex items-center justify-between mt-2 mb-4 w-full">
                    {/* Left: Centered Prep & Cook Time */}
                    <div className="flex-1 flex justify-center items-center">
                      <Clock className="mr-2 text-gray-500" size={20} />
                      <span className="text-gray-500 text-base">
                        {recipes[currentRecipeIdx].time}
                      </span>
                    </div>
                    {/* Right: Centered Toggle */}
                    <div className="flex-1 flex justify-center items-center">
                      <div className="flex items-center bg-gray-200 rounded-full p-1" style={{width: '14rem'}}>
                        <Button
                          className={`px-4 py-1 rounded-full ${
                            recipeViewMode === 'Text' ? 'bg-soft-blue text-white' : 'bg-soft-gray text-gray-700'
                          }`}
                          onClick={() => setRecipeViewMode('Text')}
                          style={{ width: '50%' }}
                        >
                          Text
                        </Button>
                        <Button
                          className={`px-4 py-1 rounded-full ${
                            recipeViewMode === 'Video' ? 'bg-soft-blue text-white' : 'bg-soft-gray text-gray-700'
                          }`}
                          onClick={() => setRecipeViewMode('Video')}
                          disabled={!recipes[currentRecipeIdx].youtube_url}
                          style={{ width: '50%' }}
                        >
                          Video
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {recipeViewMode === 'Text' ? (
                    <div>
                      {/* Steps & Image Side by Side */}
                      <div className="flex flex-col md:flex-row mb-4">
                        {/* Steps Section */}
                        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4">
                          <h4 className="font-semibold mb-1">Steps:</h4>
                          <ol className="list-none list-inside text-base space-y-1">
                            {typeof recipes[currentRecipeIdx].steps === 'string'
                              ? recipes[currentRecipeIdx].steps
                                  .split('\n')
                                  .map((step, idx) => <li key={idx}>{step.trim()}</li>)
                              : null}
                          </ol>
                        </div>
                        {/* Image Section */}
                        <div className="w-full md:w-1/2 flex justify-center items-center">
                          {recipes[currentRecipeIdx].url ? (
                            <img
                              src={recipes[currentRecipeIdx].url}
                              alt={recipes[currentRecipeIdx].title}
                              className="rounded-lg object-cover w-80 h-80 border shadow-2xl"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-64 h-40 bg-gray-100 rounded-lg border">
                              <ImageIcon size={48} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Ingredients & Calories */}
                      <div className="flex justify-between mt-4">
                        <div className='w-1/2 justify-center pl-4 pr-4'>
                          <h4 className="font-semibold mb-1">Ingredients:</h4>
                          <ul className="list-disc list-inside text-base">
                            {recipes[currentRecipeIdx].ingredients.map((ingredient, idx) => (
                              <li key={idx} className={pantryItems.includes(ingredient) ? "text-soft-green" : "text-soft-orange"}>
                                {ingredient} {pantryItems.includes(ingredient) && "✓"}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="w-1/2 flex flex-col justify-center pl-4">
                          <h4 className="font-semibold mb-1">Nutritional Information:</h4>
                          <ul className="list-disc list-inside text-base">
                            {recipes[currentRecipeIdx].nutrition.map((nutrient, idx) => (
                              <li key={idx} className="text-soft-blue">
                                {nutrient}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <h4 className="font-semibold mb-1">Watch A Similar Recipe Video:</h4>
                      {/* Video Section */}
                      {recipes[currentRecipeIdx].youtube_url ? (
                        <iframe
                          width="100%"
                          height="384"
                          src={`https://www.youtube.com/embed/${recipes[currentRecipeIdx].youtube_url.split('v=')[1]}`}
                          title={recipes[currentRecipeIdx].title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg w-full max-w-2xl shadow-2xl"
                        ></iframe> 
                      ) : (
                        <div className="text-gray-500">No video available for this recipe.</div>
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                          Note: This video is a similar recipe recommendation & it may not be exactly the same.
                        </p> 
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Right Arrow */}
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100"
                onClick={handleNextRecipe}
                aria-label="Next Recipe"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealSuggestion;
