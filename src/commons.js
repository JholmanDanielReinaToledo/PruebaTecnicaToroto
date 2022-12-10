import * as turf from "@turf/turf";

const API_BASE_URL = 'http://localhost:3000/api';

export const getFarmers = async () => {
  const res = await fetch(`${API_BASE_URL}/farmers`)
  const data = await res.json()
  return data.data;
}

export const getFarmer = async (id) => {
  const res = await fetch(`${API_BASE_URL}/farmers/${id}`)
  const data = await res.json()
  return data.data;
}

export const getWorkIndicators = async () => {
  const res = await fetch(`${API_BASE_URL}/works`)
  const data = await res.json()
  return data.data;
}