import React, { useState, useEffect } from "react";
import FarmerDashboardView from "./FarmerDashboardView";
import {
  MapPin,
  Fish,
  Store,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  User,
  Phone,
  Mail,
  Lock,
  Sparkles,
  RefreshCw,
  LogOut,
  Edit3,
  Compass,
  Eye,
  EyeOff,
  UserPlus,
  KeyRound,
  Search,
  Filter,
  Package,
  MessageCircle,
  Send,
  X,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Check,
  Building2,
  Tag,
  DollarSign,
  Truck,
  CheckCircle,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Camera,
  Star,
  FileText,
  Globe,
  HelpCircle,
  Activity,
  Wind,
  Droplets,
  Clock,
  Award,
  TrendingUp,
  Layers,
} from "lucide-react";

interface RegisteredUser {
  id: number;
  full_name: string;
  phone: string;
  email?: string;
  village: string;
  district: string;
  role?: string;
  created_at?: string;
}

interface FarmingProfile {
  id?: number;
  user_id?: number;
  user_name?: string;
  phone?: string;
  farm_name: string;
  farm_type: string;
  water_area: string;
  pond_count: string;
  fish_species: string;
  village: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  experience_years: string;
  created_at?: string;
}

interface SupplierProfile {
  id?: number;
  user_id?: number;
  user_name?: string;
  phone?: string;
  business_name: string;
  category: string;
  contact_person: string;
  village: string;
  district: string;
  address: string;
  delivery_radius_km: number;
  whatsapp: string;
  license_number: string;
  latitude: number;
  longitude: number;
  created_at?: string;
}

type HubView =
  | "suppliers"
  | "register"
  | "login"
  | "select-profile-type"
  | "create-farming"
  | "create-supplier"
  | "profile-completed";

const TRENDING_CATEGORIES = [
  {
    name: "Paddle Wheel Aerators",
    category: "Aerators & Pond Machinery",
    icon: "Wind",
    badge: "Most Demanded",
    count: "42+ Verified Sellers",
  },
  {
    name: "Floating Fish Feed",
    category: "Fish Feed & Nutrition",
    icon: "Package",
    badge: "High FCR 1.25",
    count: "68+ Stockists",
  },
  {
    name: "Seeds & Fingerlings",
    category: "Fish Seed / Fingerlings",
    icon: "Fish",
    badge: "Certified Hatcheries",
    count: "35+ Suppliers",
  },
  {
    name: "Water DO & pH Kits",
    category: "Chemicals & Probiotics",
    icon: "Activity",
    badge: "Lab Grade Probes",
    count: "24+ Dealers",
  },
  {
    name: "Biofloc Probiotics",
    category: "Chemicals & Probiotics",
    icon: "Sparkles",
    badge: "Multi-Strain",
    count: "19+ Formulations",
  },
  {
    name: "Tarpaulin Tanks",
    category: "Tarpaulins & Tanks",
    icon: "Layers",
    badge: "550+ GSM HDPE",
    count: "28+ Fabricators",
  },
  {
    name: "Sludge Mud Pumps",
    category: "Pumps & Hardware",
    icon: "Droplets",
    badge: "Heavy Duty 1.5 HP",
    count: "31+ Suppliers",
  },
  {
    name: "Anti-Bird Nets",
    category: "Tarpaulins & Tanks",
    icon: "ShieldCheck",
    badge: "UV-Treated Mesh",
    count: "16+ Sellers",
  },
  {
    name: "Auto Fish Feeders",
    category: "Fish Feed & Nutrition",
    icon: "Clock",
    badge: "Solar Timer Feeders",
    count: "12+ Makers",
  },
  {
    name: "Venturi Air Jet Aerators",
    category: "Aerators & Pond Machinery",
    icon: "Wind",
    badge: "Submersible Turbo",
    count: "18+ Sellers",
  },
  {
    name: "Aquaculture Zeolite",
    category: "Chemicals & Probiotics",
    icon: "CheckCircle2",
    badge: "Ammonia Reducer",
    count: "40+ Stockists",
  },
  {
    name: "Harvesting Hapas",
    category: "Tarpaulins & Tanks",
    icon: "Package",
    badge: "Knotless Seine Nets",
    count: "22+ Weavers",
  },
];

