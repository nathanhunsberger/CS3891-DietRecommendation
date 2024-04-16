import { Recipe } from "./recipeModel";
import { Box, useColorModeValue, Image, Text, VStack, HStack, Badge, Grid, GridItem, } from "@chakra-ui/react";
interface Props {
    recommendations: Recipe[];
}

export const RecommendationPage: React.FC<Props> = ({ recommendations }) => {
    const bg = useColorModeValue("white", "gray.700");
    const color = useColorModeValue("gray.800", "white");
    const columnProp = "repeat(" + Math.min(Math.ceil(recommendations.length / 2),7) + ", 1fr)"
    return (
        <VStack>
        <Text fontSize="3xl" fontWeight="bold">Your Recommendations</Text>
            <Grid templateColumns={columnProp} gap={4}>
            {recommendations.length > 0 && recommendations.map((recommendation) => {
                return (
                    <GridItem>
                    <Box textAlign="center" mt="2" mx="auto" maxWidth="225px" height="250px" p="2" bg={bg} color={color} borderRadius="lg" boxShadow="2xl">
                        <VStack>
                        <Text fontSize="md" fontWeight="bold">{recommendation.name}</Text>
                            <Image
                                src={recommendation.image}
                                alt={`Recipe ${1}`}
                                borderRadius="lg"
                                boxSize="100px"
                                objectFit="cover"
                            />
                            <VStack spacing={1}>
                                
                                {/* <Text fontSize="sm" fontStyle="italic">{recommendation.description}</Text> */}
                                <HStack spacing={4}>
                                    <Badge fontSize='small' colorScheme="green" p="2">Calories: {recommendation.calories}</Badge>
                                    <Badge colorScheme="red" p="2">Protein: {recommendation.protein}g</Badge>
                                </HStack>
                                <HStack>
                                    <Badge colorScheme="purple" p="2">Fat: {recommendation.fat}g</Badge>
                                    <Badge colorScheme="orange" p="2">Carbs: {recommendation.carbs}g</Badge>
                                </HStack>
                                <Text>Click for details</Text>
                            </VStack>
                        </VStack>
                    </Box>
                    </GridItem>
                )
            })
            }
        </Grid>
        </VStack>
    )
    }
