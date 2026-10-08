import React, { useState, useEffect } from "react";
import SidebarNav, { DashboardMenuId } from "./dashboard/SidebarNav";
import InquiriesView, { EnquiryItem } from "./dashboard/InquiriesView";
import NotificationsView, { NotificationItem } from "./dashboard/NotificationsView";
import MobileBottomNav from "./dashboard/MobileBottomNav";
import {
  Menu,
  Bell,
  RefreshCw,
  Plus,
  Trash2,
  Send,
  MessageCircle,
  Phone,
  Compass,
  Fish,
  Store,
  Layers,
  Droplets,
  Receipt,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Search,
  Filter,
  X,
  ExternalLink,
  MessageSquare,
  Tag,
  Check,
} from "lucide-react";

interface RegisteredUser {
  id: number;
  full_name: string;
  phone: string;
  email?: string;
  village: string;
  district: string;
  role?: string;
}

interface FarmingProfile {
  id?: number;
  user_id?: number;
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
}

interface SupplierProfile {
  id?: number;
  user_id?: number;
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
}

interface PondItem {
  id: number;
  pond_name: string;
  culture_type: string;
  water_area: string;
  depth_m: number;
  species: string;
  stocked_count: number;
  stocking_date: string;
  avg_weight_g: number;
  target_weight_g: number;
  notes?: string;
}

interface ExpenseItem {
  id: number;
  category: string;
  title: string;
  amount: number;
  date: string;
  pond_name: string;
  vendor_name?: string;
  notes?: string;
}

interface WaterLogItem {
  id: number;
  pond_name: string;
  do_ppm: number;
  ph_level: number;
  temp_c: number;
  ammonia_ppm: number;
  feed_kg: number;
  notes?: string;
  date: string;
}

interface HarvestListing {
  id: number;
  farmer_id: number;
  farmer_name: string;
  phone: string;
  pond_name: string;
  species: string;
  ready_quantity_kg: number;
  avg_weight_kg: number;
  price_per_kg: number;
  harvest_start_date: string;
  harvest_end_date?: string;
  village: string;
  district: string;
  latitude: number;
  longitude: number;
  pickup_road_access: string;
  notes?: string;
  status: string;
  inquiries_count?: number;
  distanceKm?: number;
}

interface CatalogProduct {
  id: number;
  supplier_id?: number;
  seller_name?: string;
  phone?: string;
  title: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  in_stock: boolean;
  village: string;
  district: string;
  delivery_radius_km: number;
  whatsapp: string;
  latitude: number;
  longitude: number;
  distanceKm?: number;
}

interface BuyerRequirement {
  id: number;
  user_name: string;
  user_phone: string;
  title: string;
  category: string;
  quantity: string;
  unit: string;
  target_budget?: number | null;
  delivery_location?: string;
  district?: string;
  urgency?: string;
  details?: string;
  status: string;
  quotes_count?: number;
  created_at: string;
  is_mine?: boolean;
}

interface FarmerDashboardViewProps {
  currentUser: RegisteredUser;
  farmingProfile: FarmingProfile | null;
  supplierProfile: SupplierProfile | null;
  onSwitchOrAddProfile: () => void;
  onRefreshProfile: () => void;
  onLogout: () => void;
}

