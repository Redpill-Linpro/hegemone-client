import http from "../http-common";

class DataService {
    getAll() {
        return http.get("device-measurements?device_id=device1");
      }
}
export default new DataService();