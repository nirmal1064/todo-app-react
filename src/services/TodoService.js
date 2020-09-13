import http from "../http-common";

class TodoService {
    getAll() {
        return http.get("/todo");
    }

    get(id) {
        return http.get(`/todo/${id}`);
    }

    getCompleted() {
        return http.get('/todo/completed');
    }

    getIncomplete() {
        return http.get('/todo/incomplete');
    }

    create(data) {
        return http.post("/todo", data);
    }

    update(id, data) {
        return http.put(`/todo/${id}`, data);
    }

    delete(id) {
        return http.delete(`/todo/${id}`);
    }

    deleteAll() {
        return http.delete('/todo')
    }

    findByTitle(title) {
        return http.get(`/todo?title=${title}`);
    }
}

export default new TodoService();
