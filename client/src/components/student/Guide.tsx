import { FaEdit, FaMapMarkedAlt } from "react-icons/fa";

export default function Guide() {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-3xl text-center font-bold text-gray-600 border-b pb-4 mb-4">
        Student Guide
      </h2>
      <ul className="list-none space-y-6 text-gray-600 text-lg">
        <li className="flex items-start">
          <FaEdit size={24} className="mr-3 mt-1 text-primary flex-shrink-0" />
          <div>
            <strong className="block">Edit Profile</strong>
            Go to the Edit Profile menu, update your information, then click the
            Save Changes button.
          </div>
        </li>
        <li className="flex items-start">
          <FaMapMarkedAlt
            size={24}
            className="mr-3 mt-1 text-primary flex-shrink-0"
          />
          <div>
            <strong className="block">View Address on Map</strong>
            On your profile page, click the View Directions button to open your
            address location on Google Maps.
          </div>
        </li>
      </ul>
    </div>
  );
}
