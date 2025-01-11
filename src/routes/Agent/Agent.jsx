import { useState, useEffect } from "react";
import { useUsers } from "../../contexts/hooks/useGetAllUsers";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useGetProperties } from "../../contexts/hooks/useProperty";

const ITEMS_PER_PAGE = 9;

export default function AgentDirectory() {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [likes, setLikes] = useState({});
  const { data: users } = useUsers();
  const { properties } = useGetProperties();

  const agentsData = users ? users.user : [];

  useEffect(() => {
    if (agentsData && Array.isArray(agentsData)) {
      const initialLikes = {};
      agentsData.forEach(agent => {
        initialLikes[agent.id] = Math.floor(Math.random() * 50);
      });
      setLikes(initialLikes);
      setAgents(agentsData);
      setFilteredAgents(agentsData);
    }
  }, [agentsData]);

  const getAgentPropertyCount = (agentId) => {
    if (!properties?.listing) return 0;
    return properties.listing.filter(property => property.agent_id === agentId).length;
  };

  const handleLike = (agentId) => {
    setLikes(prev => {
      const newLikes = {
        ...prev,
        [agentId]: (prev[agentId] || 0) + 1
      };
      console.log('Agent Likes:', newLikes);
      return newLikes;
    });
  };

  const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1);

  useEffect(() => {
    const filtered = agents.filter(
      (agent) =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAgents(filtered);
    setCurrentPage(1);
  }, [searchTerm, agents]);

  const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAgents = filteredAgents.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-800">
        Agent Directory
      </h1>

      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentAgents.map((agent) => {
          const rating = getRandomRating();
          const propertyCount = getAgentPropertyCount(agent.id);
          
          return (
            <div
              key={agent.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                {agent.pfp ? (
                  <img
                    src={agent.pfp}
                    alt={agent.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-purple-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-600">
                      {agent.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => handleLike(agent.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-purple-50 transition-colors duration-300"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      likes[agent.id] > 0 ? "text-purple-500 fill-current" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold truncate">{agent.name}</h2>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{rating}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-gray-600 text-sm truncate">{agent.email_address}</p>
                  <p className="text-gray-600 text-sm truncate">{agent.phone_number}</p>
                  <p className="text-purple-600 text-sm font-medium truncate">{agent.address}</p>
                </div>

                <div className="mt-4 flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    {propertyCount} Properties
                  </span>
                  <span className="text-purple-600">
                    {likes[agent.id] || 0} Likes
                  </span>
                </div>
              </div>

              <div className="px-4 pb-4">
                <Link to={`/profile/${agent.id}`}>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-purple-300 rounded-md disabled:opacity-50 hover:bg-purple-50"
        >
          Previous
        </button>
        <span className="text-purple-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-purple-300 rounded-md disabled:opacity-50 hover:bg-purple-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
