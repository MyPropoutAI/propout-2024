import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import successAnimation from "../assets/animation/success-animation.json"; // Make sure this file exists
import {
  closeInspectionModal,
  setSelectedDate,
  toggleOrderFood,
  setInspectionRequested,
  setShowCongrats,
} from "../redux/features/inspectionSlice";

export const InspectionModal = () => {
  const dispatch = useDispatch();
  const {
    isModalOpen,
    selectedDate,
    orderFood,
    agentAvailability,
    showCongrats,
  } = useSelector((state) => state.inspection);

  useEffect(() => {
    //console.log("Modal State:", { isModalOpen, agentAvailability });
  }, [isModalOpen, agentAvailability]);

  const handleDateSelect = (date) => {
    dispatch(setSelectedDate(date));
  };

  const handleSubmit = () => {
    if (selectedDate) {
      console.log({
        selectedDate,
        orderFood,
        timestamp: new Date().toISOString(),
      });
      dispatch(setInspectionRequested(true));
      dispatch(setShowCongrats(true));

      // Reset after 3 seconds
      setTimeout(() => {
        dispatch(closeInspectionModal());
        dispatch(setShowCongrats(false));
      }, 3000);
    }
  };

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        dispatch(closeInspectionModal());
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [dispatch]);

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 modal-overlay flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        >
          {showCongrats ? (
            <div className="text-center">
              <Lottie
                animationData={successAnimation}
                loop={false}
                className="w-48 h-48 mx-auto"
              />
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Inspection Scheduled!
              </h2>
              <p className="text-gray-600">
                We&apos;ll notify the agent of your selected date.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Schedule Inspection</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Available Dates</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {agentAvailability.map((date) => (
                      <button
                        key={date.id}
                        onClick={() => handleDateSelect(date)}
                        className={`p-2 rounded-md border ${
                          selectedDate?.id === date.id
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        <p className="font-medium">{date.day}</p>
                        <p className="text-sm text-gray-500">
                          {date.startTime} - {date.endTime}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md bg-gradient-to-r from-yellow-100 to-orange-100">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orderFood}
                      onChange={() => dispatch(toggleOrderFood())}
                      className="form-checkbox text-purple-600 h-5 w-5"
                    />
                    <span className="font-medium">
                      Order Food for Inspection
                    </span>
                  </label>
                  <div className="animate-pulse">
                    <span className="inline-block px-2 py-1 bg-yellow-500 text-white text-sm rounded-full">
                      New
                    </span>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => dispatch(closeInspectionModal())}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedDate}
                    className={`px-4 py-2 rounded-md text-white ${
                      selectedDate
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Schedule Inspection
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
