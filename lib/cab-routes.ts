export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

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
  // Multi-stop circuits (grouped homepage cards — each still gets its own
  // full route page via the generic content generator below)
  "Lonavala & Khandala", "Karjat & Khopoli", "Trimbakeshwar & Nashik",
  "Shirdi & Shani Shingnapur", "Konkan", "Kolhapur – Jyotiba & Mahalakshmi",
  // Cities
  "Pune", "Aurangabad", "Nagpur", "Kolhapur", "Sangli", "Satara",
  "Solapur", "Nanded", "Latur", "Akola", "Amravati", "Jalgaon", "Dhule",
  "Ahmednagar",
  // Konkan coast
  "Ratnagiri", "Ganpatipule", "Chiplun", "Mahad", "Tarkarli",
  "Harihareshwar", "Shrivardhan", "Diveagar Beach", "Aare Ware Beach",
  // Kolhapur temple circuit
  "Jyotiba Temple", "Mahalakshmi Temple",
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

// Source of truth for individual vehicles: what a customer actually picks
// in the "Cab Type" dropdown, one row per exact vehicle/variant. `id` is
// the select value (kept short + unique since a couple of labels repeat
// across categories, e.g. "17 Seater" under both Tempo Traveller and Force
// Urbania). `rate` is ₹ per km; null means "On Request" (no per-km pricing,
// e.g. buses, Tempo Travellers, Prime cars).
export type VehicleRate = {
  id: string;
  category: string;
  label: string;
  rate: number | null;
};

export const vehicleRates: VehicleRate[] = [
  { id: "hb-wagonr", category: "Hatchback", label: "Maruti Suzuki Wagon R", rate: 13 },
  { id: "hb-celerio", category: "Hatchback", label: "Maruti Suzuki Celerio", rate: 13 },
  { id: "hb-tiago", category: "Hatchback", label: "Tata Tiago", rate: 13 },
  { id: "sd-dzire", category: "Sedan", label: "Maruti Suzuki Dzire", rate: 14 },
  { id: "sd-aura", category: "Sedan", label: "Hyundai Aura", rate: 14 },
  { id: "sd-accent", category: "Sedan", label: "Hyundai Accent", rate: 14 },
  { id: "sd-amaze", category: "Sedan", label: "Honda Amaze", rate: 14 },
  { id: "sdp-ciaz", category: "Sedan+", label: "Maruti Suzuki Ciaz", rate: 15 },
  { id: "sdp-etios", category: "Sedan+", label: "Toyota Etios", rate: 15 },
  { id: "suv-ertiga", category: "SUV", label: "Maruti Suzuki Ertiga", rate: 16 },
  { id: "suv-rumion", category: "SUV", label: "Toyota Rumion", rate: 16 },
  { id: "suv-carens", category: "SUV", label: "Kia Carens", rate: 17 },
  { id: "suvp-innova", category: "SUV+", label: "Toyota Innova", rate: 18 },
  { id: "suvp-crysta", category: "SUV+", label: "Toyota Innova Crysta", rate: 21 },
  { id: "suvp-hycross", category: "SUV+", label: "Toyota Innova Hycross", rate: 27 },
  { id: "suvp-fortuner", category: "SUV+", label: "Toyota Fortuner", rate: 35 },
  { id: "muv-scorpio", category: "MUV", label: "Mahindra Scorpio", rate: 20 },
  { id: "muv-bolero", category: "MUV", label: "Mahindra Bolero", rate: 20 },
  { id: "tt-12", category: "Tempo Traveller", label: "12 Seater", rate: null },
  { id: "tt-17", category: "Tempo Traveller", label: "17 Seater", rate: null },
  { id: "tt-20", category: "Tempo Traveller", label: "20 Seater", rate: null },
  { id: "tt-24", category: "Tempo Traveller", label: "24 Seater", rate: null },
  { id: "fu-10", category: "Force Urbania", label: "10 Seater", rate: null },
  { id: "fu-17", category: "Force Urbania", label: "17 Seater", rate: null },
  { id: "bus-35", category: "Bus", label: "35 Seater", rate: null },
  { id: "bus-40", category: "Bus", label: "40 Seater", rate: null },
  { id: "bus-45", category: "Bus", label: "45 Seater", rate: null },
  { id: "bus-55", category: "Bus", label: "55 Seater", rate: null },
  { id: "prime-mb", category: "Prime", label: "Mercedes-Benz", rate: null },
  { id: "prime-audi", category: "Prime", label: "Audi", rate: null },
  { id: "prime-bmw", category: "Prime", label: "BMW", rate: null },
];

