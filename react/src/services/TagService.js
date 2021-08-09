import http from "../http-common";

const getAll = (params) => {
  return http.get("/tags", { params });
};

const get = id => {
  return http.get(`/tags/${id}`);
};

export default {
  getAll,
  get
};
