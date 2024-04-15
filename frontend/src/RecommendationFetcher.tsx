// RecommendationFetcher.ks
import axios from 'axios';

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
    return response.data; // This assumes your server returns the data directly as JSON
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
    return response.data; // This assumes your server returns the data directly as JSON
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};
