import httpService from "./http.service";

class CrudService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Get all items (GET request)
  getAll<T>() {
    return httpService.get<T>(this.endpoint);
  }

  // Get a single item by ID (GET request)
  getById<T>(id: string | number) {
    return httpService.get<T>(`${this.endpoint}/${id}`);
  }

  // Create a new item (POST request)
  create<T>(data: T) {
    return httpService.post<T>(this.endpoint, data);
  }

  // Update an existing item (PUT request)
  update<T>(id: string | number, data: T) {
    return httpService.put<T>(`${this.endpoint}/${id}`, data);
  }

  // Delete an item (DELETE request)
  delete(id: string | number) {
    return httpService.delete(`${this.endpoint}/${id}`);
  }
}

// Factory function to create instances of CrudService
const create = (endpoint: string) => new CrudService(endpoint);

export default create;
