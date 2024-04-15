import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'

export function useAxios() {
  async function get(endpoint: string) {
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching endpoint:', error);
      throw error;
    }
  }

  async function create(endpoint: string, data: any) {
    try {
      
      const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
      
      return response.data;
    } catch (error) {
      console.error('Error creating endpoint:', error);
      throw error;
    }
  }

  async function update(endpoint: string, id: number, data: any) {
    try {
      const response = await axios.put(`${BASE_URL}/${endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating endpoint:', error);
      throw error;
    }
  }

  async function remove(endpoint: string, id: number) {
    try {
      await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
    } catch (error) {
      console.error('Error deleting endpoint:', error);
      throw error;
    }
  }

  async function importFile(endpoint: string, file: File) {
    try {
      const formData = new FormData()
      formData.append('csv_file', file)
      
      const response = await axios.post(`${BASE_URL}/file/${endpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },

      });
      return response.data;
    } catch (error) {
      console.error('Error fetching endpoint:', error);
      throw error;
    }
  }

  async function exportFile(endpoint: string) {
    try {
      const response = await axios.get(`${BASE_URL}/file/${endpoint}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching endpoint:', error);
      throw error;
    }
  }

  return {
    get,
    create,
    update,
    remove,
    importFile,
    exportFile,
  };
}
