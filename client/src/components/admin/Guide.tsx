import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaHistory,
  FaUsers,
} from "react-icons/fa";

const GuideItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <li className="flex items-start p-4">
    <span className="text-xl text-primary mr-3 mt-1">{icon}</span>
    <div>
      <h4 className="font-bold text-gray-600">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </li>
);

export default function Guide() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-3xl text-center font-bold text-gray-600 border-b pb-4 mb-4">
        Admin Guide
      </h2>
      <ul className="space-y-4">
        <GuideItem
          icon={<FaUsers />}
          title="View Student Data"
          description="Open the Student Data tab to view the complete list of students registered in the system."
        />
        <GuideItem
          icon={<FaSearch />}
          title="Search Student Data"
          description="Use the search box above the table to filter student data in real-time based on Name or NIM."
        />
        <GuideItem
          icon={<FaPlus />}
          title="Add New Student"
          description="Click the Add Student button to open the modal form. Fill in all required data and then click Add."
        />
        <GuideItem
          icon={<FaEdit />}
          title="Edit Student Data"
          description="Click the pencil icon (Edit) on the student row in the table to open the modal form pre-filled with data. Modify the data and then click Save Changes."
        />
        <GuideItem
          icon={<FaTrashAlt />}
          title="Delete Student Data"
          description="Click the trash can icon (Delete) on the student row. You will be asked for confirmation before the data is permanently deleted."
        />
        <GuideItem
          icon={<FaHistory />}
          title="View Login History"
          description="Open the Login History tab to view the login and logout timestamps of all students. You can also delete records one by one."
        />
      </ul>
    </div>
  );
}
