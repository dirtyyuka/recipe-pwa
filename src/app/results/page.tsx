'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import RecipeList from '../../components/api/recipeList';
import FilterTable from '../../components/filterTable';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Results() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('query');
  const [search, setSearch] = useState(query);

  //activate filters for smaller screens
  const [filter, setFilter] = useState(false);

  //applied cuisine
  const [appliedCuisine, setAppliedCuisine] = useState<string>('');
  const [excludedCuisine, setExcludedCuisine] = useState<string>('');
  const [appliedIntolerance, setAppliedIntolerance] = useState<string>('');
  const [appliedDiet, setAppliedDiet] = useState<string>('');

  const handleSearch = () => {
    if (search?.trim()) {
      router.push(`/results/?query=${encodeURIComponent(search)}`);
    }
  };

  const handleFilterApply = (
    includeCuisine: string,
    excludeCuisine: string,
    includeIntolerance: string,
    includeDiet: string,
  ) => {
    setAppliedCuisine(includeCuisine);
    setExcludedCuisine(excludeCuisine);
    setAppliedIntolerance(includeIntolerance);
    setAppliedDiet(includeDiet);
  };

  if (!query) {
    return (
      <div>
        <h1>Results</h1>
        <p>No results found.</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="relative z-10">
        <FilterTable
          onFilterApply={handleFilterApply}
          setFilter={setFilter}
          filter={filter}
        />
      </div>
      <div>
        <div className="flex flex-col p-2 py-8 xl:px-16 lg:px-12 px-4 gap-8">
          <div className="flex justify-center">
            <Input
              type="search"
              placeholder="Search..."
              value={search as string}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="font-roboto relative z-2 max-w-[500px] rounded-none"
            />
            <div className="bg-strokeWeak rounded-r-xl shadow">
              <div
                className="px-4 cursor-pointer flex items-center z-1 cursor-pointer h-full"
                onClick={handleSearch}
              >
                <Image
                  src={'/search.svg'}
                  width={22}
                  height={22}
                  alt="Search icon"
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setFilter(!filter)}
              className="ml-4 font-roboto font-normal text-textColor border-strokeWeak"
            >
              Filters
            </Button>
          </div>
          <RecipeList
            query={query}
            selectedCuisine={appliedCuisine}
            excludedCuisine={excludedCuisine}
            selectedIntolerance={appliedIntolerance}
            selectedDiet={appliedDiet}
          />
        </div>
      </div>
    </div>
  );
}
