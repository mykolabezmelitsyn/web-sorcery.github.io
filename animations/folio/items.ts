export interface FolioItem {
  id: string;
  title: string;
  client: string;
  year: string;
  discipline: string;
  industry: string;
  imageId: string;
  imagePosition?: string;
  videoSrc?: string;
  summary: string;
  rating: number;
  reviewCount: number;
  reviewQuote: string;
  reviewer: string;
  awards?: string[];
  alt: string;
}

export const items: FolioItem[] = [
  {
    id: "stride",
    title: "Stride · Redline",
    client: "Stride Athletic",
    year: "2025",
    discipline: "Art Direction · Campaign",
    industry: "Footwear · Sport",
    imageId: "1542291026-7eec264c27ff",
    summary:
      "A monochrome launch campaign for a running shoe. Keeping the frame entirely red puts the focus on the silhouette, mesh and lacing.",
    rating: 5,
    reviewCount: 4,
    reviewQuote:
      "The shoe was unmistakable before we put a single word on the page.",
    reviewer: "Ellis Park · Brand Director, Stride Athletic",
    alt: "Red athletic shoe against a bright red background",
  },
  {
    id: "interval",
    title: "Interval · Series 01",
    client: "Interval Time",
    year: "2025",
    discipline: "Art Direction · Product",
    industry: "Watches · Accessories",
    imageId: "1523275335684-37898b6baf30",
    summary:
      "An understated product story for a first watch collection. Soft light and a restrained palette let the small details of the dial set the pace.",
    rating: 4.5,
    reviewCount: 3,
    reviewQuote:
      "The photography captured the simplicity we worked so hard to get right.",
    reviewer: "Nina Hale · Product Lead, Interval Time",
    alt: "Minimal wristwatch on a pale surface",
  },
  {
    id: "form",
    title: "Form · The Stool",
    client: "Form House",
    year: "2024",
    discipline: "Editorial · Photography",
    industry: "Furniture · Interiors",
    imageId: "1503602642458-232111445657",
    summary:
      "An editorial study for a furniture collection, using a quiet studio composition to show the profile of an everyday stool.",
    rating: 5,
    reviewCount: 2,
    reviewQuote:
      "The image made the line of the stool feel as deliberate as it is in person.",
    reviewer: "Iris Chen · Creative Lead, Form House",
    alt: "A pale wooden stool against a blue studio backdrop",
  },
  {
    id: "grain",
    title: "Grain · In Focus",
    client: "Grain Camera Co.",
    year: "2024",
    discipline: "Brand · Photography",
    industry: "Imaging · Electronics",
    imageId: "1516035069371-29a1b244cc32",
    summary:
      "A tactile campaign about the pleasure of holding a camera. The lens, controls and body take centre stage in the product imagery.",
    rating: 4.5,
    reviewCount: 5,
    reviewQuote:
      "It felt like a campaign for people who actually use their cameras.",
    reviewer: "Rory Bell · Marketing Lead, Grain Camera Co.",
    alt: "Camera and lens photographed as a product portrait",
  },
  {
    id: "first-light",
    title: "First Light · Coffee",
    client: "First Light Roasters",
    year: "2025",
    discipline: "Brand · Campaign",
    industry: "Coffee · Hospitality",
    imageId: "1495474472287-4d71bcdd2085",
    summary:
      "A visual identity and photo direction built around the first cup of the day. Warm textures and natural light carry through the campaign.",
    rating: 5,
    reviewCount: 6,
    reviewQuote:
      "It got the feeling of opening the café before sunrise exactly right.",
    reviewer: "Maya Reed · Founder, First Light Roasters",
    alt: "Three hands holding cups of coffee",
  },
  {
    id: "outbound",
    title: "Outbound · Routes",
    client: "Outbound",
    year: "2025",
    discipline: "Editorial · Campaign",
    industry: "Travel · Publishing",
    imageId: "1500530855697-b586d89ba3ee",
    summary:
      "An editorial campaign for a collection of driving routes. A single road disappearing into red rock sets the visual direction for the guide.",
    rating: 4.5,
    reviewCount: 7,
    reviewQuote:
      "The opening image gave the whole series a sense of distance and possibility.",
    reviewer: "Drew Miller · Editor, Outbound",
    alt: "An open road between red desert cliffs",
  },
  {
    id: "afterglow",
    title: "Afterglow · Eyewear",
    client: "Afterglow",
    year: "2024",
    discipline: "Art Direction · Editorial",
    industry: "Fashion · Eyewear",
    imageId: "1529139574466-a303027c1d8b",
    summary:
      "A summer eyewear editorial set against blocks of colour. A bright wardrobe and playful styling keep the frames at the centre of each shot.",
    rating: 5,
    reviewCount: 3,
    reviewQuote: "There was room for personality in every frame.",
    reviewer: "Avery Lin · Creative Director, Afterglow",
    alt: "Model in multicoloured sunglasses against a teal sky",
  },
  {
    id: "apex",
    title: "Apex · Open Road",
    client: "Apex Motor Club",
    year: "2024",
    discipline: "Campaign · Photography",
    industry: "Automotive · Culture",
    imageId: "1502877338535-766e1452684a",
    summary:
      "An automotive editorial about the space between destinations. Car photography led the campaign for the club’s weekend drives.",
    rating: 4.5,
    reviewCount: 4,
    reviewQuote: "It reminded us why the drive itself is the point.",
    reviewer: "Sasha Ford · Events Lead, Apex Motor Club",
    alt: "Side view of a blue coupe parked beside a brick storefront",
  },
  {
    id: "chroma",
    title: "Chroma · Colour Study",
    client: "Chroma Editions",
    year: "2025",
    discipline: "Art Direction · Print",
    industry: "Art · Publishing",
    imageId: "1541701494587-cb58502866ab",
    summary:
      "A print edition exploring the point where colours meet. Photographs of pigment in motion gave the covers their changing forms.",
    rating: 5,
    reviewCount: 5,
    reviewQuote: "The colour felt alive on the finished cover.",
    reviewer: "Jules Torres · Publisher, Chroma Editions",
    alt: "Swirls of blue, orange and red pigment against a dark background",
  },
];

const imageFiles = import.meta.glob<string>("./assets/photo-*.jpg", {
  eager: true,
  import: "default",
  query: "?url",
});

export function imageUrl(item: FolioItem) {
  return imageFiles[`./assets/photo-${item.imageId}.jpg`];
}
