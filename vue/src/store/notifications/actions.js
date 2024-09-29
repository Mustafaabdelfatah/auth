import axios from "@/plugins/axios";

const actions = {

  addNotification({ commit }, notification) {
    commit("addNotification", notification);
  },
  readNotification({ commit }, ids) {
    commit("readNotification", ids);
  },

};


export default actions;
