const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Platform Administration",
    items: [
      {
        title: "Overview & Analytics",
        url: `${prefix}`,
      },
      {
        title: "Workforce & Users",
        url: `${prefix}`,
      },
      {
        title: "Delivery Fleet",
        url: `${prefix}`,
      },
      {
        title: "Hub Management",
        url: `${prefix}/hubs`,
      },
      {
        title: "Revenue & Payments",
        url: `${prefix}`,
      },
    ],
  },
];