function formatRate(rate: number | null) {
  return rate === null ? "On Request" : `₹${rate}/km`;
}

// Grouped view for FareTable / Fleet: one row per category+rate tier, with
// vehicle labels joined together (matches the published rate card layout).
export const fareRows = Object.values(
  vehicleRates.reduce<Record<string, { category: string; labels: string[]; rate: number | null }>>(
    (acc, v) => {
      const key = `${v.category}__${v.rate}`;
      if (!acc[key]) acc[key] = { category: v.category, labels: [], rate: v.rate };
      acc[key].labels.push(v.label);
      return acc;
    },
    {}
  )
).map((group) => ({
  category: group.category,
  vehicles: group.labels.join(", "),
  rate: formatRate(group.rate),
}));

// Distinct cab categories, in vehicleRates order, for grouping (e.g.
// <optgroup> labels in the booking widget's Cab Type dropdown).
export const cabTypes = Array.from(new Set(vehicleRates.map((v) => v.category)));

// Approximate one-way road distance from Mumbai, in km, keyed to the
// destination names above. These power the "Approx. Fare" estimate on the
// booking widget. There's no maps/distance API wired into this project, so
// these are planning-grade estimates from general knowledge rather than
// routed distances — please double-check the ones you know well before
// relying on them for real customer quotes, and adjust freely.
export const distanceFromMumbaiKm: Record<string, number> = {
  Shirdi: 185,
  Trimbakeshwar: 180,
  "Shani Shingnapur": 200,
  Bhimashankar: 130,
  Nashik: 165,
  Igatpuri: 125,
  Lonavala: 83,
  Khandala: 80,
  Mahabaleshwar: 247,
  Panchgani: 240,
  Matheran: 100,
  Alibaug: 95,
  Murud: 165,
  Karjat: 65,
  Khopoli: 75,
  Kamshet: 100,
  "Lonavala & Khandala": 82,
  "Karjat & Khopoli": 70,
  "Trimbakeshwar & Nashik": 170,
  "Shirdi & Shani Shingnapur": 190,
  "Kolhapur – Jyotiba & Mahalakshmi": 395,
  Pune: 150,
  Aurangabad: 335,
  Nagpur: 830,
  Kolhapur: 395,
  Sangli: 415,
  Satara: 250,
  Solapur: 400,
  Nanded: 580,
  Latur: 490,
  Akola: 560,
  Amravati: 660,
  Jalgaon: 400,
  Dhule: 300,
  Ahmednagar: 230,
  Ratnagiri: 330,
  Ganpatipule: 375,
  Chiplun: 245,
  Mahad: 165,
  Tarkarli: 545,
  Harihareshwar: 200,
  Shrivardhan: 190,
  "Diveagar Beach": 185,
  "Aare Ware Beach": 195,
  "Jyotiba Temple": 400,
  "Mahalakshmi Temple": 395,
  Thane: 25,
  Kalyan: 45,
  Bhiwandi: 40,
  Vasai: 50,
  Virar: 60,
  Panvel: 40,
  "Navi Mumbai": 30,
  Borivali: 25,
  Dadar: 15,
  Andheri: 20,
  Hinjewadi: 155,
  Wakad: 150,
  Kothrud: 160,
  Baner: 155,
  "Pune Airport": 150,
  "Nashik Airport": 165,
  "Shirdi Airport": 185,
  Surat: 285,
  Vapi: 170,
  Daman: 190,
  Ahmedabad: 525,
  Indore: 585,
  Goa: 605,
};

const distanceLookup = Object.fromEntries(
  Object.entries(distanceFromMumbaiKm).map(([name, km]) => [name.trim().toLowerCase(), km])
);

