import * as React from "react"
import { useState } from "react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { ChakraProvider, Grid, theme } from "@chakra-ui/react"
import { GetUserInformation } from "./GetUserInformation"
import { Recipe } from "./recipeModel"
import { RecipeCards } from "./RecipeCards"
import { tempRecipes } from "./tmp"
export const App = () => {
  const [seeds, setSeeds] = useState<Recipe[]>([]);
  const [recommendations, setRecommendations] = useState<Recipe[]>([]);
  return (
    <ChakraProvider theme={theme} >
      <Grid minH="100vh" p={3}>
      <ColorModeSwitcher justifySelf="flex-end" />
      {recommendations.length > 0?
      <p>Recommendations:</p>
      :
      <>
      {seeds.length === 0 ?
        <GetUserInformation setSeeds={setSeeds}/>
        :
        <RecipeCards recipes={seeds} setRecommendations={setRecommendations}/>
      }
      </>
      }
      </Grid>
    </ChakraProvider>
  )
}
