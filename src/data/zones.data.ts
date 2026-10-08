export interface ZoneRegion {
  zoneCode: string;
  zoneName: string;
  city: string;
  areas: string[];
}

export const BANGLADESH_ZONES: ZoneRegion[] = [
  {
    zoneCode: "ZONE-DHK",
    zoneName: "Dhaka Metro Zone",
    city: "Dhaka",
    areas: [
      "Tejgaon",
      "Uttara",
      "Mirpur",
      "Motijheel",
      "Gulshan",
      "Banani",
      "Dhanmondi",
      "Mohammadpur",
      "Badda",
      "Khilkhet",
      "Gazipur",
      "Narayanganj",
      "Savar",
      "Keraniganj",
      "Rampura",
      "Bhashantek",
      "Farmgate",
      "Malibagh",
      "Wari",
      "Lalbagh",
    ],
  },
  {
    zoneCode: "ZONE-CTG",
    zoneName: "Chattogram Division Zone",
    city: "Chattogram",
    areas: [
      "Agrabad",
      "Nasirabad",
      "Kotwali",
      "Pahartali",
      "Halishahar",
      "GEC Circle",
      "Patenga",
      "Cox's Bazar",
      "Cumilla",
      "Feni",
      "Chandpur",
      "Brahmanbaria",
    ],
  },
  {
    zoneCode: "ZONE-BOG",
    zoneName: "Bogura & Northern Zone",
    city: "Bogura",
    areas: [
      "Bogura Sadar",
      "Sherpur",
      "Shajahanpur",
      "Santhahar",
      "Nandigram",
      "Dhunat",
      "Sariakandi",
      "Gabtali",
      "Shibganj",
    ],
  },
  {
    zoneCode: "ZONE-RAJ",
    zoneName: "Rajshahi Division Zone",
    city: "Rajshahi",
    areas: [
      "Shaheb Bazar",
      "Rajshahi Sadar",
      "Motihar",
      "Boalia",
      "Pabna Sadar",
      "Ishwardi",
      "Natore Sadar",
      "Sirajganj",
      "Naogaon",
      "Chapai Nawabganj",
    ],
  },
  {
    zoneCode: "ZONE-SYL",
    zoneName: "Sylhet Division Zone",
    city: "Sylhet",
    areas: [
      "Subidbazar",
      "Sylhet Sadar",
      "Amberkhana",
      "Zindabazar",
      "Habiganj Sadar",
      "Moulvibazar",
      "Sreemangal",
      "Sunamganj",
      "Beanibazar",
    ],
  },
  {
    zoneCode: "ZONE-KLN",
    zoneName: "Khulna & South-Western Zone",
    city: "Khulna",
    areas: [
      "KDA Avenue",
      "Khulna Sadar",
      "Sonadanga",
      "Khalishpur",
      "Daulatpur",
      "Jashore Sadar",
      "Benapole",
      "Satkhira",
      "Kushtia",
      "Jhenaidah",
      "Chuadanga",
    ],
  },
  {
    zoneCode: "ZONE-RNG",
    zoneName: "Rangpur Division Zone",
    city: "Rangpur",
    areas: [
      "Modern Mor",
      "Rangpur Sadar",
      "Dhap",
      "Medical East Gate",
      "Dinajpur Sadar",
      "Saidpur",
      "Kurigram",
      "Gaibandha",
      "Thakurgaon",
      "Panchagarh",
    ],
  },
  {
    zoneCode: "ZONE-BAR",
    zoneName: "Barishal Division Zone",
    city: "Barishal",
    areas: [
      "Barishal Sadar",
      "Band Road",
      "Launch Ghat Area",
      "Natullabad",
      "Rupatali",
      "Patuakhali",
      "Bhola",
      "Pirojpur",
      "Jhalokati",
      "Barguna",
    ],
  },
  {
    zoneCode: "ZONE-MYM",
    zoneName: "Mymensingh Division Zone",
    city: "Mymensingh",
    areas: [
      "Mymensingh Sadar",
      "Town Hall Mor",
      "Ganginarpar",
      "Chorpara",
      "Jamalpur Sadar",
      "Netrokona Sadar",
      "Sherpur Sadar",
      "Muktagacha",
    ],
  },
];

export function findZoneByCity(cityName: string): ZoneRegion | undefined {
  if (!cityName) return undefined;
  const normalized = cityName.trim().toLowerCase();
  return BANGLADESH_ZONES.find(
    (z) =>
      z.city.toLowerCase() === normalized ||
      z.zoneCode.toLowerCase() === normalized ||
      z.zoneName.toLowerCase().includes(normalized) ||
      normalized.includes(z.city.toLowerCase()),
  );
}
