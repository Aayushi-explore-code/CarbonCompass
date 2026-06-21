import axios from "axios";
import { calculateFootprint, getRecommendations } from './services/api';

const API = axios.create({
  baseURL: "http://localhost:8000/api", // Added /api prefix here!
  headers: {
    "Content-Type": "application/json",
  },
});

// =======================
// Carbon Footprint
// =======================
export const calculateFootprint = async (data) => {
  try {
    const response = await API.post("/calculate", data);
    return response.data;
  } catch (error) {
    console.error("Calculate API Error:", error);
    throw error;
  }
};

// =======================
// Bill Extraction
// =======================
export const extractBill = async (formData) => {
  try {
    const response = await API.post("/extract-bill", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Extract Bill API Error:", error);
    throw error;
  }
};

// =======================
// Recommendations
// =======================
export const getRecommendations = async (data) => {
  try {
    const response = await API.post("/recommendations", data);
    return response.data;
  } catch (error) {
    console.error("Recommendations API Error:", error);
    throw error;
  }
};

export default API;