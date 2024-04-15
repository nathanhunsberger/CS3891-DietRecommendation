import React, { useState } from 'react';
import { Box, Button, HStack, Image, Text, VStack } from '@chakra-ui/react';

import { Recipe } from './recipeModel';
import { fetchRecommendations } from './RecommendationFetcher';

interface Props {
  recipes: Recipe[];
  setRecommendations: (newValue: Recipe[]) => void
}

export const RecipeCards: React.FC<Props> = ({ recipes, setRecommendations }) => {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const handleRateAndNext = async (rating: number) => {
    recipes[currentRecipeIndex].review = rating;
    if (currentRecipeIndex < recipes.length - 1) {
      setCurrentRecipeIndex(currentRecipeIndex + 1); // Move to next recipe
    } else {
      const recipeIDs = recipes.map( (recipe)=>{return recipe.id.toString()});
      const reviews: string[] =  recipes.map( (recipe)=>{
        if (recipe.review){
          return recipe.review.toString()
        }
        return "0";
      });
      const recommendations = await fetchRecommendations(recipeIDs,reviews)
      setRecommendations(recommendations)
    }
  };

  return (
    <Box textAlign="center" marginTop={20}>
      {recipes.length > 0 && (
        <VStack>
          <Text fontSize="3xl">{recipes[currentRecipeIndex].name}</Text>
          <Text fontSize="xl">{recipes[currentRecipeIndex].description}</Text>
          <HStack>
          <Image src={recipes[currentRecipeIndex].image} alt={`Recipe ${currentRecipeIndex}`} />
          
          <VStack>
          <Text fontSize="xl">Calories: {recipes[currentRecipeIndex].calories}</Text>
          <Text fontSize="xl">Protein: {recipes[currentRecipeIndex].protein}</Text>
          <Text fontSize="xl">Fat: {recipes[currentRecipeIndex].fat}</Text>
          <Text fontSize="xl">Carbs: {recipes[currentRecipeIndex].carbs}</Text>
          </VStack>
          </HStack>
          
        
         
          <HStack>
          {[1, 2, 3, 4, 5].map(rating => (
            <Button key={rating} onClick={() => handleRateAndNext(rating)}>{rating}</Button>
          ))}
          </HStack>
        </VStack>
      )}
      {recipes.length === 0 && <Text>No recipes found.</Text>}
    </Box>
  );
};