export default function FarmerDashboardView({
  currentUser,
  farmingProfile,
  supplierProfile,
  onSwitchOrAddProfile,
  onLogout,
}: FarmerDashboardViewProps) {
  // Navigation State - DEFAULT TO CATALOGUE ON LOGIN FOR DIRECT MARKETPLACE ACCESS
  const [activeMenu, setActiveMenu] = useState<DashboardMenuId>("catalogue");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Data states
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [ponds, setPonds] = useState<PondItem[]>([]);
  const [waterLogs, setWaterLogs] = useState<WaterLogItem[]>([]);
  const [myHarvests, setMyHarvests] = useState<HarvestListing[]>([]);
  const [allCatalog, setAllCatalog] = useState<CatalogProduct[]>([]);
  const [myCatalog, setMyCatalog] = useState<CatalogProduct[]>([]);
  const [requirements, setRequirements] = useState<BuyerRequirement[]>([]);
  const [myRequirements, setMyRequirements] = useState<BuyerRequirement[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadNotifsCount, setUnreadNotifsCount] = useState(0);

  // Catalogue Sub-Tab & Filters
  const [catalogueSubTab, setCatalogueSubTab] = useState<"marketplace" | "requirements" | "my-demands" | "my-store">("marketplace");
  const [catSearchQuery, setCatSearchQuery] = useState("");
  const [catCategoryFilter, setCatCategoryFilter] = useState("All");
  const [catInStockOnly, setCatInStockOnly] = useState(false);

  const [nearby50km, setNearby50km] = useState<{
    suppliers: any[];
    products: CatalogProduct[];
    harvests: HarvestListing[];
  }>({ suppliers: [], products: [], harvests: [] });

  const [loadingData, setLoadingData] = useState(false);
  const [radiusFilter, setRadiusFilter] = useState<number>(50);
  const [statusMessage, setStatusMessage] = useState("");

  // Modals (ALL SLIDE IN FROM THE RIGHT)
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showPondModal, setShowPondModal] = useState(false);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [showHarvestModal, setShowHarvestModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showRequirementModal, setShowRequirementModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [activeInquiryTarget, setActiveInquiryTarget] = useState<any>(null);
  const [activeReqTarget, setActiveReqTarget] = useState<BuyerRequirement | null>(null);

  // Forms
  const [expCategory, setExpCategory] = useState("Feed");
  const [expTitle, setExpTitle] = useState("");
  const [expAmount, setExpAmount] = useState("");
  const [expDate, setExpDate] = useState(new Date().toISOString().split("T")[0]);
  const [expPond, setExpPond] = useState("All Ponds");
  const [expVendor, setExpVendor] = useState("");
  const [expNotes, setExpNotes] = useState("");

  const [newPondName, setNewPondName] = useState("");
  const [newPondType, setNewPondType] = useState("Earthen Pond");
  const [newPondArea, setNewPondArea] = useState("1 Acre");
  const [newPondSpecies, setNewPondSpecies] = useState("Catla, Rohu");
  const [newPondStockCount, setNewPondStockCount] = useState("3000");
  const [newPondAvgWeight, setNewPondAvgWeight] = useState("150");
  const [newPondTargetWeight, setNewPondTargetWeight] = useState("1500");

  const [waterPond, setWaterPond] = useState("");
  const [waterDO, setWaterDO] = useState("5.8");
  const [waterPH, setWaterPH] = useState("7.6");
  const [waterTemp, setWaterTemp] = useState("28.5");
  const [waterAmmonia, setWaterAmmonia] = useState("0.02");
  const [waterFeed, setWaterFeed] = useState("25");

  const [harvPond, setHarvPond] = useState("");
  const [harvSpecies, setHarvSpecies] = useState("Catla");
  const [harvQuantity, setHarvQuantity] = useState("2500");
  const [harvAvgWeight, setHarvAvgWeight] = useState("1.8");
  const [harvPrice, setHarvPrice] = useState("180");
  const [harvStartDate, setHarvStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [harvRoadAccess, setHarvRoadAccess] = useState("Direct Truck Access to Pond Side");
  const [harvNotes, setHarvNotes] = useState("");

  const [prodTitle, setProdTitle] = useState("");
  const [prodCat, setProdCat] = useState("Aqua Feed & Nutrition");
  const [prodPrice, setProdPrice] = useState("");
  const [prodUnit, setProdUnit] = useState("per 40kg bag");
  const [prodDesc, setProdDesc] = useState("");
  const [prodInStock, setProdInStock] = useState(true);

  const [inqOfferPrice, setInqOfferPrice] = useState("");
  const [inqQuantity, setInqQuantity] = useState("");
  const [inqMessage, setInqMessage] = useState("");

  // Post Requirement Form State
  const [reqTitle, setReqTitle] = useState("");
  const [reqCategory, setReqCategory] = useState("Aqua Feed & Nutrition");
  const [reqQuantity, setReqQuantity] = useState("");
  const [reqUnit, setReqUnit] = useState("Bags (40kg)");
  const [reqBudget, setReqBudget] = useState("");
  const [reqLocation, setReqLocation] = useState("");
  const [reqDistrict, setReqDistrict] = useState(currentUser.district || "");
  const [reqUrgency, setReqUrgency] = useState("Immediate (Within 48 hours)");
  const [reqDetails, setReqDetails] = useState("");

  // Submit Quote on Requirement Form State
  const [quotePrice, setQuotePrice] = useState("");
  const [quoteDelivery, setQuoteDelivery] = useState("Ready for immediate dispatch (24-48 hrs)");
  const [quoteNotes, setQuoteNotes] = useState("");

  useEffect(() => {
    loadAllData();
  }, [currentUser.phone]);

  const loadAllData = async () => {
    setLoadingData(true);
    try {
      const phoneParam = encodeURIComponent(currentUser.phone);
      const userLat = farmingProfile?.latitude || supplierProfile?.latitude || 20.9517;
      const userLon = farmingProfile?.longitude || supplierProfile?.longitude || 85.0985;

      const [expRes, pondRes, waterRes, harvRes, catRes, enqRes, notifRes, ecoRes, reqRes] =
        await Promise.all([
          fetch(`/api/expenses?phone=${phoneParam}`),
          fetch(`/api/farms/ponds?phone=${phoneParam}`),
          fetch(`/api/water-logs?phone=${phoneParam}`),
          fetch(`/api/harvests?phone=${phoneParam}`),
          fetch(`/api/equipment?phone=${phoneParam}`),
          fetch(`/api/enquiries?phone=${phoneParam}`),
          fetch(`/api/notifications?phone=${phoneParam}`),
          fetch(`/api/ecosystem/50km?lat=${userLat}&lon=${userLon}&radius_km=${radiusFilter}`),
          fetch(`/api/requirements?phone=${phoneParam}`),
        ]);

      if (expRes.ok) {
        const d = await expRes.json();
        setExpenses(d.expenses || []);
      }
      if (pondRes.ok) {
        const d = await pondRes.json();
        setPonds(d.ponds || []);
      }
      if (waterRes.ok) {
        const d = await waterRes.json();
        setWaterLogs(d.logs || []);
      }
      if (harvRes.ok) {
        const d = await harvRes.json();
        setMyHarvests(d.harvests || []);
      }
      if (catRes.ok) {
        const d = await catRes.json();
        setAllCatalog(d.products || []);
        setMyCatalog(d.my_products || []);
      }
      if (reqRes && reqRes.ok) {
        const d = await reqRes.json();
        setRequirements(d.requirements || []);
        setMyRequirements(d.my_requirements || []);
      }
      if (enqRes.ok) {
        const d = await enqRes.json();
        setEnquiries(d.enquiries || []);
      }
      if (notifRes.ok) {
        const d = await notifRes.json();
        setNotifications(d.notifications || []);
        setUnreadNotifsCount(d.unreadCount || 0);
      }
      if (ecoRes.ok) {
        const d = await ecoRes.json();
        setNearby50km({
          suppliers: d.suppliers || [],
          products: d.products || [],
          harvests: d.harvests || [],
        });
      }
    } catch (e) {
      console.error("Error loading dashboard data:", e);
    } finally {
      setLoadingData(false);
    }
  };

  const handleMarkAllNotifsRead = async () => {
    try {
      await fetch("/api/notifications/mark-all-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: currentUser.phone }),
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadNotifsCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle || !expAmount) return;
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUser.id,
          phone: currentUser.phone,
          category: expCategory,
          title: expTitle,
          amount: parseFloat(expAmount),
          date: expDate,
          pond_name: expPond,
          vendor_name: expVendor,
          notes: expNotes,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setExpenses([data.expense, ...expenses]);
        setShowExpenseModal(false);
        setExpTitle("");
        setExpAmount("");
        setExpNotes("");
        setStatusMessage("Daily expense logged successfully!");
        setTimeout(() => setStatusMessage(""), 4000);
      }
    } catch {
      alert("Failed to save expense.");
    }
  };

  const handleDeleteExpense = async (id: number) => {
    if (!confirm("Are you sure you want to delete this expense record?")) return;
    try {
      await fetch(`/api/expenses/${id}`, { method: "DELETE" });
      setExpenses(expenses.filter((x) => x.id !== id));
    } catch {
      alert("Failed to delete expense.");
    }
  };

  const handleAddPond = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPondName) return;
    try {
      const res = await fetch("/api/farms/ponds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUser.id,
          phone: currentUser.phone,
          pond_name: newPondName,
          culture_type: newPondType,
          water_area: newPondArea,
          species: newPondSpecies,
          stocked_count: parseInt(newPondStockCount, 10) || 0,
          avg_weight_g: parseFloat(newPondAvgWeight) || 50,
          target_weight_g: parseFloat(newPondTargetWeight) || 1000,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setPonds([...ponds, data.pond]);
        setShowPondModal(false);
        setNewPondName("");
        setStatusMessage("Pond / Tank record added successfully!");
        setTimeout(() => setStatusMessage(""), 4000);
      }
    } catch {
      alert("Failed to add pond.");
    }
  };

  const handleAddWaterLog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/water-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUser.id,
          phone: currentUser.phone,
          pond_name: waterPond || ponds[0]?.pond_name || "Main Pond",
          do_ppm: parseFloat(waterDO) || 5.5,
          ph_level: parseFloat(waterPH) || 7.5,
          temp_c: parseFloat(waterTemp) || 28,
          ammonia_ppm: parseFloat(waterAmmonia) || 0.02,
          feed_kg: parseFloat(waterFeed) || 0,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setWaterLogs([data.log, ...waterLogs]);
        setShowWaterModal(false);
        setStatusMessage("Water parameters & feeding logged successfully!");
        setTimeout(() => setStatusMessage(""), 4000);
      }
    } catch {
      alert("Failed to save water log.");
    }
  };

  const handleBroadcastHarvest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!harvSpecies || !harvQuantity) return;
    try {
      const res = await fetch("/api/harvests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmer_id: currentUser.id,
          farmer_name: currentUser.full_name,
          phone: currentUser.phone,
          pond_name: harvPond || ponds[0]?.pond_name || "Pond 1",
          species: harvSpecies,
          ready_quantity_kg: parseFloat(harvQuantity) || 0,
          avg_weight_kg: parseFloat(harvAvgWeight) || 1.5,
          price_per_kg: parseFloat(harvPrice) || 0,
          harvest_start_date: harvStartDate,
          village: currentUser.village,
          district: currentUser.district,
          latitude: farmingProfile?.latitude || 20.9517,
          longitude: farmingProfile?.longitude || 85.0985,
          pickup_road_access: harvRoadAccess,
          notes: harvNotes,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setMyHarvests([data.harvest, ...myHarvests]);
        setShowHarvestModal(false);
        setStatusMessage("🚀 Ready-for-Harvest broadcast live to 50 KM buyers!");
        setTimeout(() => setStatusMessage(""), 5000);
      }
    } catch {
      alert("Failed to broadcast harvest.");
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle || !prodPrice) return;
    try {
      const res = await fetch("/api/equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supplier_id: currentUser.id,
          seller_name: supplierProfile?.business_name || currentUser.full_name,
          phone: currentUser.phone,
          title: prodTitle,
          category: prodCat,
          description: prodDesc,
          price: parseFloat(prodPrice),
          unit: prodUnit,
          in_stock: prodInStock,
          village: currentUser.village,
          district: currentUser.district,
          delivery_radius_km: supplierProfile?.delivery_radius_km || 50,
          whatsapp: supplierProfile?.whatsapp || currentUser.phone,
          latitude: supplierProfile?.latitude || 20.9517,
          longitude: supplierProfile?.longitude || 85.0985,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setMyCatalog([data.product, ...myCatalog]);
        setShowProductModal(false);
        setProdTitle("");
        setProdPrice("");
        setProdDesc("");
        setStatusMessage("Product added to your catalogue!");
        setTimeout(() => setStatusMessage(""), 4000);
      }
    } catch {
      alert("Failed to save product.");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Remove this product from your catalogue?")) return;
    try {
      await fetch(`/api/equipment/${id}`, { method: "DELETE" });
      setMyCatalog(myCatalog.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete product.");
    }
  };

  const handleSendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInquiryTarget) return;
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_name: currentUser.full_name,
          sender_phone: currentUser.phone,
          receiver_phone: activeInquiryTarget.phone,
          type: activeInquiryTarget.type || "supply_quote",
          item_id: activeInquiryTarget.id,
          item_title: activeInquiryTarget.title || activeInquiryTarget.species,
          offered_price: inqOfferPrice ? parseFloat(inqOfferPrice) : null,
          quantity: inqQuantity,
          message: inqMessage,
        }),
      });
      if (res.ok) {
        setShowInquiryModal(false);
        setInqOfferPrice("");
        setInqQuantity("");
        setInqMessage("");
        setStatusMessage("✉️ Your inquiry has been sent! Supplier has received an instant trade alert.");
        setTimeout(() => setStatusMessage(""), 5000);
        loadAllData();
      }
    } catch {
      alert("Failed to send inquiry.");
    }
  };

  const handlePostRequirement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTitle.trim()) {
      alert("Please enter a title or item name for your requirement.");
      return;
    }
    try {
      const res = await fetch("/api/requirements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: currentUser.full_name,
          user_phone: currentUser.phone,
          title: reqTitle.trim(),
          category: reqCategory,
          quantity: reqQuantity || "1",
          unit: reqUnit || "units",
          target_budget: reqBudget ? parseFloat(reqBudget) : null,
          delivery_location: reqLocation || currentUser.village,
          district: reqDistrict || currentUser.district,
          urgency: reqUrgency,
          details: reqDetails,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setRequirements([data.requirement, ...requirements]);
        setMyRequirements([data.requirement, ...myRequirements]);
        setShowRequirementModal(false);
        setReqTitle("");
        setReqBudget("");
        setReqQuantity("");
        setReqDetails("");
        setStatusMessage("📢 Your requirement has been posted! Verified suppliers in your category have been notified.");
        setTimeout(() => setStatusMessage(""), 6000);
        loadAllData();
      } else {
        alert("Failed to post requirement. Please check required fields.");
      }
    } catch (err) {
      console.error("Error posting requirement:", err);
      alert("Failed to post requirement.");
    }
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReqTarget || !quotePrice) {
      alert("Please enter your quoted price.");
      return;
    }
    try {
      const res = await fetch(`/api/requirements/${activeReqTarget.id}/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supplier_name: supplierProfile?.business_name || currentUser.full_name,
          supplier_phone: currentUser.phone,
          quote_price: quotePrice,
          delivery_time: quoteDelivery,
          notes: quoteNotes,
        }),
      });
      if (res.ok) {
        setShowQuoteModal(false);
        setQuotePrice("");
        setQuoteNotes("");
        setStatusMessage("💰 Your quotation has been delivered to the buyer! Check your Inquiries desk for replies.");
        setTimeout(() => setStatusMessage(""), 6000);
        loadAllData();
      } else {
        alert("Failed to submit quote.");
      }
    } catch (err) {
      console.error("Error submitting quote:", err);
      alert("Failed to submit quote.");
    }
  };

  const handleDeleteRequirement = async (id: number) => {
    if (!confirm("Are you sure you want to close and remove this requirement?")) return;
    try {
      const res = await fetch(`/api/requirements/${id}`, { method: "DELETE" });
      if (res.ok) {
        setRequirements(requirements.filter((r) => r.id !== id));
        setMyRequirements(myRequirements.filter((r) => r.id !== id));
        setStatusMessage("Requirement closed successfully.");
        setTimeout(() => setStatusMessage(""), 3000);
      }
    } catch (e) {
      console.error("Failed to delete requirement", e);
    }
  };

  // Metrics
  const totalPondsCount = ponds.length || (farmingProfile ? parseInt(farmingProfile.pond_count, 10) || 1 : 0);
  const totalBiomassKg = ponds.reduce((sum, p) => sum + (p.stocked_count * p.avg_weight_g) / 1000, 0);
  const totalExpensesAmount = expenses.reduce((sum, e) => sum + (parseFloat(e.amount.toString()) || 0), 0);
  const costPerKg = totalBiomassKg > 0 ? (totalExpensesAmount / totalBiomassKg).toFixed(1) : "0";

  // Section titles for mobile top bar
  const menuTitles: Record<DashboardMenuId, string> = {
    overview: "Dashboard Overview",
    expenses: "Daily Farm Expenses",
    ponds: "Ponds & Tanks Inventory",
    water: "Water Quality & Feed FCR",
    harvests: "Ready for Harvest Broadcasts",
    catalogue: "Supplier Product Catalogue",
    procurement: "50 KM Buy Leads & Procurement",
    inquiries: "Buyer Inquiries & Leads",
    notifications: "Trade Alerts & Notifications",
    ecosystem50km: "50 KM Regional Hub",
    profile: "My Profile & Roles",
  };

  // Filtered catalogue items for marketplace
  const filteredCatalog = allCatalog.filter((prod) => {
    if (catCategoryFilter !== "All" && !prod.category.toLowerCase().includes(catCategoryFilter.toLowerCase())) {
      return false;
    }
    if (catInStockOnly && !prod.in_stock) {
      return false;
    }
    if (catSearchQuery.trim()) {
      const q = catSearchQuery.toLowerCase().trim();
      const matchTitle = (prod.title || "").toLowerCase().includes(q);
      const matchDesc = (prod.description || "").toLowerCase().includes(q);
      const matchCat = (prod.category || "").toLowerCase().includes(q);
      const matchSeller = (prod.seller_name || "").toLowerCase().includes(q);
      const matchDist = (prod.district || "").toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCat && !matchSeller && !matchDist) return false;
    }
    return true;
  });

  return (
    <div className="flex min-h-[calc(100vh-120px)] bg-slate-100/60 pb-16 lg:pb-0">
      {/* 1. LEFT SIDEBAR MENU (TRADEINDIA STYLE) */}
      <SidebarNav
        activeMenu={activeMenu}
        onSelectMenu={(menu) => setActiveMenu(menu)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        inquiriesCount={enquiries.length}
        unreadNotifsCount={unreadNotifsCount}
        userName={currentUser.full_name}
        userPhone={currentUser.phone}
        village={currentUser.village}
        hasFarming={!!farmingProfile}
        hasSupplier={!!supplierProfile}
        onSwitchOrAddProfile={onSwitchOrAddProfile}
        onLogout={onLogout}
      />

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Sticky Mobile/Desktop Top Header Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3 sm:px-6 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Open Left Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                {menuTitles[activeMenu]}
              </h1>
              <div className="text-[11px] text-slate-500 hidden sm:block">
                ModernFisheries Trade &amp; Farm Portal
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveMenu("notifications")}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              )}
            </button>

            <button
              onClick={loadAllData}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loadingData ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={onSwitchOrAddProfile}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <Store className="w-3.5 h-3.5 text-slate-600" />
              <span>Roles</span>
            </button>
          </div>
        </header>

        {/* Status Toast */}
        {statusMessage && (
          <div className="mx-4 sm:mx-6 mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Content Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          {/* ================================================================= */}
          {/* VIEW 1: DASHBOARD OVERVIEW                                        */}
          {/* ================================================================= */}
          {activeMenu === "overview" && (
            <div className="space-y-6">
              {/* KPI Banner */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Ponds &amp; Tanks
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">
                      {totalPondsCount}
                    </span>
                    <span className="text-xs text-slate-500">
                      {farmingProfile?.water_area || "40,000 L"}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Est. Biomass
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-blue-600">
                      {totalBiomassKg > 0 ? totalBiomassKg.toLocaleString() : "4,200"}
                    </span>
                    <span className="text-xs text-slate-500">kg fish</span>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Season Expenses
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-700">
                      ₹{totalExpensesAmount.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500">{expenses.length} logs</span>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Cost of Production
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-amber-700">
                      ₹{costPerKg}
                    </span>
                    <span className="text-xs text-slate-500">/ kg fish</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Grid (TradeIndia Style) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => setShowExpenseModal(true)}
                  className="p-4 rounded-2xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 text-left transition-all cursor-pointer group shadow-xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5" />
                  </div>
                  <strong className="text-xs font-black text-slate-900 block">Log Expense</strong>
                  <span className="text-[11px] text-slate-500">Feed, power, seed</span>
                </button>

                <button
                  onClick={() => setShowHarvestModal(true)}
                  className="p-4 rounded-2xl bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 text-left transition-all cursor-pointer group shadow-xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Send className="w-5 h-5" />
                  </div>
                  <strong className="text-xs font-black text-slate-900 block">Broadcast Harvest</strong>
                  <span className="text-[11px] text-slate-500">To 50 KM buyers</span>
                </button>

                <button
                  onClick={() => setShowProductModal(true)}
                  className="p-4 rounded-2xl bg-white hover:bg-teal-50/50 border border-slate-200 hover:border-teal-300 text-left transition-all cursor-pointer group shadow-xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Package className="w-5 h-5" />
                  </div>
                  <strong className="text-xs font-black text-slate-900 block">Add to Catalogue</strong>
                  <span className="text-[11px] text-slate-500">Feed, seed, aerators</span>
                </button>

                <button
                  onClick={() => setActiveMenu("procurement")}
                  className="p-4 rounded-2xl bg-white hover:bg-purple-50/50 border border-slate-200 hover:border-purple-300 text-left transition-all cursor-pointer group shadow-xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <strong className="text-xs font-black text-slate-900 block">50 KM Buy Leads</strong>
                  <span className="text-[11px] text-slate-500">Source ready fish</span>
                </button>
              </div>

              {/* Recent Inquiries & Recent Expenses Split */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Inquiries */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                      <span>Recent Buyer Inquiries</span>
                    </h3>
                    <button
                      onClick={() => setActiveMenu("inquiries")}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      View All ({enquiries.length})
                    </button>
                  </div>

                  {enquiries.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400">
                      No inquiries received yet.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {enquiries.slice(0, 3).map((enq) => (
                        <div
                          key={enq.id}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-3"
                        >
                          <div>
                            <strong className="text-slate-900 block">{enq.item_title}</strong>
                            <span className="text-[11px] text-slate-500">
                              From: {enq.sender_name} (📞 {enq.sender_phone})
                            </span>
                          </div>
                          <div className="text-right">
                            {enq.offered_price && (
                              <strong className="text-emerald-700 block">
                                ₹{enq.offered_price}/kg
                              </strong>
                            )}
                            <span className="text-[10px] text-slate-400">{enq.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Expenses */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-emerald-600" />
                      <span>Recent Farm Expenses</span>
                    </h3>
                    <button
                      onClick={() => setActiveMenu("expenses")}
                      className="text-xs font-bold text-emerald-600 hover:underline"
                    >
                      View All ({expenses.length})
                    </button>
                  </div>

                  {expenses.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400">
                      No expenses logged yet.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {expenses.slice(0, 3).map((exp) => (
                        <div
                          key={exp.id}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-3"
                        >
                          <div>
                            <strong className="text-slate-900 block">{exp.title}</strong>
                            <span className="text-[11px] text-slate-500">
                              {exp.date} · {exp.category}
                            </span>
                          </div>
                          <strong className="text-sm font-black text-slate-900">
                            ₹{exp.amount.toLocaleString()}
                          </strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 2: DAILY EXPENSES                                            */}
          {/* ================================================================= */}
          {activeMenu === "expenses" && (
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-emerald-600" />
                    <span>Daily Farm Financial Records &amp; Expenses</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Log feeding costs, electricity, seed, and medicines to automatically calculate cost-per-kg.
                  </p>
                </div>
                <button
                  onClick={() => setShowExpenseModal(true)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log Daily Expense</span>
                </button>
              </div>

              {expenses.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">No expenses logged yet</h3>
                  <button
                    onClick={() => setShowExpenseModal(true)}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Log First Expense
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Expense Item</th>
                        <th className="py-3 px-3">Pond / Tank</th>
                        <th className="py-3 px-3">Vendor</th>
                        <th className="py-3 px-3 text-right">Amount (₹)</th>
                        <th className="py-3 px-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {expenses.map((e) => (
                        <tr key={e.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-3 font-mono text-slate-500">{e.date}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                              {e.category}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <strong className="text-slate-900 block font-semibold">{e.title}</strong>
                            {e.notes && <span className="text-[11px] text-slate-400">{e.notes}</span>}
                          </td>
                          <td className="py-3 px-3 text-slate-600">{e.pond_name}</td>
                          <td className="py-3 px-3 text-slate-500">{e.vendor_name || "—"}</td>
                          <td className="py-3 px-3 text-right font-black text-slate-900 text-sm">
                            ₹{e.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <button
                              onClick={() => handleDeleteExpense(e.id)}
                              className="p-1 rounded-md text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 3: PONDS & TANKS                                             */}
          {/* ================================================================= */}
          {activeMenu === "ponds" && (
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-600" />
                    <span>Ponds &amp; Tank Inventory</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Track stocking density, Average Body Weight (ABW), and harvest progress.
                  </p>
                </div>
                <button
                  onClick={() => setShowPondModal(true)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Pond</span>
                </button>
              </div>

              {ponds.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">No ponds configured yet</h3>
                  <button
                    onClick={() => setShowPondModal(true)}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Add First Pond
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ponds.map((p) => {
                    const biomass = Math.round((p.stocked_count * p.avg_weight_g) / 1000);
                    const progress = Math.min(100, Math.round((p.avg_weight_g / p.target_weight_g) * 100));
                    return (
                      <div
                        key={p.id}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {p.culture_type}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-400">{p.water_area}</span>
                        </div>

                        <div>
                          <h4 className="text-base font-black text-slate-900">{p.pond_name}</h4>
                          <p className="text-xs text-slate-600">{p.species}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-200/80">
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase">Stocked Count</span>
                            <strong className="text-slate-900">{p.stocked_count.toLocaleString()} fish</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase">Est. Biomass</span>
                            <strong className="text-emerald-700">{biomass.toLocaleString()} kg</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase">Current ABW</span>
                            <strong className="text-slate-800">{p.avg_weight_g} g</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase">Target Harvest</span>
                            <strong className="text-slate-800">{p.target_weight_g} g</strong>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setHarvPond(p.pond_name);
                            setHarvSpecies(p.species);
                            setHarvQuantity(biomass.toString());
                            setHarvAvgWeight((p.avg_weight_g / 1000).toFixed(2));
                            setShowHarvestModal(true);
                          }}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Broadcast for Harvest</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 4: WATER QUALITY & FEED FCR                                  */}
          {/* ================================================================= */}
          {activeMenu === "water" && (
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-emerald-600" />
                    <span>Daily Water Quality Telemetry &amp; Feed FCR</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Monitor Dissolved Oxygen, pH, Temperature, and Ammonia to protect your fish.
                  </p>
                </div>
                <button
                  onClick={() => setShowWaterModal(true)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log Parameters</span>
                </button>
              </div>

              {/* Reference Threshold Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-[10px] text-blue-700 font-bold uppercase block">Dissolved Oxygen (DO)</span>
                  <strong className="text-base font-black text-blue-950">&gt; 5.0 ppm</strong>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase block">pH Range</span>
                  <strong className="text-base font-black text-emerald-950">7.5 – 8.5</strong>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] text-amber-700 font-bold uppercase block">Water Temp</span>
                  <strong className="text-base font-black text-amber-950">26°C – 31°C</strong>
                </div>
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                  <span className="text-[10px] text-purple-700 font-bold uppercase block">Ammonia ($NH_3$)</span>
                  <strong className="text-base font-black text-purple-950">&lt; 0.05 ppm</strong>
                </div>
              </div>

              {waterLogs.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-2">
                  <p className="text-xs text-slate-500">No water telemetry logged yet.</p>
                  <button
                    onClick={() => setShowWaterModal(true)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Log Today's Test
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Pond</th>
                        <th className="py-3 px-3">DO (mg/L)</th>
                        <th className="py-3 px-3">pH</th>
                        <th className="py-3 px-3">Temp (°C)</th>
                        <th className="py-3 px-3">Ammonia</th>
                        <th className="py-3 px-3">Feed Given</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {waterLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-3 font-mono text-slate-500">{log.date}</td>
                          <td className="py-3 px-3 font-bold text-slate-800">{log.pond_name}</td>
                          <td className="py-3 px-3 font-black text-emerald-600">{log.do_ppm} ppm</td>
                          <td className="py-3 px-3 font-semibold text-slate-700">{log.ph_level}</td>
                          <td className="py-3 px-3 font-semibold text-slate-700">{log.temp_c}°C</td>
                          <td className="py-3 px-3 font-semibold text-slate-700">{log.ammonia_ppm} ppm</td>
                          <td className="py-3 px-3 font-bold text-slate-900">{log.feed_kg} kg</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 5: READY FOR HARVEST (FARMER BROADCASTS)                     */}
          {/* ================================================================= */}
          {activeMenu === "harvests" && (
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Send className="w-5 h-5 text-emerald-600" />
                    <span>My Ready-for-Harvest Broadcasts</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live broadcasts sent to verified buyers, traders, and markets within 50 KM.
                  </p>
                </div>
                <button
                  onClick={() => setShowHarvestModal(true)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm self-start sm:self-auto"
                >
                  <Send className="w-4 h-4" />
                  <span>+ Broadcast Harvest</span>
                </button>
              </div>

              {myHarvests.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Send className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">No active harvest broadcasts</h3>
                  <button
                    onClick={() => setShowHarvestModal(true)}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Broadcast First Harvest
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myHarvests.map((h) => (
                    <div
                      key={h.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {h.status}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-500">
                          {h.ready_quantity_kg.toLocaleString()} kg ready
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-black text-slate-900">{h.species}</h4>
                        <p className="text-xs text-slate-600">
                          {h.pond_name} · Avg Body Weight: {h.avg_weight_kg} kg
                        </p>
                      </div>

                      <div className="flex justify-between py-2 border-y border-slate-200 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Target Rate</span>
                          <strong className="text-emerald-700 font-black">
                            {h.price_per_kg ? `₹${h.price_per_kg} / kg` : "Negotiable"}
                          </strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Harvest Window</span>
                          <strong className="text-slate-800">{h.harvest_start_date}</strong>
                        </div>
                      </div>

                      <div className="text-xs text-slate-500">
                        Road: {h.pickup_road_access}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 6: B2B SUPPLIER CATALOGUE, MARKETPLACE & BUYER REQUIREMENTS   */}
          {/* ================================================================= */}
          {activeMenu === "catalogue" && (
            <div className="space-y-6">
              {/* Top TradeIndia / B2B Hero Bar */}
              <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-lg border border-teal-800/40 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[11px] font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>B2B Aquaculture Marketplace &amp; Trade Desk</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                      <Package className="w-6 h-6 text-teal-400" />
                      <span>Supplier Catalogue &amp; Commercial Products</span>
                    </h2>
                    <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                      Discover verified equipment, formulated feeds, fingerlings, and water care products from certified suppliers. Search items, send direct inquiries, or post your requirement to receive rapid quotes.
                    </p>
                  </div>

                  {/* High-Impact Action CTAs */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 self-start lg:self-center">
                    <button
                      onClick={() => setShowRequirementModal(true)}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center gap-2 transition-all shadow-md hover:scale-102 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Post My Requirement</span>
                    </button>

                    <button
                      onClick={() => setShowProductModal(true)}
                      className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md hover:scale-102 cursor-pointer"
                    >
                      <Store className="w-4 h-4" />
                      <span>+ Sell / Add Product</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Navigation Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-white/10 text-xs no-scrollbar">
                  <button
                    onClick={() => setCatalogueSubTab("marketplace")}
                    className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                      catalogueSubTab === "marketplace"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "bg-white/10 text-slate-200 hover:bg-white/15"
                    }`}
                  >
                    <Package className="w-4 h-4 text-teal-600" />
                    <span>All Products Catalogue</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      catalogueSubTab === "marketplace" ? "bg-teal-100 text-teal-800" : "bg-white/20 text-white"
                    }`}>
                      {allCatalog.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setCatalogueSubTab("requirements")}
                    className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                      catalogueSubTab === "requirements"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "bg-white/10 text-slate-200 hover:bg-white/15"
                    }`}
                  >
                    <Send className="w-4 h-4 text-amber-600" />
                    <span>Active Buyer Demands (RFQ)</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      catalogueSubTab === "requirements" ? "bg-amber-100 text-amber-800" : "bg-white/20 text-white"
                    }`}>
                      {requirements.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setCatalogueSubTab("my-demands")}
                    className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                      catalogueSubTab === "my-demands"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "bg-white/10 text-slate-200 hover:bg-white/15"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span>My Requirements</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      catalogueSubTab === "my-demands" ? "bg-blue-100 text-blue-800" : "bg-white/20 text-white"
                    }`}>
                      {myRequirements.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setCatalogueSubTab("my-store")}
                    className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                      catalogueSubTab === "my-store"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "bg-white/10 text-slate-200 hover:bg-white/15"
                    }`}
                  >
                    <Store className="w-4 h-4 text-emerald-600" />
                    <span>Supplier Storefront (My Items)</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      catalogueSubTab === "my-store" ? "bg-emerald-100 text-emerald-800" : "bg-white/20 text-white"
                    }`}>
                      {myCatalog.length}
                    </span>
                  </button>
                </div>
              </div>

              {/* TAB 1: ALL PRODUCTS MARKETPLACE */}
              {catalogueSubTab === "marketplace" && (
                <div className="space-y-6">
                  {/* Search, Filter & Categories Bar */}
                  <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200 space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="relative flex-1 w-full">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search products, motors, feeds, fingerlings, seller name, or district..."
                          value={catSearchQuery}
                          onChange={(e) => setCatSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:bg-white focus:border-teal-500 focus:outline-none transition-all"
                        />
                        {catSearchQuery && (
                          <button
                            onClick={() => setCatSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <label className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-bold whitespace-nowrap cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={catInStockOnly}
                          onChange={(e) => setCatInStockOnly(e.target.checked)}
                          className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                        />
                        <span>In Stock Only</span>
                      </label>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                      {[
                        "All",
                        "Aeration & Motors",
                        "Aqua Feed & Nutrition",
                        "Seeds & Fingerlings",
                        "Water Testing & Instruments",
                        "Biofloc & Probiotics",
                        "Liners & Tanks",
                        "Pumps, Nets & Hardware",
                      ].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCatCategoryFilter(cat)}
                          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                            catCategoryFilter === cat
                              ? "bg-teal-600 text-white shadow-xs"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* "Can't Find What You Need?" Post Requirement Interactive Banner */}
                  <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-emerald-50 border border-amber-200/80 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                          TradeIndia Buyer Desk
                        </span>
                        <h3 className="text-sm sm:text-base font-black text-slate-900">
                          Need custom feed formulations, bulk fingerlings, or aerator machinery?
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 max-w-xl">
                        Post your requirement with target budget. We broadcast your demand to all verified local suppliers in that category so they can contact you with quotations.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowRequirementModal(true)}
                      className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-black text-xs rounded-xl flex items-center gap-2 transition-all shadow-sm whitespace-nowrap self-start sm:self-auto cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Post Buy Requirement</span>
                    </button>
                  </div>

                  {/* Products Grid */}
                  {filteredCatalog.length === 0 ? (
                    <div className="text-center py-16 px-4 rounded-3xl bg-white border border-slate-200 space-y-3">
                      <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                        <Package className="w-7 h-7" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">No matching products found</h3>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        Try clearing your search terms or selecting another category filter. Or post your specific requirement so suppliers can source it for you!
                      </p>
                      <div className="flex items-center justify-center gap-3 pt-2">
                        <button
                          onClick={() => {
                            setCatSearchQuery("");
                            setCatCategoryFilter("All");
                            setCatInStockOnly(false);
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                        >
                          Clear Filters
                        </button>
                        <button
                          onClick={() => setShowRequirementModal(true)}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black cursor-pointer"
                        >
                          Post Requirement
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {filteredCatalog.map((prod) => (
                        <div
                          key={prod.id}
                          className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                        >
                          <div className="space-y-3">
                            {/* Card Top Pill & Distance */}
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 truncate">
                                {prod.category}
                              </span>
                              <div className="flex items-center gap-1.5">
                                {prod.in_stock ? (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                    In Stock
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-500">
                                    Pre-order
                                  </span>
                                )}
                                {prod.distanceKm !== undefined && prod.distanceKm !== null && (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                    {prod.distanceKm} KM
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Product Title & Specs */}
                            <div>
                              <h4 className="text-base font-black text-slate-900 group-hover:text-teal-700 transition-colors">
                                {prod.title}
                              </h4>
                              {prod.description && (
                                <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                                  {prod.description}
                                </p>
                              )}
                            </div>

                            {/* Price Block */}
                            <div className="pt-2">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                                Indicative Price
                              </span>
                              <div className="flex items-baseline gap-1">
                                <strong className="text-xl font-black text-slate-900">
                                  ₹{prod.price ? prod.price.toLocaleString() : "Contact"}
                                </strong>
                                <span className="text-xs text-slate-500">/ {prod.unit}</span>
                              </div>
                            </div>

                            {/* Seller & Verification Details */}
                            <div className="pt-3 border-t border-slate-100 text-xs space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-800 flex items-center gap-1 truncate">
                                  <Store className="w-3.5 h-3.5 text-teal-600" />
                                  <span>{prod.seller_name || "Verified Local Supplier"}</span>
                                </span>
                                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  Verified
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 flex items-center justify-between">
                                <span>📍 {prod.village ? `${prod.village}, ${prod.district}` : prod.district || "Regional Center"}</span>
                                {prod.delivery_radius_km && (
                                  <span>Delivers {prod.delivery_radius_km} KM</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Card Actions: Inquiry, WhatsApp & Phone */}
                          <div className="pt-3 border-t border-slate-100 space-y-2">
                            <button
                              onClick={() => {
                                setActiveInquiryTarget({
                                  id: prod.id,
                                  type: "supply_quote",
                                  title: prod.title,
                                  seller_name: prod.seller_name || "Verified Supplier",
                                  phone: prod.phone || "9831102941",
                                  whatsapp: prod.whatsapp || prod.phone || "9831102941",
                                  price: prod.price,
                                  unit: prod.unit,
                                  category: prod.category,
                                });
                                setShowInquiryModal(true);
                              }}
                              className="w-full py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span>Make Inquiry / Request Quote</span>
                            </button>

                            <div className="grid grid-cols-2 gap-2">
                              <a
                                href={`https://wa.me/91${(prod.whatsapp || prod.phone || "").replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent(
                                  `Hello, I am inquiring about "${prod.title}" listed on ModernFisheries B2B Catalogue.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                              >
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>WhatsApp</span>
                              </a>

                              <a
                                href={`tel:${prod.phone || ""}`}
                                className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5 text-slate-500" />
                                <span>Call Seller</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: ACTIVE BUYER DEMANDS (RFQ) */}
              {catalogueSubTab === "requirements" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                        <Send className="w-5 h-5 text-amber-600" />
                        <span>Live Buyer Demands &amp; Purchase Leads (RFQ)</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Aquaculturists actively seeking equipment, seeds, and feed in your regional radius. Suppliers can respond directly with quotations.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowRequirementModal(true)}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer whitespace-nowrap self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Post My Requirement</span>
                    </button>
                  </div>

                  {requirements.length === 0 ? (
                    <div className="text-center py-16 px-4 rounded-3xl bg-white border border-slate-200 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                        <Send className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">No active buyer demands currently</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Post your requirement for fingerlings, floating feed, paddle wheel aerators, or HDPE pond liners to trigger supplier notifications.
                      </p>
                      <button
                        onClick={() => setShowRequirementModal(true)}
                        className="px-5 py-2.5 bg-amber-500 text-slate-950 font-black rounded-xl text-xs cursor-pointer"
                      >
                        Post First Requirement
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {requirements.map((req) => (
                        <div
                          key={req.id}
                          className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                                {req.category}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{req.urgency || "Immediate"}</span>
                                </span>
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                  {req.status}
                                </span>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-base font-black text-slate-900">{req.title}</h4>
                              {req.details && (
                                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                  {req.details}
                                </p>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs bg-slate-50/70 p-3 rounded-2xl">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Quantity Needed</span>
                                <strong className="text-slate-900 text-sm font-black">
                                  {req.quantity} {req.unit}
                                </strong>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Budget</span>
                                <strong className="text-emerald-700 text-sm font-black">
                                  {req.target_budget ? `₹${req.target_budget.toLocaleString()}` : "Open to Quotes"}
                                </strong>
                              </div>
                              <div className="col-span-2 pt-1 border-t border-slate-200/50">
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Delivery Location</span>
                                <span className="text-slate-700 font-semibold">
                                  📍 {req.delivery_location || req.district}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                              <span className="font-bold text-slate-700">
                                👤 {req.user_name}
                              </span>
                              <span className="text-[11px] font-mono">
                                💬 {req.quotes_count || 0} Quotes Received
                              </span>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100 space-y-2">
                            <button
                              onClick={() => {
                                setActiveReqTarget(req);
                                setQuotePrice(req.target_budget ? req.target_budget.toString() : "");
                                setShowQuoteModal(true);
                              }}
                              className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                            >
                              <DollarSign className="w-4 h-4" />
                              <span>Submit Quotation / Offer to Buyer</span>
                            </button>

                            <div className="grid grid-cols-2 gap-2">
                              <a
                                href={`https://wa.me/91${req.user_phone.replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent(
                                  `Hello ${req.user_name}, I am contacting you regarding your requirement for "${req.title}". I am a certified aquaculture supplier on ModernFisheries.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                              >
                                <span>WhatsApp Buyer</span>
                              </a>

                              <a
                                href={`tel:${req.user_phone}`}
                                className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5 text-slate-500" />
                                <span>Call Buyer</span>
                              </a>
                            </div>

                            {req.is_mine && (
                              <button
                                onClick={() => handleDeleteRequirement(req.id)}
                                className="w-full py-1.5 text-center text-xs text-red-600 hover:text-red-700 font-bold cursor-pointer"
                              >
                                Close &amp; Remove My Requirement
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: MY POSTED REQUIREMENTS */}
              {catalogueSubTab === "my-demands" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                        <span>My Broadcasted Requirements</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Requirements you have submitted. When suppliers quote or reply, you will receive real-time notifications in your Trade Alerts.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowRequirementModal(true)}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer whitespace-nowrap self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Post Another Requirement</span>
                    </button>
                  </div>

                  {myRequirements.length === 0 ? (
                    <div className="text-center py-16 px-4 rounded-3xl bg-white border border-slate-200 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">You haven't posted any requirements yet</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Need fish seeds, specific 32% floating feed, paddle wheel aerator units, or geomembrane liners? Post your requirement to get quotes from certified suppliers.
                      </p>
                      <button
                        onClick={() => setShowRequirementModal(true)}
                        className="px-5 py-2.5 bg-amber-500 text-slate-950 font-black rounded-xl text-xs cursor-pointer"
                      >
                        Post First Requirement
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {myRequirements.map((r) => (
                        <div
                          key={r.id}
                          className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-blue-400 transition-all space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                              {r.category}
                            </span>
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {r.status}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-base font-black text-slate-900">{r.title}</h4>
                            {r.details && (
                              <p className="text-xs text-slate-600 mt-1">{r.details}</p>
                            )}
                          </div>

                          <div className="flex items-center justify-between py-2 border-y border-slate-100 text-xs">
                            <div>
                              <span className="text-[10px] text-slate-400 block uppercase">Quantity</span>
                              <strong className="text-slate-900">{r.quantity} {r.unit}</strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 block uppercase">Target Budget</span>
                              <strong className="text-emerald-700">
                                {r.target_budget ? `₹${r.target_budget.toLocaleString()}` : "Open"}
                              </strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 block uppercase">Quotations</span>
                              <strong className="text-blue-700">{r.quotes_count || 0} received</strong>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <span className="text-[11px] text-slate-400">
                              Posted on {new Date(r.created_at).toLocaleDateString()}
                            </span>
                            <button
                              onClick={() => handleDeleteRequirement(r.id)}
                              className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                            >
                              Close Requirement
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: MY STOREFRONT LISTINGS (FOR SUPPLIERS) */}
              {catalogueSubTab === "my-store" && (
                <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-200 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <Store className="w-5 h-5 text-teal-600" />
                        <span>My Listed Products &amp; Machinery</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Products you list here are immediately discoverable by farmers and buyers in the Regional Hub and 50 KM radius.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowProductModal(true)}
                      className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add New Product</span>
                    </button>
                  </div>

                  {myCatalog.length === 0 ? (
                    <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                        <Package className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-800">Your storefront catalogue is currently empty</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        List aqua feed, fish seed, aerators, testing kits or solar pumps to sell directly to commercial aquaculturists in your area.
                      </p>
                      <button
                        onClick={() => setShowProductModal(true)}
                        className="px-5 py-2.5 bg-teal-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Add First Product
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {myCatalog.map((prod) => (
                        <div
                          key={prod.id}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 transition-all space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                              {prod.category}
                            </span>
                            <span className="text-xs font-bold text-emerald-700">
                              {prod.in_stock ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-base font-black text-slate-900">{prod.title}</h4>
                            {prod.description && (
                              <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                                {prod.description}
                              </p>
                            )}
                          </div>

                          <div className="flex items-baseline justify-between pt-2 border-t border-slate-200">
                            <div>
                              <strong className="text-lg font-black text-slate-900">
                                ₹{prod.price ? prod.price.toLocaleString() : 0}
                              </strong>
                              <span className="text-xs text-slate-500 ml-1">/ {prod.unit}</span>
                            </div>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                              title="Remove product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 7: 50 KM PROCUREMENT & BUY LEADS (TRADEINDIA BUYER DESK)     */}
          {/* ================================================================= */}
          {activeMenu === "procurement" && (
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-teal-600" />
                    <span>50 KM Ready Harvest Buy Leads (Fish Procurement)</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Browse ready fish harvests posted by cultivators within 50 KM. Submit offers or contact directly.
                  </p>
                </div>
              </div>

              {nearby50km.harvests.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-2">
                  <p className="text-xs text-slate-500">
                    No active harvests broadcasted within 50 KM at this exact moment. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nearby50km.harvests.map((h) => (
                    <div
                      key={h.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">
                          {h.species} ({h.ready_quantity_kg.toLocaleString()} kg)
                        </span>
                        {h.distanceKm !== undefined && h.distanceKm !== null && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                            {h.distanceKm.toFixed(1)} KM away
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600">
                        Farmer: <strong>{h.farmer_name}</strong> · 📞 {h.phone}
                      </p>

                      <div className="flex justify-between py-2 border-y border-slate-200 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Price</span>
                          <strong className="text-emerald-700">
                            {h.price_per_kg ? `₹${h.price_per_kg}/kg` : "Negotiable"}
                          </strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">ABW</span>
                          <strong className="text-slate-800">{h.avg_weight_kg} kg</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => {
                            setActiveInquiryTarget({
                              id: h.id,
                              title: `${h.species} Harvest (${h.ready_quantity_kg} kg)`,
                              phone: h.phone,
                              type: "harvest_offer",
                            });
                            setShowInquiryModal(true);
                          }}
                          className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Make Offer in App</span>
                        </button>

                        <a
                          href={`https://wa.me/${h.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                            `Hello ${h.farmer_name}, I am interested in purchasing your ready harvest of ${h.species} (${h.ready_quantity_kg} kg).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 8: BUYER INQUIRIES & LEADS                                   */}
          {/* ================================================================= */}
          {activeMenu === "inquiries" && (
            <InquiriesView
              enquiries={enquiries}
              currentPhone={currentUser.phone}
              onRefresh={loadAllData}
            />
          )}

          {/* ================================================================= */}
          {/* VIEW 9: TRADE ALERTS & NOTIFICATIONS                              */}
          {/* ================================================================= */}
          {activeMenu === "notifications" && (
            <NotificationsView
              notifications={notifications}
              onMarkAllAsRead={handleMarkAllNotifsRead}
            />
          )}

          {/* ================================================================= */}
          {/* VIEW 10: 50 KM REGIONAL HUB & DIRECTORY                           */}
          {/* ================================================================= */}
          {activeMenu === "ecosystem50km" && (
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-blue-600" />
                    <span>50 KM Regional Ecosystem &amp; Directory</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Connect directly with local feed mills, equipment suppliers, hatcheries, and ready fish harvests.
                  </p>
                </div>

                {/* Radius Filter */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold self-start sm:self-auto">
                  {[15, 25, 50, 100].map((km) => (
                    <button
                      key={km}
                      onClick={() => setRadiusFilter(km)}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        radiusFilter === km
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {km} KM
                    </button>
                  ))}
                </div>
              </div>

              {/* Ecosystem Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nearby Suppliers */}
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-slate-900 flex items-center justify-between">
                    <span>Nearby Aqua Suppliers ({nearby50km.suppliers.length})</span>
                    <span className="text-xs text-slate-400 font-normal">Within {radiusFilter} KM</span>
                  </h3>
                  {nearby50km.suppliers.length === 0 ? (
                    <div className="p-6 rounded-2xl bg-slate-50 text-center text-xs text-slate-400">
                      No suppliers registered within {radiusFilter} KM yet.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {nearby50km.suppliers.map((s) => (
                        <div
                          key={s.id || s.phone}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                        >
                          <div className="flex justify-between">
                            <strong className="text-slate-900">{s.business_name}</strong>
                            <span className="text-blue-700 font-bold">
                              {s.distanceKm ? `${s.distanceKm.toFixed(1)} KM` : ""}
                            </span>
                          </div>
                          <p className="text-slate-500">{s.category} · {s.village}, {s.district}</p>
                          <p className="text-slate-600">📞 {s.whatsapp || s.phone}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Nearby Products */}
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-slate-900 flex items-center justify-between">
                    <span>Nearby Products in Stock ({nearby50km.products.length})</span>
                    <span className="text-xs text-slate-400 font-normal">Within {radiusFilter} KM</span>
                  </h3>
                  {nearby50km.products.length === 0 ? (
                    <div className="p-6 rounded-2xl bg-slate-50 text-center text-xs text-slate-400">
                      No products listed within {radiusFilter} KM yet.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {nearby50km.products.map((p) => (
                        <div
                          key={p.id}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                        >
                          <div className="flex justify-between">
                            <strong className="text-slate-900">{p.title}</strong>
                            <span className="text-emerald-700 font-bold">₹{p.price}/{p.unit}</span>
                          </div>
                          <p className="text-slate-500">Seller: {p.seller_name} · 📞 {p.phone}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW 11: USER PROFILE & DUAL ROLES                                */}
          {/* ================================================================= */}
          {activeMenu === "profile" && (
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-slate-800" />
                    <span>My Account &amp; Dual Roles Configuration</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    One unified account handles both your farm management and supply storefront.
                  </p>
                </div>
                <button
                  onClick={onSwitchOrAddProfile}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
                >
                  Configure Roles
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* User Account */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-black text-slate-900">User Profile</h3>
                  <div className="space-y-1.5">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Full Name</span>
                      <strong className="text-slate-900">{currentUser.full_name}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Mobile</span>
                      <strong className="text-slate-900">{currentUser.phone}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Village / District</span>
                      <span className="text-slate-800">{currentUser.village}, {currentUser.district}</span>
                    </div>
                  </div>
                </div>

                {/* Role Status */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-black text-slate-900">Active Roles</h3>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Fish className="w-4 h-4 text-blue-600" />
                        <div>
                          <strong className="block text-slate-900">Cultivator / Farmer</strong>
                          <span className="text-[11px] text-slate-500">
                            {farmingProfile ? farmingProfile.farm_name : "Active"}
                          </span>
                        </div>
                      </div>
                      <span className="text-emerald-700 font-bold">Enabled</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-teal-600" />
                        <div>
                          <strong className="block text-slate-900">Supplier Storefront</strong>
                          <span className="text-[11px] text-slate-500">
                            {supplierProfile ? supplierProfile.business_name : "Inactive"}
                          </span>
                        </div>
                      </div>
                      {supplierProfile ? (
                        <span className="text-teal-700 font-bold">Enabled</span>
                      ) : (
                        <button
                          onClick={onSwitchOrAddProfile}
                          className="px-2.5 py-1 bg-amber-500 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                        >
                          Enable Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 3. MOBILE BOTTOM NAVIGATION (QUICK THUMB ACTION BAR) */}
      <MobileBottomNav
        activeMenu={activeMenu}
        onSelectMenu={(menu) => setActiveMenu(menu)}
        onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        inquiriesCount={enquiries.length}
      />

      {/* ========================================================================= */}
      {/* MODAL 1: ADD EXPENSE (RIGHT SIDE PROMPT - WIDTH AS PER CONTENT)           */}
      {/* ========================================================================= */}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end overflow-hidden">
          {/* Backdrop click dismiss */}
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setShowExpenseModal(false)}
            aria-hidden="true"
          />
          <div className="relative h-full max-h-screen bg-white shadow-2xl border-l border-slate-200 p-6 sm:p-8 space-y-5 overflow-y-auto w-full sm:w-auto min-w-[340px] sm:min-w-[460px] max-w-[95vw] sm:max-w-lg animate-slide-right flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-emerald-600" />
                  <span>Log Daily Farm Expense</span>
                </h3>
                <button
                  onClick={() => setShowExpenseModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 font-bold cursor-pointer"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddExpense} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Category</label>
                    <select
                      value={expCategory}
                      onChange={(e) => setExpCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="Feed">Fish Feed</option>
                      <option value="Fingerlings / Seed">Fingerlings / Seed</option>
                      <option value="Electricity & Power">Electricity &amp; Power</option>
                      <option value="Labor & Wages">Labor &amp; Wages</option>
                      <option value="Medicines & Probiotics">Medicines &amp; Probiotics</option>
                      <option value="Pond Preparation">Pond Preparation / Lime</option>
                      <option value="Equipment & Maintenance">Equipment &amp; Maintenance</option>
                      <option value="Other">Other Expenses</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Date</label>
                    <input
                      type="date"
                      value={expDate}
                      onChange={(e) => setExpDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Expense Title / Item</label>
                  <input
                    type="text"
                    placeholder="e.g. 15 Bags 28% Protein Floating Feed"
                    value={expTitle}
                    onChange={(e) => setExpTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Amount (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 14250"
                      value={expAmount}
                      onChange={(e) => setExpAmount(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Assigned Pond / Tank</label>
                    <input
                      type="text"
                      placeholder="e.g. Pond #1 or All Ponds"
                      value={expPond}
                      onChange={(e) => setExpPond(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Vendor / Shop Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Balaji Aqua Feeds"
                    value={expVendor}
                    onChange={(e) => setExpVendor(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Notes (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Batch #40 feed delivered via pickup"
                    value={expNotes}
                    onChange={(e) => setExpNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowExpenseModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer transition-colors"
                  >
                    Save Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD POND (RIGHT SIDE PROMPT - WIDTH AS PER CONTENT)              */}
      {/* ========================================================================= */}
      {showPondModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end overflow-hidden">
          {/* Backdrop click dismiss */}
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setShowPondModal(false)}
            aria-hidden="true"
          />
          <div className="relative h-full max-h-screen bg-white shadow-2xl border-l border-slate-200 p-6 sm:p-8 space-y-5 overflow-y-auto w-full sm:w-auto min-w-[340px] sm:min-w-[460px] max-w-[95vw] sm:max-w-lg animate-slide-right flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  <span>Add Pond / Tank Unit</span>
                </h3>
                <button
                  onClick={() => setShowPondModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 font-bold cursor-pointer"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddPond} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Pond / Tank Name</label>
                  <input
                    type="text"
                    placeholder="e.g. East Nursery Pond #2"
                    value={newPondName}
                    onChange={(e) => setNewPondName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Culture Type</label>
                    <select
                      value={newPondType}
                      onChange={(e) => setNewPondType(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="Earthen Pond">Earthen Pond</option>
                      <option value="Biofloc Tarpaulin Tank">Biofloc Tarpaulin Tank</option>
                      <option value="RAS Indoor Tank">RAS Indoor Tank</option>
                      <option value="Nursery Pit">Nursery Pit</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Water Area / Volume</label>
                    <input
                      type="text"
                      placeholder="e.g. 1.2 Acre or 40,000 L"
                      value={newPondArea}
                      onChange={(e) => setNewPondArea(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Fish Species Stocked</label>
                  <input
                    type="text"
                    placeholder="e.g. Catla, Rohu, Tilapia"
                    value={newPondSpecies}
                    onChange={(e) => setNewPondSpecies(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Stocked Count</label>
                    <input
                      type="number"
                      value={newPondStockCount}
                      onChange={(e) => setNewPondStockCount(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Avg Weight (g)</label>
                    <input
                      type="number"
                      value={newPondAvgWeight}
                      onChange={(e) => setNewPondAvgWeight(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Target (g)</label>
                    <input
                      type="number"
                      value={newPondTargetWeight}
                      onChange={(e) => setNewPondTargetWeight(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowPondModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer transition-colors"
                  >
                    Save Pond
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ADD WATER LOG (RIGHT SIDE PROMPT - WIDTH AS PER CONTENT)         */}
      {/* ========================================================================= */}
      {showWaterModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end overflow-hidden">
          {/* Backdrop click dismiss */}
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setShowWaterModal(false)}
            aria-hidden="true"
          />
          <div className="relative h-full max-h-screen bg-white shadow-2xl border-l border-slate-200 p-6 sm:p-8 space-y-5 overflow-y-auto w-full sm:w-auto min-w-[340px] sm:min-w-[460px] max-w-[95vw] sm:max-w-lg animate-slide-right flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-emerald-600" />
                  <span>Log Water Parameters &amp; Feed</span>
                </h3>
                <button
                  onClick={() => setShowWaterModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 font-bold cursor-pointer"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddWaterLog} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Pond</label>
                  <input
                    type="text"
                    placeholder="e.g. Pond #1"
                    value={waterPond}
                    onChange={(e) => setWaterPond(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Dissolved Oxygen (ppm)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={waterDO}
                      onChange={(e) => setWaterDO(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">pH Level</label>
                    <input
                      type="number"
                      step="0.1"
                      value={waterPH}
                      onChange={(e) => setWaterPH(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Temp (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={waterTemp}
                      onChange={(e) => setWaterTemp(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Ammonia (ppm)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={waterAmmonia}
                      onChange={(e) => setWaterAmmonia(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Feed Given (kg)</label>
                    <input
                      type="number"
                      value={waterFeed}
                      onChange={(e) => setWaterFeed(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowWaterModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer transition-colors"
                  >
                    Save Log
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: BROADCAST READY HARVEST (RIGHT SIDE PROMPT - WIDTH AS PER CONTENT) */}
      {/* ========================================================================= */}
      {showHarvestModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end overflow-hidden">
          {/* Backdrop click dismiss */}
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setShowHarvestModal(false)}
            aria-hidden="true"
          />
          <div className="relative h-full max-h-screen bg-white shadow-2xl border-l border-slate-200 p-6 sm:p-8 space-y-5 overflow-y-auto w-full sm:w-auto min-w-[340px] sm:min-w-[460px] max-w-[95vw] sm:max-w-lg animate-slide-right flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Send className="w-5 h-5 text-emerald-600" />
                  <span>Broadcast Ready-for-Harvest</span>
                </h3>
                <button
                  onClick={() => setShowHarvestModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 font-bold cursor-pointer"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleBroadcastHarvest} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Fish Species</label>
                    <input
                      type="text"
                      value={harvSpecies}
                      onChange={(e) => setHarvSpecies(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Estimated Ready Qty (kg)</label>
                    <input
                      type="number"
                      value={harvQuantity}
                      onChange={(e) => setHarvQuantity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Avg Fish Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={harvAvgWeight}
                      onChange={(e) => setHarvAvgWeight(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Target Rate (₹/kg)</label>
                    <input
                      type="number"
                      placeholder="e.g. 180"
                      value={harvPrice}
                      onChange={(e) => setHarvPrice(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Harvest Date</label>
                  <input
                    type="date"
                    value={harvStartDate}
                    onChange={(e) => setHarvStartDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Truck / Road Access</label>
                  <input
                    type="text"
                    value={harvRoadAccess}
                    onChange={(e) => setHarvRoadAccess(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowHarvestModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer transition-colors"
                  >
                    Broadcast to 50 KM
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: ADD PRODUCT TO CATALOGUE (RIGHT SIDE PROMPT - WIDTH AS PER CONTENT) */}
      {/* ========================================================================= */}
      {showProductModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end overflow-hidden">
          {/* Backdrop click dismiss */}
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setShowProductModal(false)}
            aria-hidden="true"
          />
          <div className="relative h-full max-h-screen bg-white shadow-2xl border-l border-slate-200 p-6 sm:p-8 space-y-5 overflow-y-auto w-full sm:w-auto min-w-[340px] sm:min-w-[460px] max-w-[95vw] sm:max-w-lg animate-slide-right flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-teal-600" />
                  <span>Add Product to Supply Catalogue</span>
                </h3>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 font-bold cursor-pointer"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Product Title</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 HP 4-Paddle Aerator with Copper Motor"
                    value={prodTitle}
                    onChange={(e) => setProdTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Category</label>
                    <select
                      value={prodCat}
                      onChange={(e) => setProdCat(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="Aqua Feed">Aqua Feed</option>
                      <option value="Fingerlings & Fish Seed">Fingerlings &amp; Fish Seed</option>
                      <option value="Aerators & Machinery">Aerators &amp; Machinery</option>
                      <option value="Chemicals & Probiotics">Chemicals &amp; Probiotics</option>
                      <option value="Tarpaulins & Tanks">Tarpaulins &amp; Tanks</option>
                      <option value="Water Test Kits">Water Test Kits</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Price (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 28500"
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Unit / Packaging</label>
                  <input
                    type="text"
                    placeholder="e.g. per unit, per 40kg bag, per 1,000 fry"
                    value={prodUnit}
                    onChange={(e) => setProdUnit(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Description</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. High efficiency oxygen transfer. 1-year warranty. Free delivery within 30 KM."
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold cursor-pointer transition-colors"
                  >
                    Add to Storefront
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: SEND PRODUCT INQUIRY OR HARVEST OFFER (RIGHT SIDE PROMPT)        */}
      {/* ========================================================================= */}
      {showInquiryModal && activeInquiryTarget && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end overflow-hidden">
          {/* Backdrop click dismiss */}
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setShowInquiryModal(false)}
            aria-hidden="true"
          />
          <div className="relative h-full max-h-screen bg-white shadow-2xl border-l border-slate-200 p-6 sm:p-8 space-y-5 overflow-y-auto w-full sm:w-auto min-w-[340px] sm:min-w-[480px] max-w-[95vw] sm:max-w-lg animate-slide-right flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-teal-600" />
                  <span>
                    {activeInquiryTarget.type === "supply_quote"
                      ? "Product Inquiry & Quote Request"
                      : "Submit Purchase Offer for Harvest"}
                  </span>
                </h3>
                <button
                  onClick={() => setShowInquiryModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 font-bold cursor-pointer"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              {/* Target Item Summary Card */}
              <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-900 text-sm">
                    {activeInquiryTarget.title || activeInquiryTarget.species}
                  </span>
                  {activeInquiryTarget.price && (
                    <span className="font-black text-teal-800">
                      ₹{activeInquiryTarget.price.toLocaleString()} {activeInquiryTarget.unit ? `/ ${activeInquiryTarget.unit}` : "/ kg"}
                    </span>
                  )}
                </div>
                <div className="text-slate-600 flex items-center justify-between text-[11px]">
                  <span>Supplier: <strong>{activeInquiryTarget.seller_name || "Certified Regional Supplier"}</strong></span>
                  <span>📞 {activeInquiryTarget.phone}</span>
                </div>
              </div>

              <form onSubmit={handleSendInquiry} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Quantity Needed</label>
                    <input
                      type="text"
                      placeholder={activeInquiryTarget.type === "supply_quote" ? "e.g. 10 bags / 2 sets" : "e.g. 1,500 kg"}
                      value={inqQuantity}
                      onChange={(e) => setInqQuantity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Target / Offered Price (₹)</label>
                    <input
                      type="number"
                      placeholder={activeInquiryTarget.price ? `e.g. ${activeInquiryTarget.price}` : "e.g. 175"}
                      value={inqOfferPrice}
                      onChange={(e) => setInqOfferPrice(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Delivery Requirements &amp; Notes</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Need delivery to Dattapukur farm site within 3 days. Please confirm freight and payment terms."
                    value={inqMessage}
                    onChange={(e) => setInqMessage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
                  <p>
                    ✓ Sending this inquiry notifies the supplier instantly in their <strong>Trade Alerts</strong> dashboard.
                  </p>
                  <p>
                    ✓ Your contact number (<strong>{currentUser.phone}</strong>) will be shared so the seller can respond.
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold cursor-pointer transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Inquiry to Supplier</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`https://wa.me/91${(activeInquiryTarget.whatsapp || activeInquiryTarget.phone || "").replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent(
                        `Hello, I am inquiring regarding "${activeInquiryTarget.title || activeInquiryTarget.species}" on ModernFisheries B2B Marketplace.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Direct WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${activeInquiryTarget.phone}`}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Direct Call</span>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 7: POST BUYER REQUIREMENT (RFQ) - RIGHT SIDE PROMPT                 */}
      {/* ========================================================================= */}
      {showRequirementModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end overflow-hidden">
          {/* Backdrop click dismiss */}
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setShowRequirementModal(false)}
            aria-hidden="true"
          />
          <div className="relative h-full max-h-screen bg-white shadow-2xl border-l border-slate-200 p-6 sm:p-8 space-y-5 overflow-y-auto w-full sm:w-auto min-w-[340px] sm:min-w-[500px] max-w-[95vw] sm:max-w-xl animate-slide-right flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      Post Buy Requirement (RFQ)
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Broadcast your demand to verified regional suppliers for fast quotes
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRequirementModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 font-bold cursor-pointer"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handlePostRequirement} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Requirement / Product Needed *</label>
                  <input
                    type="text"
                    placeholder="e.g. 50 Bags 32% Floating Feed (2.5mm) or 4 Units 2HP Paddle Aerators"
                    value={reqTitle}
                    onChange={(e) => setReqTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Category *</label>
                    <select
                      value={reqCategory}
                      onChange={(e) => setReqCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="Aqua Feed & Nutrition">Aqua Feed &amp; Nutrition</option>
                      <option value="Aeration & Motors">Aeration &amp; Motors</option>
                      <option value="Seeds & Fingerlings">Seeds &amp; Fingerlings</option>
                      <option value="Water Testing & Instruments">Water Testing &amp; Instruments</option>
                      <option value="Biofloc & Probiotics">Biofloc &amp; Probiotics</option>
                      <option value="Liners & Tanks">Liners &amp; Tanks</option>
                      <option value="Pumps, Nets & Hardware">Pumps, Nets &amp; Hardware</option>
                      <option value="General Farm Supplies">General Farm Supplies</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Urgency *</label>
                    <select
                      value={reqUrgency}
                      onChange={(e) => setReqUrgency(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                    >
                      <option value="Immediate (Within 48 hours)">Immediate (Within 48 hours)</option>
                      <option value="Within 1 week">Within 1 week</option>
                      <option value="Within 2-3 weeks">Within 2-3 weeks</option>
                      <option value="Planning / Inquiry only">Planning / Inquiry only</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Quantity Required *</label>
                    <input
                      type="text"
                      placeholder="e.g. 50"
                      value={reqQuantity}
                      onChange={(e) => setReqQuantity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Unit / Packaging</label>
                    <input
                      type="text"
                      placeholder="e.g. Bags (40kg), units, pieces"
                      value={reqUnit}
                      onChange={(e) => setReqUnit(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Target Budget (₹ Optional)</label>
                    <input
                      type="number"
                      placeholder="e.g. 120000"
                      value={reqBudget}
                      onChange={(e) => setReqBudget(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Delivery District *</label>
                    <input
                      type="text"
                      placeholder="e.g. North 24 Parganas"
                      value={reqDistrict}
                      onChange={(e) => setReqDistrict(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Delivery Address / Farm Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Plot 14, Barasat-Barrackpore Road, near Dattapukur bypass"
                    value={reqLocation}
                    onChange={(e) => setReqLocation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Detailed Specifications / Quality Standards</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Floating pellets must have min 32% crude protein, low dust, water stability 12 hours. Certificate of analysis required with delivery lot."
                    value={reqDetails}
                    onChange={(e) => setReqDetails(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                {/* Instant Supplier Notification Guarantee */}
                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] text-amber-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <Bell className="w-3.5 h-3.5 text-amber-700" />
                    <span>Instant Provider Broadcast Enabled</span>
                  </div>
                  <p>
                    All registered suppliers of <strong>{reqCategory}</strong> in and around <strong>{reqDistrict || "your region"}</strong> will receive a direct <strong>Lead Alert</strong> with your contact details ({currentUser.phone}) to submit quotes.
                  </p>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowRequirementModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black cursor-pointer transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Broadcast Requirement</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 8: SUBMIT QUOTATION TO BUYER (FOR SUPPLIERS) - RIGHT SIDE PROMPT   */}
      {/* ========================================================================= */}
      {showQuoteModal && activeReqTarget && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end overflow-hidden">
          {/* Backdrop click dismiss */}
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setShowQuoteModal(false)}
            aria-hidden="true"
          />
          <div className="relative h-full max-h-screen bg-white shadow-2xl border-l border-slate-200 p-6 sm:p-8 space-y-5 overflow-y-auto w-full sm:w-auto min-w-[340px] sm:min-w-[480px] max-w-[95vw] sm:max-w-lg animate-slide-right flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      Submit Supplier Quotation
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Send your pricing offer directly to the buyer
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 font-bold cursor-pointer"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              {/* Requirement Summary */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-950 text-sm">
                    {activeReqTarget.title}
                  </span>
                  <span className="font-black text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md text-[11px]">
                    {activeReqTarget.quantity} {activeReqTarget.unit}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 flex items-center justify-between">
                  <span>Buyer: <strong>{activeReqTarget.user_name}</strong></span>
                  <span>📍 {activeReqTarget.district}</span>
                </div>
                {activeReqTarget.target_budget && (
                  <div className="text-[11px] text-emerald-800 font-bold">
                    Target Budget: ₹{activeReqTarget.target_budget.toLocaleString()}
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmitQuote} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Your Quoted Price (₹ Total / Lot) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 115000"
                    value={quotePrice}
                    onChange={(e) => setQuotePrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-black text-base text-slate-900"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Delivery Timeframe</label>
                  <input
                    type="text"
                    value={quoteDelivery}
                    onChange={(e) => setQuoteDelivery(e.target.value)}
                    placeholder="e.g. Ready for immediate dispatch within 24 hours"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Specification Details / Terms / Inclusions</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Genuine pure copper winding motor with 1-year warranty. Free farm-gate delivery within 40 KM included in quote."
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowQuoteModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold cursor-pointer transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Quote to Buyer</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
