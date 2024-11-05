import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';

type Recipe = {
  id: string;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  instructions: string;
  sourceName: string;
  sourceUrl: string;
};

type RecipeDetailsProps = {
  id: string;
};

export default function RecipeAPI({ id }: RecipeDetailsProps) {
  const [recipe, setRecipe] = useState<Recipe>();
  const [error, setError] = useState<Error>();
  const [imageSrc, setImageSrc] = useState<string>('/placeholder.png');

  const saveRecipe = async () => {
    const response = await fetch('/api/saved/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error('Failed to save recipe');
    }
  };

  useEffect(() => {
    async function fetchRecipeDetails(id: string) {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }
        const data = await response.json();
        setRecipe(data);

        if (data.image) {
          setImageSrc(data.image);
        }
      } catch (err) {
        setError(err as Error);
      }
    }

    fetchRecipeDetails(id);
  }, [id]);

  if (error) {
    throw error;
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <Image
        src={imageSrc}
        alt={recipe.title}
        width={500}
        height={300}
        onError={() => setImageSrc('/placeholder.png')}
        className="self-start mt-10"
      />
      <div className="font-roboto xl:w-[700px] xl:p-8 lg:p-6 md:p-4 p-2 flex flex-col">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-textColor xl:text-4xl lg:text-3xl text-2xl font-bold">
              {recipe.title}
            </h1>
            <Button
              variant="outline"
              size="sm"
              className="font-bold shadow-inner border-strokeWeak bg-fill text-textWeak hover:text-textWeak hover:opacity-80 active:opacity-100"
              onClick={saveRecipe}
            >
              Add Recipe
            </Button>
          </div>
          <div className="max-w-[750px] text-textColor">
            <h2 className="xl:text-2xl lg:text-2xl text-xl py-2 font-normal">
              Instructions:
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              className="xl:text-base lg:text-base text-sm font-light leading-normal"
            ></div>
          </div>
          <div className="xl:text-base lg:text-base text-sm">
            <div className="flex flex font-medium text-textWeak bg-fill justify-center gap-4 p-4 rounded-md">
              <div className="flex flex-col items-center">
                <Image
                  src={'/serving.svg'}
                  alt="servings"
                  width={40}
                  height={40}
                />
                <p>{recipe.servings} servings</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src={'/time.svg'}
                  alt="servings"
                  width={40}
                  height={40}
                />
                <p>{recipe.readyInMinutes} minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
