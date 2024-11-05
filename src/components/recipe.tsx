'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { useState } from 'react';

type Recipe = {
  id: string;
  title: string;
  image: string;
  instructions: string;
};

type RecipeProps = {
  recipe: Recipe;
};

export default function Recipe({ recipe }: RecipeProps) {
  const [imageSrc, setImageSrc] = useState(recipe.image);

  const handleImageError = () => {
    setImageSrc('/placeholder.png');
  };

  return (
    <Card key={recipe.id} className="flex flex-col h-full">
      <CardHeader className="flex-shrink-0">
        <Image
          src={imageSrc}
          alt={recipe.title}
          width={300}
          height={300}
          className="object-cover"
          onError={handleImageError}
        />
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="leading-normal tracking-normal break-words max-w-[300px] font-normal font-bold text-lg">
          {recipe.title}
        </CardTitle>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link href={`/recipe/${recipe.id}`}>
          <Button
            variant="outline"
            className="text-sm shadow-inner border-strokeWeak bg-fill text-textWeak hover:text-textWeak"
          >
            View Recipe
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
