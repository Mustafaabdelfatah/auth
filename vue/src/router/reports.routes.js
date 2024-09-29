export default [
  {
    path: "/reports/builder",
    name: "reports-builder",
    meta: {
      auth: true,
      permissions: 'read-setting'
    },
    component: () =>
      import("@/pages/reports/builder/Builder.vue")
  },
  {
    path: "/reports/builder/show-builder",
    name: "reports-show-builder",
    meta: {
      auth: true,
      permissions: 'read-setting'
    },
    props: true,
    component: () =>
      import( "@/pages/reports/builder/ShowBuilder.vue")
  },
  {
    path: "/reports/drafted",
    name: "reports-drafted",
    meta: {
      auth: true,
      permissions: 'read-setting'
    },
    component: () =>
      import( "@/pages/reports/draft/Drafted.vue"),

  },
  {
    path: "/reports/drafted/show/:id",
    name: "show-drafted",
    meta: {
      auth: true,
      permissions: 'read-setting'
    },
    component: () =>
      import("@/pages/reports/draft/ShowDrafted.vue")
  },
  {
    path: "/reports/drafted/edit/:id",
    name: "reports-drafted-edit",
    meta: {
      auth: true,
      permissions: 'read-setting'
    },
    component: () =>
      import(
        "@/pages/reports/draft/EditDraft"
        )
  },
  {
    path: "/reports/pinned",
    name: "reports-pinned",
    meta: {
      auth: true,
      permissions: 'read-setting'
    },
    component: () =>
      import( "@/pages/reports/pinned/Pinned.vue"),
  },
  {
    path: "/reports/pinned/edit/:id",
    name: "reports-pinned-edit",
    meta: {
      auth: true,
      permissions: 'read-setting'
    },
    component: () =>
      import(
       "@/pages/reports/pinned/EditPin"
        )
  },
  {
    path: "/reports/pinned/show/:id",
    name: "report-pinned-show",
    meta: {
      auth: true,
      permissions: 'read-setting'
    },
    component: () =>
      import( "@/pages/reports/pinned/ShowPinned.vue")
  },

]
