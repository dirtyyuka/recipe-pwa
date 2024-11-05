import Recipe from '../recipe';
import { useState, useEffect } from 'react';

type Recipe = {
  id: string;
  title: string;
  image: string;
  instructions: string;
};

type RecipeAPIProps = {
  query: string;
  selectedCuisine: string;
  excludedCuisine: string;
  selectedIntolerance: string;
  selectedDiet: string;
};

export default function RecipeAPI({
  query,
  selectedCuisine,
  excludedCuisine,
  selectedIntolerance,
  selectedDiet,
}: RecipeAPIProps) {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipe(
      query,
      selectedCuisine,
      excludedCuisine,
      selectedIntolerance,
      selectedDiet,
    );
  }, [
    query,
    selectedCuisine,
    excludedCuisine,
    selectedIntolerance,
    selectedDiet,
  ]);

  async function fetchRecipe(
    query: string,
    selectedCuisine: string,
    excludedCuisine: string,
    selectedIntolerance: string,
    selectedDiet: string,
  ) {
    console.log(process.env);
    try {
      const url = new URL(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&number=20`,
      );
      url.searchParams.set('query', query);
      url.searchParams.set('cuisine', selectedCuisine);
      url.searchParams.set('excludeCuisine', excludedCuisine);
      url.searchParams.set('intolerances', selectedIntolerance);
      url.searchParams.set('diet', selectedDiet);

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecipeList(data.results);
      console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 font-roboto">
      {recipeList.map((recipe: Recipe) => (
        <Recipe key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
