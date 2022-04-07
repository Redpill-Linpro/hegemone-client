import http from "../http-common";

class DataService {
  getAll() {
    return http.get("device-measurements");
  }
  get(id) {
    return http.get(`device-measurements?device_id=${id}`);
  }
}
export default new DataService();