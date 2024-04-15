import React, { useState } from 'react';
import { Box, Button, HStack, Image, Text, VStack } from '@chakra-ui/react';

import { Recipe } from './recipeModel';

interface Props {
  recipes: Recipe[];
}

export const RecipeCards: React.FC<Props> = ({ recipes }) => {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const handleRateAndNext = (rating: number) => {
    console.log(`Rated recipe ${recipes[currentRecipeIndex].id} with ${rating}`);
    if (currentRecipeIndex < recipes.length - 1) {
      setCurrentRecipeIndex(currentRecipeIndex + 1); // Move to next recipe
    } else {
      console.log("End of recipes");
    }
  };

  return (
    <Box textAlign="center">
      {recipes.length > 0 && (
        <VStack>
          {showImage?
          <Image src={recipes[currentRecipeIndex].image} alt={`Recipe ${currentRecipeIndex}`} />
          :
          <VStack >
          <p>{recipes[currentRecipeIndex].calories}</p>
          <p></p>
          </VStack>
        } 
         <Text>{recipes[currentRecipeIndex].name}</Text>
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
