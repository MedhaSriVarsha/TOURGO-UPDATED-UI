import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { radius, fontFamily, pageVariants, staggerContainer, staggerItem } from "../design/tokens";
import { useAuthContext } from "../context/AuthContext";

/* ── Inline SVG Icons ── */
const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9,18 15,12 9,6" />
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1612" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const PersonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" /><path d="M4 21v-1a8 8 0 0116 0v1" />
  </svg>
);
const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);
const BookingsBagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
  </svg>
);
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);
const UserPlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="17" y1="11" x2="23" y2="11" />
  </svg>
);
const GiftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
  </svg>
);
const RefreshCwIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
  </svg>
);
const GearIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);
const HelpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const LogOutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const StarRatingIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "#ff8a00" : "none"} stroke="#ff8a00" strokeWidth="1.8">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
  </svg>
);

/* Initial Datasets */
const INITIAL_WISHLIST = [
  { id: "taj-resort", name: "Taj Resort & Spa", area: "Baga, North Goa", price: "₹8,999/night", rating: "4.8", img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=400&q=80" },
  { id: "manali", name: "Manali Snow Peak", area: "Himachal Pradesh", price: "₹4,500/night", rating: "4.6", img: "https://images.unsplash.com/photo-1626621341169-4a1e435c7f00?auto=format&fit=crop&w=400&q=80" },
  { id: "udaipur", name: "The Leela Palace", area: "Lake Pichola, Udaipur", price: "₹14,500/night", rating: "4.9", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80" },
];

const MY_BOOKINGS = [
  { id: "BK-8842", title: "Taj Resort & Spa, Goa", dates: "24 Oct 2026 - 27 Oct 2026", status: "Confirmed", amount: "₹26,997", img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=300&q=80" },
  { id: "BK-7120", title: "Solang Valley Paragliding", dates: "02 Nov 2026", status: "Confirmed", amount: "₹3,200", img: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=300&q=80" },
  { id: "BK-5401", title: "The Leela Palace Udaipur", dates: "10 Aug 2026 - 12 Aug 2026", status: "Completed", amount: "₹29,000", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=300&q=80" },
];

const NOTIFICATIONS = [
  { id: "n1", icon: "🎟️", title: "Booking Confirmed", desc: "Taj Resort & Spa Goa booking (24 Oct - 27 Oct) is confirmed!", time: "2 hours ago" },
  { id: "n2", icon: "⚡", title: "Special Flash Deal", desc: "Get 20% OFF on all Manali Adventure Activities this week!", time: "1 day ago" },
  { id: "n3", icon: "🏆", title: "Referral Bonus Received", desc: "You earned ₹500 TourGo Coins by inviting Ananya Sharma!", time: "3 days ago" },
  { id: "n4", icon: "🌤️", title: "Trip Weather Alert", desc: "Clear sunny skies and pleasant weather expected in Coorg this weekend.", time: "4 days ago" },
];

const INVITED_FRIENDS = [
  { name: "Rahul Verma", phone: "+91 98123 45678", email: "rahul.v@example.com", status: "Joined", earned: "₹500" },
  { name: "Ananya Sharma", phone: "+91 98765 11223", email: "ananya.s@example.com", status: "Joined", earned: "₹500" },
  { name: "Karthik Raja", phone: "+91 97890 33445", email: "karthik.r@example.com", status: "Joined", earned: "₹500" },
];

const OFFERS = [
  { code: "TOURGO20", title: "20% OFF Luxury Resorts", desc: "Save up to ₹2,500 on 4-Star & 5-Star stays", req: "1,000 Coins", unlocked: true },
  { code: "FLYFREE", title: "₹1,500 Instant Cashback", desc: "Valid on Flight + Hotel holiday packages", req: "2,500 Coins", unlocked: true },
  { code: "ADVENTURE500", title: "₹500 OFF Paragliding & Rafting", desc: "Valid on Manali & Rishikesh adventures", req: "500 Coins", unlocked: true },
  { code: "VIPSTAY", title: "1 FREE Night at 5-Star Resort", desc: "Unlock a complimentary luxury night stay", req: "5,000 Coins", unlocked: false },
];

const ALL_INTERESTS = ["Trekking", "Beach Parties", "Water Sports", "Heritage & Temples", "Wildlife Safaris", "Food & Dining", "Photography", "Scuba Diving"];
const ALL_DESTINATIONS = ["Goa", "Coorg", "Manali", "Udaipur", "Kerala", "Jaipur", "Ladakh", "Rishikesh"];

/**
 * ProfilePage — Complete with Notifications, Invite Friend, Rewards & Offers, App Updates, Bookings, Wishlist, Settings, Personal Info, Help & Support.
 */
const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthContext();

  const [activeModal, setActiveModal] = useState<string | null>(null);

  /* Auto-open modal if passed via navigation state */
  useEffect(() => {
    if (location.state && (location.state as any).openModal) {
      setActiveModal((location.state as any).openModal);
    }
  }, [location.state]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  /* Personal Info State */
  const [username, setUsername] = useState(user?.displayName || "Raghu Charan");
  const [email] = useState(user?.email || "raghu.charan@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [dob, setDob] = useState("1998-08-15");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Trekking", "Beach Parties", "Food & Dining"]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(["Goa", "Coorg", "Udaipur"]);

  /* Invite Friend Inputs */
  const [friendName, setFriendName] = useState("");
  const [friendPhone, setFriendPhone] = useState("");
  const [friendEmail, setFriendEmail] = useState("");

  /* Settings State */
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [locationAccess, setLocationAccess] = useState(true);
  const [cameraAccess, setCameraAccess] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  /* Wishlist State */
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);

  /* Feedback State */
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const toggleDestination = (dest: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(dest) ? prev.filter((d) => d !== dest) : [...prev, dest]
    );
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    showToast("Item removed from Wishlist");
  };

  return (
    <motion.div
      key="profile-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#f8f7f4", position: "relative", overflow: "hidden" }}
    >
      {/* Scrollable Page Body */}
      <div className="page-scroll" style={{ flex: 1, paddingBottom: "110px" }}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed",
              top: "16px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 300,
              backgroundColor: "#1a1612",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "9999px",
              fontFamily: fontFamily.sans,
              fontWeight: 600,
              fontSize: "0.82rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            ✓ {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Banner Header */}
      <div style={{
        background: "linear-gradient(165deg, #3a6bd8 0%, #2a52b2 50%, #6c5ce7 100%)",
        padding: "36px 20px 24px",
        borderBottomLeftRadius: "28px",
        borderBottomRightRadius: "28px",
        textAlign: "center",
        boxShadow: "0 8px 30px rgba(58,107,216,0.25)",
      }}>
        {/* User Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: "84px",
            height: "84px",
            borderRadius: radius.full,
            margin: "0 auto 12px",
            border: "3.5px solid rgba(255,255,255,0.85)",
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
            backgroundColor: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
            alt={username}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </motion.div>

        <h1 style={{
          fontFamily: fontFamily.display,
          fontWeight: 800,
          fontSize: "1.35rem",
          color: "#ffffff",
          marginBottom: "2px",
        }}>
          {username}
        </h1>
        <p style={{
          fontFamily: fontFamily.sans,
          fontSize: "0.82rem",
          color: "rgba(255,255,255,0.85)",
          marginBottom: "20px",
        }}>
          {email}
        </p>

        {/* Stats Row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "4px",
          borderTop: "1px solid rgba(255,255,255,0.18)",
          paddingTop: "14px",
        }}>
          {[
            { label: "Bookings", value: "3" },
            { label: "Wishlist", value: wishlist.length.toString() },
            { label: "Trips", value: "18" },
            { label: "Rewards", value: "4,250 Coins" },
          ].map((s, index) => (
            <div
              key={s.label}
              style={{
                textAlign: "center",
                borderRight: index < 3 ? "1px solid rgba(255,255,255,0.18)" : "none",
              }}
            >
              <p style={{ fontFamily: fontFamily.display, fontWeight: 800, fontSize: "1.05rem", color: "#ffffff" }}>
                {s.value}
              </p>
              <p style={{ fontFamily: fontFamily.sans, fontWeight: 500, fontSize: "0.68rem", color: "rgba(255,255,255,0.82)", marginTop: "2px" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Options List */}
      <div style={{ padding: "18px 18px 0" }}>
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "10px 8px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}>
          <h2 style={{
            fontFamily: fontFamily.display,
            fontWeight: 700,
            fontSize: "1.05rem",
            color: "#1a1612",
            padding: "8px 14px 10px",
          }}>
            My Account
          </h2>

          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            {[
              { id: "personal-info", label: "Personal Information", icon: <PersonIcon /> },
              { id: "my-bookings", label: "My Bookings", icon: <BookingsBagIcon /> },
              { id: "wishlist", label: "Wishlists & Saved Places", icon: <HeartIcon /> },
              { id: "notifications", label: "Notifications & Alerts", icon: <BellIcon /> },
              { id: "invite-friend", label: "Invite a Friend & Earn", icon: <UserPlusIcon /> },
              { id: "rewards-offers", label: "Rewards & Offers", icon: <GiftIcon /> },
              { id: "app-updates", label: "App Updates & Features", icon: <RefreshCwIcon /> },
              { id: "settings", label: "Settings & Access", icon: <GearIcon /> },
              { id: "help-support", label: "Help & Support", icon: <HelpIcon /> },
            ].map((item, i, arr) => (
              <motion.button
                key={item.id}
                id={`profile-${item.id}`}
                variants={staggerItem}
                whileHover={{ backgroundColor: "#f8f7f4" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveModal(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  borderBottom: i < arr.length - 1 ? "1px solid #f2efea" : "none",
                  textAlign: "left",
                  borderRadius: radius.md,
                }}
              >
                <span style={{ color: "#3a6bd8", display: "flex", alignItems: "center" }}>
                  {item.icon}
                </span>
                <span style={{
                  flex: 1,
                  fontFamily: fontFamily.sans,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "#1a1612",
                }}>
                  {item.label}
                </span>
                <span style={{ color: "#8a8580", display: "flex", alignItems: "center" }}>
                  <ChevronIcon />
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Logout Button */}
        <motion.button
          id="profile-logout"
          whileHover={{ scale: 1.01, backgroundColor: "#fff5f5" }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginTop: "16px",
            padding: "14px",
            borderRadius: "20px",
            backgroundColor: "#ffffff",
            border: "1px solid #f2efea",
            boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            color: "#e74c3c",
            fontFamily: fontFamily.sans,
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          <LogOutIcon />
          <span>Log Out</span>
        </motion.button>
        {/* Physical spacer for bottom nav clearance */}
        <div style={{ height: "40px", width: "100%" }} />
      </div>
      {/* End of Scrollable Page Body */}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODALS & SHEETS FOR PROFILE OPTIONS
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 250,
              backgroundColor: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "412px",
                maxHeight: "85vh",
                backgroundColor: "#ffffff",
                borderTopLeftRadius: "28px",
                borderTopRightRadius: "28px",
                overflowY: "auto",
                padding: "20px 20px 36px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 -10px 40px rgba(0,0,0,0.2)",
              }}
            >
              {/* Modal Header Bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <h3 style={{ fontFamily: fontFamily.display, fontWeight: 800, fontSize: "1.25rem", color: "#1a1612" }}>
                  {activeModal === "personal-info" && "Personal Information"}
                  {activeModal === "my-bookings" && "My Bookings"}
                  {activeModal === "wishlist" && "Wishlists & Saved Places"}
                  {activeModal === "notifications" && "Notifications & Alerts"}
                  {activeModal === "invite-friend" && "Invite a Friend & Earn Rewards"}
                  {activeModal === "rewards-offers" && "Rewards & Coupon Offers"}
                  {activeModal === "app-updates" && "App Version & Updates"}
                  {activeModal === "settings" && "Settings & Access"}
                  {activeModal === "help-support" && "Help & Support"}
                </h3>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveModal(null)}
                  style={{ border: "none", background: "none", cursor: "pointer", padding: "4px" }}
                >
                  <CloseIcon />
                </motion.button>
              </div>

              {/* 1. PERSONAL INFORMATION MODAL */}
              {activeModal === "personal-info" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ fontFamily: fontFamily.sans, fontWeight: 600, fontSize: "0.78rem", color: "#8a8580" }}>Full Name</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{
                        width: "100%", padding: "12px 14px", borderRadius: "14px",
                        border: "1px solid #e4e1da", fontSize: "0.9rem", marginTop: "4px", outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: fontFamily.sans, fontWeight: 600, fontSize: "0.78rem", color: "#8a8580" }}>Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: "100%", padding: "12px 14px", borderRadius: "14px",
                        border: "1px solid #e4e1da", fontSize: "0.9rem", marginTop: "4px", outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: fontFamily.sans, fontWeight: 600, fontSize: "0.78rem", color: "#8a8580" }}>Date of Birth</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      style={{
                        width: "100%", padding: "12px 14px", borderRadius: "14px",
                        border: "1px solid #e4e1da", fontSize: "0.9rem", marginTop: "4px", outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.84rem", color: "#1a1612" }}>Travel Interests</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                      {ALL_INTERESTS.map((interest) => {
                        const selected = selectedInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            style={{
                              padding: "6px 14px", borderRadius: radius.full,
                              border: selected ? "none" : "1px solid #e4e1da",
                              backgroundColor: selected ? "#3a6bd8" : "#ffffff",
                              color: selected ? "#ffffff" : "#1a1612",
                              fontFamily: fontFamily.sans, fontSize: "0.78rem",
                              fontWeight: selected ? 700 : 500, cursor: "pointer",
                            }}
                          >
                            {selected ? `✓ ${interest}` : interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.84rem", color: "#1a1612" }}>Favorite Destinations</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                      {ALL_DESTINATIONS.map((dest) => {
                        const selected = selectedDestinations.includes(dest);
                        return (
                          <button
                            key={dest}
                            onClick={() => toggleDestination(dest)}
                            style={{
                              padding: "6px 14px", borderRadius: radius.full,
                              border: selected ? "none" : "1px solid #e4e1da",
                              backgroundColor: selected ? "#ff8a00" : "#ffffff",
                              color: selected ? "#ffffff" : "#1a1612",
                              fontFamily: fontFamily.sans, fontSize: "0.78rem",
                              fontWeight: selected ? 700 : 500, cursor: "pointer",
                            }}
                          >
                            {selected ? `📍 ${dest}` : dest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setActiveModal(null); showToast("Personal Information Saved!"); }}
                    style={{
                      width: "100%", padding: "14px", borderRadius: radius.full,
                      backgroundColor: "#3a6bd8", color: "#ffffff", border: "none",
                      fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.92rem",
                      cursor: "pointer", marginTop: "10px",
                    }}
                  >
                    Save Personal Info
                  </motion.button>
                </div>
              )}

              {/* 2. MY BOOKINGS MODAL */}
              {activeModal === "my-bookings" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {MY_BOOKINGS.map((b) => (
                    <div key={b.id} style={{ display: "flex", gap: "12px", padding: "12px", borderRadius: "18px", backgroundColor: "#f8f7f4" }}>
                      <img src={b.img} alt={b.title} style={{ width: "70px", height: "70px", borderRadius: "14px", objectFit: "cover" }} />
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: "0.88rem", color: "#1a1612" }}>{b.title}</span>
                            <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "2px 8px", borderRadius: "9999px", backgroundColor: b.status === "Confirmed" ? "#e6f4ea" : "#f1f3f4", color: b.status === "Confirmed" ? "#137333" : "#5f6368" }}>
                              {b.status}
                            </span>
                          </div>
                          <p style={{ fontFamily: fontFamily.sans, fontSize: "0.72rem", color: "#8a8580", marginTop: "2px" }}>{b.dates} • ID: {b.id}</p>
                        </div>
                        <p style={{ fontFamily: fontFamily.display, fontWeight: 800, fontSize: "0.9rem", color: "#1a1612" }}>{b.amount}</p>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => { setActiveModal(null); navigate("/bookings"); }} style={{ width: "100%", padding: "14px", borderRadius: radius.full, backgroundColor: "#ff8a00", color: "#ffffff", border: "none", fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", marginTop: "8px" }}>
                    + Book New Stay or Experience
                  </button>
                </div>
              )}

              {/* 3. WISHLIST MODAL */}
              {activeModal === "wishlist" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {wishlist.length === 0 ? (
                    <p style={{ textAlign: "center", padding: "20px", color: "#8a8580", fontFamily: fontFamily.sans }}>Your wishlist is empty. Like places on Explore or Bookings to add them!</p>
                  ) : (
                    wishlist.map((item) => (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px", borderRadius: "18px", backgroundColor: "#f8f7f4" }}>
                        <img src={item.img} alt={item.name} style={{ width: "65px", height: "65px", borderRadius: "14px", objectFit: "cover" }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: "0.88rem", color: "#1a1612" }}>{item.name}</p>
                          <p style={{ fontFamily: fontFamily.sans, fontSize: "0.72rem", color: "#8a8580" }}>{item.area}</p>
                          <p style={{ fontFamily: fontFamily.display, fontWeight: 800, fontSize: "0.84rem", color: "#1a1612", marginTop: "2px" }}>{item.price}</p>
                        </div>
                        <button onClick={() => removeFromWishlist(item.id)} style={{ border: "none", background: "none", cursor: "pointer", padding: "8px" }}>
                          <span style={{ color: "#e74c3c", fontSize: "1.1rem" }}>❤️</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* 4. NOTIFICATIONS MODAL */}
              {activeModal === "notifications" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id} style={{ display: "flex", gap: "12px", padding: "12px 14px", borderRadius: "18px", backgroundColor: "#f8f7f4" }}>
                      <span style={{ fontSize: "1.4rem" }}>{n.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <p style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: "0.88rem", color: "#1a1612" }}>{n.title}</p>
                          <span style={{ fontFamily: fontFamily.sans, fontSize: "0.68rem", color: "#8a8580" }}>{n.time}</span>
                        </div>
                        <p style={{ fontFamily: fontFamily.sans, fontSize: "0.78rem", color: "#4a4540", marginTop: "3px", lineHeight: 1.4 }}>{n.desc}</p>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => showToast("Notifications marked as read")} style={{ border: "none", background: "none", fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.8rem", color: "#3a6bd8", cursor: "pointer", marginTop: "6px" }}>
                    Mark all as read
                  </button>
                </div>
              )}

              {/* 5. INVITE A FRIEND MODAL */}
              {activeModal === "invite-friend" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ backgroundColor: "#eef3ff", padding: "14px", borderRadius: "18px", border: "1px solid #d0e0ff" }}>
                    <p style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: "0.92rem", color: "#3a6bd8" }}>🎉 Earn ₹500 TourGo Coins per Invite</p>
                    <p style={{ fontFamily: fontFamily.sans, fontSize: "0.78rem", color: "#4a4540", marginTop: "4px" }}>Share your travel love! When your friend signs up, you both get ₹500 travel credit.</p>
                  </div>

                  {/* Friend Inputs */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input
                      type="text"
                      placeholder="Friend's Full Name"
                      value={friendName}
                      onChange={(e) => setFriendName(e.target.value)}
                      style={{ padding: "12px 14px", borderRadius: "14px", border: "1px solid #e4e1da", fontSize: "0.88rem", outline: "none" }}
                    />
                    <input
                      type="text"
                      placeholder="Friend's Phone Number (+91...)"
                      value={friendPhone}
                      onChange={(e) => setFriendPhone(e.target.value)}
                      style={{ padding: "12px 14px", borderRadius: "14px", border: "1px solid #e4e1da", fontSize: "0.88rem", outline: "none" }}
                    />
                    <input
                      type="email"
                      placeholder="Friend's Email Address"
                      value={friendEmail}
                      onChange={(e) => setFriendEmail(e.target.value)}
                      style={{ padding: "12px 14px", borderRadius: "14px", border: "1px solid #e4e1da", fontSize: "0.88rem", outline: "none" }}
                    />
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        if (!friendName || (!friendPhone && !friendEmail)) {
                          showToast("Please enter friend's name and contact!");
                          return;
                        }
                        setFriendName(""); setFriendPhone(""); setFriendEmail("");
                        showToast("Invitation Sent Successfully!");
                      }}
                      style={{ padding: "14px", borderRadius: radius.full, backgroundColor: "#ff8a00", color: "#fff", border: "none", fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}
                    >
                      Send Invitation Link
                    </motion.button>
                  </div>

                  {/* Rewards Earned History */}
                  <div style={{ borderTop: "1px solid #f2efea", paddingTop: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                      <p style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: "0.9rem", color: "#1a1612" }}>Friends Invited</p>
                      <p style={{ fontFamily: fontFamily.sans, fontWeight: 800, fontSize: "0.88rem", color: "#27ae60" }}>Total Earned: ₹1,500</p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {INVITED_FRIENDS.map((f) => (
                        <div key={f.email} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: "14px", backgroundColor: "#f8f7f4" }}>
                          <div>
                            <p style={{ fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.84rem", color: "#1a1612" }}>{f.name}</p>
                            <p style={{ fontFamily: fontFamily.sans, fontSize: "0.7rem", color: "#8a8580" }}>{f.email}</p>
                          </div>
                          <span style={{ fontFamily: fontFamily.display, fontWeight: 800, fontSize: "0.88rem", color: "#27ae60" }}>+{f.earned}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. REWARDS & OFFERS MODAL */}
              {activeModal === "rewards-offers" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Coins Count Banner */}
                  <div style={{ background: "linear-gradient(135deg, #ff8a00, #e6643c)", padding: "18px", borderRadius: "20px", color: "#fff" }}>
                    <p style={{ fontFamily: fontFamily.sans, fontSize: "0.78rem", opacity: 0.9 }}>Your Available Reward Coins</p>
                    <h4 style={{ fontFamily: fontFamily.display, fontWeight: 800, fontSize: "1.8rem", margin: "2px 0 10px" }}>4,250 Coins <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>(Worth ₹4,250)</span></h4>

                    {/* Progress to next offer */}
                    <div style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.3)", borderRadius: "9999px", height: "8px", overflow: "hidden" }}>
                      <div style={{ width: "85%", backgroundColor: "#ffffff", height: "100%", borderRadius: "9999px" }} />
                    </div>
                    <p style={{ fontFamily: fontFamily.sans, fontSize: "0.72rem", marginTop: "6px", opacity: 0.95 }}>
                      Earn 750 more coins to unlock VIP FREE Night Stay!
                    </p>
                  </div>

                  {/* Offers List */}
                  <div>
                    <p style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: "0.92rem", color: "#1a1612", marginBottom: "10px" }}>Applicable Offers & Coupons</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {OFFERS.map((o) => (
                        <div key={o.code} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderRadius: "16px", backgroundColor: "#f8f7f4", border: "1px dashed #d4d0c8" }}>
                          <div>
                            <span style={{ fontFamily: fontFamily.display, fontWeight: 800, fontSize: "0.82rem", color: "#3a6bd8", backgroundColor: "#eef3ff", padding: "2px 8px", borderRadius: "6px" }}>{o.code}</span>
                            <p style={{ fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.86rem", color: "#1a1612", marginTop: "4px" }}>{o.title}</p>
                            <p style={{ fontFamily: fontFamily.sans, fontSize: "0.7rem", color: "#8a8580" }}>{o.desc} • {o.req}</p>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.92 }}
                            onClick={() => showToast(`Coupon ${o.code} Applied!`)}
                            disabled={!o.unlocked}
                            style={{
                              padding: "6px 14px", borderRadius: radius.full,
                              backgroundColor: o.unlocked ? "#3a6bd8" : "#d0ceca",
                              color: "#fff", border: "none", fontFamily: fontFamily.sans,
                              fontWeight: 700, fontSize: "0.75rem", cursor: o.unlocked ? "pointer" : "not-allowed",
                            }}
                          >
                            {o.unlocked ? "Apply" : "Locked"}
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 7. APP UPDATES MODAL */}
              {activeModal === "app-updates" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ textAlign: "center", padding: "14px", backgroundColor: "#f8f7f4", borderRadius: "20px" }}>
                    <span style={{ fontSize: "2rem" }}>🚀</span>
                    <h4 style={{ fontFamily: fontFamily.display, fontWeight: 800, fontSize: "1.1rem", color: "#1a1612", marginTop: "6px" }}>TourGo App v2.4.0</h4>
                    <p style={{ fontFamily: fontFamily.sans, fontSize: "0.76rem", color: "#27ae60", fontWeight: 700 }}>You are on the latest version ✓</p>
                  </div>

                  <div>
                    <p style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: "0.92rem", color: "#1a1612", marginBottom: "8px" }}>What's New in this Version</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {[
                        "✨ TourGo AI Assistant 2.0 with instant 3-day itinerary generation & voice mic.",
                        "🏨 Enhanced Bookings section: Luxury resorts, budget stays, and villas with live availability.",
                        "🗺️ 10 Category Explore Hub with real-time text & filter search.",
                        "📱 Full-bleed mobile screen view with sunset balloon header.",
                        "⚡ 2x Faster page load performance and smooth Framer Motion transitions.",
                      ].map((feature, idx) => (
                        <div key={idx} style={{ padding: "10px 12px", borderRadius: "12px", backgroundColor: "#ffffff", border: "1px solid #f2efea" }}>
                          <p style={{ fontFamily: fontFamily.sans, fontSize: "0.8rem", color: "#4a4540", lineHeight: 1.4 }}>{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => showToast("App is up to date!")}
                    style={{ padding: "14px", borderRadius: radius.full, backgroundColor: "#3a6bd8", color: "#fff", border: "none", fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}
                  >
                    Check for Updates
                  </motion.button>
                </div>
              )}

              {/* 8. SETTINGS MODAL */}
              {activeModal === "settings" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={{ fontFamily: fontFamily.sans, fontWeight: 600, fontSize: "0.78rem", color: "#8a8580" }}>Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "14px", border: "1px solid #e4e1da", fontSize: "0.9rem", marginTop: "4px" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: fontFamily.sans, fontWeight: 600, fontSize: "0.78rem", color: "#8a8580" }}>Change Password</label>
                    <div style={{ position: "relative", marginTop: "4px" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: "100%", padding: "12px 14px", borderRadius: "14px", border: "1px solid #e4e1da", fontSize: "0.9rem" }}
                      />
                      <button onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", border: "none", background: "none", fontSize: "0.75rem", color: "#3a6bd8", cursor: "pointer", fontWeight: 700 }}>
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontFamily: fontFamily.sans, fontWeight: 600, fontSize: "0.88rem", color: "#1a1612" }}>Location Access</p>
                        <p style={{ fontFamily: fontFamily.sans, fontSize: "0.7rem", color: "#8a8580" }}>Used for nearby places & weather</p>
                      </div>
                      <input type="checkbox" checked={locationAccess} onChange={(e) => setLocationAccess(e.target.checked)} style={{ width: "20px", height: "20px", accentColor: "#3a6bd8", cursor: "pointer" }} />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontFamily: fontFamily.sans, fontWeight: 600, fontSize: "0.88rem", color: "#1a1612" }}>Camera Access</p>
                        <p style={{ fontFamily: fontFamily.sans, fontSize: "0.7rem", color: "#8a8580" }}>Used for scanning QR & photos</p>
                      </div>
                      <input type="checkbox" checked={cameraAccess} onChange={(e) => setCameraAccess(e.target.checked)} style={{ width: "20px", height: "20px", accentColor: "#3a6bd8", cursor: "pointer" }} />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontFamily: fontFamily.sans, fontWeight: 600, fontSize: "0.88rem", color: "#1a1612" }}>Push Notifications</p>
                        <p style={{ fontFamily: fontFamily.sans, fontSize: "0.7rem", color: "#8a8580" }}>Trip alerts & exclusive deals</p>
                      </div>
                      <input type="checkbox" checked={pushNotifications} onChange={(e) => setPushNotifications(e.target.checked)} style={{ width: "20px", height: "20px", accentColor: "#3a6bd8", cursor: "pointer" }} />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontFamily: fontFamily.sans, fontWeight: 600, fontSize: "0.88rem", color: "#1a1612" }}>Dark Theme</p>
                        <p style={{ fontFamily: fontFamily.sans, fontSize: "0.7rem", color: "#8a8580" }}>Sleek dark interface mode</p>
                      </div>
                      <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} style={{ width: "20px", height: "20px", accentColor: "#3a6bd8", cursor: "pointer" }} />
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setActiveModal(null); showToast("Settings Updated Successfully!"); }}
                    style={{ width: "100%", padding: "14px", borderRadius: radius.full, backgroundColor: "#3a6bd8", color: "#ffffff", border: "none", fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.92rem", cursor: "pointer", marginTop: "10px" }}
                  >
                    Save Settings
                  </motion.button>
                </div>
              )}

              {/* 9. HELP & SUPPORT MODAL */}
              {activeModal === "help-support" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ backgroundColor: "#f8f7f4", padding: "14px", borderRadius: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <p style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: "0.92rem", color: "#1a1612" }}>Customer Care & Support</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <p style={{ fontFamily: fontFamily.sans, fontSize: "0.72rem", color: "#8a8580" }}>Toll-Free Phone</p>
                        <p style={{ fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.88rem", color: "#1a1612" }}>+91 1800-868-746</p>
                      </div>
                      <a href="tel:1800868746" style={{ padding: "6px 14px", borderRadius: radius.full, backgroundColor: "#3a6bd8", color: "#fff", fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.75rem", textDecoration: "none" }}>Call Now</a>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <p style={{ fontFamily: fontFamily.sans, fontSize: "0.72rem", color: "#8a8580" }}>Support Email</p>
                        <p style={{ fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.88rem", color: "#1a1612" }}>support@tourgo.com</p>
                      </div>
                      <a href="mailto:support@tourgo.com" style={{ padding: "6px 14px", borderRadius: radius.full, backgroundColor: "#ff8a00", color: "#fff", fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.75rem", textDecoration: "none" }}>Email Us</a>
                    </div>
                  </div>

                  <div>
                    <p style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: "0.92rem", color: "#1a1612", marginBottom: "8px" }}>Social Handles</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                      <div style={{ backgroundColor: "#fff5f8", padding: "10px", borderRadius: "14px", textAlign: "center" }}>
                        <p style={{ fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.78rem", color: "#e84393" }}>Instagram</p>
                        <p style={{ fontFamily: fontFamily.sans, fontSize: "0.68rem", color: "#8a8580" }}>@tourgo_official</p>
                      </div>
                      <div style={{ backgroundColor: "#edf7ff", padding: "10px", borderRadius: "14px", textAlign: "center" }}>
                        <p style={{ fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.78rem", color: "#1890ff" }}>Twitter / X</p>
                        <p style={{ fontFamily: fontFamily.sans, fontSize: "0.68rem", color: "#8a8580" }}>@tourgo_app</p>
                      </div>
                      <div style={{ backgroundColor: "#eaf8ef", padding: "10px", borderRadius: "14px", textAlign: "center" }}>
                        <p style={{ fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.78rem", color: "#27ae60" }}>WhatsApp</p>
                        <p style={{ fontFamily: fontFamily.sans, fontSize: "0.68rem", color: "#8a8580" }}>+91 98765 00000</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid #f2efea", paddingTop: "12px" }}>
                    <p style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: "0.92rem", color: "#1a1612", marginBottom: "6px" }}>Share Your Feedback</p>
                    <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} onClick={() => setFeedbackRating(star)} style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}>
                          <StarRatingIcon filled={star <= feedbackRating} />
                        </button>
                      ))}
                    </div>
                    <textarea
                      rows={3}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Type your feedback or feature suggestion..."
                      style={{ width: "100%", padding: "12px", borderRadius: "14px", border: "1px solid #e4e1da", fontFamily: fontFamily.sans, fontSize: "0.86rem", outline: "none", resize: "none" }}
                    />
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setActiveModal(null); setFeedbackText(""); showToast("Thank you for your feedback!"); }}
                      style={{ width: "100%", padding: "12px", borderRadius: radius.full, backgroundColor: "#3a6bd8", color: "#ffffff", border: "none", fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", marginTop: "10px" }}
                    >
                      Submit Feedback
                    </motion.button>
                  </div>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </motion.div>
  );
};

export default ProfilePage;
