// RecommendationFetcher.ks
import axios from 'axios';
// import he from 'he';

function parseImageUrls(imageString: string): string {
  if (!imageString) {
    return ''; // Or return a default image array if yweou have a default image
  }
  // Remove the R-style vector notation and split into array
  const cleanedString = imageString.replace('c("', '').replace('")', '');
  const urls = cleanedString.split('","');
  console.log(urls.map(url => decodeURIComponent(url.trim()))[0]);
  console.log(urls.map(url => decodeURIComponent(url.trim()))[0][0]);
  console.log("HELLOO");
  return urls.map(url => decodeURIComponent(url.trim()))[0];
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
        name: decodeURI(item.Name),
        image: parseImageUrls(item.Images), // Provide a default image if none exists here
        calories: item.Calories,
        protein: item.ProteinContent,
        fat: item.FatContent,
        carbs: item.CarbohydrateContent
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
        name: decodeURI(item.Name),
        image: parseImageUrls(item.Images), // Provide a default image if none exists here
        calories: item.Calories,
        protein: item.ProteinContent,
        fat: item.FatContent,
        carbs: item.CarbohydrateContent
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};
