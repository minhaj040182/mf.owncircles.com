import { Video } from "./types";

export function parseViewCount(viewsStr?: string): number {
  if (!viewsStr) return 0;
  const str = viewsStr.toUpperCase().replace(/,/g, "");
  const match = str.match(/([\d.]+)\s*([KM]?)/);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  const multiplier = match[2] === "M" ? 1000000 : match[2] === "K" ? 1000 : 1;
  return num * multiplier;
}

export function sanitizeVideo(v: Video): Video {
  if (!v) return v;
  const getYouTubeId = (url: string) => {
    if (!url) return "";
    let videoId = "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2] && match[2].length === 11) {
      videoId = match[2];
    } else {
      const trimmed = url.trim();
      if (trimmed.length === 11) {
        videoId = trimmed;
      }
    }
    return videoId;
  };

  const videoUrl = v.videoUrl || "";
  const ytId = getYouTubeId(videoUrl) || "VRRy6XBfLQc";

  return {
    ...v,
    id: v.id || `video-${ytId}`,
    title: v.title || "Modern Fisheries Video",
    description: v.description || "",
    duration: v.duration || "12:00",
    views: v.views || "15.2K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: v.publishDate || "Recently",
    category: v.category || "RAS",
    likes: v.likes || 450,
    videoUrl: `https://www.youtube.com/embed/${ytId}`,
    thumbnail: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
  };
}

