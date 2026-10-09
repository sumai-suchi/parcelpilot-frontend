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
        title: "Pending Approval",
        url: `${prefix}/pending-approval`,
      },
      {
        title: "Active Dispatch",
        url: `${prefix}/active-dispatch`,
      },
    ],
  },
  {
    title: "Fleet & Logistics",
    items: [
      {
        title: "All Shipments",
        url: `${prefix}/all-shipments`,
      },
      {
        title: "Hub Transfer",
        url: `${prefix}/hub-transfers`,
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
