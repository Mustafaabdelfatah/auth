export default [
  {
    path: "/ocr/files-list",
    name: "files_list",
    meta: {
      auth: true
    },
    component: () =>
      import(/* webpackChunkName: "files-list" */ "@/pages/files/FilesList.vue")
  },
  {
    path: "/ocr/files-details/:id",
    name: "file-details",
    meta: {
      auth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "files-list" */ "@/pages/files/FileDetails.vue"
      )
  }
];
