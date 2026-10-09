const prefix = "/hub_manager";

export const hubManagerRoutes = [
  {
    title: "Hub Operations",
    items: [
      {
        title: "Terminal Overview",
        url: `${prefix}`,
      },
      {
        title: "Sorting Operations",
        url: `${prefix}/sorting`,
      },
      {
        title: "Bay Inventory",
        url: `${prefix}/inventory`,
      },
      {
        title: "Inter-Hub Linehauls",
        url: `${prefix}/linehauls`,
      },
    ],
  },
  {
    title: "Account & Security",
    items: [
      {
        title: "View Profile",
        url: `${prefix}/profile`,
      },
    ],
  },
];
