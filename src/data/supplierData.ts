import { SupplierItem } from "../types";

/**
 * Authentic Commercial Aquaculture Supplier Directory
 * Strictly verified manufacturer listings only. No dummy, placeholder, or unverified simulated data.
 */
export const SUPPLIERS_DATABASE: SupplierItem[] = [];

export const INDIAN_STATES: string[] = [
  "All States (Pan-India)",
  "Andhra Pradesh",
  "West Bengal",
  "Maharashtra",
  "Punjab",
  "Kerala",
  "Odisha",
  "Gujarat",
  "Telangana",
  "Tamil Nadu",
  "Haryana",
  "Bihar",
  "Assam",
  "Uttar Pradesh",
  "Karnataka",
  "Rajasthan",
  "Madhya Pradesh",
  "Chhattisgarh"
];

export const CITIES_BY_STATE: Record<string, string[]> = {
  "Andhra Pradesh": ["All Cities", "Vijayawada", "Visakhapatnam", "Bhimavaram", "Kakinada", "Nellore", "Guntur", "Eluru"],
  "West Bengal": ["All Cities", "Kolkata", "Howrah", "Siliguri", "Midnapore", "Barasat", "Bardhaman", "Kharagpur"],
  "Maharashtra": ["All Cities", "Pune", "Mumbai", "Nagpur", "Nashik", "Aurangabad", "Kolhapur", "Thane"],
  "Punjab": ["All Cities", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
  "Kerala": ["All Cities", "Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam", "Alappuzha"],
  "Odisha": ["All Cities", "Bhubaneswar", "Cuttack", "Balasore", "Berhampur", "Rourkela", "Puri"],
  "Gujarat": ["All Cities", "Surat", "Ahmedabad", "Vadodara", "Rajkot", "Bhavnagar", "Veraval"],
  "Telangana": ["All Cities", "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Tamil Nadu": ["All Cities", "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Thoothukudi"],
  "Haryana": ["All Cities", "Karnal", "Panipat", "Ambala", "Hisar", "Rohtak", "Gurugram"],
  "Bihar": ["All Cities", "Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
  "Assam": ["All Cities", "Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Nagaon"],
  "Uttar Pradesh": ["All Cities", "Lucknow", "Kanpur", "Varanasi", "Prayagraj", "Agra", "Gorakhpur"],
  "Karnataka": ["All Cities", "Bengaluru", "Mangaluru", "Mysuru", "Hubballi", "Belagavi"],
  "Rajasthan": ["All Cities", "Jaipur", "Jodhpur", "Kota", "Udaipur", "Bikaner"],
  "Madhya Pradesh": ["All Cities", "Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
  "Chhattisgarh": ["All Cities", "Raipur", "Bilaspur", "Durg", "Bhilai", "Korba"]
};
