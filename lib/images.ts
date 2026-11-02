// Every Unsplash ID here has been verified (HTTP 200 + visually checked).
export const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  flood: "photo-1547683905-f686c993aae5", // flooded street, submerged cars
  responders: "photo-1617450365226-9bf28c04e130", // response team in orange vests
  aidTruck: "photo-1593113630400-ea4288922497", // truck offloading supplies
  foodLine: "photo-1599059813005-11265ba4b4ce", // gloved hands distributing food
  distribution: "photo-1609139003551-ee40f5f73ec0", // masked volunteers handing out parcels
  packing: "photo-1559027615-cd4628902d4a", // volunteers packing boxes
  water: "photo-1538300342682-cf57afb97285", // hands under running water
  kitBox: "photo-1541544181051-e46607bc22a4", // parcel in an open palm
  medical: "photo-1603398938378-e54eab446dde", // medical supplies + stethoscope
  hygiene: "photo-1584744982491-665216d95f8b", // sanitiser and mask
  children: "photo-1509099836639-18ba1795216d", // group of smiling children
  boy: "photo-1504159506876-f8338247a14a", // boy peeking over a ledge
  classroom: "photo-1567057419565-4349c49d8a04", // classroom in green uniforms
  volunteer: "photo-1544027993-37dbfe43562a", // volunteer from behind
  portrait: "photo-1504199367641-aba8151af406", // smiling man portrait
  handshake: "photo-1521791136064-7986c2920216", // partnership handshake
  meeting: "photo-1517048676732-d65bc937f952", // hands around a meeting table
  training: "photo-1524178232363-1fb2b075b655", // training room
  farmers: "photo-1574943320219-553eb213f72d", // farmers in a rice field
  holdingHands: "photo-1584515933487-779824d29309", // hands held, close-up
  clinic: "photo-1551601651-2a8555f1a136", // surgical team
  lab: "photo-1527613426441-4da17471b66d", // lab technician
  heartHands: "photo-1469571486292-0ba58a3f068b", // hands with red painted heart
  coins: "photo-1532629345422-7515f3d16bb6", // hands holding coins
} as const;

export const photo = (key: keyof typeof IMAGES, w = 1200) => img(IMAGES[key], w);
