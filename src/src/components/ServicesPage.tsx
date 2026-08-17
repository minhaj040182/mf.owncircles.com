import React, { useState } from "react";
import { Briefcase, Calendar, ShieldCheck, CheckCircle2, Award, Clock, Users, Mail, AlertCircle, Phone, ChevronLeft } from "lucide-react";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

interface ServiceItem {
  id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  benefits: string[];
}

const ALL_SERVICES: ServiceItem[] = [
  {
    id: "serv-1",
    title: "1-on-1 Virtual Agronomist Consultation",
    duration: "45 Minutes",
    price: "$50.00",
    description: "Connect via video stream with an expert aquaculture agronomist. Bring your questions on disease diagnosis (e.g. columnaris, fin rot), FCR optimization, or water quality calibration.",
    benefits: ["Detailed diagnostic action plan", "Prescriptive treatment protocols", "Post-session email summary & FCR spreadsheets"]
  },
  {
    id: "serv-2",
    title: "Commercial Water Sample Laboratory Review",
    duration: "2-3 Days Turnaround",
    price: "$85.00",
    description: "Input your water quality logs (pH, Dissolved Oxygen, TAN, Nitrite, Alkalinity) or send water vials. Receive a certified biochemical evaluation with precise probiotic and liming recommendations.",
    benefits: ["Complete water chemistry report", "Tailored bacterial dosing index", "Toxic ammonia mitigation guidelines"]
  },
  {
    id: "serv-3",
    title: "Custom RAS Facility & Plumbing Blueprint",
    duration: "7 Days Delivery",
    price: "$450.00",
    description: "Get full mechanical/biological plumbing blueprints engineered to your farm coordinates. Includes piping schedules, pump head calibrations, drum filter specifications, and bio-media volumes.",
    benefits: ["CAD layout drawings (round & rectangular)", "Total power demand computations", "Emergency generator biosecurity sizing"]
  }
];

interface ServicesPageProps {
  onBackToDashboard?: () => void;
}

export default function ServicesPage({ onBackToDashboard }: ServicesPageProps = {}) {
  const [selectedService, setSelectedService] = useState<string>("serv-1");
  const [bookingDate, setBookingDate] = useState<string>("2026-07-20");
  const [bookingTime, setBookingTime] = useState<string>("10:00 AM");
  const [farmerName, setFarmerName] = useState<string>("");
  const [farmerEmail, setFarmerEmail] = useState<string>("");
  const [farmType, setFarmType] = useState<string>("Biofloc");
  const [notes, setNotes] = useState<string>("");

  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>("");

  const handleBookService = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = "OC-" + Math.floor(100000 + Math.random() * 900000);
    setBookingId(randomId);
    setBookingSuccess(true);
  };

  const activeServiceDetails = ALL_SERVICES.find((s) => s.id === selectedService) || ALL_SERVICES[0];

  return (
      <div className="bg-slate-50 min-h-screen">    
      
      {/* Banner */}
      <div className="relative bg-emerald-950 text-white p-8 sm:p-12 overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-800/40 via-emerald-950 to-emerald-950"></div>
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl space-y-4">         
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-700 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
            Modern Fisheries Engineering Services
          </span>
          <h1 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight">
            Consultancy & Custom Design
          </h1>
          <p className="text-emerald-150/90 text-sm sm:text-base leading-relaxed">
            Take the risk out of commercial fish farming. Our registered agronomists, marine engineers, and biosecurity auditors provide world-class custom system blueprints, water analysis reviews, and disease treatment protocols.
          </p>
        </div>
      </div>

       {/* Sticky Top Advertisement Banner */}
        <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md py-0.5 my-1 transition-all border-y border-slate-200/80 shadow-xs -mx-3 sm:-mx-6 lg:-mx-8 px-3 sm:px-6 lg:px-8 w-auto">
          <div className="max-w-[1440px] mx-auto">
            <AdBanner reloadKey="feeding-main-ad" />
          </div>
        </div>

        {/* Mobile Announcement Card (Not Sticky - scrolls up naturally) */}
        <div className="lg:hidden my-1">
          <OwnCirclesAnnouncement mode="mobile" />
        </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start p-12">
        <div className="flex-1 min-w-0 space-y-12">

      {/* Services Portfolio */}
      <div className="space-y-6 p-8">
        <div>
          <h2 className="font-sans font-extrabold text-slate-900 text-xl flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            Registered Aquaculture Service Portfolio
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Select a service from our commercial catalog below to book an on-demand consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ALL_SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`p-6 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                selectedService === service.id
                  ? "bg-white border-emerald-600 ring-1 ring-emerald-600 shadow-md scale-[1.01]"
                  : "bg-slate-50 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/10"
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-sans font-extrabold text-slate-900 text-base sm:text-lg leading-tight">
                    {service.title}
                  </h4>
                  <span className="font-mono text-xs sm:text-sm font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full shrink-0">
                    {service.price}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-mono">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>

                <p className="text-slate-600 text-base leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bullet benefits */}
              <div className="border-t border-slate-100 pt-3 mt-4 space-y-1.5">
                {service.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-600 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Booking Form replaced with Secure Static Options */}
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-150 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Active Service Info Summary */}
        <div className="lg:col-span-5 space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Selected Consultation</span>
          <h4 className="font-sans font-black text-slate-900 text-sm leading-tight">
            {activeServiceDetails.title}
          </h4>
          <div className="flex justify-between items-center text-xs border-y border-slate-200/60 py-2 my-2 font-mono">
            <span className="text-slate-400">Duration index:</span>
            <span className="font-bold text-slate-700">{activeServiceDetails.duration}</span>
          </div>
          <div className="flex justify-between items-center text-xs border-b border-slate-200/60 pb-2 mb-2 font-mono">
            <span className="text-slate-400">Consultancy Charge:</span>
            <span className="font-bold text-emerald-700">{activeServiceDetails.price}</span>
          </div>

          <div className="space-y-1.5 pt-2">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Agro-benefits included</span>
            {activeServiceDetails.benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-500 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Static Booking Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider">
              Zero-Data Scheduling Desk
            </span>
            <h3 className="font-sans font-black text-slate-900 text-xl tracking-tight">
              Book this Appointment Safely
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed font-sans">
              To guarantee absolute farmer privacy and bypass server transmission limits, this application does not log or collect personal booking data.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
            <h4 className="font-sans font-bold text-slate-800 text-xs uppercase tracking-wider border-b border-slate-200 pb-2">Direct Booking Instructions:</h4>
            
            <div className="space-y-3 font-sans text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-green-100 text-green-800 rounded-lg shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <span className="block font-bold text-slate-800">WhatsApp Desk</span>
                  <p className="mb-1">Send a message to our direct help desk at:</p>
                  <span className="font-mono font-bold text-slate-900 text-sm select-all bg-white px-2 py-0.5 rounded border border-slate-200">+919748952342</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2">
                <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="block font-bold text-slate-800">Email Booking</span>
                  <p className="mb-1">Or click below to send a slot request with details of your farm challenges:</p>
                  <a 
                    href="mailto:mf@owncircles.com"
                    className="font-mono font-bold text-emerald-700 text-sm hover:underline select-all bg-white px-2 py-0.5 rounded border border-slate-200"
                    title="Click to open default mail app"
                  >
                    mf@owncircles.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

        </div>
        <div className="hidden xl:block shrink-0 sticky top-20">
          <RightSidebarAd reloadKey="services-sidebar-ad" />
        </div>
      </div>
    </div>
  );
}
