import * as React from "react"
import {
  Box,
  VStack,
  Grid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  FormLabel,
  FormControl,
  RadioGroup,
  Radio,
  HStack
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { useState } from "react"



export const GetUserInformation = () => {

  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [activityLevel, setActivityLevel] = useState(0);
  const [goal, setGoal] = useState("")

  const weightGoalRecord: Record<string, string> = {
    "extremelose": "Extreme Weight Loss",
    "weightlose": "Moderate Weight Loss",
    "mildlose": "Mild Weight Loss",
    "maintain": "Maintain Weight",
    "mildgain": "Mild Weight Gain",
    "weightgain": "Moderate Weight Gain",
    "extremegain": "Extreme Weight Gain",
  };

  const exerciseLevelRecord: Record<string, string> = {
    "1": "BMR",
    "2": "Sedentary: little or no exercise",
    "3": "Exercise 1-3 times/week",
    "4": "Exercise 4-5 times/week",
    "5": "Daily exercise or intense exercise 3-4 times/week",
    "6": "Intense exercise 6-7 times/week",
    "7": "Very intense exercise daily, or physical job"
  };

    return (
        <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={10}>
            <FormControl>
              <FormLabel marginTop={5} marginLeft={1}>Age:</FormLabel>
              <NumberInput step={10} >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <FormLabel marginTop={5} marginLeft={1}>Gender:</FormLabel>
              <RadioGroup>
                <HStack>
                  <Radio value='male'>Male</Radio>
                  <Radio value='female'>Female</Radio>
                </HStack>
              </RadioGroup>

              <FormLabel marginTop={5} marginLeft={1}>Weight (lb):</FormLabel>
              <NumberInput step={10} >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <FormLabel marginTop={5} marginLeft={1}>Height:</FormLabel>
              <NumberInput step={10} >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>


              <FormLabel marginTop={5} marginLeft={1}>Weight Goal:</FormLabel>
              <Select placeholder="Select Weight Goal" required>
                {Object.entries(weightGoalRecord).map(([value, label]) => {
                  return (
                    <option value={value}>{label}</option>
                  )
                })}
              </Select>
              <FormLabel marginTop={5} marginLeft={1}>Exercise Level:</FormLabel>
              <Select placeholder="Select Exercise Level" required>
                {Object.entries(exerciseLevelRecord).map(([value, label]) => {
                  return (
                    <option value={value}>{label}</option>
                  )
                })}
              </Select>
            </FormControl>
          </VStack>
        </Grid>
      </Box>
    )
}