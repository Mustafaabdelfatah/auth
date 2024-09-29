export default {
  // main navigation - side menu
  menu: [
    {
      icon: "mdi-view-dashboard-outline",
      key: "menu.dashboard",
      text: "dashboard",
      link: "/dashboard/analytics",
      permission: "read-drone",
      items: []
    },
    {
      icon: "mdi-file-multiple-outline",
      key: "menu.files_list",
      text: "Files",
      link: "/ocr/files-list",
      permission: "read-drone",
      items: []
    },
    // {
    //   icon: "mdi-form-textbox",
    //   text: "Files",
    //   key: "menu.ocr",
    //   items: [
    //     {
    //       icon: "mdi-cloud-upload-outline",
    //       text: "uploadFile",
    //       key: "menu.upload_file",
    //       link: "/ocr/upload-file",
    //       permission: "read-drone"
    //     },
    //     {
    //       icon: "mdi-form-textbox",
    //       text: "Files",
    //       key: "menu.files_list",
    //       link: "/ocr/files-list",
    //       permission: "read-drone"
    //     },
    //   ]
    // },
    {
      icon: "mdi-account-multiple-outline",
      text: "Users",
      key: "menu.users",
      permission: "read-user",
      link: "/users/list",
      items: []
    },
    {
      icon: "mdi-account-multiple-outline",
      text: "Users Management",
      key: "menu.usersManagement",
      items: [
        {
          icon: "mdi-account-multiple-outline",
          text: "Users",
          key: "menu.users",
          permission: "read-user",
          link: "/users/list"
        },
        {
          icon: "mdi-account-multiple-outline",
          text: "Roles",
          key: "menu.roles",
          permission: "read-role",
          link: "/roles/list"
        }
      ]
    },
    {
      icon: "mdi-cog-outline",
      key: "menu.settings",
      text: "Settings",
      items: [
        {
          key: "menu.general",
          text: "General",
          link: "/settings/general",
          permission: "read-setting"
        },
        {
          key: "menu.mailTemplate",
          text: "Mail Template",
          link: "/settings/mail-template",
          permission: "read-setting"
        },
        {
          key: "menu.mailServer",
          text: "Mail Server",
          link: "/settings/mail-server",
          permission: "read-setting"
        },
        // { key: 'menu.sms', link: '/settings/sms' },
        // {
        //   key: "menu.stations",
        //   text: "Station",
        //   link: "/settings/stations",
        //   permission: "read-location"
        // },
        // {
        //   key: "menu.detection_types",
        //   text: "Detection Type",
        //   link: "/settings/detection-types",
        //   permission: "read-type"
        // },
        // {
        //   key: "menu.drones",
        //   text: "Drones",
        //   link: "/settings/drones",
        //   permission: "read-drone"
        // },
        {
          key: "menu.logs",
          text: "Logs",
          link: "/settings/logs",
          permission: "read-drone"
        },
        {
          icon: "mdi-account-multiple-outline",
          text: "Roles",
          key: "menu.roles",
          permission: "read-role",
          link: "/roles/list"
        }
      ]
    }
  ]
};
