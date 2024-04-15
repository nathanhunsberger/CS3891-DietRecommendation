import * as React from "react"
import { useState } from "react"

import { ChakraProvider, theme } from "@chakra-ui/react"
import { GetUserInformation } from "./GetUserInformation"
import { Recipe } from "./recipeModel"
import { RecipeCards } from "./RecipeCards"
import { tempRecipes } from "./tmp"
export const App = () => {
  const [seeds, setSeeds] = useState<Recipe[]>(tempRecipes);

  return (
    <ChakraProvider theme={theme}>
      {seeds.length === 0 ?
        <GetUserInformation setSeeds={setSeeds}/>
        :
        <RecipeCards recipes={seeds}/>
      }
    </ChakraProvider>
  )
}
