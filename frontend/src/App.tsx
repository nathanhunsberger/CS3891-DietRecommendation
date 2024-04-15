import * as React from "react"


import { ChakraProvider, theme } from "@chakra-ui/react"
import { GetUserInformation } from "./GetUserInformation"
export const App = () => {

  return (
    <ChakraProvider theme={theme}>
      <GetUserInformation></GetUserInformation>
    </ChakraProvider>
  )
}
