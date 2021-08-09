import http from "../http-common";

const getAll = (params) => {
	return http.get("/posts", { params });
};

const getTag = (id, params) => {
	return http.get(`/tags/${id}`, { params });
};

const get = id => {
	return http.get(`/posts/${id}`);
};

const create = data => {
	return http.post("/posts", data);
};

const findByTitle = title => {
	return http.get(`/posts?title=${title}`);
};

export default {
	getAll,
	getTag,
	get,
	create,
	findByTitle
};
