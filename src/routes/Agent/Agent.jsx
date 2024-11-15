import { useState, useEffect } from "react";
import { useUsers } from "../../contexts/hooks/useGetAllUsers";

const ITEMS_PER_PAGE = 9;

export default function AgentDirectory() {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: users } = useUsers();
  const agentsData = users ? users.user : []; // Use optional chaining to prevent errors
  console.log(agentsData);

  useEffect(() => {
    // Check if agentsData is defined and has the agents property
    if (agentsData && Array.isArray(agentsData)) {
      setAgents(agentsData);
      setFilteredAgents(agentsData);
    }
  }, []); // Add agentsData as a dependency

  useEffect(() => {
    const filtered = agents.filter(
      (agent) =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filtered);
    setFilteredAgents(filtered);
    setCurrentPage(1);
  }, [searchTerm, agents]);

  const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAgents = filteredAgents.slice(startIndex, endIndex);
  //console.log(filteredAgents);

  const handleViewProfile = (agentId) => {
    // This function would typically navigate to the agent's profile page
    console.log(`Viewing profile of agent with ID: ${agentId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">
        Agent Directory
      </h1>

      {/* Search Bar */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentAgents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            {console.log(agent.name)}
            {agent.image ? (
              <img
                src={agent.image}
                alt={agent.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <></>
            )}
            <div className="p-4 flex-grow">
              <h2 className="text-xl font-semibold mb-2">{agent.name}</h2>
              <p className="text-gray-600 mb-1">{agent.email_address}</p>
              <p className="text-gray-600 mb-1">{agent.phone_number}</p>
              <p className="text-blue-600 font-medium mb-4">{agent.address}</p>
            </div>
            <div className="px-4 pb-4">
              <button
                onClick={() => handleViewProfile(agent.id)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
