export const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal",
];

const destinations = [
  // Weekend & pilgrimage
  "Shirdi", "Trimbakeshwar", "Shani Shingnapur", "Bhimashankar", "Nashik",
  "Igatpuri", "Lonavala", "Khandala", "Mahabaleshwar", "Panchgani",
  "Matheran", "Alibaug", "Murud", "Karjat", "Khopoli", "Kamshet",
  // Cities
  "Pune", "Aurangabad", "Nagpur", "Kolhapur", "Sangli", "Satara",
  "Solapur", "Nanded", "Latur", "Akola", "Amravati", "Jalgaon", "Dhule",
  "Ahmednagar",
  // Konkan coast
  "Ratnagiri", "Ganpatipule", "Chiplun", "Mahad", "Tarkarli",
  // Mumbai suburbs & satellite towns
  "Thane", "Kalyan", "Bhiwandi", "Vasai", "Virar", "Panvel", "Navi Mumbai",
  "Borivali", "Dadar", "Andheri",
  // Pune suburbs
  "Hinjewadi", "Wakad", "Kothrud", "Baner",
  // Airports
  "Mumbai Airport", "Pune Airport", "Nashik Airport", "Shirdi Airport",
  // Out of state
  "Surat", "Vapi", "Daman", "Ahmedabad", "Indore", "Goa",
];

export const routes = destinations.flatMap((d) => [
  { from: "Mumbai", to: d },
  { from: d, to: "Mumbai" },
]);

export const routeSlug = (from: string, to: string) =>
  `${slugify(from)}-to-${slugify(to)}`;

export const fareRows = [
  { vehicle: "Hatchback — WagonR", capacity: "4 Seater", oneWay: "₹12/km", roundTrip: "₹11/km", local: "₹450" },
  { vehicle: "Sedan — Dzire, Etios", capacity: "4 Seater", oneWay: "₹14/km", roundTrip: "₹13/km", local: "₹550" },
  { vehicle: "SUV — Ertiga, Xylo", capacity: "6 Seater", oneWay: "₹17/km", roundTrip: "₹16/km", local: "₹700" },
  { vehicle: "Prime SUV — Innova", capacity: "7 Seater", oneWay: "₹20/km", roundTrip: "₹19/km", local: "₹900" },
];

export const stateSlug = (state: string) => `cab-service-in-${slugify(state)}`;

export function getStateContent(state: string) {
  const blog = {
    title: `Cab Service in ${state} | Local & Outstation Taxi`,
    paragraphs: [
      `Swami Tours provides reliable, 24×7 cab services across ${state}, covering local rides, outstation trips and airport transfers with verified drivers and clean, well-maintained cars.`,
      `Whether you need a one-way drop, a round trip, or a full-day local rental within ${state}, we quote the fare upfront with no hidden charges — pay only for what you book.`,
      `All bookings in ${state} can be made online or on call, and we track flight or train timings on airport and station transfers so your driver is always ready when you arrive.`,
      `Choose from hatchbacks, sedans, SUVs and tempo travellers depending on group size and luggage. Every vehicle serving ${state} is sanitised and serviced regularly.`,
    ],
  };

  const faqs = [
    { q: `Does Swami Tours operate cab services in ${state}?`, a: `Yes, we offer local, outstation, and airport cab services across ${state} with experienced, verified drivers.` },
    { q: `How much does a cab in ${state} cost?`, a: `Fares depend on vehicle type and trip type — see the fare table above for current one-way, round-trip and local rates.` },
    { q: `Are cabs in ${state} available 24x7?`, a: `Yes, bookings and pickups are available round the clock, including early morning airport transfers.` },
    { q: `Can I book a round trip within ${state}?`, a: `Yes, round-trip bookings include waiting time and are priced lower per km than one-way trips.` },
  ];

  return { blog, faqs };
}

export function getRouteContent(from: string, to: string) {
  const blog = {
    title: `Taxi Service ${from} to ${to} | Local & Outstation Cab`,
    paragraphs: [
      `Book a cab from ${from} to ${to} 24×7 with Swami Tours. Our verified drivers and clean, well-maintained cars make the ${from}–${to} route a smooth, on-time journey every time.`,
      `Whether you need a one-way drop, a round trip, or a full-day local rental in ${to}, we quote the fare upfront with no hidden charges — pay only for what you book.`,
      `All ${from} to ${to} bookings can be made online or on call. We track your flight or train timing on airport and station transfers, so your driver is always ready when you arrive.`,
      `Choose from hatchbacks, sedans, SUVs and tempo travellers depending on group size and luggage. Every vehicle on the ${from}–${to} route is sanitised and serviced regularly.`,
    ],
  };

  const faqs = [
    { q: `How much does a cab from ${from} to ${to} cost?`, a: `Fares depend on vehicle type and trip type — see the fare table above for current one-way, round-trip and local rates.` },
    { q: `Is the ${from} to ${to} cab available 24x7?`, a: `Yes, bookings and pickups are available round the clock, including early morning airport transfers.` },
    { q: `Can I book a round trip from ${from} to ${to}?`, a: `Yes, round-trip bookings include waiting time and are priced lower per km than one-way trips.` },
    { q: `Do you provide outstation cabs for ${to}?`, a: `Yes, we offer one-way and round-trip outstation cabs with experienced drivers familiar with the route.` },
  ];

  return { blog, faqs };
}