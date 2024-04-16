import { Box, VStack, Text, Image, HStack, Badge, List, ListItem, ListIcon, UnorderedList, } from "@chakra-ui/react";
import { Recipe } from "./recipeModel";
import { FaCircle, FaSquare } from "react-icons/fa";
interface Props {
    recommendation: Recipe;
}

export const PopupRecipe: React.FC<Props> = ({ recommendation }) => {
    return (
        <Box textAlign="center" mt="2" mx="auto" width="800px" p="2"  borderRadius="lg" boxShadow="2xl">
            <VStack>
                <Text fontSize="3xl" fontWeight="bold" noOfLines={2} lineHeight="tall" height="3rem">{recommendation.name}</Text>
                <Text>{`Serves: ${recommendation.servings}`}</Text>
                <Image
                    src={recommendation.image}
                    alt={`Recipe ${1}`}
                    borderRadius="xl"
                    boxSize="100px"
                    objectFit="cover"
                />
                
                    <HStack >
                        <Badge fontSize='sm' colorScheme="green" p="2">Calories: {recommendation.calories}</Badge>
                        <Badge fontSize='sm' colorScheme="red" p="2">Protein: {recommendation.protein}g</Badge>
                        
                        <Badge fontSize='sm' colorScheme="purple" p="2">Fat: {recommendation.fat}g</Badge>
                        <Badge fontSize='sm' colorScheme="orange" p="2">Carbs: {recommendation.carbs}g</Badge>
                    </HStack>
                    <Text marginBottom={5}fontStyle='italic' fontSize='medium' noOfLines={6}>{recommendation.description}</Text>
                    
                    <Text>Cooking Instructions:</Text>
                    <UnorderedList spacing={1} textAlign={"left"}>
                        {recommendation.instructions?.map(instruction => (

                            <ListItem>
                           {instruction}
                            </ListItem>
                        ))}
                        </UnorderedList>
                    <UnorderedList spacing={1} textAlign={"left"}>
                        {recommendation.ingredients?.map(ingredient => (
                            <ListItem>
                           {ingredient}
                            </ListItem>
                        ))}
                        </UnorderedList>
            </VStack>
        </Box>
    )
}