export default function FarmerEcosystemPage() {
  // Session State - Default to "suppliers" so non-logged-in users can browse 50 KM suppliers & catalogue immediately
  const [currentUser, setCurrentUser] = useState<RegisteredUser | null>(null);
  const [activeFarmingProfile, setActiveFarmingProfile] = useState<FarmingProfile | null>(null);
  const [activeSupplierProfile, setActiveSupplierProfile] = useState<SupplierProfile | null>(null);
  const [view, setView] = useState<HubView>("suppliers");

  // Public 50 KM Exploration State (for non-logged-in users)
  const [publicSuppliers, setPublicSuppliers] = useState<any[]>([]);
  const [publicProducts, setPublicProducts] = useState<any[]>([]);
  const [publicRadius, setPublicRadius] = useState<number>(50);
  const [publicCategory, setPublicCategory] = useState<string>("All");
  const [publicSearch, setPublicSearch] = useState<string>("");
  const [publicSubTab, setPublicSubTab] = useState<"suppliers" | "catalogue">("suppliers");
  const [publicLat, setPublicLat] = useState<number>(22.65);
  const [publicLon, setPublicLon] = useState<number>(88.40);
  const [loadingPublic, setLoadingPublic] = useState<boolean>(false);
  const [showPublicInquiryModal, setShowPublicInquiryModal] = useState<boolean>(false);
  const [publicInquiryTarget, setPublicInquiryTarget] = useState<any>(null);
  const [selectedSupplierFilter, setSelectedSupplierFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Post Requirement (RFQ) Modal state
  const [showPostRequirementModal, setShowPostRequirementModal] = useState<boolean>(false);
  const [postReqTitle, setPostReqTitle] = useState("");
  const [postReqCategory, setPostReqCategory] = useState("Aerators & Pond Machinery");
  const [postReqQty, setPostReqQty] = useState("");
  const [postReqBudget, setPostReqBudget] = useState("");
  const [postReqLocation, setPostReqLocation] = useState("Within 50 KM Regional Hub");
  const [postReqPhone, setPostReqPhone] = useState("");
  const [postReqName, setPostReqName] = useState("");
  const [postReqNotes, setPostReqNotes] = useState("");
  const [postReqSubmitting, setPostReqSubmitting] = useState(false);
  const [postReqSuccess, setPostReqSuccess] = useState(false);
  const [postReqError, setPostReqError] = useState("");

  // Public Visitor Inquiry Form States
  const [publicInqName, setPublicInqName] = useState("");
  const [publicInqPhone, setPublicInqPhone] = useState("");
  const [publicInqQty, setPublicInqQty] = useState("1");
  const [publicInqNotes, setPublicInqNotes] = useState("");
  const [publicInqSubmitting, setPublicInqSubmitting] = useState(false);
  const [publicInqSuccess, setPublicInqSuccess] = useState(false);
  const [publicInqError, setPublicInqError] = useState("");

  // Registration Form State
  const [regFullName, setRegFullName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regVillage, setRegVillage] = useState("");
  const [regDistrict, setRegDistrict] = useState("");
  const [regPin, setRegPin] = useState("");

  // Login Form State
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [showLoginPin, setShowLoginPin] = useState(false);
  const [showRegPin, setShowRegPin] = useState(false);

  // Farming Profile Form State
  const [farmName, setFarmName] = useState("");
  const [farmType, setFarmType] = useState("Earthen Pond");
  const [waterArea, setWaterArea] = useState("");
  const [pondCount, setPondCount] = useState("1");
  const [fishSpecies, setFishSpecies] = useState("Rohu, Catla, Tilapia");
  const [farmVillage, setFarmVillage] = useState("");
  const [farmDistrict, setFarmDistrict] = useState("");
  const [farmAddress, setFarmAddress] = useState("");
  const [farmLat, setFarmLat] = useState<number>(20.9517);
  const [farmLon, setFarmLon] = useState<number>(85.0985);
  const [farmExperience, setFarmExperience] = useState("2-5 Years");

  // Supplier Profile Form State
  const [bizName, setBizName] = useState("");
  const [bizCategory, setBizCategory] = useState("Fish Feed & Nutrition");
  const [bizContactPerson, setBizContactPerson] = useState("");
  const [bizVillage, setBizVillage] = useState("");
  const [bizDistrict, setBizDistrict] = useState("");
  const [bizAddress, setBizAddress] = useState("");
  const [bizDeliveryRadius, setBizDeliveryRadius] = useState<number>(50);
  const [bizWhatsapp, setBizWhatsapp] = useState("");
  const [bizLicense, setBizLicense] = useState("");
  const [bizLat, setBizLat] = useState<number>(20.9517);
  const [bizLon, setBizLon] = useState<number>(85.0985);

  // Status & Feedback States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [gpsDetecting, setGpsDetecting] = useState(false);

  // Database Connection Status
  const [dbStatus, setDbStatus] = useState<{
    connected: boolean;
    message: string;
    checkedAt: string;
  }>({
    connected: true,
    message: "Connecting to database...",
    checkedAt: new Date().toLocaleTimeString(),
  });

  // Restore saved session on mount if available
  useEffect(() => {
    checkDatabaseStatus();
    const savedUserJson = localStorage.getItem("mf_farmer_hub_user");
    if (savedUserJson) {
      try {
        const u = JSON.parse(savedUserJson);
        if (u && (u.phone || u.email)) {
          fetchUserAndProfiles(u.phone || u.email);
        }
      } catch (e) {
        console.error("Error reading saved user session", e);
      }
    } else {
      const lastPhone = localStorage.getItem("mf_last_login_phone");
      if (lastPhone) {
        setLoginPhone(lastPhone);
      }
    }
  }, []);

  const checkDatabaseStatus = async () => {
    try {
      const res = await fetch("/api/db/status");
      const data = await res.json();
      if (data && data.mysql) {
        setDbStatus({
          connected: data.mysql.connected,
          message: data.mysql.message,
          checkedAt: new Date().toLocaleTimeString(),
        });
      }
    } catch {
      setDbStatus({
        connected: false,
        message: "Server connected (Local persistent mode active)",
        checkedAt: new Date().toLocaleTimeString(),
      });
    }
  };

  const fetchUserAndProfiles = async (phone: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user-profile/${encodeURIComponent(phone)}`);
      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        setActiveFarmingProfile(data.farming_profile || null);
        setActiveSupplierProfile(data.supplier_profile || null);

        if (data.farming_profile || data.supplier_profile) {
          setView("profile-completed");
        } else {
          setView("select-profile-type");
        }
      }
    } catch (e) {
      console.error("Could not fetch user profile", e);
    } finally {
      setLoading(false);
    }
  };

  // GPS auto-detection
  const detectGPSLocation = (type: "farm" | "supplier") => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setGpsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = parseFloat(pos.coords.latitude.toFixed(6));
        const lon = parseFloat(pos.coords.longitude.toFixed(6));
        if (type === "farm") {
          setFarmLat(lat);
          setFarmLon(lon);
        } else {
          setBizLat(lat);
          setBizLon(lon);
        }
        setGpsDetecting(false);
      },
      () => {
        setGpsDetecting(false);
        alert("Unable to fetch exact GPS location. Default coordinates kept.");
      },
      { timeout: 8000 }
    );
  };

  // Fetch public 50 KM suppliers & catalogue on mount & filter changes
  useEffect(() => {
    if (!currentUser) {
      fetchPublicData();
    }
  }, [publicLat, publicLon, publicRadius, publicCategory, publicSearch, currentUser]);

  const fetchPublicData = async () => {
    try {
      setLoadingPublic(true);
      const catParam = publicCategory === "All" ? "" : encodeURIComponent(publicCategory);
      const searchParam = encodeURIComponent(publicSearch.trim());
      const radiusParam = publicRadius >= 200 ? "all" : publicRadius;

      const [supRes, eqRes] = await Promise.all([
        fetch(`/api/suppliers?lat=${publicLat}&lon=${publicLon}&radius_km=${radiusParam}&category=${catParam}&search=${searchParam}`),
        fetch(`/api/equipment?all=true&lat=${publicLat}&lon=${publicLon}&radius_km=${radiusParam}&category=${catParam}&search=${searchParam}`),
      ]);

      const supData = await supRes.json();
      const eqData = await eqRes.json();

      if (supData && supData.success && Array.isArray(supData.suppliers)) {
        setPublicSuppliers(supData.suppliers);
      }
      if (eqData && eqData.success && Array.isArray(eqData.equipment)) {
        setPublicProducts(eqData.equipment);
      }
    } catch (err) {
      console.error("Error loading public supplier ecosystem:", err);
    } finally {
      setLoadingPublic(false);
    }
  };

  const detectPublicGPS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setGpsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = parseFloat(pos.coords.latitude.toFixed(6));
        const lon = parseFloat(pos.coords.longitude.toFixed(6));
        setPublicLat(lat);
        setPublicLon(lon);
        setGpsDetecting(false);
        setSuccessMsg(`Detected your GPS: ${lat}, ${lon}. Updating 50 KM regional suppliers...`);
      },
      () => {
        setGpsDetecting(false);
        alert("Unable to detect precise GPS. Retaining South Bengal / Kolkata regional center.");
      },
      { timeout: 8000 }
    );
  };

  const handleOpenPublicInquiry = (item: any, type: "equipment" | "supplier") => {
    setPublicInquiryTarget({
      type,
      id: item.id,
      title: item.title || item.business_name,
      category: item.category,
      price: item.price,
      unit: item.unit,
      seller_name: item.seller_name || item.business_name,
      phone: item.phone || item.whatsapp || "9831102941",
      whatsapp: item.whatsapp || item.phone || "9831102941",
      distanceKm: item.distanceKm,
    });
    setPublicInqQty("1");
    setPublicInqNotes("");
    setPublicInqSuccess(false);
    setPublicInqError("");
    setShowPublicInquiryModal(true);
  };

  const handleSendPublicInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicInquiryTarget) return;

    if (!publicInqName.trim() || !publicInqPhone.trim()) {
      setPublicInqError("Please provide your Name and 10-digit Mobile Number.");
      return;
    }

    try {
      setPublicInqSubmitting(true);
      setPublicInqError("");

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_type: publicInquiryTarget.type || "equipment",
          target_id: publicInquiryTarget.id,
          target_title: publicInquiryTarget.title || publicInquiryTarget.seller_name,
          seller_phone: publicInquiryTarget.phone || "",
          buyer_name: publicInqName.trim(),
          buyer_phone: publicInqPhone.trim(),
          quantity_required: publicInqQty.trim() || "1",
          offered_price_per_unit: publicInquiryTarget.price || 0,
          total_budget: 0,
          buyer_notes: publicInqNotes.trim() || `Inquiry from visitor for ${publicInquiryTarget.title}`,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setPublicInqError(data.error || "Failed to submit inquiry.");
        return;
      }

      setPublicInqSuccess(true);
    } catch {
      setPublicInqError("Network error. Please try again or contact via phone/WhatsApp.");
    } finally {
      setPublicInqSubmitting(false);
    }
  };

  const handlePostPublicRequirement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postReqTitle.trim() || !postReqPhone.trim()) {
      setPostReqError("Please specify the item title and your 10-digit mobile number.");
      return;
    }

    try {
      setPostReqSubmitting(true);
      setPostReqError("");

      const res = await fetch("/api/requirements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: postReqPhone.trim(),
          buyer_name: postReqName.trim() || "Verified Buyer / Farmer",
          title: postReqTitle.trim(),
          category: postReqCategory,
          quantity_required: postReqQty.trim() || "1 Set / Batch",
          target_budget: Number(postReqBudget) || 0,
          location: postReqLocation.trim() || "South Bengal 50 KM Hub",
          urgency: "Immediate (Within 48 hrs)",
          specs: postReqNotes.trim() || "Buyer seeking best wholesale quotes and doorstep delivery from regional verified suppliers.",
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setPostReqError(data.error || "Failed to post requirement.");
        return;
      }

      setPostReqSuccess(true);
    } catch {
      setPostReqError("Network error. Please try again or submit via phone.");
    } finally {
      setPostReqSubmitting(false);
    }
  };

  // Step 1: Submit Registration Form
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!regFullName.trim() || !regPhone.trim() || !regVillage.trim() || !regDistrict.trim()) {
      setErrorMsg("Please fill in all required fields (Full Name, Phone, Village, District).");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: regFullName.trim(),
          phone: regPhone.trim(),
          email: regEmail.trim(),
          village: regVillage.trim(),
          district: regDistrict.trim(),
          pin_password: regPin.trim() || "1234",
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setErrorMsg(data.error || "Registration failed. Please try again.");
        return;
      }

      setCurrentUser(data.user);
      localStorage.setItem("mf_farmer_hub_user", JSON.stringify(data.user));
      localStorage.setItem("mf_last_login_phone", data.user.phone || regPhone.trim());

      // If user was already existing in the system, load their profile
      if (data.isExisting) {
        setActiveFarmingProfile(data.farming_profile || null);
        setActiveSupplierProfile(data.supplier_profile || null);
        if (data.farming_profile || data.supplier_profile) {
          setView("profile-completed");
          setSuccessMsg(`Welcome back, ${data.user.full_name}! Your profile was loaded successfully.`);
          return;
        }
      }

      // Pre-fill location fields for convenience
      setFarmVillage(data.user.village || regVillage);
      setFarmDistrict(data.user.district || regDistrict);
      setBizVillage(data.user.village || regVillage);
      setBizDistrict(data.user.district || regDistrict);
      setBizContactPerson(data.user.full_name || regFullName);
      setBizWhatsapp(data.user.phone || regPhone);

      // Once registered, ask to create Farming Profile or Supplier Profile
      setView("select-profile-type");
      setSuccessMsg(
        data.message ||
          (regEmail.trim()
            ? `Registration successful! An activation link has been sent to ${regEmail.trim()}. Please check your inbox or spam folder to activate your account.`
            : "Registration successful! Choose your profile type.")
      );
    } catch {
      setErrorMsg("Network error connecting to database. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!loginPhone.trim()) {
      setErrorMsg("Please enter your registered mobile number or email.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: loginPhone.trim(),
          phone: loginPhone.trim(),
          pin_password: loginPin.trim(),
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setErrorMsg(data.error || "Login failed. Account not found.");
        return;
      }

      setCurrentUser(data.user);
      setActiveFarmingProfile(data.farming_profile || null);
      setActiveSupplierProfile(data.supplier_profile || null);
      localStorage.setItem("mf_farmer_hub_user", JSON.stringify(data.user));
      localStorage.setItem("mf_last_login_phone", data.user.phone || loginPhone.trim());

      if (data.farming_profile || data.supplier_profile) {
        setView("profile-completed");
        setSuccessMsg(data.message || `Welcome back, ${data.user.full_name}!`);
      } else {
        setView("select-profile-type");
        setSuccessMsg(data.message || "Login successful! Please create your profile.");
      }
    } catch {
      setErrorMsg("Failed to communicate with database.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2a: Submit Farming Profile
  const handleCreateFarmingProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!currentUser) {
      setView("register");
      return;
    }

    if (!farmName.trim() || !waterArea.trim()) {
      setErrorMsg("Please provide your Farm / Pond Name and Total Water Area.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/profile/farming", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUser.id,
          user_name: currentUser.full_name,
          phone: currentUser.phone,
          farm_name: farmName.trim(),
          farm_type: farmType,
          water_area: waterArea.trim(),
          pond_count: pondCount.trim(),
          fish_species: fishSpecies.trim(),
          village: farmVillage.trim() || currentUser.village,
          district: farmDistrict.trim() || currentUser.district,
          address: farmAddress.trim(),
          latitude: farmLat,
          longitude: farmLon,
          experience_years: farmExperience,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setErrorMsg(data.error || "Failed to save farming profile.");
        return;
      }

      setActiveFarmingProfile(data.profile);
      // STOP HERE - We will decide next
      setView("profile-completed");
      setSuccessMsg("Farming Profile registered & saved to database successfully!");
    } catch {
      setErrorMsg("Network error saving farming profile.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2b: Submit Supplier Profile
  const handleCreateSupplierProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!currentUser) {
      setView("register");
      return;
    }

    if (!bizName.trim() || !bizCategory.trim()) {
      setErrorMsg("Please provide your Business Name and Supply Category.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/profile/supplier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUser.id,
          user_name: currentUser.full_name,
          phone: currentUser.phone,
          business_name: bizName.trim(),
          category: bizCategory,
          contact_person: bizContactPerson.trim() || currentUser.full_name,
          village: bizVillage.trim() || currentUser.village,
          district: bizDistrict.trim() || currentUser.district,
          address: bizAddress.trim(),
          delivery_radius_km: bizDeliveryRadius,
          whatsapp: bizWhatsapp.trim() || currentUser.phone,
          license_number: bizLicense.trim(),
          latitude: bizLat,
          longitude: bizLon,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setErrorMsg(data.error || "Failed to save supplier profile.");
        return;
      }

      setActiveSupplierProfile(data.profile);
      // STOP HERE - We will decide next
      setView("profile-completed");
      setSuccessMsg("Supplier Profile registered & saved to database successfully!");
    } catch {
      setErrorMsg("Network error saving supplier profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    const lastPhone = currentUser?.phone || loginPhone || regPhone;
    if (lastPhone) {
      localStorage.setItem("mf_last_login_phone", lastPhone);
      setLoginPhone(lastPhone);
    }
    localStorage.removeItem("mf_farmer_hub_user");
    setCurrentUser(null);
    setActiveFarmingProfile(null);
    setActiveSupplierProfile(null);
    setView("login");
    setErrorMsg("");
    setSuccessMsg("You have logged out successfully. Enter your mobile or PIN to log back in.");
  };

  const filteredSuppliers = publicSuppliers.filter((s) => {
    if (publicCategory !== "All" && !s.category?.toLowerCase().includes(publicCategory.toLowerCase())) {
      return false;
    }
    if (publicSearch.trim()) {
      const q = publicSearch.toLowerCase();
      const matchName = s.business_name?.toLowerCase().includes(q);
      const matchContact = s.contact_person?.toLowerCase().includes(q);
      const matchDist = s.district?.toLowerCase().includes(q);
      const matchVil = s.village?.toLowerCase().includes(q);
      const matchCat = s.category?.toLowerCase().includes(q);
      if (!matchName && !matchContact && !matchDist && !matchVil && !matchCat) return false;
    }
    return true;
  });

  const filteredProducts = publicProducts.filter((p) => {
    if (selectedSupplierFilter && p.seller_name !== selectedSupplierFilter) {
      return false;
    }
    if (publicCategory !== "All" && !p.category?.toLowerCase().includes(publicCategory.toLowerCase())) {
      return false;
    }
    if (publicSearch.trim()) {
      const q = publicSearch.toLowerCase();
      const matchTitle = p.title?.toLowerCase().includes(q);
      const matchDesc = p.description?.toLowerCase().includes(q);
      const matchSeller = p.seller_name?.toLowerCase().includes(q);
      const matchCat = p.category?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchSeller && !matchCat) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full">
      {/* FULL-SCREEN SINGLE LINE SEARCH BAR DIRECTLY AFTER HEADER */}
      {!currentUser && view === "suppliers" && (
        <div className="w-full bg-white border-b border-slate-200/90 shadow-xs sticky top-0 z-30">
          <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
            <div className="flex items-center gap-2 sm:gap-3 w-full">
              {/* Location Selector Dropdown */}
              <div className="relative shrink-0 w-32 sm:w-48 lg:w-56">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={publicRadius}
                  onChange={(e) => setPublicRadius(Number(e.target.value))}
                  className="w-full pl-7 sm:pl-9 pr-6 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer appearance-none truncate transition-colors"
                >
                  <option value={25}>📍 Within 25 KM</option>
                  <option value={50}>📍 Within 50 KM (Hub)</option>
                  <option value={100}>📍 Within 100 KM</option>
                  <option value={200}>📍 All Regional Districts</option>
                </select>
                <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">▼</div>
              </div>

              {/* Main Search Input */}
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="Search products, machinery, feed, seeds (e.g. 2 HP Aerator, 32% Feed, Fingerlings)..."
                  value={publicSearch}
                  onChange={(e) => setPublicSearch(e.target.value)}
                  className="w-full pl-3.5 sm:pl-4 pr-16 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50/70 hover:bg-white focus:bg-white transition-colors"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {publicSearch && (
                    <button
                      onClick={() => setPublicSearch("")}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <Camera className="w-4 h-4 text-slate-400 hidden sm:block" />
                </div>
              </div>

              {/* Get Best Price CTA Button */}
              <button
                type="button"
                onClick={() => setShowPostRequirementModal(true)}
                className="px-3.5 sm:px-5 py-2 sm:py-2.5 bg-[#00a699] hover:bg-[#008f84] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap"
              >
                <span>Get Best Price</span>
              </button>

              {/* Quick Actions (Sell, Post RFQ, Sign In) in single line */}
              <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 shrink-0 pl-1 sm:pl-2 border-l border-slate-200">
                <button
                  onClick={() => setView("register")}
                  className="px-2.5 sm:px-3 py-2 text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-50 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <Store className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sell</span>
                </button>

                <button
                  onClick={() => setShowPostRequirementModal(true)}
                  className="px-2.5 sm:px-3 py-2 text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-50 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Post RFQ</span>
                </button>

                <button
                  onClick={() => {
                    setErrorMsg("");
                    setSuccessMsg("");
                    setView("login");
                  }}
                  className="px-2.5 sm:px-3 py-2 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Sign In</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="py-6 sm:py-8 px-3 sm:px-6 lg:px-8 flex-1">
        <div className={`${view === "suppliers" && !currentUser ? "max-w-7xl" : "max-w-4xl"} mx-auto space-y-6`}>

        {/* PHOTO 1: INDIA'S LARGEST B2B MARKETPLACE HERO BANNER & TRENDING GRID */}
        {!currentUser && view === "suppliers" && (
          <div className="bg-gradient-to-r from-[#172554] via-[#1e3a8a] to-[#1e1b4b] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-blue-800/40 relative overflow-hidden space-y-6 sm:space-y-8">
            {/* Ambient circular glow background */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Banner Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2 max-w-2xl">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  India's Largest Online <span className="text-white font-black underline decoration-amber-400 decoration-wavy decoration-2">B2B Marketplace</span>
                </h1>
                <p className="text-sm sm:text-base text-blue-100/90 font-medium">
                  Connecting 50,000+ Fish Farmers with Trusted Local Sellers within 50 KM
                </p>
              </div>

              {/* The 3 White Pill Buttons from Photo 1 */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
                <button
                  onClick={() => setShowPostRequirementModal(true)}
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 text-blue-900 font-black text-xs sm:text-sm rounded-full shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2 hover:scale-103"
                >
                  <FileText className="w-4 h-4 text-blue-700" />
                  <span>Post Requirement →</span>
                </button>

                <button
                  onClick={() => {
                    setErrorMsg("");
                    setSuccessMsg("");
                    setView("register");
                  }}
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 text-emerald-800 font-black text-xs sm:text-sm rounded-full shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2 hover:scale-103"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Start Selling →</span>
                </button>

                <button
                  onClick={() => {
                    setErrorMsg("");
                    setSuccessMsg("");
                    setView("login");
                  }}
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 text-amber-900 font-black text-xs sm:text-sm rounded-full shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2 hover:scale-103"
                >
                  <User className="w-4 h-4 text-amber-600" />
                  <span>Sign In →</span>
                </button>
              </div>
            </div>

            {/* Asking User Section: "Do you want to manage farm and want to sell?" */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold border border-amber-400/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Join Modern Fisheries Regional Network</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  Do you want to manage farm and want to sell?
                </h3>
                <p className="text-xs text-blue-100/80 max-w-2xl leading-relaxed">
                  Fish cultivators can manage pond metrics, water quality, and broadcast ready harvests. Suppliers can publish equipment and feeds in the 50 KM catalogue to receive rapid inquiries.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => {
                    setErrorMsg("");
                    setSuccessMsg("");
                    setView("login");
                  }}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Manage My Farm</span>
                </button>

                <button
                  onClick={() => {
                    setErrorMsg("");
                    setSuccessMsg("");
                    setView("register");
                  }}
                  className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Register to Sell</span>
                </button>
              </div>
            </div>

            {/* Counter Metrics Strip (Exact style from Photo 1) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-white/15 relative z-10 text-center sm:text-left">
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white">50,000+</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-200">BUYERS / FARMERS</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white">2,400+</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-200">VERIFIED SELLERS</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white">15,000+</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-200">PRODUCTS &amp; SERVICES</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white">50 KM</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-200">REGIONAL DELIVERY HUB</div>
              </div>
            </div>

            {/* Trending Section Heading & Grid from Photo 1 */}
            <div className="space-y-4 pt-2 relative z-10">
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                <span>Trending on Modern Fisheries / IndiaMART</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {TRENDING_CATEGORIES.map((cat, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setPublicCategory(cat.category);
                      setPublicSubTab("catalogue");
                      const el = document.getElementById("marketplace-catalogue-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-white text-slate-900 rounded-2xl p-4 flex flex-col items-center justify-between text-center shadow-xs hover:shadow-xl hover:scale-103 transition-all cursor-pointer group border border-slate-100 min-h-[140px]"
                  >
                    {/* Visual Icon / Thumbnail */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-50 to-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform mb-2 shadow-2xs border border-slate-100 overflow-hidden">
                      {cat.icon === "Wind" && <Wind className="w-8 h-8 text-blue-600" />}
                      {cat.icon === "Package" && <Package className="w-8 h-8 text-amber-600" />}
                      {cat.icon === "Fish" && <Fish className="w-8 h-8 text-emerald-600" />}
                      {cat.icon === "Activity" && <Activity className="w-8 h-8 text-cyan-600" />}
                      {cat.icon === "Sparkles" && <Sparkles className="w-8 h-8 text-teal-600" />}
                      {cat.icon === "Layers" && <Layers className="w-8 h-8 text-indigo-600" />}
                      {cat.icon === "Droplets" && <Droplets className="w-8 h-8 text-blue-700" />}
                      {cat.icon === "ShieldCheck" && <ShieldCheck className="w-8 h-8 text-green-600" />}
                      {cat.icon === "Clock" && <Clock className="w-8 h-8 text-yellow-600" />}
                      {cat.icon === "CheckCircle2" && <CheckCircle2 className="w-8 h-8 text-slate-700" />}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-tight group-hover:text-blue-700 transition-colors line-clamp-2">
                        {cat.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 block font-medium">
                        {cat.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PHOTO 2 STYLE: BREADCRUMBS, FILTERS & PRODUCT LISTING SECTION */}
        {!currentUser && view === "suppliers" && (
          <div id="marketplace-catalogue-section" className="space-y-4">
            {/* Breadcrumbs (Photo 2) */}
            <div className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-400">Modern Fisheries</span>
              <span>&gt;</span>
              <span className="text-slate-400">Aquaculture Equipment &amp; Supplies</span>
              <span>&gt;</span>
              <span className="font-bold text-slate-700">
                {publicCategory === "All" ? "All Commercial Categories" : publicCategory}
              </span>
            </div>

            {/* Title & View By Switcher (Photo 2) */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {publicCategory === "All" ? "Aquaculture Equipment & Commercial Supplies" : publicCategory}
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  {filteredProducts.length}+ verified products available within {publicRadius >= 200 ? "all districts" : `${publicRadius} KM`}
                </span>
              </div>

              {/* View by: [:: Grid] | [= List] Switcher */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-bold text-slate-500">View by:</span>
                <div className="inline-flex rounded-xl border border-slate-200 p-0.5 bg-slate-50">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg flex items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg flex items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                      viewMode === "list"
                        ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                    <span>List</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Pills Ribbon (Horizontal scrollable ribbon like Photo 2) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
              <button
                onClick={() => {
                  setPublicCategory("All");
                  setPublicSearch("");
                  setSelectedSupplierFilter(null);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                  publicCategory === "All" && !publicSearch && !selectedSupplierFilter
                    ? "bg-blue-700 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>All Filters</span>
              </button>

              {[
                { label: "Paddle Wheel Aerators", cat: "Aerators & Pond Machinery" },
                { label: "Floating Feeds 28% - 32%", cat: "Fish Feed & Nutrition" },
                { label: "Fingerlings & Seeds", cat: "Fish Seed / Fingerlings" },
                { label: "DO & pH Probes", cat: "Chemicals & Probiotics" },
                { label: "Tarpaulins & Tanks", cat: "Tarpaulins & Tanks" },
                { label: "Pumps & Hardware", cat: "Pumps & Hardware" },
              ].map((pill) => (
                <button
                  key={pill.label}
                  onClick={() => setPublicCategory(pill.cat)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                    publicCategory === pill.cat
                      ? "bg-blue-50 text-blue-800 border-blue-300"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {pill.label}
                </button>
              ))}

              <div className="h-4 w-px bg-slate-300 shrink-0 mx-1" />

              {/* Location pills */}
              {["Kolkata", "Barasat", "Naihati", "Howrah", "Hooghly"].map((dist) => (
                <button
                  key={dist}
                  onClick={() => setPublicSearch(dist)}
                  className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                    publicSearch.toLowerCase() === dist.toLowerCase()
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  📍 {dist}
                </button>
              ))}
            </div>

            {/* Sub-Tabs: Products Catalogue vs Verified Suppliers */}
            <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 gap-2 shadow-xs">
              <button
                onClick={() => setPublicSubTab("catalogue")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  publicSubTab === "catalogue"
                    ? "bg-[#00a699] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Supplier Product Catalogue</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                  publicSubTab === "catalogue" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                }`}>
                  {filteredProducts.length}
                </span>
              </button>

              <button
                onClick={() => setPublicSubTab("suppliers")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  publicSubTab === "suppliers"
                    ? "bg-blue-700 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Verified Suppliers in Area</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                  publicSubTab === "suppliers" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                }`}>
                  {filteredSuppliers.length}
                </span>
              </button>
            </div>

            {/* SUB-TAB 1: PRODUCT CATALOGUE (PHOTO 2 CARD DESIGN) */}
            {publicSubTab === "catalogue" && (
              <div className="space-y-4">
                {selectedSupplierFilter && (
                  <div className="p-3 bg-teal-50 border border-teal-200 rounded-2xl flex items-center justify-between text-xs">
                    <span className="font-bold text-teal-900">
                      Showing products from supplier: <strong>{selectedSupplierFilter}</strong>
                    </span>
                    <button
                      onClick={() => setSelectedSupplierFilter(null)}
                      className="px-3 py-1 bg-white hover:bg-teal-100 text-teal-800 border border-teal-300 rounded-lg font-bold cursor-pointer"
                    >
                      Show All Products
                    </button>
                  </div>
                )}

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12 px-4 rounded-3xl bg-white border border-slate-200 space-y-3">
                    <Package className="w-12 h-12 text-slate-300 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-800">No products match your criteria</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Try resetting your search or expanding the radius to 100 KM.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedSupplierFilter(null);
                        setPublicCategory("All");
                        setPublicSearch("");
                        setPublicRadius(100);
                      }}
                      className="px-4 py-2 bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-blue-800 transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                      : "space-y-4"
                  }>
                    {filteredProducts.map((prod: any, idx: number) => {
                      const isStarSupplier = idx % 2 === 0;

                      if (viewMode === "list") {
                        return (
                          <div
                            key={prod.id}
                            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col md:flex-row items-stretch"
                          >
                            {/* Left: Product Image Box */}
                            <div className="relative bg-slate-50 w-full md:w-72 shrink-0 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-100">
                              {/* Supplier Badge */}
                              <div className="absolute top-3 left-3 z-10">
                                {isStarSupplier ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-bold shadow-xs">
                                    <Star className="w-3 h-3 fill-current" />
                                    <span>Star Supplier</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sky-600 text-white text-[10px] font-bold shadow-xs">
                                    <span>Leading Supplier</span>
                                  </span>
                                )}
                              </div>

                              <div className="w-32 h-32 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-3">
                                {prod.category?.includes("Aerator") ? (
                                  <Wind className="w-16 h-16 text-blue-600" />
                                ) : prod.category?.includes("Feed") ? (
                                  <Package className="w-16 h-16 text-amber-600" />
                                ) : prod.category?.includes("Seed") ? (
                                  <Fish className="w-16 h-16 text-emerald-600" />
                                ) : prod.category?.includes("Pond") || prod.category?.includes("Tank") ? (
                                  <Layers className="w-16 h-16 text-indigo-600" />
                                ) : (
                                  <Activity className="w-16 h-16 text-teal-600" />
                                )}
                              </div>
                              <span className="text-xs font-semibold text-slate-500 text-center">
                                {prod.category}
                              </span>

                              {/* Photo count indicator */}
                              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                                <Camera className="w-3 h-3" />
                                <span>+{4 + (idx % 6)} Photos</span>
                              </div>
                            </div>

                            {/* Middle: Title & Specifications */}
                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                              <div className="space-y-3">
                                <div>
                                  <span className="text-[10px] font-black tracking-wider uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                    {prod.category}
                                  </span>
                                  <h3
                                    onClick={() => handleOpenPublicInquiry(prod, "equipment")}
                                    className="text-base sm:text-lg font-bold text-[#1b2a6b] hover:text-blue-700 leading-snug cursor-pointer mt-1"
                                  >
                                    {prod.title}
                                  </h3>
                                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                                    {prod.description || "High efficiency commercial aquaculture grade equipment engineered for fish and shrimp cultivators."}
                                  </p>
                                </div>

                                {/* Structured Specifications Table (Photo 2) */}
                                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                                  <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                                    <span className="text-slate-500">Power / Protein</span>
                                    <span className="font-bold text-slate-800">
                                      {prod.category?.includes("Aerator") ? "2 HP (1.5 kW)" : prod.category?.includes("Feed") ? "32% Crude Protein" : "Grade A"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                                    <span className="text-slate-500">Form / Impellers</span>
                                    <span className="font-bold text-slate-800">
                                      {prod.category?.includes("Aerator") ? "4 Nylon Impellers" : prod.category?.includes("Feed") ? "Floating Pellets" : "Acclimatized"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Packaging / Motor</span>
                                    <span className="font-bold text-slate-800">
                                      {prod.category?.includes("Aerator") ? "100% Copper Winding" : "Standard Commercial Packing"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Regional Delivery</span>
                                    <span className="font-bold text-emerald-700">Within 50 KM Hub</span>
                                  </div>
                                </div>
                              </div>

                              <div className="text-xs text-slate-400 flex items-center gap-3">
                                <span>✔ GST Invoice Available</span>
                                <span>✔ Ready for Dispatch</span>
                                <span>✔ Warranty Provided</span>
                              </div>
                            </div>

                            {/* Right: Price & Contact Supplier (Photo 2 style) */}
                            <div className="p-5 md:w-80 shrink-0 bg-slate-50/50 border-t md:border-t-0 md:border-l border-slate-100 flex flex-col justify-between space-y-4">
                              <div className="space-y-2">
                                <div className="space-y-0.5">
                                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                                    ₹ {Number(prod.price).toLocaleString("en-IN")}
                                  </div>
                                  <div className="text-xs text-slate-500 font-medium">
                                    / {prod.unit || "Unit"} <span className="text-slate-400">• Ex-Warehouse</span>
                                  </div>
                                </div>

                                <button
                                  onClick={() => handleOpenPublicInquiry(prod, "equipment")}
                                  className="w-full py-2.5 bg-[#00a699] hover:bg-[#008f84] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                                >
                                  <Send className="w-4 h-4 fill-current rotate-45" />
                                  <span>Contact Supplier</span>
                                </button>

                                <button
                                  onClick={() => handleOpenPublicInquiry(prod, "equipment")}
                                  className="w-full py-1.5 bg-white hover:bg-slate-50 text-blue-700 border border-blue-200 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
                                >
                                  Get Latest Price
                                </button>
                              </div>

                              {/* Supplier Info Block */}
                              <div className="pt-3 border-t border-slate-200/80 space-y-2">
                                <div>
                                  <button
                                    onClick={() => {
                                      setSelectedSupplierFilter(prod.seller_name);
                                      setPublicSubTab("catalogue");
                                    }}
                                    className="font-bold text-xs text-slate-900 hover:text-blue-700 underline text-left block"
                                  >
                                    {prod.seller_name || "Bengal AquaTech Machinery"}
                                  </button>
                                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5 flex-wrap">
                                    <span>{prod.village || "Barasat"}, {prod.district || "North 24 Parganas"}</span>
                                    <span>• 8 yrs</span>
                                    <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                      <span>Verified</span>
                                    </span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  <a
                                    href={`https://wa.me/91${prod.phone}?text=${encodeURIComponent(
                                      `Hello ${prod.seller_name}, I saw "${prod.title}" on Modern Fisheries B2B and would like to request quote & delivery details.`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-1.5 bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
                                  >
                                    <Phone className="w-3 h-3 text-green-600" />
                                    <span>WhatsApp</span>
                                  </a>

                                  <a
                                    href={`tel:${prod.phone}`}
                                    className="py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
                                  >
                                    <Phone className="w-3 h-3 text-slate-600" />
                                    <span>Call</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // Grid View Card
                      return (
                        <div
                          key={prod.id}
                          className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
                        >
                          {/* Image Thumbnail Area (Matching Photo 2) */}
                          <div className="relative bg-slate-50 overflow-hidden shrink-0 w-full h-52 sm:h-56">
                            {/* Supplier Status Badge (Photo 2: "Leading Supplier" or "Star Supplier") */}
                            <div className="absolute top-2 left-2 z-10">
                              {isStarSupplier ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-bold shadow-xs">
                                  <Star className="w-3 h-3 fill-current" />
                                  <span>Star Supplier</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sky-600 text-white text-[10px] font-bold shadow-xs">
                                  <span>Leading Supplier</span>
                                </span>
                              )}
                            </div>

                            {/* Product Visual Container */}
                            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100/60">
                              <div className="w-24 h-24 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-2">
                                {prod.category?.includes("Aerator") ? (
                                  <Wind className="w-12 h-12 text-blue-600" />
                                ) : prod.category?.includes("Feed") ? (
                                  <Package className="w-12 h-12 text-amber-600" />
                                ) : prod.category?.includes("Seed") ? (
                                  <Fish className="w-12 h-12 text-emerald-600" />
                                ) : prod.category?.includes("Pond") || prod.category?.includes("Tank") ? (
                                  <Layers className="w-12 h-12 text-indigo-600" />
                                ) : (
                                  <Activity className="w-12 h-12 text-teal-600" />
                                )}
                              </div>
                              <span className="text-[11px] font-semibold text-slate-500 text-center line-clamp-1">
                                {prod.category}
                              </span>
                            </div>

                            {/* Carousel Indicator Dots & Photo Count Badge (Photo 2) */}
                            <div className="absolute bottom-2 inset-x-0 flex items-center justify-between px-3 z-10 pointer-events-none">
                              <div className="flex items-center gap-1 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                              </div>
                              <span className="bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                                <Camera className="w-3 h-3" />
                                <span>+{4 + (idx % 6)}</span>
                              </span>
                            </div>
                          </div>

                          {/* Product Content Details (Photo 2) */}
                          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                            <div className="space-y-2">
                              {/* Product Title (Bold Dark Blue) */}
                              <h3
                                onClick={() => handleOpenPublicInquiry(prod, "equipment")}
                                className="text-sm sm:text-base font-bold text-[#1b2a6b] hover:text-blue-700 leading-snug line-clamp-2 cursor-pointer"
                              >
                                {prod.title}
                              </h3>

                              {/* Price Tag (Photo 2) */}
                              <div className="flex items-baseline justify-between gap-1">
                                <div className="text-slate-900 font-bold">
                                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                                    ₹ {Number(prod.price).toLocaleString("en-IN")}
                                  </span>
                                  <span className="text-xs text-slate-500 font-medium">/ {prod.unit || "Unit"}</span>
                                </div>
                                <button
                                  onClick={() => handleOpenPublicInquiry(prod, "equipment")}
                                  className="text-[11px] font-bold text-blue-700 hover:underline cursor-pointer"
                                >
                                  Get Latest Price
                                </button>
                              </div>

                              {/* Primary Action Button: Contact Supplier (Photo 2 style) */}
                              <button
                                onClick={() => handleOpenPublicInquiry(prod, "equipment")}
                                className="w-full py-2.5 bg-[#00a699] hover:bg-[#008f84] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                              >
                                <Send className="w-4 h-4 fill-current rotate-45" />
                                <span>Contact Supplier</span>
                              </button>

                              {/* Key Specifications Table (Photo 2 style 2-column table) */}
                              <div className="text-[11px] divide-y divide-slate-100 bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 space-y-1">
                                <div className="flex justify-between items-center py-0.5">
                                  <span className="text-slate-500">
                                    {prod.category?.includes("Aerator") ? "Power Rating" : prod.category?.includes("Feed") ? "Crude Protein" : "Type / Species"}
                                  </span>
                                  <span className="font-bold text-slate-800">
                                    {prod.category?.includes("Aerator") ? "2 HP (1.5 kW)" : prod.category?.includes("Feed") ? "32% Floating" : "Certified Healthy"}
                                  </span>
                                </div>

                                <div className="flex justify-between items-center py-0.5">
                                  <span className="text-slate-500">
                                    {prod.category?.includes("Aerator") ? "Impellers" : prod.category?.includes("Feed") ? "Pellet Size" : "Condition"}
                                  </span>
                                  <span className="font-bold text-slate-800">
                                    {prod.category?.includes("Aerator") ? "4 Nylon Impellers" : prod.category?.includes("Feed") ? "2mm / 3mm Floating" : "Acclimatized"}
                                  </span>
                                </div>

                                <div className="flex justify-between items-center py-0.5">
                                  <span className="text-slate-500">Motor / Packing</span>
                                  <span className="font-bold text-slate-800">
                                    {prod.category?.includes("Aerator") ? "100% Pure Copper" : "Standard Commercial Bag"}
                                  </span>
                                </div>

                                <div className="flex justify-between items-center py-0.5">
                                  <span className="text-slate-500">Delivery Zone</span>
                                  <span className="font-bold text-emerald-700">Within 50 KM</span>
                                </div>
                              </div>
                            </div>

                            {/* Supplier Footer (Photo 2) */}
                            <div className="pt-2 border-t border-slate-100 space-y-2">
                              <div>
                                <button
                                  onClick={() => {
                                    setSelectedSupplierFilter(prod.seller_name);
                                    setPublicSubTab("catalogue");
                                  }}
                                  className="font-bold text-xs text-slate-900 hover:text-blue-700 underline text-left block"
                                >
                                  {prod.seller_name || "Bengal AquaTech Machinery"}
                                </button>
                                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5 flex-wrap">
                                  <span>{prod.village || "Barasat"}, {prod.district || "North 24 Parganas"}</span>
                                  <span>• 8 yrs</span>
                                  <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                    <span>Verified</span>
                                  </span>
                                </div>
                              </div>

                              {/* WhatsApp & Call Direct Action Icons */}
                              <div className="flex items-center gap-2">
                                <a
                                  href={`https://wa.me/91${prod.phone}?text=${encodeURIComponent(
                                    `Hello ${prod.seller_name}, I saw "${prod.title}" on Modern Fisheries B2B and would like to request quote & delivery details.`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 py-1.5 bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
                                >
                                  <Phone className="w-3.5 h-3.5 text-green-600" />
                                  <span>WhatsApp</span>
                                </a>

                                <a
                                  href={`tel:${prod.phone}`}
                                  className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
                                >
                                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                                  <span>Call</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* SUB-TAB 2: VERIFIED SUPPLIERS DIRECTORY */}
            {publicSubTab === "suppliers" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-500">
                    Verified Suppliers within {publicRadius >= 200 ? "All Regional Zones" : `${publicRadius} KM`} ({filteredSuppliers.length})
                  </h3>
                  <span className="text-xs text-slate-500">Sorted by proximity</span>
                </div>

                {filteredSuppliers.length === 0 ? (
                  <div className="text-center py-12 px-4 rounded-3xl bg-white border border-slate-200 space-y-3">
                    <Store className="w-12 h-12 text-slate-300 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-800">No suppliers found matching your criteria</h4>
                    <button
                      onClick={() => {
                        setPublicRadius(100);
                        setPublicCategory("All");
                        setPublicSearch("");
                      }}
                      className="px-4 py-2 bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-blue-800 transition-colors"
                    >
                      Expand to 100 KM &amp; Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredSuppliers.map((sup: any) => {
                      const supplierProducts = publicProducts.filter(
                        (p) => p.seller_name === sup.business_name || p.phone === sup.phone
                      );

                      return (
                        <div
                          key={sup.id}
                          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold">
                                {sup.category || "Aquaculture Supplies"}
                              </span>
                              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Verified Seller</span>
                              </div>
                            </div>

                            <h4 className="text-base font-black text-slate-900 leading-snug">
                              {sup.business_name}
                            </h4>

                            <div className="text-xs text-slate-600 flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-slate-400" />
                              <span>{sup.contact_person || "Proprietor"}</span>
                              {sup.phone && (
                                <span className="font-mono text-slate-400 text-[11px]">({sup.phone})</span>
                              )}
                            </div>

                            <div className="text-xs text-slate-600 flex items-start gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                              <div>
                                <span>{sup.village}, {sup.district}</span>
                                {sup.distanceKm !== null && sup.distanceKm !== undefined && (
                                  <span className="font-bold text-emerald-700 block text-[11px]">
                                    📍 ~{sup.distanceKm} km from your area
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                              <Truck className="w-3.5 h-3.5 text-slate-400" />
                              <span>Delivery radius: Within {sup.delivery_radius_km || 50} KM</span>
                            </div>
                          </div>

                          <div className="space-y-2 pt-3 border-t border-slate-100">
                            <button
                              onClick={() => {
                                setSelectedSupplierFilter(sup.business_name);
                                setPublicSubTab("catalogue");
                              }}
                              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                            >
                              <Package className="w-3.5 h-3.5 text-teal-400" />
                              <span>
                                View Catalogue ({supplierProducts.length > 0 ? supplierProducts.length : "Available"} Items)
                              </span>
                            </button>

                            <div className="grid grid-cols-3 gap-1.5">
                              <button
                                onClick={() => handleOpenPublicInquiry(sup, "supplier")}
                                className="py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Inquire</span>
                              </button>

                              <a
                                href={`https://wa.me/91${sup.whatsapp || sup.phone}?text=${encodeURIComponent(
                                  `Hello ${sup.business_name}, I saw your supplier listing on Modern Fisheries B2B and would like to inquire about available supplies.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-2 bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
                              >
                                <Phone className="w-3.5 h-3.5 text-green-600" />
                                <span>WhatsApp</span>
                              </a>

                              <a
                                href={`tel:${sup.phone}`}
                                className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
                              >
                                <Phone className="w-3.5 h-3.5 text-slate-600" />
                                <span>Call</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Back Link if Visitor is on login/register view */}
        {(view === "register" || view === "login") && !currentUser && (
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setErrorMsg("");
                setSuccessMsg("");
                setView("suppliers");
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-950 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>← Back to IndiaMART-Style Aquaculture B2B Marketplace</span>
            </button>
          </div>
        )}

        {/* STEP 1: AUTHENTICATION PORTAL (TABS FOR LOGIN & REGISTER) */}
        {(view === "register" || view === "login") && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Top Switcher Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50/80 p-1.5 gap-2">
              <button
                type="button"
                onClick={() => {
                  setErrorMsg("");
                  setSuccessMsg("");
                  setView("login");
                }}
                className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  view === "login"
                    ? "bg-white text-emerald-800 shadow-xs border border-slate-200 ring-2 ring-emerald-500/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Sign In / Login</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setErrorMsg("");
                  setSuccessMsg("");
                  setView("register");
                }}
                className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  view === "register"
                    ? "bg-white text-emerald-800 shadow-xs border border-slate-200 ring-2 ring-emerald-500/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                <UserPlus className="w-4 h-4 text-emerald-600" />
                <span>Register New Account</span>
              </button>
            </div>

            <div className="p-6 sm:p-10 space-y-6">
              {view === "login" ? (
                <>
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                      <Lock className="w-6 h-6 text-emerald-600" />
                      <span>Sign In to Farmer Hub</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Enter your registered 10-digit mobile number or email to access your profile and suppliers.
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5 max-w-lg">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Registered Mobile Number or Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. 9163255763 or email@example.com"
                          value={loginPhone}
                          onChange={(e) => setLoginPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-700">
                          Security PIN or Password
                        </label>
                        <span className="text-[11px] text-slate-400">Default is 1234 or your custom password</span>
                      </div>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type={showLoginPin ? "text" : "password"}
                          placeholder="Enter PIN / password"
                          value={loginPin}
                          onChange={(e) => setLoginPin(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPin(!showLoginPin)}
                          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showLoginPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Authenticating...</span>
                          </>
                        ) : (
                          <>
                            <span>Login &amp; Access Profile</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setErrorMsg("");
                          setSuccessMsg("");
                          setView("register");
                        }}
                        className="text-xs font-semibold text-slate-500 hover:text-emerald-700 underline cursor-pointer"
                      >
                        Don't have an account? Register new account →
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                      <User className="w-6 h-6 text-emerald-600" />
                      <span>Farmer Hub Registration</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Fill in your details below. In the next step, you will choose to create your Farming or Supplier profile.
                    </p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ramesh Chandra Patel"
                            value={regFullName}
                            onChange={(e) => setRegFullName(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                          />
                        </div>
                      </div>

                      {/* Mobile Number */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                          <input
                            type="tel"
                            required
                            placeholder="10-digit mobile number"
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                          />
                        </div>
                      </div>

                      {/* Village / Town */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Village or Town <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Dhenkanal Sadar"
                            value={regVillage}
                            onChange={(e) => setRegVillage(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                          />
                        </div>
                      </div>

                      {/* District */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          District <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Compass className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Dhenkanal / Angul"
                            value={regDistrict}
                            onChange={(e) => setRegDistrict(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                          />
                        </div>
                      </div>

                      {/* Email (Optional) */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Email Address (Optional)
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                          <input
                            type="email"
                            placeholder="farmer@example.com"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                          />
                        </div>
                      </div>

                      {/* 4-digit PIN */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Set 4-Digit Security PIN or Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                          <input
                            type={showRegPin ? "text" : "password"}
                            required
                            maxLength={16}
                            placeholder="e.g. 1234"
                            value={regPin}
                            onChange={(e) => setRegPin(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegPin(!showRegPin)}
                            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showRegPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Step Notification */}
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        <strong>Next Step:</strong> After clicking register, you will choose whether to create a{" "}
                        <strong>Farming Profile</strong> (for fish farmers and pond cultivators) or a{" "}
                        <strong>Supplier Profile</strong> (for equipment and feed sellers).
                      </p>
                    </div>

                    {/* Submit button */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Registering in System...</span>
                          </>
                        ) : (
                          <>
                            <span>Register Account &amp; Continue →</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setErrorMsg("");
                          setSuccessMsg("");
                          setView("login");
                        }}
                        className="text-xs font-semibold text-slate-500 hover:text-emerald-700 underline cursor-pointer"
                      >
                        Already have an account? Sign in here →
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: ONCE REGISTERED -> ASK TO CREATE FARMING PROFILE OR SUPPLIER PROFILE */}
        {view === "select-profile-type" && currentUser && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Registration Complete
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  Welcome, {currentUser.full_name}!
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Mobile: {currentUser.phone} • Location: {currentUser.village}, {currentUser.district}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>

            <div className="text-center max-w-xl mx-auto space-y-2 pt-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Please select your Profile Type to continue:
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Choose the profile that matches your activity. Once created, your profile will be registered in the system.
              </p>
            </div>

            {/* Profile Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Option A: Farming Profile */}
              <div
                onClick={() => setView("create-farming")}
                className="group relative bg-gradient-to-b from-emerald-50/50 to-white hover:to-emerald-50/70 p-6 sm:p-8 rounded-3xl border-2 border-emerald-200 hover:border-emerald-500 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
                    <Fish className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full inline-block">
                      For Aqua Cultivators
                    </span>
                    <h4 className="text-xl font-black text-slate-900">
                      Farming Profile
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Select this if you cultivate fish, operate earthen ponds, biofloc tanks, RAS systems, or run a fish hatchery/nursery.
                    </p>
                  </div>

                  <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Farm / Pond water capacity and area</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Cultivated fish species (Rohu, Catla, Tilapia, etc.)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>50 KM regional farm location pin</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    className="w-full py-3 bg-emerald-600 group-hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <span>Create Farming Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Option B: Supplier Profile */}
              <div
                onClick={() => setView("create-supplier")}
                className="group relative bg-gradient-to-b from-teal-50/50 to-white hover:to-teal-50/70 p-6 sm:p-8 rounded-3xl border-2 border-teal-200 hover:border-teal-500 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
                    <Store className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-teal-700 bg-teal-100/70 px-2.5 py-0.5 rounded-full inline-block">
                      For Vendors &amp; Dealers
                    </span>
                    <h4 className="text-xl font-black text-slate-900">
                      Supplier Profile
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Select this if you supply pond aerators, fish feed, seed/fingerlings, water quality test kits, nets, or aquaculture medicines.
                    </p>
                  </div>

                  <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Supply categories (Feed, Aerators, Seed, etc.)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>50 KM delivery radius &amp; store address</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>WhatsApp order contact &amp; shop credentials</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    className="w-full py-3 bg-teal-600 group-hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <span>Create Supplier Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2A: FORM FOR FARMING PROFILE */}
        {view === "create-farming" && currentUser && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Step 2 • Farming Profile Setup
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
                  <Fish className="w-6 h-6 text-emerald-600" />
                  <span>Create Your Farming Profile</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Farmer: <strong>{currentUser.full_name}</strong> • Phone: {currentUser.phone}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setView("select-profile-type")}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 underline cursor-pointer"
              >
                ← Back to Profile Choice
              </button>
            </div>

            <form onSubmit={handleCreateFarmingProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Farm Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Farm or Pond Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Krishna Aqua Farm"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                  />
                </div>

                {/* Farm Type */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Farm Culture Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={farmType}
                    onChange={(e) => setFarmType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium bg-white"
                  >
                    <option value="Earthen Pond">Earthen Pond</option>
                    <option value="Biofloc">Biofloc System</option>
                    <option value="RAS">Recirculating Aquaculture System (RAS)</option>
                    <option value="Hatchery & Nursery">Hatchery &amp; Nursery</option>
                    <option value="Cage Culture">Cage Culture</option>
                  </select>
                </div>

                {/* Water Area */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Total Water Area or Capacity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3.5 Acres or 60,000 Litres"
                    value={waterArea}
                    onChange={(e) => setWaterArea(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                  />
                </div>

                {/* Number of Ponds / Tanks */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Number of Ponds or Tanks
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3 Ponds or 6 Tanks"
                    value={pondCount}
                    onChange={(e) => setPondCount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                  />
                </div>

                {/* Primary Fish Species */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Main Fish Species Cultivated
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rohu, Catla, Mrigal, Pangasius, GIFT Tilapia, Freshwater Prawn"
                    value={fishSpecies}
                    onChange={(e) => setFishSpecies(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                  />
                </div>

                {/* Farm Village */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Farm Village / Town <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={farmVillage}
                    onChange={(e) => setFarmVillage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                  />
                </div>

                {/* Farm District */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Farm District <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={farmDistrict}
                    onChange={(e) => setFarmDistrict(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                  />
                </div>

                {/* Farming Experience */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Aquaculture Experience
                  </label>
                  <select
                    value={farmExperience}
                    onChange={(e) => setFarmExperience(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium bg-white"
                  >
                    <option value="New Beginner (< 1 Year)">New Beginner (&lt; 1 Year)</option>
                    <option value="1 - 3 Years">1 - 3 Years</option>
                    <option value="3 - 7 Years">3 - 7 Years</option>
                    <option value="7+ Years Experienced">7+ Years Experienced</option>
                  </select>
                </div>

                {/* Detailed Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Landmark or Farm Address
                  </label>
                  <input
                    type="text"
                    placeholder="Near Canal Road, Main Outpost"
                    value={farmAddress}
                    onChange={(e) => setFarmAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                  />
                </div>
              </div>

              {/* GPS Auto-detect for 50 KM local radius */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>50 KM Regional GPS Location: {farmLat}, {farmLon}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Coordinates help connect you with local equipment suppliers within 50 KM.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => detectGPSLocation("farm")}
                  disabled={gpsDetecting}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Compass className={`w-3.5 h-3.5 text-emerald-600 ${gpsDetecting ? "animate-spin" : ""}`} />
                  <span>{gpsDetecting ? "Detecting..." : "Auto-detect My GPS"}</span>
                </button>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving to MySQL...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Save &amp; Activate Farming Profile</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setView("select-profile-type")}
                  className="px-6 py-3.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-sm transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2B: FORM FOR SUPPLIER PROFILE */}
        {view === "create-supplier" && currentUser && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Step 2 • Supplier Profile Setup
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
                  <Store className="w-6 h-6 text-teal-600" />
                  <span>Create Your Supplier Profile</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Vendor Contact: <strong>{currentUser.full_name}</strong> • Phone: {currentUser.phone}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setView("select-profile-type")}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 underline cursor-pointer"
              >
                ← Back to Profile Choice
              </button>
            </div>

            <form onSubmit={handleCreateSupplierProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Business Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Business / Shop Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kisan Agro & Aqua Equipment"
                    value={bizName}
                    onChange={(e) => setBizName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                  />
                </div>

                {/* Primary Category */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Primary Supply Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={bizCategory}
                    onChange={(e) => setBizCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium bg-white"
                  >
                    <option value="Fish Feed & Nutrition">Fish Feed &amp; Nutrition</option>
                    <option value="Aerators & Pond Machinery">Aerators &amp; Blowers</option>
                    <option value="Fish Seed / Fingerlings">Fish Seed / Fingerlings</option>
                    <option value="Water Quality & Medicines">Water Testing Kits &amp; Care</option>
                    <option value="Nets, Hapas & Tanks">Nets, Hapas &amp; Biofloc Tarpaulins</option>
                    <option value="Complete Aquaculture Supplies">Complete Aquaculture Supplies</option>
                  </select>
                </div>

                {/* Contact Person Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    value={bizContactPerson}
                    onChange={(e) => setBizContactPerson(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                  />
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    WhatsApp Number for Orders
                  </label>
                  <input
                    type="tel"
                    placeholder="WhatsApp order contact"
                    value={bizWhatsapp}
                    onChange={(e) => setBizWhatsapp(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                  />
                </div>

                {/* Shop Village / Town */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Store Village or City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={bizVillage}
                    onChange={(e) => setBizVillage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                  />
                </div>

                {/* Shop District */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    District <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={bizDistrict}
                    onChange={(e) => setBizDistrict(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                  />
                </div>

                {/* Delivery Radius */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Supply / Delivery Service Radius
                  </label>
                  <select
                    value={bizDeliveryRadius}
                    onChange={(e) => setBizDeliveryRadius(parseInt(e.target.value, 10))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium bg-white"
                  >
                    <option value={25}>Within 25 KM Radius</option>
                    <option value={50}>Within 50 KM Radius (Standard Hub)</option>
                    <option value={100}>Within 100 KM Radius</option>
                    <option value={200}>All Regional Districts</option>
                  </select>
                </div>

                {/* Trade License or GST (Optional) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Trade License / GST (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GSTIN / Shop Registration"
                    value={bizLicense}
                    onChange={(e) => setBizLicense(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                  />
                </div>

                {/* Detailed Address */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Store / Depot Full Address
                  </label>
                  <input
                    type="text"
                    placeholder="Shop No., Market Complex, Main Road"
                    value={bizAddress}
                    onChange={(e) => setBizAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                  />
                </div>
              </div>

              {/* GPS Auto-detect */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <span>Store GPS Location: {bizLat}, {bizLon}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Allows nearby farmers within 50 KM to locate your supply store.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => detectGPSLocation("supplier")}
                  disabled={gpsDetecting}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-teal-500 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Compass className={`w-3.5 h-3.5 text-teal-600 ${gpsDetecting ? "animate-spin" : ""}`} />
                  <span>{gpsDetecting ? "Detecting..." : "Auto-detect Store GPS"}</span>
                </button>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-black text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving to MySQL...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Save &amp; Activate Supplier Profile</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setView("select-profile-type")}
                  className="px-6 py-3.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-sm transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: UNIFIED DUAL-ROLE AQUACULTURE & SUPPLIER DASHBOARD */}
        {view === "profile-completed" && currentUser && (
          <FarmerDashboardView
            currentUser={currentUser}
            farmingProfile={activeFarmingProfile}
            supplierProfile={activeSupplierProfile}
            onSwitchOrAddProfile={() => setView("select-profile-type")}
            onRefreshProfile={() => fetchUserAndProfiles(currentUser.phone || currentUser.email || "")}
            onLogout={handleLogout}
          />
        )}

      </div>
    </div>

      {/* PUBLIC VISITOR INQUIRY MODAL / RIGHT DRAWER */}
      {showPublicInquiryModal && publicInquiryTarget && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end overflow-hidden">
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setShowPublicInquiryModal(false)}
            aria-hidden="true"
          />
          <div className="relative h-full max-h-screen bg-white shadow-2xl border-l border-slate-200 p-6 space-y-5 overflow-y-auto w-full sm:w-auto min-w-[320px] sm:min-w-[420px] max-w-[95vw] sm:max-w-md animate-slide-right flex flex-col justify-between">
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-black">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-slate-900 text-base">
                      Contact &amp; Request Quote
                    </h3>
                    <p className="text-slate-500 text-xs">Direct connection to verified regional supplier</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowPublicInquiryModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Target Summary Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                  {publicInquiryTarget.type === "supplier" ? "Supplier Inquiry" : "Product Inquiry"}
                </span>
                <h4 className="font-bold text-slate-900 text-sm">{publicInquiryTarget.title}</h4>
                {publicInquiryTarget.price ? (
                  <div className="font-mono text-emerald-700 font-bold text-sm">
                    ₹{Number(publicInquiryTarget.price).toLocaleString("en-IN")} / {publicInquiryTarget.unit || "Unit"}
                  </div>
                ) : null}
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-slate-400" />
                  <span>{publicInquiryTarget.seller_name}</span>
                </div>
              </div>

              {/* Inquiry Form or Success State */}
              {publicInqSuccess ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 animate-fade-in text-center">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-black text-base">Inquiry Sent Successfully!</h4>
                  <p className="text-xs leading-relaxed">
                    The supplier has received your inquiry and will reach out via WhatsApp or phone at{" "}
                    <strong>{publicInqPhone}</strong>.
                  </p>
                  <div className="pt-2 border-t border-emerald-200 space-y-2">
                    <p className="text-[11px] text-emerald-800 font-medium">
                      Do you want to manage your farm or sell aquaculture products?
                    </p>
                    <button
                      onClick={() => {
                        setShowPublicInquiryModal(false);
                        setView("register");
                      }}
                      className="w-full py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                    >
                      Register Free Account →
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendPublicInquiry} className="space-y-4">
                  {publicInqError && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs font-medium border border-red-200 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{publicInqError}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={publicInqName}
                      onChange={(e) => setPublicInqName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Your Mobile Number (WhatsApp / Call) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={publicInqPhone}
                      onChange={(e) => setPublicInqPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Quantity Required
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2 sets / 50 bags / 5000 fingerlings"
                      value={publicInqQty}
                      onChange={(e) => setPublicInqQty(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Delivery Location / Questions
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Delivery required to Barasat, North 24 Parganas. Please confirm price & transport availability."
                      value={publicInqNotes}
                      onChange={(e) => setPublicInqNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={publicInqSubmitting}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {publicInqSubmitting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Inquiry to Supplier...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Inquiry to Supplier</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Direct Instant Contact alternatives */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Or Connect Directly
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`https://wa.me/91${publicInquiryTarget.whatsapp || publicInquiryTarget.phone}?text=${encodeURIComponent(
                      `Hello ${publicInquiryTarget.seller_name}, I am interested in "${publicInquiryTarget.title}" on Modern Fisheries.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-green-600" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${publicInquiryTarget.phone}`}
                    className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-600" />
                    <span>Direct Call</span>
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPublicInquiryModal(false)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* PHOTO 1 & 2: POST BUY REQUIREMENT (RFQ) MODAL */}
      {showPostRequirementModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header (IndiaMART B2B Deep Blue Gradient) */}
            <div className="bg-gradient-to-r from-[#172554] via-[#1e3a8a] to-[#1e1b4b] text-white p-5 sm:p-6 relative">
              <button
                onClick={() => {
                  setShowPostRequirementModal(false);
                  setPostReqSuccess(false);
                  setPostReqError("");
                }}
                className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1 pr-8">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-400/20 text-teal-300 text-[10px] font-black border border-teal-400/30 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>50 KM Regional RFQ Broadcast</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Post Your Buy Requirement
                </h3>
                <p className="text-xs text-blue-100/80">
                  Tell us what you need and get immediate wholesale quotations from verified sellers within 50 KM.
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {postReqSuccess ? (
                <div className="py-6 px-4 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-10 h-10" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-slate-900">
                      Requirement Posted Successfully!
                    </h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                      Your buy request for <strong>"{postReqTitle}"</strong> has been broadcast to verified suppliers within 50 KM. Verified sellers will reach out with best quotations via WhatsApp / phone.
                    </p>
                  </div>

                  {/* Prompt: Do you want to manage farm and want to sell? */}
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-left space-y-3">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Do you want to manage farm and want to sell?</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      Create your free account to track your quotations, manage pond parameters, harvest forecasting, and access B2B direct supplies.
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setShowPostRequirementModal(false);
                          setPostReqSuccess(false);
                          setView("login");
                        }}
                        className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
                      >
                        Sign In / Login
                      </button>
                      <button
                        onClick={() => {
                          setShowPostRequirementModal(false);
                          setPostReqSuccess(false);
                          setView("register");
                        }}
                        className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs"
                      >
                        Register Free Account
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowPostRequirementModal(false);
                      setPostReqSuccess(false);
                      setPostReqTitle("");
                      setPostReqQty("");
                    }}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Back to Marketplace Catalogue
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePostPublicRequirement} className="space-y-4">
                  {postReqError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{postReqError}</span>
                    </div>
                  )}

                  {/* Quick item chips */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Popular Items (Click to Auto-Fill)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { title: "2 HP 4-Impeller Aerator", cat: "Aerators & Pond Machinery" },
                        { title: "32% Floating Fish Feed Pellets", cat: "Fish Feed & Nutrition" },
                        { title: "Certified Rohu / Katla Fingerlings", cat: "Fish Seed / Fingerlings" },
                        { title: "Tarpaulin Biofloc Tank 4x1m", cat: "Tarpaulins & Tanks" },
                        { title: "Water Quality Testing Kit (DO, pH)", cat: "Chemicals & Probiotics" },
                        { title: "Submersible Sludge Pump 1.5 HP", cat: "Pumps & Hardware" },
                      ].map((item) => (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => {
                            setPostReqTitle(item.title);
                            setPostReqCategory(item.cat);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${
                            postReqTitle === item.title
                              ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                              : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          + {item.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Title */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Product / Item You Need <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2 HP Solar Paddle Aerator or 50 Bags Fish Feed"
                      value={postReqTitle}
                      onChange={(e) => setPostReqTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Category */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Category
                      </label>
                      <select
                        value={postReqCategory}
                        onChange={(e) => setPostReqCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-medium bg-white"
                      >
                        <option value="Aerators & Pond Machinery">Aerators & Pond Machinery</option>
                        <option value="Fish Feed & Nutrition">Fish Feed & Nutrition</option>
                        <option value="Fish Seed / Fingerlings">Fish Seed / Fingerlings</option>
                        <option value="Tarpaulins & Tanks">Tarpaulins & Tanks</option>
                        <option value="Pumps & Hardware">Pumps & Hardware</option>
                        <option value="Chemicals & Probiotics">Chemicals & Probiotics</option>
                      </select>
                    </div>

                    {/* Quantity */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Quantity Required
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2 Sets / 100 Bags / 5,000 Pcs"
                        value={postReqQty}
                        onChange={(e) => setPostReqQty(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Approx Budget */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Approx Budget (₹ Optional)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 40000"
                        value={postReqBudget}
                        onChange={(e) => setPostReqBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-medium font-mono"
                      />
                    </div>

                    {/* Delivery Location */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Delivery Hub / Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Barasat, North 24 Parganas"
                        value={postReqLocation}
                        onChange={(e) => setPostReqLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Contact Mobile */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Your Mobile Number (WhatsApp / Call) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={postReqPhone}
                        onChange={(e) => setPostReqPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-medium font-mono"
                      />
                    </div>

                    {/* Buyer Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Subir Ghosh"
                        value={postReqName}
                        onChange={(e) => setPostReqName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-medium"
                      />
                    </div>
                  </div>

                  {/* Notes & Specs */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Requirement Details / Specifications
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need delivery within 48 hours. Warranty and invoice required."
                      value={postReqNotes}
                      onChange={(e) => setPostReqNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-medium"
                    />
                  </div>

                  {/* Submit Button (IndiaMART Teal CTA) */}
                  <button
                    type="submit"
                    disabled={postReqSubmitting}
                    className="w-full py-3.5 bg-[#00a699] hover:bg-[#008f84] text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {postReqSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Broadcasting to 50 KM Regional Suppliers...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 fill-current rotate-45" />
                        <span>Submit Buy Requirement (Get Fast Quotations)</span>
                      </>
                    )}
                  </button>

                  <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Your details are safely shared only with verified regional suppliers within 50 KM</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
