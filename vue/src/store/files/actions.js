import axios from "@/plugins/axios";

const actions = {
  async getFiles({ commit }, data) {
    const response = await axios.get("files", {
      params: {
        page: data.page,
        status: data.status
        // search: data.search,
        // pageSize: data.pageSize,
        // page: data.pageNumber
      }
    });
    const files = response?.data.data.file;
    commit("SET_FILES", files);
  },
  async getFile({ commit }, data) {
    const response = await axios.get("file-preview/{id}");
    const file = response?.data.data.data;
    commit("SET_FILE", file);
  },
  async uploadFile({ commit }, data) {
    const bodyFormData = new FormData();
    bodyFormData.append("name", data.name);
    bodyFormData.append("file", data.file);
    bodyFormData.append("size", data.file.size);
    console.log('Size => ', bodyFormData.get('size'))
    const response = await axios.post("file-upload", bodyFormData);
    console.log(response);
  },
  async uploadNewFile({ commit }, data) {
    const bodyFormData = new FormData();
    bodyFormData.append("file", data);
    const response = await axios.get("new-file", bodyFormData);
    commit("SET_NEW_FILE");
    console.log(response);
  }
};

export default actions;
