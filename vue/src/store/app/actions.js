import axios from "@/plugins/axios";
import { makeToast } from "@/helpers";

const actions = {
  showToast({ state, commit }, message) {
    if (state.toast.show) commit("hideToast");

    setTimeout(() => {
      commit("showToast", {
        color: "black",
        message,
        timeout: 3000
      });
    });
  },
  showError({ state, commit }, { message = "Failed!", error }) {
    if (state.toast.show) commit("hideToast");

    setTimeout(() => {
      commit("showToast", {
        color: "error",
        message: message + " " + error.message,
        timeout: 10000
      });
    });
  },
  showSuccess({ state, commit }, message) {
    if (state.toast.show) commit("hideToast");

    setTimeout(() => {
      commit("showToast", {
        color: "success",
        message,
        timeout: 3000
      });
    });
  },

  addNotification({ commit }, notification) {
    commit("addNotification", notification);
  },



  setThemeConfig({ commit }, response) {
    const data = response?.data.data;
    const configs = {};
    data.forEach(({ key, value, full_url = null }) => {
      const newKey = key
        .split("_")
        .map((word, index) => {
          if (index !== 0) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }
          return word.toLowerCase();
        })
        .join("");
      configs[newKey] = full_url ? full_url : value;
    });
    commit("setThemeConfigs", configs);
  },
  async saveThemeConfig({ commit }, configs) {
    try {
      let settings = [];
      for (const key in configs) {
        settings.push({
          key: key,
          value: configs[key],
          group: "theme"
        });
      }
      return await axios.post("settings", {
        settings
      });
    } catch (error) {
      console.log(error);
    }
  },
  setBreadCrumb({ commit }, { breadcrumbs, pageTitle, pageDesc }) {
    // console.log('Desc => ', pageDesc, " Title => ", pageTitle)
    commit("setPageTitle", pageTitle);
    commit("setPageDesc", pageDesc);
    commit("setBreadCrumb", breadcrumbs);
  }
};

// const showToast = ({ state, commit }, message) => {
//   if (state.toast.show) commit('hideToast')

//   setTimeout(() => {
//     commit('showToast', {
//       color: 'black',
//       message,
//       timeout: 3000
//     })
//   })
// }

// const showError = ({ state, commit }, { message = 'Failed!', error }) => {
//   if (state.toast.show) commit('hideToast')

//   setTimeout(() => {
//     commit('showToast', {
//       color: 'error',
//       message: message + ' ' + error.message,
//       timeout: 10000
//     })
//   })
// }

// const showSuccess = ({ state, commit }, message) => {
//   if (state.toast.show) commit('hideToast')

//   setTimeout(() => {
//     commit('showToast', {
//       color: 'success',
//       message,
//       timeout: 3000
//     })
//   })
// }

// export default {
//   showToast,
//   showError,
//   showSuccess
// }

export default actions;
