import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Recipe, MoodType, moods } from '../types';
import { sampleRecipes, sampleSweetRecipes, recentRecipes } from '../data/initialData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, LoaderCircle, ChevronLeft, ChevronRight, Image as ImageIcon, Clock } from 'lucide-react';
// import { toast } from "sonner";
import { useToast } from '@/components/ui/use-toast';
import { MultiSelect } from 'primereact/multiselect';
import '../App.css';

interface MealSuggestionProps {
  pantryItems: string[];
}

const MealSuggestion: React.FC<MealSuggestionProps> = ({ pantryItems }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(recentRecipes);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState<MoodType[]>(['🍽️ anything']);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [recipeViewMode, setRecipeViewMode] = useState<'Text' | 'Video'>('Text');
  const [currentRecipeIdx, setCurrentRecipeIdx] = useState(0);

  const { toast } = useToast();

  const handleMoodChange = (selectedMoods: MoodType[]) => {
    if(selectedMoods.length > 0){
      setMood(selectedMoods);
    } else{
      setMood(['🍽️ anything']);
    }
    toast({ 
      variant: "success",
      title: "Success",
      description: "Food mood updated!"
    });
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
          mood: mood.slice(2), // Removes the emoji and the space before the mood
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
      toast({ 
        variant: "success",
        title: "Success",
        description: "Recipes retrieved successfully!"
      });
    } catch (error) {
      console.log('Error retrieving recipes:', error);
      toast({ 
        variant: "destructive",
        title: "Error",
        description: "Failed to retrieve recipes. Please try again."
      });
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
      <h2 className="text-xl mb-4">🍳 Hey Foodie! What do you feel like eating today?</h2>
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
              placeholder="(Optional) Add special instructions: Gluten-free? Extra spicy? Tell me here! (80 characters max)"
              value={specialInstructions}
              onChange={ (e) => setSpecialInstructions(e.target.value) }
              maxLength={80}
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
                <Utensils className="mr-2 h-5 w-5" /> Suggest What I Can Cook <span style={{ fontSize: '1.5em', fontWeight: 'bold' }}>✨</span>
              </>
            )}
          </Button>
        </div>

        {/* Loading Animation */}
        {loading && (
          <LoadingGif />
        )}

        {/* Recipes Display */}
        {recipes.length > 0 && !loading && (
          <>
            {/* Carousel with partial previews */}
            <div className="flex justify-center mt-6">
              <div className="relative w-full max-w-8xl overflow-x-visible">
                {/* Left Arrow */}
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100"
                  onClick={handlePrevRecipe}
                  aria-label="Previous Recipe"
                >
                  <ChevronLeft size={32} />
                </button>

                {/* Carousel Cards */}
                <div className="flex items-center justify-center transition-all duration-300">
                  {/* Previous Card Preview */}
                  <div className="hidden sm:block w-1/6 opacity-60 scale-95 pointer-events-none -mr-4">
                    <Card className="shadow bg-gray-100">
                      <CardHeader>
                        <CardTitle className="truncate text-base">
                          {recipes[(currentRecipeIdx - 1 + recipes.length) % recipes.length].title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-center items-center h-20">
                          {recipes[(currentRecipeIdx - 1 + recipes.length) % recipes.length].url ? (
                            <img
                              src={recipes[(currentRecipeIdx - 1 + recipes.length) % recipes.length].url}
                              alt="Preview"
                              className="rounded-lg object-cover w-16 h-16"
                            />
                          ) : (
                            <ImageIcon size={32} className="text-gray-400" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Main Card */}
                  <div className="w-full sm:w-4/6 z-10">
                    <Card className="w-full max-w-6xl mx-auto shadow-2xl bg-white my-8">
                      <CardHeader>
                        <div className="flex items-center justify-between w-full">
                          <CardTitle className="text-center text-2xl flex-1">{recipes[currentRecipeIdx].title}</CardTitle>
                          <span className="relative ml-4 min-w-[3rem] flex justify-end">
                            <span className="bg-soft-blue text-white font-semibold text-lg px-3 py-1 rounded-tr-lg rounded-br-lg rounded-bl-[1.5rem] shadow bookmark-shape">
                              {recipes.length > 0 ? `${currentRecipeIdx + 1}/${recipes.length}` : ''}
                            </span>
                          </span>
                        </div>
                        <br /> <br />
                        {/* Prep & Cook Time and Toggle Row */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-2 mb-4 w-full">
                          {/* Prep & Cook Time */}
                          <div className="flex items-center justify-center">
                            <Clock className="mr-2 text-gray-500" size={20} />
                            <span className="text-gray-500 text-base text-center">
                              {recipes[currentRecipeIdx].time}
                            </span>
                          </div>
                          {/* Toggle */}
                          <div className="flex items-center justify-center">
                            <div className="flex items-center bg-gray-200 rounded-full p-1 w-48 md:w-56">
                              <button
                                className={`px-4 py-1 rounded-full ${
                                  recipeViewMode === 'Text' ? 'bg-soft-blue text-white' : 'bg-soft-gray text-gray-700'
                                }`}
                                onClick={() => setRecipeViewMode('Text')}
                                style={{ width: '50%' }}
                              >
                                Read It
                              </button>
                              <button
                                className={`px-4 py-1 rounded-full ${
                                  recipeViewMode === 'Video' ? 'bg-soft-blue text-white' : 'bg-soft-gray text-gray-700'
                                }`}
                                onClick={() => setRecipeViewMode('Video')}
                                disabled={!recipes[currentRecipeIdx].youtube_url}
                                style={{ width: '50%' }}
                              >
                                Watch It
                              </button>
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
                                <h4 className="font-semibold mb-1 text-left">Steps:</h4>
                                <ol className="list-decimal list-inside space-y-1 text-left">
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
                              {/* Ingredients */}
                              <div className="w-1/4 justify-center pl-4 pr-4">
                                <h4 className="font-semibold mb-1 text-left">You'll Need These:</h4>
                                <ul className="list-disc list-inside text-base text-left">
                                  {recipes[currentRecipeIdx].ingredients.map((ingredient, idx) => (
                                    <li key={idx} className={pantryItems.includes(ingredient) ? "text-soft-green" : "text-soft-orange"}>
                                      {ingredient} {pantryItems.includes(ingredient) && "✓"}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {/* Nutritional Information */}
                              <div className="w-1/4 flex flex-col pl-4">
                                <h4 className="font-semibold mb-1 text-left">Health Check 💪</h4>
                                {recipes[currentRecipeIdx].nutrition.length > 0 && (
                                  <div className="mb-1">
                                    <div className="text-base text-soft-blue text-left">
                                      {recipes[currentRecipeIdx].nutrition[0]}
                                    </div>
                                    {recipes[currentRecipeIdx].nutrition[1] && (
                                      <div className="text-base text-soft-blue text-left">
                                        {recipes[currentRecipeIdx].nutrition[1]}
                                      </div>
                                    )}
                                  </div>
                                )}
                                <ul className="list-disc list-inside text-base mt-1 text-left">
                                  {recipes[currentRecipeIdx].nutrition.slice(2).map((nutrient, idx) => (
                                    <li key={idx} className="text-soft-blue">
                                      {nutrient}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {/* Image */}
                              <div className="w-1/4 flex justify-center items-center pl-4 pr-4 ml-8">
                                <img
                                  src= { 
                                      currentRecipeIdx === 0 ? 
                                        "/chef_image.png" 
                                        : currentRecipeIdx === 1 ? 
                                        "/chef_image_2.png"
                                        : "chef_image_3.png"
                                  }
                                  alt="AI Chef"
                                  className={ currentRecipeIdx ===1 ? "w-45 h-40" : "w-45 h-45"}
                                />
                              </div>
                              {/* Fun Fact */}
                              <div className="w-1/4 flex flex-col justify-center">
                                <h4 className="font-semibold mb-1 text-center">Did You Know?</h4>
                                <div className="thought-bubble relative bg-soft-skyblue text-gray-800 rounded-3xl px-4 py-3 shadow-md border">
                                  <p className="text-base text-white">
                                    {recipes[currentRecipeIdx].fun_fact}
                                  </p>
                                  <span className="thought-tail absolute -left-4 top-8 w-6 h-6 bg-soft-skyblue rounded-full border"></span>
                                  <span className="thought-tail absolute -left-7 top-8 w-4 h-4 bg-soft-skyblue rounded-full border"></span>
                                  <span className="thought-tail absolute -left-9 top-8 w-3 h-3 bg-soft-skyblue rounded-full border"></span>
                                </div>
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
                  </div>

                  {/* Next Card Preview */}
                  <div className="hidden sm:block w-1/6 opacity-60 scale-95 pointer-events-none -ml-4">
                    <Card className="shadow bg-gray-100">
                      <CardHeader>
                        <CardTitle className="truncate text-base">
                          {recipes[(currentRecipeIdx + 1) % recipes.length].title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-center items-center h-20">
                          {recipes[(currentRecipeIdx + 1) % recipes.length].url ? (
                            <img
                              src={recipes[(currentRecipeIdx + 1) % recipes.length].url}
                              alt="Preview"
                              className="rounded-lg object-cover w-16 h-16"
                            />
                          ) : (
                            <ImageIcon size={32} className="text-gray-400" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

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
          </>
        )}
      </div>
    </div>
  );
};

// Fun Loading Animation (from GIF)
const LoadingGif = () => (
  <div className="flex flex-col items-center justify-center py-8">
    <img
      // src="/dancing_loading.gif"
      src="/Veggies_GIF.gif"
      alt="Loading animation"
      // className="w-128 h-128"
      className="w-96 h-96"
      style={{ objectFit: 'contain' }}
    />
    <span className="text-xl font-semibold">Cooking up your recipes...</span>
  </div>
);


export default MealSuggestion;
