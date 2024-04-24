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
    HStack,
    Button,
    Input,
    Textarea,
} from "@chakra-ui/react"

import { ChangeEvent } from "react"
// import { Formik, FormikProps } from 'formik';
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik';
import axios from 'axios';
import { fetchSeedRecipes } from "./RecommendationFetcher";
import { Recipe } from "./recipeModel";

interface formProps {
    setSeeds: (newValue: Recipe[]) => void
}

export const GetUserInformation: React.FC<formProps> = ({
    setSeeds }) => {
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
        "2": "Sedentary: little or no exercise",
        "3": "Exercise 1-3 times/week",
        "4": "Exercise 4-5 times/week",
        "5": "Daily exercise or intense exercise 3-4 times/week",
        "6": "Intense exercise 6-7 times/week",
        "7": "Very intense exercise daily, or physical job"
    };

    const dietTypeRecord: Record<string, string> = {
        "balanced": "Balanced",
        "lowfat": "Low Fat",
        "lowcarbs": "Low Carb",
        "highprotein": "High Protein"
    }

    type Values = {
        age: number;
        gender: string;
        weight: number;
        height: number;
        weightGoal: string;
        exerciseLevel: string;
        dietType: string;
        description: string;
    };



    return (
        <Box textAlign="center" fontSize="xl">
            <VStack width={'80%'}>
                <Formik
                    initialValues={{
                        age: 20,
                        gender: '',
                        weight: 100,
                        height: 60,
                        weightGoal: '',
                        exerciseLevel: '',
                        dietType: '',
                        description: ''
                    }}
                    onSubmit={async (values, actions) => {
                        //metric conversions
                        values.height = 2.54 * values.height;
                        values.weight = 0.453592 * values.weight;

                        const options = {
                            method: 'GET',
                            url: 'https://fitness-calculator.p.rapidapi.com/macrocalculator',
                            params: {
                                age: values.age,
                                gender: values.gender,
                                height: values.height,
                                weight: values.weight,
                                activitylevel: values.exerciseLevel,
                                goal: values.weightGoal
                            },
                            headers: {
                                'X-RapidAPI-Key': '60b6995f3fmsh88b2eb3fcb9b907p131589jsn3a22f9859c14',
                                'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
                            }
                        };

                        try {
                            const response = await axios.request(options);
                            const macros: any = response.data.data[values.dietType];
                            const recipes = await fetchSeedRecipes(response.data.data.calorie, macros.protein, macros.fat, macros.carbs, values.description);
                            setSeeds(recipes);

                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    {(props) => (
                        <Form>
                            <Field name='age' >
                                {({ field, form }: { field: FieldInputProps<number>, form: FormikProps<Values> }) => (
                                    <FormControl isInvalid={!!(form.errors.age || form.values.age <= 0)}>
                                        <FormLabel marginTop={5} marginLeft={1}>Age:</FormLabel>
                                        <NumberInput step={10} {...field} onChange={(val) =>
                                            form.setFieldValue(field.name, val)} >
                                            <NumberInputField required />
                                            <NumberInputStepper  >
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='gender'>
                                {({ field, form }: { field: FieldInputProps<string>, form: FormikProps<Values> }) => (
                                    <FormControl isInvalid={((form.errors.gender || form.values.gender === '') && form.touched.gender) || false}>
                                        <FormLabel marginTop={5} marginLeft={1}>Gender:</FormLabel>
                                        <RadioGroup >
                                            <HStack>
                                                <Radio isRequired {...field} value='male'>Male</Radio>
                                                <Radio isRequired {...field} value='female'>Female</Radio>
                                            </HStack>
                                        </RadioGroup>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='weight' >
                                {({ field, form }: { field: FieldInputProps<number>, form: FormikProps<Values> }) => (
                                    <FormControl isInvalid={((form.errors.weight || form.values.weight <= 0) && form.touched.weight) || false}>
                                        <FormLabel marginTop={5} marginLeft={1}>Weight (lb):</FormLabel>
                                        <NumberInput step={10} {...field} onChange={(val) =>
                                            form.setFieldValue(field.name, val)} >
                                            <NumberInputField required />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='height' >
                                {({ field, form }: { field: FieldInputProps<number>, form: FormikProps<Values> }) => (
                                    <FormControl isInvalid={((form.errors.height || form.values.height <= 0) && form.touched.height) || false}>
                                        <FormLabel marginTop={5} marginLeft={1}>Height (in):</FormLabel>
                                        <NumberInput step={1} {...field} onChange={(val) =>
                                            form.setFieldValue(field.name, val)} >
                                            <NumberInputField required />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='weightGoal' >
                                {({ field, form }: { field: FieldInputProps<string>, form: FormikProps<Values> }) => (
                                    <FormControl isInvalid={((form.errors.weightGoal || form.values.weightGoal == '') && form.touched.weightGoal) || false}>
                                        <FormLabel marginTop={5} marginLeft={1}>Weight Goal:</FormLabel>
                                        <Select placeholder="Select Weight Goal" {...field} required>
                                            {Object.entries(weightGoalRecord).map(([value, label]) => {
                                                return (
                                                    <option value={value}>{label}</option>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='exerciseLevel' >
                                {({ field, form }: { field: FieldInputProps<string>, form: FormikProps<Values> }) => (
                                    <FormControl isInvalid={((form.errors.exerciseLevel || form.values.exerciseLevel == '') && form.touched.exerciseLevel) || false}>
                                        <FormLabel marginTop={5} marginLeft={1}>Exercise Level:</FormLabel>
                                        <Select placeholder="Select Exercise Level" required {...field}>
                                            {Object.entries(exerciseLevelRecord).map(([value, label]) => {
                                                return (
                                                    <option value={value}>{label}</option>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='dietType' >
                                {({ field, form }: { field: FieldInputProps<string>, form: FormikProps<Values> }) => (
                                    <FormControl isInvalid={((form.errors.weightGoal || form.values.dietType == '') && form.touched.dietType) || false}>
                                        <FormLabel marginTop={5} marginLeft={1}>Diet Type:</FormLabel>
                                        <Select placeholder="Select Diet Type" {...field} required>
                                            {Object.entries(dietTypeRecord).map(([value, label]) => {
                                                return (
                                                    <option value={value}>{label}</option>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='description' >
                                {({ field, form }: { field: FieldInputProps<string>, form: FormikProps<Values> }) => (
                                    <FormControl isInvalid={(form.errors.description && form.touched.height) || false}>
                                        <FormLabel marginTop={5} marginLeft={1}>Describe your desired recipes:</FormLabel>
                                        <Textarea overflowWrap={"normal"} size="md"{...field} verticalAlign="text-top"></Textarea>
                                    </FormControl>
                                )}
                            </Field>
                            <Button
                                mt={4}
                                colorScheme='teal'
                                isLoading={props.isSubmitting}
                                type='submit'
                            >
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </VStack>
        </Box>
    )
}