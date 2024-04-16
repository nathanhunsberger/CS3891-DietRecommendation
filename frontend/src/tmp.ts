import { Recipe } from "./recipeModel";

// Define temporary recipes with descriptions and instructions
export const tempRecipes: Recipe[] = [
    {
      id: 1,
      name: "Spaghetti Carbonara",
      image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      calories: 500,
      protein: 20,
      fat: 25,
      carbs: 45,
      description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
      instructions: [
        "Cook spaghetti according to package instructions until al dente. Reserve 1 cup of pasta water, then drain the spaghetti.",
        "In a large skillet, cook pancetta over medium heat until crispy. Remove from skillet and set aside.",
        "In a bowl, whisk together eggs, grated Parmesan cheese, and black pepper.",
        "Add cooked spaghetti to the skillet with the pancetta drippings. Toss to coat the spaghetti.",
        "Remove skillet from heat and quickly pour in the egg mixture, stirring continuously to coat the spaghetti. The heat from the spaghetti will cook the eggs and create a creamy sauce. If the sauce is too thick, add reserved pasta water a little at a time until desired consistency is reached.",
        "Serve immediately with additional grated Parmesan cheese and black pepper."
      ]
    },
    {
      id: 2,
      name: "Chicken Stir-Fry",
      image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      calories: 400,
      protein: 30,
      fat: 15,
      carbs: 35,
      description: "A flavorful dish made with tender chicken, fresh vegetables, and savory sauce.",
      instructions: [
        "Heat oil in a large skillet or wok over medium-high heat. Add diced chicken and cook until browned and cooked through.",
        "Add sliced vegetables to the skillet and stir-fry until tender-crisp.",
        "Pour sauce over chicken and vegetables, stirring to coat evenly. Cook for an additional 2-3 minutes until heated through.",
        "Serve hot over cooked rice or noodles."
      ]
    },
    {
      id: 3,
      name: "Vegetable Curry",
      image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      calories: 350,
      protein: 10,
      fat: 20,
      carbs: 40,
      description: "A fragrant and spicy dish made with a variety of vegetables and aromatic spices.",
      instructions: [
        "Heat oil in a large pot over medium heat. Add diced onions and cook until softened.",
        "Stir in curry paste and cook for 1-2 minutes until fragrant.",
        "Add chopped vegetables to the pot and stir to coat with the curry mixture.",
        "Pour in coconut milk and vegetable broth. Bring to a simmer and cook for 15-20 minutes until vegetables are tender.",
        "Serve hot over cooked rice or with naan bread."
      ]
    },
    {
      id: 4,
      name: "Grilled Salmon",
      image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      calories: 300,
      protein: 35,
      fat: 15,
      carbs: 10,
      description: "A healthy and flavorful dish featuring tender grilled salmon seasoned with herbs and lemon.",
      instructions: [
        "Preheat grill to medium-high heat. Brush salmon fillets with olive oil and season with salt, pepper, and herbs of your choice.",
        "Place salmon fillets on the grill and cook for 4-5 minutes per side, or until fish flakes easily with a fork.",
        "Remove from grill and squeeze fresh lemon juice over the salmon fillets before serving."
      ]
    },
    {
      id: 5,
      name: "Caprese Salad",
      image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      calories: 200,
      protein: 10,
      fat: 15,
      carbs: 5,
      description: "A simple and refreshing salad made with ripe tomatoes, fresh mozzarella cheese, basil leaves, and balsamic glaze.",
      instructions: [
        "Slice tomatoes and fresh mozzarella cheese into rounds.",
        "Arrange tomato and mozzarella slices on a serving platter, alternating and overlapping them.",
        "Tuck fresh basil leaves between the tomato and cheese slices.",
        "Drizzle balsamic glaze over the salad just before serving."
      ]
    },
    {
      id: 1,
      name: "Spaghetti Carbonara",
      image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      calories: 500,
      protein: 20,
      fat: 25,
      carbs: 45,
      description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
      instructions: [
        "Cook spaghetti according to package instructions until al dente. Reserve 1 cup of pasta water, then drain the spaghetti.",
        "In a large skillet, cook pancetta over medium heat until crispy. Remove from skillet and set aside.",
        "In a bowl, whisk together eggs, grated Parmesan cheese, and black pepper.",
        "Add cooked spaghetti to the skillet with the pancetta drippings. Toss to coat the spaghetti.",
        "Remove skillet from heat and quickly pour in the egg mixture, stirring continuously to coat the spaghetti. The heat from the spaghetti will cook the eggs and create a creamy sauce. If the sauce is too thick, add reserved pasta water a little at a time until desired consistency is reached.",
        "Serve immediately with additional grated Parmesan cheese and black pepper."
      ]
    },
    {
      id: 2,
      name: "Chicken Stir-Fry",
      image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      calories: 400,
      protein: 30,
      fat: 15,
      carbs: 35,
      description: "A flavorful dish made with tender chicken, fresh vegetables, and savory sauce.",
      instructions: [
        "Heat oil in a large skillet or wok over medium-high heat. Add diced chicken and cook until browned and cooked through.",
        "Add sliced vegetables to the skillet and stir-fry until tender-crisp.",
        "Pour sauce over chicken and vegetables, stirring to coat evenly. Cook for an additional 2-3 minutes until heated through.",
        "Serve hot over cooked rice or noodles."
      ]
    },
    {
      id: 3,
      name: "Vegetable Curry",
      image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      calories: 350,
      protein: 10,
      fat: 20,
      carbs: 40,
      description: "A fragrant and spicy dish made with a variety of vegetables and aromatic spices.",
      instructions: [
        "Heat oil in a large pot over medium heat. Add diced onions and cook until softened.",
        "Stir in curry paste and cook for 1-2 minutes until fragrant.",
        "Add chopped vegetables to the pot and stir to coat with the curry mixture.",
        "Pour in coconut milk and vegetable broth. Bring to a simmer and cook for 15-20 minutes until vegetables are tender.",
        "Serve hot over cooked rice or with naan bread."
      ]
    },
    {
      id: 4,
      name: "Grilled Salmon",
      image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      calories: 300,
      protein: 35,
      fat: 15,
      carbs: 10,
      description: "A healthy and flavorful dish featuring tender grilled salmon seasoned with herbs and lemon.",
      instructions: [
        "Preheat grill to medium-high heat. Brush salmon fillets with olive oil and season with salt, pepper, and herbs of your choice.",
        "Place salmon fillets on the grill and cook for 4-5 minutes per side, or until fish flakes easily with a fork.",
        "Remove from grill and squeeze fresh lemon juice over the salmon fillets before serving."
      ]
    },
    // {
    //   id: 5,
    //   name: "Caprese Salad",
    //   image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    //   calories: 200,
    //   protein: 10,
    //   fat: 15,
    //   carbs: 5,
    //   description: "A simple and refreshing salad made with ripe tomatoes, fresh mozzarella cheese, basil leaves, and balsamic glaze.",
    //   instructions: [
    //     "Slice tomatoes and fresh mozzarella cheese into rounds.",
    //     "Arrange tomato and mozzarella slices on a serving platter, alternating and overlapping them.",
    //     "Tuck fresh basil leaves between the tomato and cheese slices.",
    //     "Drizzle balsamic glaze over the salad just before serving."
    //   ]
    // },
    // {
    //   id: 1,
    //   name: "Spaghetti Carbonara",
    //   image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    //   calories: 500,
    //   protein: 20,
    //   fat: 25,
    //   carbs: 45,
    //   description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
    //   instructions: [
    //     "Cook spaghetti according to package instructions until al dente. Reserve 1 cup of pasta water, then drain the spaghetti.",
    //     "In a large skillet, cook pancetta over medium heat until crispy. Remove from skillet and set aside.",
    //     "In a bowl, whisk together eggs, grated Parmesan cheese, and black pepper.",
    //     "Add cooked spaghetti to the skillet with the pancetta drippings. Toss to coat the spaghetti.",
    //     "Remove skillet from heat and quickly pour in the egg mixture, stirring continuously to coat the spaghetti. The heat from the spaghetti will cook the eggs and create a creamy sauce. If the sauce is too thick, add reserved pasta water a little at a time until desired consistency is reached.",
    //     "Serve immediately with additional grated Parmesan cheese and black pepper."
    //   ]
    // },
    // {
    //   id: 2,
    //   name: "Chicken Stir-Fry",
    //   image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    //   calories: 400,
    //   protein: 30,
    //   fat: 15,
    //   carbs: 35,
    //   description: "A flavorful dish made with tender chicken, fresh vegetables, and savory sauce.",
    //   instructions: [
    //     "Heat oil in a large skillet or wok over medium-high heat. Add diced chicken and cook until browned and cooked through.",
    //     "Add sliced vegetables to the skillet and stir-fry until tender-crisp.",
    //     "Pour sauce over chicken and vegetables, stirring to coat evenly. Cook for an additional 2-3 minutes until heated through.",
    //     "Serve hot over cooked rice or noodles."
    //   ]
    // },
    // {
    //   id: 3,
    //   name: "Vegetable Curry",
    //   image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    //   calories: 350,
    //   protein: 10,
    //   fat: 20,
    //   carbs: 40,
    //   description: "A fragrant and spicy dish made with a variety of vegetables and aromatic spices.",
    //   instructions: [
    //     "Heat oil in a large pot over medium heat. Add diced onions and cook until softened.",
    //     "Stir in curry paste and cook for 1-2 minutes until fragrant.",
    //     "Add chopped vegetables to the pot and stir to coat with the curry mixture.",
    //     "Pour in coconut milk and vegetable broth. Bring to a simmer and cook for 15-20 minutes until vegetables are tender.",
    //     "Serve hot over cooked rice or with naan bread."
    //   ]
    // },
    // {
    //   id: 4,
    //   name: "Grilled Salmon",
    //   image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    //   calories: 300,
    //   protein: 35,
    //   fat: 15,
    //   carbs: 10,
    //   description: "A healthy and flavorful dish featuring tender grilled salmon seasoned with herbs and lemon.",
    //   instructions: [
    //     "Preheat grill to medium-high heat. Brush salmon fillets with olive oil and season with salt, pepper, and herbs of your choice.",
    //     "Place salmon fillets on the grill and cook for 4-5 minutes per side, or until fish flakes easily with a fork.",
    //     "Remove from grill and squeeze fresh lemon juice over the salmon fillets before serving."
    //   ]
    // },
    // {
    //   id: 5,
    //   name: "Caprese Salad",
    //   image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    //   calories: 200,
    //   protein: 10,
    //   fat: 15,
    //   carbs: 5,
    //   description: "A simple and refreshing salad made with ripe tomatoes, fresh mozzarella cheese, basil leaves, and balsamic glaze.",
    //   instructions: [
    //     "Slice tomatoes and fresh mozzarella cheese into rounds.",
    //     "Arrange tomato and mozzarella slices on a serving platter, alternating and overlapping them.",
    //     "Tuck fresh basil leaves between the tomato and cheese slices.",
    //     "Drizzle balsamic glaze over the salad just before serving."
    //   ]
    // },
    // {
    //   id: 1,
    //   name: "Spaghetti Carbonara",
    //   image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    //   calories: 500,
    //   protein: 20,
    //   fat: 25,
    //   carbs: 45,
    //   description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
    //   instructions: [
    //     "Cook spaghetti according to package instructions until al dente. Reserve 1 cup of pasta water, then drain the spaghetti.",
    //     "In a large skillet, cook pancetta over medium heat until crispy. Remove from skillet and set aside.",
    //     "In a bowl, whisk together eggs, grated Parmesan cheese, and black pepper.",
    //     "Add cooked spaghetti to the skillet with the pancetta drippings. Toss to coat the spaghetti.",
    //     "Remove skillet from heat and quickly pour in the egg mixture, stirring continuously to coat the spaghetti. The heat from the spaghetti will cook the eggs and create a creamy sauce. If the sauce is too thick, add reserved pasta water a little at a time until desired consistency is reached.",
    //     "Serve immediately with additional grated Parmesan cheese and black pepper."
    //   ]
    // },
    // {
    //   id: 2,
    //   name: "Chicken Stir-Fry",
    //   image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    //   calories: 400,
    //   protein: 30,
    //   fat: 15,
    //   carbs: 35,
    //   description: "A flavorful dish made with tender chicken, fresh vegetables, and savory sauce.",
    //   instructions: [
    //     "Heat oil in a large skillet or wok over medium-high heat. Add diced chicken and cook until browned and cooked through.",
    //     "Add sliced vegetables to the skillet and stir-fry until tender-crisp.",
    //     "Pour sauce over chicken and vegetables, stirring to coat evenly. Cook for an additional 2-3 minutes until heated through.",
    //     "Serve hot over cooked rice or noodles."
    //   ]
    // },
    // {
    //   id: 3,
    //   name: "Vegetable Curry",
    //   image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    //   calories: 350,
    //   protein: 10,
    //   fat: 20,
    //   carbs: 40,
    //   description: "A fragrant and spicy dish made with a variety of vegetables and aromatic spices.",
    //   instructions: [
    //     "Heat oil in a large pot over medium heat. Add diced onions and cook until softened.",
    //     "Stir in curry paste and cook for 1-2 minutes until fragrant.",
    //     "Add chopped vegetables to the pot and stir to coat with the curry mixture.",
    //     "Pour in coconut milk and vegetable broth. Bring to a simmer and cook for 15-20 minutes until vegetables are tender.",
    //     "Serve hot over cooked rice or with naan bread."
    //   ]
    // },
    // {
    //   id: 4,
    //   name: "Grilled Salmon",
    //   image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    //   calories: 300,
    //   protein: 35,
    //   fat: 15,
    //   carbs: 10,
    //   description: "A healthy and flavorful dish featuring tender grilled salmon seasoned with herbs and lemon.",
    //   instructions: [
    //     "Preheat grill to medium-high heat. Brush salmon fillets with olive oil and season with salt, pepper, and herbs of your choice.",
    //     "Place salmon fillets on the grill and cook for 4-5 minutes per side, or until fish flakes easily with a fork.",
    //     "Remove from grill and squeeze fresh lemon juice over the salmon fillets before serving."
    //   ]
    // },
    // {
    //   id: 5,
    //   name: "Caprese Saladad" ,
    //   image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    //   calories: 200,
    //   protein: 10,
    //   fat: 15,
    //   carbs: 5,
    //   description: "A simple and refreshing salad made with ripe tomatoes, fresh mozzarella cheese, basil leaves, and balsamic glaze.",
    //   instructions: [
    //     "Slice tomatoes and fresh mozzarella cheese into rounds.",
    //     "Arrange tomato and mozzarella slices on a serving platter, alternating and overlapping them.",
    //     "Tuck fresh basil leaves between the tomato and cheese slices.",
    //     "Drizzle balsamic glaze over the salad just before serving."
    //   ]
    // }
];
