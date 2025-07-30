import {
  FaUser,
  FaIdCard,
  FaCalendarAlt,
  FaPhone,
  FaMapMarkerAlt,
  FaSmile,
} from "react-icons/fa";
import type { Student } from "../../types";

interface MyProfileProps {
  profile: Student | null;
}

interface ProfileDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
  isClickable?: boolean;
  onClick?: () => void;
}

const ProfileDetail = ({
  icon,
  label,
  value,
  isClickable,
  onClick,
}: ProfileDetailProps) => (
  <div className="flex items-start py-3">
    <span className="text-primary mt-2">{icon}</span>
    <div className="ml-4">
      <p className="text-lg text-gray-600">{label}</p>
      {isClickable ? (
        <button
          onClick={onClick}
          className="text-lg font-medium text-blue-500 text-left hover:underline cursor-pointer"
        >
          {value || "-"}
        </button>
      ) : (
        <p className="text-lg font-medium text-gray-600">{value || "-"}</p>
      )}
    </div>
  </div>
);

export default function MyProfile({ profile }: MyProfileProps) {
  if (!profile) return null;

  const openDirections = (address: string | null | undefined) => {
    if (!address) return;
    const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-3xl text-center font-bold text-gray-600 border-b pb-4 mb-4">
        My Profile
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
        <ProfileDetail
          icon={<FaUser size={24} />}
          label="Full Name"
          value={profile.name}
        />
        <ProfileDetail
          icon={<FaIdCard size={24} />}
          label="NIM"
          value={profile.nim}
        />
        <ProfileDetail
          icon={<FaCalendarAlt size={24} />}
          label="Date of Birth"
          value={new Date(profile.dob).toLocaleDateString()}
        />
        <ProfileDetail
          icon={<FaPhone size={24} />}
          label="Phone Number"
          value={profile.phone}
        />
        <ProfileDetail
          icon={<FaSmile size={24} />}
          label="Hobby"
          value={profile.hobby}
        />
        <ProfileDetail
          icon={<FaMapMarkerAlt size={24} />}
          label="Address"
          value={profile.address}
          isClickable={!!profile.address}
          onClick={() => openDirections(profile.address)}
        />
      </div>
    </div>
  );
}
