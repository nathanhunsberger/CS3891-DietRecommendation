import React, { useState } from 'react';
import { Box, Button, Image, Text } from '@chakra-ui/react';

interface Recipe {
  id: number;
  name: string;
  image: string;
  calories: number,
  protein: number,
  fat: number,
  carbs: number
}

interface Props {
  recipes: Recipe[];
}

export const RecipeCards: React.FC<Props> = ({ recipes }) => {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

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
        <Box>
          <Image src={recipes[currentRecipeIndex].image} alt={`Recipe ${currentRecipeIndex}`} />
          <Text>{recipes[currentRecipeIndex].name}</Text>
          {[1, 2, 3, 4, 5].map(rating => (
            <Button key={rating} onClick={() => handleRateAndNext(rating)}>{rating}</Button>
          ))}
        </Box>
      )}
      {recipes.length === 0 && <Text>No recipes found.</Text>}
    </Box>
  );
};
