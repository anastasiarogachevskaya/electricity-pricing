import axios from 'axios';

const API_BASE_URL = 'https://api.porssisahko.net/v1';

export const getElectricityPrice = async (date, hour) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/price.json`, {
      params: {
        date,
        hour,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
