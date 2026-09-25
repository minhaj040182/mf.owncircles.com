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
  species: "Tilapia" | "Rohu" | "Catla" | "Pangasius" | "Mangur" | "Shrimp" | "Catfish" | "Carp" | "Trout";
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

export type FarmingSystemId = "ras" | "biofloc" | "pond" | "aquaponics" | "hatchery" | "cage";

export type EquipmentCategory = 
  | "aeration" 
  | "pumping" 
  | "filtration" 
  | "monitoring" 
  | "feeding" 
  | "handling" 
  | "processing";

export interface EquipmentItem {
  id: string;
  slug: string;
  name: string;
  category: EquipmentCategory;
  tagline: string;
  purpose: string;
  whyRequired: string;
  farmingSystems: FarmingSystemId[];
  applicableSpecies: string[];
  whenRequired: string;
  specificationGuidance: string;
  sizingGuidance: string;
  calculateRecommendedCapacity?: (volumeM3: number, biomassKg: number, fishCount: number) => {
    specification: string;
    unit: string;
    rationale: string;
  };
  powerConsiderations: string;
  maintenanceGuidance: string[];
  buyingChecklist: string[];
  commonMistakes: string[];
  relatedCalculatorId?: "volume" | "stocking" | "fcr" | "carbon" | "treatment" | "feed" | "profit" | "water";
  relatedArticlePath?: string;
  relatedArticleTitle?: string;
  importanceTier: "Essential (Core)" | "Highly Recommended" | "Advanced / Commercial";
  imageUrl?: string;
}

export type SupplierVerificationStatus = "Verified" | "Approved" | "Pending Review" | "Draft" | "Rejected";
export type SupplierTier = "Standard" | "Verified" | "Featured";

export interface SupplierItem {
  id: string;
  businessName: string;
  description: string;
  country: string; // "India"
  state: string;
  city: string;
  address: string;
  pinCode: string;
  equipmentCategories: EquipmentCategory[];
  equipmentSlugs: string[];
  serviceArea: string;
  panIndiaDelivery: boolean;
  phone: string;
  email: string;
  website?: string;
  verificationStatus: SupplierVerificationStatus;
  tier: SupplierTier;
  yearEstablished: number;
}

export interface QuoteRequestInquiry {
  id: string;
  timestamp: string;
  farmerName: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  farmingSystem: FarmingSystemId;
  equipmentSlugs: string[];
  notes?: string;
  farmVolumeM3?: number;
  biomassKg?: number;
}
