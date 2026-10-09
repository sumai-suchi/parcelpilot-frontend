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
        url: `${prefix}/users`,
      },
      {
        title: "Delivery Fleet",
        url: `${prefix}/fleet`,
      },
      {
        title: "Hub Management",
        url: `${prefix}/hubs`,
      },
      {
        title: "Revenue & Payments",
        url: `${prefix}/revenue`,
      },
      {
        title: "Role Applications",
        url: `${prefix}/applications`,
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
