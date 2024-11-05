'use client';

import Recipe from '@/components/recipe';
import { useEffect, useState } from 'react';

type Recipe = {
  id: string;
  title: string;
  image: string;
  instructions: string;
};

export default function Saved() {
  // set recipes of the user
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('/api/saved/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const { recipeIds } = await response.json();

      const fetchPromises = recipeIds.map(async (id: number) => {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }

        return await response.json();
      });

      const allRecipes = await Promise.all(fetchPromises);
      setRecipes(allRecipes);
    };

    fetchRecipes();
  }, []);

  return (
    <section className="mx-24">
      <h1 className="text-3xl font-bold font-roboto py-6">Saved Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 font-roboto">
        {recipes.map((recipe, index) => (
          <Recipe key={index} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}
