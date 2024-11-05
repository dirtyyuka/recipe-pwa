import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';

type FilterTableProps = {
  onFilterApply: (
    includeCuisine: string,
    excludeCuisine: string,
    includeIntolerance: string,
    includeDiet: string,
  ) => void;
  setFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filter: boolean;
};

export default function FilterTable({
  onFilterApply,
  setFilter,
  filter,
}: FilterTableProps) {
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [excludedCuisine, setExcludedCuisine] = useState('');
  const [selectedIntolerance, setSelectedIntolerance] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');

  //manage animation
  const [isVisible, setIsVisible] = useState(filter);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (filter) {
      setIsVisible(true);
      setAnimationClass('animate-slide-in-from-left');
    } else {
      setAnimationClass('animate-slide-out-to-left');
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [filter]);

  if (!isVisible) {
    return null;
  }

  const countries = [
    'African',
    'Asian',
    'American',
    'British',
    'Cajun',
    'Caribbean',
    'Chinese',
    'Eastern European',
    'European',
    'French',
    'German',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Japanese',
    'Jewish',
    'Korean',
    'Latin American',
    'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Nordic',
    'Southern',
    'Spanish',
    'Thai',
    'Vietnamese',
  ];

  const intolerances = [
    'Dairy',
    'Egg',
    'Gluten',
    'Grain',
    'Peanut',
    'Seafood',
    'Sesame',
    'Shellfish',
    'Soy',
    'Sulfite',
    'Tree Nut',
    'Wheat',
  ];

  const diets = [
    'Gluten Free',
    'Ketogenic',
    'Vegetarian',
    'Lacto-Vegetarian',
    'Ovo-Vegetarian',
    'Vegan',
    'Paleo',
    'Pescetarian',
    'Primal',
    'Low FODMAP',
    'Whole30',
  ];

  return (
    <div
      className={`border-r-2 h-full xl:block lg:block absolute top-0 left-0 bg-white ${animationClass}`}
    >
      <div className="flex flex-col gap-4 p-6">
        <h2 className="font-roboto text-2xl font-medium text-gray-500">
          Filters
        </h2>
        <div className="flex flex-col gap-4">
          <Select onValueChange={setSelectedCuisine}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by Cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Include</SelectLabel>
                {countries.map((country) => (
                  <SelectItem
                    value={country[0].toLowerCase() + country.slice(1)}
                    key={country}
                  >
                    {country}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={setExcludedCuisine}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Exclude Cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Exclude</SelectLabel>
                {countries.map((country) => (
                  <SelectItem
                    value={country[0].toLowerCase() + country.slice(1)}
                    key={country}
                  >
                    {country}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedIntolerance}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Intolerances" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Include</SelectLabel>
                {intolerances.map((intolerance) => (
                  <SelectItem
                    value={intolerance[0].toLowerCase() + intolerance.slice(1)}
                    key={intolerance}
                  >
                    {intolerance}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedDiet}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Diet" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Include</SelectLabel>
                {diets.map((diet) => (
                  <SelectItem
                    value={diet[0].toLowerCase() + diet.slice(1)}
                    key={diet}
                  >
                    {diet}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant="secondary"
            className="font-roboto"
            onClick={() => {
              onFilterApply(
                selectedCuisine,
                excludedCuisine,
                selectedIntolerance,
                selectedDiet,
              );
              setFilter(false);
            }}
          >
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
}