export const OWN_VIDEOS: Video[] = [
  {
    id: "own-1",
    title: "Fish Harvesting: 90% Profit Margin (1kg to 22.5kg)",
    description: "Showcasing high profit margins during commercial fish harvesting. We harvest large specimens ranging from 1kg up to 22.5kg.",
    thumbnail: "https://img.youtube.com/vi/Vk4LjqlbwnU/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Vk4LjqlbwnU",
    duration: "22:15",
    views: "34.1K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "3 months ago",
    category: "Harvesting",
    likes: 1200
  },
  {
    id: "own-2",
    title: "Harvesting Rohu, Carp, & Tilapia from Pond",
    description: "Complete harvesting video from our main earthen pond, netting a rich yield of Rohu, Carp, and Tilapia. Detailed discussion on pond preparation and feeds.",
    thumbnail: "https://img.youtube.com/vi/QycqPG5uQOQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/QycqPG5uQOQ",
    duration: "25:30",
    views: "21.6K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "4 months ago",
    category: "Harvesting",
    likes: 850
  },
  {
    id: "own-3",
    title: "Biofloc Water Preparation & Inoculation Masterclass",
    description: "Complete guide to preparing carbon source, probiotic inoculation, and maintaining floc volume in tarpaulin biofloc tanks.",
    thumbnail: "https://img.youtube.com/vi/Ho7avoab_oE/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Ho7avoab_oE",
    duration: "16:40",
    views: "19.5K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "5 months ago",
    category: "Biofloc",
    likes: 610
  },
  {
    id: "own-4",
    title: "Small Fish Farming - Start Smart, Earn More",
    description: "Start smart, earn more. Essential small-scale fish farming guidelines, tank setups, feeding cycles, and economic overview for tilapia, catfish, biofloc, and RAS.",
    thumbnail: "https://img.youtube.com/vi/VRRy6XBfLQc/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/VRRy6XBfLQc",
    duration: "15:20",
    views: "18.2K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "2 weeks ago",
    category: "Pond Setup",
    likes: 540
  },
  {
    id: "own-5",
    title: "Watermelon Balcony Garden Setup (Hydroponics)",
    description: "Growing watermelon on a balcony garden using simple hydroponic systems. Watch the root development, watering cycles, and flowering phase.",
    thumbnail: "https://img.youtube.com/vi/7IGmtzU4VQ8/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/7IGmtzU4VQ8",
    duration: "16:20",
    views: "15.4K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "3 months ago",
    category: "Hydroponics",
    likes: 620
  },
  {
    id: "own-6",
    title: "Protein Skimmer in RAS: Essential for Clean Water",
    description: "Why a protein skimmer is essential in recirculating aquaculture systems (RAS). Understand how dissolved organic solids are removed to secure clean water and healthy fish.",
    thumbnail: "https://img.youtube.com/vi/1m3JCJAZEn8/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/1m3JCJAZEn8",
    duration: "12:15",
    views: "14.3K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "1 month ago",
    category: "RAS",
    likes: 420
  },
  {
    id: "own-7",
    title: "Aquaponics Bed Construction & Plant Nitrogen Cycle",
    description: "Step-by-step setup of media beds, bell siphons, and balancing plant nutrient intake with fish waste in aquaponics.",
    thumbnail: "https://img.youtube.com/vi/i6ZfGWsCS8c/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/i6ZfGWsCS8c",
    duration: "17:50",
    views: "14.1K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "6 months ago",
    category: "Aquaponics",
    likes: 520
  },
  {
    id: "own-8",
    title: "Harvesting from Abandoned Tarpaulin Tank",
    description: "Recovering fish from an abandoned tarpaulin system. Let's see what survives and analyze the water quality of neglected systems.",
    thumbnail: "https://img.youtube.com/vi/PHPc3goGCwk/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/PHPc3goGCwk",
    duration: "14:10",
    views: "13.2K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "4 months ago",
    category: "Harvesting",
    likes: 412
  },
  {
    id: "own-9",
    title: "High-Density Catfish Feeding & Growth Management",
    description: "Detailed feeding schedules, feed conversion ratios (FCR), and water quality monitoring for intensive catfish culture.",
    thumbnail: "https://img.youtube.com/vi/JRuooOjHXQA/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/JRuooOjHXQA",
    duration: "13:25",
    views: "12.8K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "5 months ago",
    category: "Feeding",
    likes: 430
  },
  {
    id: "own-10",
    title: "Releasing Catfish into the Pond: Part 2",
    description: "The second part of our stocking guide: releasing catfish into the earthen pond, acclimatization techniques, and initial feeding behavior.",
    thumbnail: "https://img.youtube.com/vi/aKUm9S_r06A/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/aKUm9S_r06A",
    duration: "18:10",
    views: "11.2K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "2 months ago",
    category: "Pond Setup",
    likes: 350
  },
  {
    id: "own-11",
    title: "Diseases Prevention & Water Parameter Testing",
    description: "Identifying common fungal, bacterial, and parasite infections early. Testing pH, ammonia, nitrite, and dissolved oxygen accurately.",
    thumbnail: "https://img.youtube.com/vi/rGujFuFq4eg/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/rGujFuFq4eg",
    duration: "15:05",
    views: "10.4K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "6 months ago",
    category: "Diseases",
    likes: 380
  },
  {
    id: "own-12",
    title: "Water Overflow Solutions for House/RAS Tanks",
    description: "Detailed engineering and practical piping layout solutions to handle water overflow issues in backyard house tanks or RAS fish farming systems.",
    thumbnail: "https://img.youtube.com/vi/9nWm7dNKH1w/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/9nWm7dNKH1w",
    duration: "10:45",
    views: "9.5K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "3 weeks ago",
    category: "RAS",
    likes: 310
  },
  {
    id: "own-13",
    title: "Buying Catfish for Rs. 900/- to Stock in Pond",
    description: "Buying premium catfish seed for Rs. 900/- and transporting them to our farming pond. Tips on counting, health check, and density calculations.",
    thumbnail: "https://img.youtube.com/vi/TdRYdb4Id4U/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/TdRYdb4Id4U",
    duration: "11:50",
    views: "8.1K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "2 months ago",
    category: "Pond Setup",
    likes: 245
  },
  {
    id: "own-14",
    title: "Biofloc Tarpaulin Tank Repair and Reinforcement",
    description: "How to fix and repair leakages or structural damage in biofloc tarpaulin tanks. Learn how to strengthen the frame with PVC pipes for maximum longevity.",
    thumbnail: "https://img.youtube.com/vi/GY3LWXUScA0/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/GY3LWXUScA0",
    duration: "14:30",
    views: "7.8K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "1 month ago",
    category: "Biofloc",
    likes: 290
  },
  {
    id: "own-15",
    title: "High-Density Tilapia Seed Hatchery & Fry Management",
    description: "Setting up a mini fry hatchery unit for Monosex Tilapia. Learn broodstock selection, egg collection, and feeding freshly hatched fry.",
    thumbnail: "https://img.youtube.com/vi/Ho7avoab_oE/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Ho7avoab_oE",
    duration: "13:40",
    views: "7.2K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "2 months ago",
    category: "Breeding",
    likes: 260
  },
  {
    id: "own-16",
    title: "Pond Aeration & Venturi Nozzle Setup Guide",
    description: "How to assemble and install venturi aeration nozzles in earthen ponds and tank systems to boost dissolved oxygen efficiently.",
    thumbnail: "https://img.youtube.com/vi/1m3JCJAZEn8/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/1m3JCJAZEn8",
    duration: "11:15",
    views: "6.8K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "3 months ago",
    category: "Water Quality",
    likes: 230
  },
  {
    id: "own-17",
    title: "Automatic Fish Feeder Installation & Timer Settings",
    description: "Installing automated belt and solar timer fish feeders to maintain steady feed intervals for commercial fish tanks.",
    thumbnail: "https://img.youtube.com/vi/JRuooOjHXQA/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/JRuooOjHXQA",
    duration: "09:50",
    views: "6.1K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "3 months ago",
    category: "Feeding",
    likes: 210
  },
  {
    id: "own-18",
    title: "Pond Water Treatment with Lime & Potassium Permanganate",
    description: "Dosage calculations for agricultural lime (calcium carbonate) and potassium permanganate for water disinfection and pH stabilization.",
    thumbnail: "https://img.youtube.com/vi/rGujFuFq4eg/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/rGujFuFq4eg",
    duration: "12:10",
    views: "5.5K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "4 months ago",
    category: "Water Quality",
    likes: 195
  },
  {
    id: "own-19",
    title: "Installing Roots Blower & Aeration Grid for Biofloc",
    description: "Setting up a heavy-duty ring/roots blower with uniseal diffusers and air tubing grid for continuous high-DO aeration in biofloc tanks.",
    thumbnail: "https://img.youtube.com/vi/GY3LWXUScA0/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/GY3LWXUScA0",
    duration: "15:00",
    views: "4.9K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "4 months ago",
    category: "Biofloc",
    likes: 180
  },
  {
    id: "own-20",
    title: "Aquaponics NFT Channel Construction with PVC Pipes",
    description: "DIY guide to cutting, drilling, and assembling Nutrient Film Technique (NFT) channels using standard 4-inch PVC pipes for leafy greens.",
    thumbnail: "https://img.youtube.com/vi/i6ZfGWsCS8c/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/i6ZfGWsCS8c",
    duration: "14:20",
    views: "4.2K views",
    type: "own",
    creator: "Modern Fisheries",
    publishDate: "5 months ago",
    category: "Aquaponics",
    likes: 165
  }
].map(sanitizeVideo);

export const ALL_VIDEOS: Video[] = [...OWN_VIDEOS];

export const VIRAL_VIDEOS: Video[] = [...OWN_VIDEOS];

export const BIOFLOC_YOUTUBE_VIDEOS: Video[] = OWN_VIDEOS.filter(
  (v) => v.category === "Biofloc" || v.category === "Pond Setup" || v.category === "Water Quality"
);

export const RAS_YOUTUBE_VIDEOS: Video[] = OWN_VIDEOS.filter(
  (v) => v.category === "RAS" || v.category === "Water Quality" || v.category === "Pond Setup"
);

export function isVideoViral(video: Video): boolean {
  return parseViewCount(video.views) >= 15000;
}
