import api from "../api/api";

const useApi = () => {
  const getData = async (url: string) => {
    try {
      const response = await api.get(url);
      return { data: response.data };
    } catch (error: any) {
      return error.message;
    }
  };
  
  const postData = async(url:string, body: object) => {
    try {
      const response = await api.post(url, body);
      return { status: response.status}
    } catch (error: any) {
      return error.message
    }
  }

  const deleteData = async(url: string) => {
    try {
      const response = await api.delete(url);
      return { status: response.status};
    } catch (error: any) {
      return error.message
    }
  }

  const editData = async(url: string, body: object) => {
    try {
      const response = await api.put(url, body);
      return { status: response.status};
    } catch (error: any) {
      return error.message;
    }
  }

  return {
    getData,
    postData,
    deleteData,
    editData
  };
};

export default useApi;
