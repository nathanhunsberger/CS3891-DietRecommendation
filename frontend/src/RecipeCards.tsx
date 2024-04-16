import React, { useState } from 'react';
import { Box, Button, HStack, Image, Text, VStack, useColorModeValue, Badge } from '@chakra-ui/react';

import { Recipe } from './recipeModel';
import { fetchRecommendations } from './RecommendationFetcher';

interface Props {
  recipes: Recipe[];
  setRecommendations: (newValue: Recipe[]) => void
}

export const RecipeCards: React.FC<Props> = ({ recipes, setRecommendations }) => {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");

  const handleRateAndNext = async (rating: number) => {
    recipes[currentRecipeIndex].review = rating;
    if (currentRecipeIndex < recipes.length - 1) {
      setCurrentRecipeIndex(currentRecipeIndex + 1); // Move to next recipe
    } else {
      setIsLoading(true);
      const recipeIDs = recipes.map(recipe => recipe.id.toString());
      const reviews = recipes.map(recipe => recipe.review?.toString() || "0");
      const recommendations = await fetchRecommendations(recipeIDs, reviews);
      setIsLoading(false);
      setRecommendations(recommendations);
    }
  };

  if (isLoading) {
    return (
      <VStack>
      <Text fontSize="3xl" fontWeight="bold">Hold Up.... Let Him Cook</Text>
      <Box textAlign="center" mt="5" mx="auto" p="5" bg={bg} color={color} borderRadius="lg" boxShadow="2xl">
        <Image 
          src="/secret_sauce.gif"
          alt="Loading..."
          boxSize="800px"
        />
        <Text>Loading your recommendations...</Text>
      </Box>
      </VStack>
    );
  }

  return (
    <Box textAlign="center" mt="5" mx="auto" maxWidth="md" p="5" bg={bg} color={color} borderRadius="lg" boxShadow="2xl">
      {recipes.length > 0 && (
        <VStack spacing={5}>
          <Image 
            src={recipes[currentRecipeIndex].image} 
            alt={`Recipe ${currentRecipeIndex}`} 
            borderRadius="lg"
            boxSize="300px"
            objectFit="cover"
          />
          <VStack spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">{recipes[currentRecipeIndex].name}</Text>
            {/* <Text fontSize="md" fontStyle="italic">{recipes[currentRecipeIndex].description}</Text> */}
            <HStack spacing={4}>
              <Badge colorScheme="green" p="2">Calories: {recipes[currentRecipeIndex].calories}</Badge>
              <Badge colorScheme="red" p="2">Protein: {recipes[currentRecipeIndex].protein}g</Badge>
              <Badge colorScheme="purple" p="2">Fat: {recipes[currentRecipeIndex].fat}g</Badge>
              <Badge colorScheme="orange" p="2">Carbs: {recipes[currentRecipeIndex].carbs}g</Badge>
              {/* <Badge colorScheme="yellow" p="2">Servings: {recipes[currentRecipeIndex].servings}</Badge> */}
            </HStack>
          </VStack>
          <HStack spacing={2}>
            {[1, 2, 3, 4, 5].map(rating => (
              <Button key={rating} size="sm" colorScheme="blue" onClick={() => handleRateAndNext(rating)}>
                Rate {rating}
              </Button>
            ))}
          </HStack>
          <Text fontSize="xs" fontWeight="bold">{"Click for details"}</Text>
        </VStack>
      )}
      {recipes.length === 0 && <Text>No recipes found.</Text>}
    </Box>
  );
};
