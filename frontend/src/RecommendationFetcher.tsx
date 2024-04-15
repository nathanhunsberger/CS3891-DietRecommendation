// RecommendationFetcher.ks
import axios from 'axios';
import he from 'he';

function parseImageUrls(imageString: string): string {
  if (!imageString || imageString === "character(0)") {
    return 'https://pixy.org/src/12/121481.jpg'; // default image
  }
  // console.log(imageString);
  // Remove the R-style vector notation and split into array
  const cleanedString = imageString.replace('c("', '').replace('")', '');
  const urls = cleanedString.split('", "');
  var image_to_use = urls.map(url => decodeURIComponent(url.trim()))[0];
  if (image_to_use.charAt(0) === '"'){
    image_to_use = image_to_use.substring(1,image_to_use.length - 1);
  }
  console.log(image_to_use);
  return image_to_use;
}

// Function to fetch seed recipes based on user inputs
export const fetchSeedRecipes = async (calories: any, protein: any, fat: any, carbs: any, freeInput: any) => {
  const params = new URLSearchParams({
    calories: calories.toString(),
    protein: protein.toString(),
    fat: fat.toString(),
    carbs: carbs.toString(),
    free_input: freeInput
  });

  try {
    const response = await axios.get(`http://127.0.0.1:8081/get-seeds?${params}`);
    if (response.data) {
      return response.data.map((item: any) => ({
        id: item.RecipeId,
        name: he.decode(item.Name),
        image: parseImageUrls(item.Images),
        calories: item.Calories,
        protein: item.ProteinContent,
        fat: item.FatContent,
        carbs: item.CarbohydrateContent,
        description: he.decode(item.Description)
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching seed recipes:', error);
    throw error; // Rethrowing the error or handling it as needed
  }
};

// Function to fetch all recommendations based on seed IDs and ratings
export const fetchRecommendations = async (seedIds: string[], ratings: string[]) => {
  const params = new URLSearchParams();
  seedIds.forEach(id => params.append('seed_ids', id));
  ratings.forEach(rate => params.append('ratings', rate));

  try {
    const response = await axios.get(`http://127.0.0.1:8081/get-all-recommendations?${params}`);
    if (response.data) {
      return response.data.map((item: any) => ({
        id: item.RecipeId,
        name: he.decode(item.Name),
        image: parseImageUrls(item.Images), // Provide a default image if none exists here
        calories: item.Calories,
        protein: item.ProteinContent,
        fat: item.FatContent,
        carbs: item.CarbohydrateContent,
        description: he.decode(item.Description),
        instructions: item.RecipeInstructions
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};
