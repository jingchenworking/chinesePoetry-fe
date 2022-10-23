import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/poems");
  }

  get(id) {
    return http.get(`/poems/${id}`);
  }

  create(data) {
    return http.post("/poems", data);
  }

  update(id, data) {
    return http.put(`/poems/${id}`, data);
  }

  delete(id) {
    return http.delete(`/poems/${id}`);
  }

  deleteAll() {
    return http.delete(`/poems`);
  }

  findByTitle(keyword, value) {
    return http.get(`/poems?keyword=${keyword}&value=${value}`);
  }
}

export default new TutorialDataService();