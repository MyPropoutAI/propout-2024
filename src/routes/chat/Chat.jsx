import { useState, useEffect, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Send,
  Paperclip,
  Smile,
  Video,
  Phone,
  Edit,
  MoreVertical,
  X,
  Mic,
  PhoneOff,
  VideoOff,
  ArrowLeft,
} from "lucide-react";
import jwt from "jsonwebtoken";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Button } from "../../components/ui/button";
import { Rings } from "react-loader-spinner";
import { useUsers } from "../../contexts/hooks/useGetAllUsers";
import { useParams } from "react-router-dom";

export default function Chat() {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : {};
  });
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Refs
  const messagesEndRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // User Authentication
  const user = useSelector((state) => state.auth.user);
  const decodedUser = jwt.decode(user);
  const userAvatar = decodedUser.name.substring(0, 2);

  const { id } = useParams();

  // Fetch Users
  const { data: users } = useUsers();
  console.log(users);
  const userData = users ? users.user : [];

  useEffect(() => {
    // Check if we have users data and an ID in the URL
    if (id && Array.isArray(userData)) {
      // Find the contact whose ID matches the URL param
      const contactFromUrl = userData.find((user) => user.id.toString() === id);

      // If a matching contact is found, set it as the selected contact
      if (contactFromUrl) {
        setSelectedContact(contactFromUrl);
        setShowMobileChat(true); // Ensure mobile chat view is shown
      }
    }
  }, [id, userData]);

  const contacts = Array.isArray(userData)
    ? userData.filter((user) => user.id !== decodedUser.id)
    : [];

  const handleSign = () => {
    console.log("Agreement signed");
    setIsOpen(false);
  };

  // Socket Connection and Event Handling
  useEffect(() => {
    // Create Socket Connection
    const newSocket = io("http://localhost:3001", {
      auth: {
        token: user, // Optional: pass user token for authentication
      },
    });
    setSocket(newSocket);

    // User Join Event
    newSocket.emit("user_join", decodedUser.id);

    // Receive Message Event
    newSocket.on("receive_message", (message) => {
      // Update messages for the specific contact
      setMessages((prev) => {
        const contactId =
          message.senderId === decodedUser.id
            ? message.receiverId
            : message.senderId;

        return {
          ...prev,
          [contactId]: [
            ...(prev[contactId] || []),
            {
              ...message,
              isMe: message.senderId === decodedUser.id,
            },
          ],
        };
      });
    });

    // Typing Status Event
    newSocket.on("typing_status", ({ senderId, isTyping }) => {
      if (selectedContact && senderId === selectedContact.id) {
        setIsTyping(isTyping);
      }
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [selectedContact]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedContact]);

  // Save messages to local storage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Message Sending Handler
  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact || !socket) return;

    const messageData = {
      senderId: decodedUser.id,
      receiverId: selectedContact.id,
      content: newMessage,
    };

    // Emit message through socket
    socket.emit("send_message", messageData);

    // Update local messages
    setMessages((prev) => ({
      ...prev,
      [selectedContact.id]: [
        ...(prev[selectedContact.id] || []),
        {
          id: Date.now().toString(),
          content: newMessage,
          sender: "me",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isMe: true,
        },
      ],
    }));

    setNewMessage("");
  };

  // Typing Indicator Handler
  const handleTyping = (e) => {
    const message = e.target.value;
    setNewMessage(message);

    // Emit typing start
    if (socket && selectedContact) {
      socket.emit("typing_start", {
        senderId: decodedUser.id,
        receiverId: selectedContact.id,
      });

      // Stop typing after 2 seconds
      setTimeout(() => {
        socket.emit("typing_end", {
          senderId: decodedUser.id,
          receiverId: selectedContact.id,
        });
      }, 2000);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = Array.isArray(contacts)
    ? contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleEmojiSelect = (emoji) => {
    setNewMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && selectedContact) {
      const message = {
        id: Date.now().toString(),
        content: `File: ${file.name}`,
        sender: "me",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMe: true,
      };

      // Update local messages
      setMessages((prev) => ({
        ...prev,
        [selectedContact.id]: [...(prev[selectedContact.id] || []), message],
      }));

      // Optionally emit file message through socket
      if (socket) {
        socket.emit("send_message", {
          senderId: decodedUser.id,
          receiverId: selectedContact.id,
          content: message.content,
        });
      }
    }
    setShowFileUpload(false);
  };

  const startCall = async (video) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setShowCall(true);
      setIsVideoCall(video);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const endCall = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const tracks = localVideoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setShowCall(false);
    setIsVideoCall(false);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowMobileChat(true);
  };

  return (
    <div className="h-screen bg-white flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <div
        className={`w-full md:w-80 border-r flex flex-col ${
          showMobileChat ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="p-4 border-b bg-[#1a1a1a] text-white flex items-center justify-between">
          <h1 className="font-semibold">PropChat</h1>
          <div className="w-12 h-12 flex justify-center items-center mb-2 rounded-full border">
            <h1 className="text-[#320051] font-bold text-2xl text-center">
              {userAvatar}
            </h1>
          </div>
        </div>
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Conversation"
              className="w-full pl-4 pr-10 py-2 border rounded-md"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="absolute right-2 top-2 text-blue-500 bg-white rounded-full p-1">
              +
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
                selectedContact?.id === contact.id ? "bg-blue-100" : ""
              }`}
              onClick={() => handleContactClick(contact)}
            >
              {contact.image ? (
                <img
                  src={contact.image}
                  alt={contact.name}
                  className="rounded-full mr-3"
                />
              ) : (
                <div className="w-12 h-12 flex justify-center items-center mb-2 rounded-full border">
                  <h1 className="text-[#320051] font-bold text-2xl text-center">
                    {contact.name.substring(0, 2)}
                  </h1>
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-medium">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.lastMessage}</p>
              </div>
              <span className="text-xs text-gray-400">{contact.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div
        className={`flex-1 flex flex-col ${
          showMobileChat ? "flex" : "hidden md:flex"
        }`}
      >
        {selectedContact ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <button
                  className="md:hidden mr-2 text-gray-500"
                  onClick={() => setShowMobileChat(false)}
                  aria-label="Back to contacts"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                {selectedContact.image ? (
                  <img
                    src={selectedContact.image}
                    alt={selectedContact.name}
                    className="rounded-full mr-3"
                  />
                ) : (
                  <div className="w-8 h-8 flex justify-center items-center mb-2 rounded-full border">
                    <h1 className="text-[#320051] font-bold text-lg text-center">
                      {selectedContact.name.substring(0, 2)}
                    </h1>
                  </div>
                )}
                <div>
                  <h2 className="font-medium">{selectedContact.name}</h2>
                  <span className="text-xs text-blue-500">●</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setIsOpen(true)}
                  className="bg-gradient-to-l from-purple-700 to-pink-700 text-white"
                >
                  Chow with PropOut{" "}
                  <span>
                    <Rings
                      visible={true}
                      height="40"
                      width="844fa94d"
                      ariaLabel="rings-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </span>
                </Button>

                {/* contract  Modal */}

                <Transition show={isOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => setIsOpen(false)}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black/30" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <div className="absolute right-4 top-4">
                              <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                              </button>
                            </div>

                            <Dialog.Title
                              as="h3"
                              className="text-lg font-semibold leading-none tracking-tight"
                            >
                              Sign Agreement
                            </Dialog.Title>

                            <div className="mt-4">
                              <p className="text-sm text-muted-foreground">
                                Sign agreement to generate meal voucher during
                                property inspection.
                              </p>
                            </div>

                            <div className="mt-6 flex justify-center">
                              <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
                                <span className="text-4xl">📝</span>
                              </div>
                            </div>

                            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button onClick={handleSign}>Sign</Button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
                {/* end of Modal */}
                <Video
                  className="h-5 w-5 text-gray-500 cursor-pointer"
                  onClick={() => startCall(true)}
                />
                <Phone
                  className="h-5 w-5 text-gray-500 cursor-pointer"
                  onClick={() => startCall(false)}
                />
                <Edit className="h-5 w-5 text-gray-500" />
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages[selectedContact.id]?.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isMe ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  {!message.isMe && (
                    <>
                      {selectedContact.image ? (
                        <img
                          src={selectedContact.image}
                          alt={selectedContact.name}
                          className="rounded-full mr-3"
                        />
                      ) : (
                        <div className="w-8 h-8 flex justify-center items-center mb-2 rounded-full border">
                          <h1 className="text-[#320051] font-bold text-lg text-center">
                            {selectedContact.name.substring(0, 2)}
                          </h1>
                        </div>
                      )}
                    </>
                  )}
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-lg ${
                      message.isMe ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp}
                    </span>
                  </div>
                  {message.isMe && (
                    <div className="w-8 h-8 flex justify-center items-center mb-2 rounded-full border">
                      <h1 className="text-[#320051] font-semibold text-lg text-center">
                        {userAvatar}
                      </h1>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="text-gray-400 text-sm">
                  {selectedContact.name} is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSend}
              className="p-4 border-t flex items-center"
            >
              <div className="relative">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="h-6 w-6 text-gray-500" />
                </button>
                {showEmojiPicker && (
                  <div className="absolute bottom-12 left-0 z-10">
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={() => setShowFileUpload(!showFileUpload)}
                >
                  <Paperclip className="h-6 w-6 text-gray-500" />
                </button>
                {showFileUpload && (
                  <div className="absolute bottom-12 left-0 bg-white border rounded-md shadow-lg p-2 z-10">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="fileUpload"
                      multiple
                    />
                    <label
                      htmlFor="fileUpload"
                      className="cursor-pointer block p-2 hover:bg-gray-100"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
              <input
                type="text"
                value={newMessage}
                onChange={handleTyping}
                placeholder="Type something..."
                className="flex-1 mx-4 p-2 border rounded-full focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Send className="h-6 w-6" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a contact to start chatting
          </div>
        )}
      </div>

      {/* Call Modal */}
      {showCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isVideoCall ? "Video" : "Audio"} Call
              </h2>
              <button
                onClick={endCall}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {isVideoCall && (
              <div className="relative w-full h-64 bg-gray-200 mb-4 rounded-lg overflow-hidden">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  className="absolute bottom-4 right-4 w-1/4 h-1/4 object-cover rounded-lg"
                />
              </div>
            )}
            {!isVideoCall && (
              <div className="w-full h-64 bg-gray-200 mb-4 rounded-lg flex items-center justify-center">
                <img
                  src={selectedContact?.image || "/placeholder.svg"}
                  alt={selectedContact?.name || "Contact"}
                  className="rounded-full"
                />
              </div>
            )}
            <div className="flex justify-center space-x-4">
              <button
                onClick={endCall}
                className="bg-red-500 text-white p-2 rounded-full"
              >
                <PhoneOff className="h-6 w-6" />
              </button>
              <button className="bg-blue-500 text-white p-2 rounded-full">
                <Mic className="h-6 w-6" />
              </button>
              {isVideoCall && (
                <button className="bg-blue-500 text-white p-2 rounded-full">
                  <VideoOff className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
