import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { colors, radius, shadows, fontFamily, pageVariants } from "../design/tokens";

/* Icons */
const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12,19 5,12 12,5" />
  </svg>
);
const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#ff8a00" : "none"} stroke={filled ? "#ff8a00" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff8a00" stroke="none">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
  </svg>
);
const ParkingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 17V7h4a3 3 0 010 6H9" />
  </svg>
);
const RestroomIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="5" r="2" /><path d="M5 21v-8H3l3-7h4l3 7h-2v8" />
    <circle cx="17" cy="5" r="2" /><path d="M14 21v-6a3 3 0 016 0v6" />
  </svg>
);
const ShowerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l16 16M10 4h4a2 2 0 012 2v2M6 10v10M10 14v6M14 14v6M18 14v6" />
  </svg>
);
const FoodIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2v7a2 2 0 002 2 2 2 0 002-2V2M8 11v11" /><path d="M17 2v20M17 2a4 4 0 00-4 4v3h8" />
  </svg>
);
const LifeguardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><line x1="4.9" y1="4.9" x2="9.2" y2="9.2" /><line x1="14.8" y1="14.8" x2="19.1" y2="19.1" /><line x1="19.1" y1="4.9" x2="14.8" y2="9.2" /><line x1="9.2" y1="14.8" x2="4.9" y2="19.1" />
  </svg>
);
const RouteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19h4l2-16 4 14 2-6h4" />
  </svg>
);
const MapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

interface Place {
  name: string;
  area: string;
  rating: string;
  reviews: string;
  badge: string;
  description: string;
  quickFacts: { label: string; value: string }[];
  facilities: { icon: React.ReactNode; label: string }[];
  fromCity: string;
  driveTime: string;
  img: string;
}

const ALL_FACILITIES = { parking: <ParkingIcon />, restrooms: <RestroomIcon />, shower: <ShowerIcon />, food: <FoodIcon />, lifeguard: <LifeguardIcon /> };

const PLACES: Record<string, Place> = {
  "baga-beach": {
    name: "Baga Beach", area: "North Goa, Goa", rating: "4.6", reviews: "1.2k", badge: "Beach",
    description: "Baga Beach is one of the most popular beaches in Goa, known for its vibrant nightlife, water sports, and amazing beach shacks.",
    quickFacts: [{ label: "Open", value: "24 Hours" }, { label: "Best Time", value: "Nov - Feb" }, { label: "Entry Fee", value: "Free" }, { label: "Crowded", value: "High" }],
    facilities: [{ icon: ALL_FACILITIES.parking, label: "Parking" }, { icon: ALL_FACILITIES.restrooms, label: "Restrooms" }, { icon: ALL_FACILITIES.shower, label: "Shower" }, { icon: ALL_FACILITIES.food, label: "Food" }, { icon: ALL_FACILITIES.lifeguard, label: "Lifeguard" }],
    fromCity: "1.7 km from Panaji", driveTime: "45 mins drive",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=70",
  },
  "calangute-beach": {
    name: "Calangute Beach", area: "North Goa, Goa", rating: "4.5", reviews: "950", badge: "Beach",
    description: "Calangute Beach is the largest beach in North Goa, popular for its lively markets, water sports, and easy access from Panaji.",
    quickFacts: [{ label: "Open", value: "24 Hours" }, { label: "Best Time", value: "Nov - Feb" }, { label: "Entry Fee", value: "Free" }, { label: "Crowded", value: "High" }],
    facilities: [{ icon: ALL_FACILITIES.parking, label: "Parking" }, { icon: ALL_FACILITIES.restrooms, label: "Restrooms" }, { icon: ALL_FACILITIES.food, label: "Food" }, { icon: ALL_FACILITIES.lifeguard, label: "Lifeguard" }],
    fromCity: "3 km from Panaji", driveTime: "50 mins drive",
    img: "https://images.unsplash.com/photo-1559636225-ef5c8ab2e908?auto=format&fit=crop&w=900&q=70",
  },
  goa: {
    name: "Goa", area: "Goa, India", rating: "4.8", reviews: "3.4k", badge: "Beach Paradise",
    description: "Goa blends golden beaches, Portuguese heritage, and buzzing nightlife into one of India's most loved coastal getaways.",
    quickFacts: [{ label: "Open", value: "24 Hours" }, { label: "Best Time", value: "Nov - Feb" }, { label: "Entry Fee", value: "Free" }, { label: "Crowded", value: "High" }],
    facilities: [{ icon: ALL_FACILITIES.parking, label: "Parking" }, { icon: ALL_FACILITIES.restrooms, label: "Restrooms" }, { icon: ALL_FACILITIES.food, label: "Food" }, { icon: ALL_FACILITIES.lifeguard, label: "Lifeguard" }],
    fromCity: "Well connected by air & rail", driveTime: "—",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=70",
  },
  coorg: {
    name: "Coorg", area: "Karnataka, India", rating: "4.7", reviews: "2.1k", badge: "Scenic Hills",
    description: "Coorg, the Scotland of India, is known for its misty hills, coffee plantations, and cool, laid-back hill-station charm.",
    quickFacts: [{ label: "Open", value: "24 Hours" }, { label: "Best Time", value: "Oct - Mar" }, { label: "Entry Fee", value: "Free" }, { label: "Crowded", value: "Moderate" }],
    facilities: [{ icon: ALL_FACILITIES.parking, label: "Parking" }, { icon: ALL_FACILITIES.restrooms, label: "Restrooms" }, { icon: ALL_FACILITIES.food, label: "Food" }],
    fromCity: "260 km from Bengaluru", driveTime: "5-6 hrs drive",
    img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=70",
  },
};

