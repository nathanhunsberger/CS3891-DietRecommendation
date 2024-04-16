import { useState } from "react";
import { PopupRecipe } from "./PopupRecipe";
import { Recipe } from "./recipeModel";
import { Box, useColorModeValue, Image, Text, VStack, HStack, Badge, Grid, GridItem, Modal, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
interface Props {
    recommendations: Recipe[];
}

export const RecommendationPage: React.FC<Props> = ({ recommendations }) => {
    const bg = useColorModeValue("white", "gray.700");
    const color = useColorModeValue("gray.800", "white");
    const columnProp = "repeat(" + Math.min(Math.ceil(recommendations.length / 2), 7) + ", 1fr)"
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentRecipe, setCurrentRecipe] = useState<Recipe | undefined>(undefined)
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent width="800px" >
                    {currentRecipe && <PopupRecipe recommendation={currentRecipe} />}
                </ModalContent>
            </Modal>
            <VStack>

                <Text fontSize="3xl" fontWeight="bold">Your Recommendations</Text>


                <Grid templateColumns={columnProp} gap={4}>
                    {recommendations.length > 0 && recommendations.map((recommendation) => {
                        return (
                            <GridItem onClick={() => {
                                onOpen();
                                setCurrentRecipe(recommendation);
                            }}>
                                <Box textAlign="center" mt="2" mx="auto" maxWidth="275px" height="275px" p="2" bg={bg} color={color} borderRadius="lg" boxShadow="2xl">
                                    <VStack>
                                        <Text fontSize="md" fontWeight="bold" noOfLines={2} lineHeight="tall" height="3rem">{recommendation.name}</Text>
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
                                            <Text fontSize="xs" fontWeight="bold">{"Click for details"}</Text>
                                        </VStack>
                                    </VStack>
                                </Box>
                            </GridItem>
                        )
                    })}
                </Grid>
            </VStack>
        </>
    )
}
