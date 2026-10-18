const prefix = "/customer";

export const customerRoutes = [
  {
    title: "Shipments",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Create Shipment",
        url: `${prefix}/create-shipment`,
      },
      {
        title: "Track Shipment",
        url: `${prefix}/track-shipment`,
      },
      {
        title: "History of Shipment",
        url: `${prefix}/shipment-history`,
      },
      {
        title: "Delivery History",
        url: `${prefix}/delivery-history`,
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