// Best-effort one-way distance between two free-text locations. Only
// resolves when one side is "Mumbai" and the other matches a known
// destination above (case-insensitive) — returns null otherwise, since we
// have no way to estimate distance between two arbitrary places.
export function estimateDistanceKm(from: string, to: string): number | null {
  const a = from.trim().toLowerCase();
  const b = to.trim().toLowerCase();
  if (!a || !b) return null;
  if (a === "mumbai" && distanceLookup[b] != null) return distanceLookup[b];
  if (b === "mumbai" && distanceLookup[a] != null) return distanceLookup[a];
  return null;
}

export const stateSlug = (state: string) => `cab-service-in-${slugify(state)}`;

// Named multi-stop circuits: destination name -> the individual places it
// covers. Used to make route pages for grouped destinations (e.g. "Konkan")
// list actual stops instead of just repeating the group name.
export const circuitStops: Record<string, string[]> = {
  "Lonavala & Khandala": ["Lonavala", "Khandala"],
  "Karjat & Khopoli": ["Karjat", "Khopoli"],
  "Trimbakeshwar & Nashik": ["Trimbakeshwar", "Nashik"],
  "Shirdi & Shani Shingnapur": ["Shirdi", "Shani Shingnapur"],
  "Kolhapur – Jyotiba & Mahalakshmi": ["Jyotiba Temple", "Mahalakshmi Temple"],
  Konkan: [
    "Harihareshwar",
    "Shrivardhan",
    "Diveagar Beach",
    "Aare Ware Beach",
    "Ganpatipule",
    "Alibaug",
  ],
};

// Given a route's from/to, find its circuit context if either side is a
// named circuit or one of that circuit's individual stops. Returns the
// circuit name, its full stop list, and the "anchor" (the other city in
// the pair) so callers can build links to sibling stops in the circuit.
export function getCircuitContext(from: string, to: string) {
  if (circuitStops[to]) return { name: to, stops: circuitStops[to], anchor: from };
  if (circuitStops[from]) return { name: from, stops: circuitStops[from], anchor: to };

  for (const [name, stops] of Object.entries(circuitStops)) {
    if (stops.includes(to)) return { name, stops, anchor: from };
    if (stops.includes(from)) return { name, stops, anchor: to };
  }

  return null;
}

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
  const circuit = getCircuitContext(from, to);
  const isCircuitHub = circuit !== null && to === circuit.name;
  const stopsList = circuit ? circuit.stops.join(", ") : undefined;

  const blog = {
    title: `Taxi Service ${from} to ${to} | Local & Outstation Cab`,
    paragraphs: [
      isCircuitHub
        ? `Book a cab from ${from} to ${to} 24×7 with Swami Tours. This circuit covers ${stopsList}, and our verified drivers and clean, well-maintained cars make every stop a smooth, on-time journey.`
        : `Book a cab from ${from} to ${to} 24×7 with Swami Tours. Our verified drivers and clean, well-maintained cars make the ${from}–${to} route a smooth, on-time journey every time.`,
      `Whether you need a one-way drop, a round trip, or a full-day local rental in ${to}, we quote the fare upfront with no hidden charges — pay only for what you book.`,
      `All ${from} to ${to} bookings can be made online or on call. We track your flight or train timing on airport and station transfers, so your driver is always ready when you arrive.`,
      `Choose from hatchbacks, sedans, SUVs and tempo travellers depending on group size and luggage. Every vehicle on the ${from}–${to} route is sanitised and serviced regularly.`,
    ],
  };

  const faqs = [
    { q: `How much does a cab from ${from} to ${to} cost?`, a: `Fares depend on vehicle type and trip type — see the fare table above for current one-way, round-trip and local rates.` },
    { q: `Is the ${from} to ${to} cab available 24x7?`, a: `Yes, bookings and pickups are available round the clock, including early morning airport transfers.` },
    { q: `Can I book a round trip from ${from} to ${to}?`, a: `Yes, round-trip bookings include waiting time and are priced lower per km than one-way trips.` },
    isCircuitHub
      ? { q: `Which places does the ${to} circuit cover?`, a: `This route covers ${stopsList}. Let us know your preferred order and stops, and we'll plan the itinerary around it.` }
      : { q: `Do you provide outstation cabs for ${to}?`, a: `Yes, we offer one-way and round-trip outstation cabs with experienced drivers familiar with the route.` },
  ];

  return { blog, faqs, circuit, isCircuitHub };
}