export type VideoType = "own" | "youtube";

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string; // Embed or iframe URL / mock player
  duration: string;
  views: string;
  type: VideoType;
  creator: string;
  publishDate: string;
  category: "Feeding" | "Water Quality" | "RAS" | "Biofloc" | "Breeding" | "Pond Setup" | "Diseases" | "Aquaponics" | "Hydroponics";
  likes: number;
}

export interface WaterLog {
  id: string;
  timestamp: string;
  ph: number;
  ammonia: number; // ppm
  temperature: number; // °C
  dissolvedOxygen: number; // mg/L
  notes?: string;
}

export interface CalculatorInput {
  species: "Tilapia" | "Catfish" | "Carp" | "Trout" | "Shrimp";
  stockingDensity: number; // fish per m3
  pondVolume: number; // m3
  averageWeight: number; // grams
  waterTemp: number; // °C
}

export interface CalculatorResult {
  totalFish: number;
  totalBiomass: number; // kg
  dailyFeedRequired: number; // kg
  feedType: string;
  estimatedHarvestWeight: number; // grams
  daysToHarvest: number;
  healthStatus: "Excellent" | "Optimal" | "Warning (Water Temp)" | "Critical (Temp)";
}
