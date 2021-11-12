import ApiService from "./api";
const BASE_URL = "http://localhost:8080";

const DifferService = {
  getTree(payload) {
    const headers = {
      'Content-Type': 'multipart/form-data'
    };
    return new Promise((resolve, reject) => {
      ApiService.post(`${BASE_URL}/api/get-tree`, payload, headers)
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    });
  },

  startDiffer(payload) {
    return new Promise((resolve, reject) => {
      ApiService.post(`${BASE_URL}/api/differ`, payload)
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }
}

export default DifferService;