const DEFAULT_PLACE: Place = PLACES["baga-beach"];

/**
 * PlaceDetailsPage — matches the "Baga Beach"-style detail screen:
 * hero photo, quick facts row, facilities grid, and how-to-reach card.
 */
const PlaceDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [saved, setSaved] = React.useState(false);

  const place = (id && PLACES[id]) || DEFAULT_PLACE;

  return (
    <motion.div
      key={`place-${id}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-scroll"
      style={{ minHeight: "100%", backgroundColor: "#ffffff", paddingBottom: "110px" }}
    >
      {/* Hero photo banner */}
      <div style={{ position: "relative", height: "260px" }}>
        <img src={place.img} alt={place.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {/* Floating action buttons */}
        <div style={{
          position: "absolute",
          top: "14px",
          left: "16px",
          right: "16px",
          display: "flex",
          justifyContent: "space-between",
          zIndex: 10,
        }}>
          <motion.button
            id="place-back"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: radius.full,
              backgroundColor: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(12px)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.textPrimary,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
            }}
          >
            <BackIcon />
          </motion.button>
          <motion.button
            id="place-save"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSaved(!saved)}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: radius.full,
              backgroundColor: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(12px)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
            }}
          >
            <HeartIcon filled={saved} />
          </motion.button>
        </div>
      </div>

      {/* Content sheet overlapping hero bottom — Matching Image 4 */}
      <div style={{
        backgroundColor: "#ffffff",
        borderTopLeftRadius: "28px",
        borderTopRightRadius: "28px",
        marginTop: "-26px",
        position: "relative",
        padding: "20px 18px 0",
        zIndex: 5,
      }}>
        {/* Title, Badge & Subtitle */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "4px" }}>
          <h1 style={{
            fontFamily: fontFamily.display,
            fontWeight: 800,
            fontSize: "1.45rem",
            color: colors.textPrimary,
            flex: 1,
            paddingRight: "10px",
            letterSpacing: "-0.01em",
          }}>
            {place.name}
          </h1>
          <span style={{
            padding: "5px 14px",
            borderRadius: radius.full,
            backgroundColor: "#e8effc",
            color: "#3a6bd8",
            fontFamily: fontFamily.sans,
            fontWeight: 700,
            fontSize: "0.74rem",
          }}>
            {place.badge}
          </span>
        </div>

        <p style={{
          fontFamily: fontFamily.sans,
          fontWeight: 500,
          fontSize: "0.82rem",
          color: colors.textMuted,
          marginBottom: "8px",
        }}>
          {place.area}
        </p>

        {/* Rating row */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
          <StarIcon />
          <span style={{ fontFamily: fontFamily.sans, fontWeight: 700, fontSize: "0.9rem", color: colors.textPrimary }}>
            {place.rating}
          </span>
          <span style={{ fontFamily: fontFamily.sans, fontSize: "0.8rem", color: colors.textMuted }}>
            ({place.reviews} reviews)
          </span>
        </div>

        {/* Description text */}
        <p style={{
          fontFamily: fontFamily.sans,
          fontSize: "0.84rem",
          color: colors.textSecondary,
          lineHeight: 1.6,
          marginBottom: "18px",
        }}>
          {place.description}
        </p>

        {/* Quick Facts Grid — 4 Columns (Matching Image 4) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "22px" }}>
          {place.quickFacts.map((f) => (
            <div
              key={f.label}
              style={{
                padding: "10px 4px",
                borderRadius: "14px",
                backgroundColor: "#f7f6f2",
                textAlign: "center",
                border: "1px solid rgba(0,0,0,0.03)",
              }}
            >
              <p style={{ fontFamily: fontFamily.sans, fontSize: "0.62rem", color: colors.textMuted, marginBottom: "3px" }}>
                {f.label}
              </p>
              <p style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: "0.78rem", color: colors.textPrimary }}>
                {f.value}
              </p>
            </div>
          ))}
        </div>

        {/* Facilities Section — 5 Circular Icons (Matching Image 4) */}
        <div style={{ marginBottom: "22px" }}>
          <h2 style={{
            fontFamily: fontFamily.display,
            fontWeight: 700,
            fontSize: "0.98rem",
            color: colors.textPrimary,
            marginBottom: "12px",
            letterSpacing: "-0.01em",
          }}>
            Facilities
          </h2>
          <div style={{ display: "flex", justifyContent: "space-between", paddingInline: "4px" }}>
            {place.facilities.map((f) => (
              <div key={f.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <span style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: radius.full,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#3a6bd8",
                  backgroundColor: "#eaf1fd",
                  border: "1px solid rgba(58,107,216,0.1)",
                }}>
                  {f.icon}
                </span>
                <span style={{ fontFamily: fontFamily.sans, fontWeight: 500, fontSize: "0.68rem", color: colors.textSecondary }}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* How to Reach Section */}
        <div style={{ marginBottom: "22px" }}>
          <h2 style={{
            fontFamily: fontFamily.display,
            fontWeight: 700,
            fontSize: "0.98rem",
            color: colors.textPrimary,
            marginBottom: "8px",
            letterSpacing: "-0.01em",
          }}>
            How to Reach
          </h2>
          <div style={{ display: "flex", gap: "28px" }}>
            <span style={{ fontFamily: fontFamily.sans, fontSize: "0.82rem", color: colors.textSecondary, fontWeight: 500 }}>
              {place.fromCity}
            </span>
            <span style={{ fontFamily: fontFamily.sans, fontSize: "0.82rem", color: colors.textSecondary, fontWeight: 500 }}>
              {place.driveTime}
            </span>
          </div>
        </div>

        {/* CTA Buttons Row — Directions & View on Map */}
        <div style={{ display: "flex", gap: "12px", paddingBottom: "24px" }}>
          <motion.button
            id="place-directions"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "13px",
              borderRadius: radius.full,
              border: `1.5px solid ${colors.blue}`,
              backgroundColor: "transparent",
              color: colors.blue,
              fontFamily: fontFamily.sans,
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            <RouteIcon /> Directions
          </motion.button>
          <motion.button
            id="place-view-map"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "13px",
              borderRadius: radius.full,
              border: "none",
              backgroundColor: colors.blue,
              color: "#ffffff",
              fontFamily: fontFamily.sans,
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              boxShadow: shadows.blue,
            }}
          >
            <MapIcon /> View on Map
          </motion.button>
        </div>
      </div>

      <BottomNav />
    </motion.div>
  );
};

export default PlaceDetailsPage;
