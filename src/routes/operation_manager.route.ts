const prefix = "/operation_manager";

export const operationManagerRoutes = [
  {
    title: "Operations Command",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Pending Approvals",
        url: `${prefix}#pending`,
      },
      {
        title: "Active Dispatches",
        url: `${prefix}#active`,
      },
    ],
  },
  {
    title: "Fleet & Logistics",
    items: [
      {
        title: "All Shipments",
        url: `${prefix}#all`,
      },
      {
        title: "Hub Transfers",
        url: `${prefix}#transfers`,
      },
    ],
  },
];
