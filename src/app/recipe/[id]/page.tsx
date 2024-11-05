'use client';
import { useParams } from 'next/navigation';
import RecipeDetails from '../../../components/api/recipeDetails';

export default function RecipePage() {
  const { id } = useParams();

  if (!id) {
    return <div>No recipe found.</div>;
  }

  return (
    <div>
      <RecipeDetails id={id as string} />
    </div>
  );
}
