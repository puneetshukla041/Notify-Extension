import { useState, useEffect } from "react"
import "./style.css"

function IndexPopup() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [status, setStatus] = useState("Connecting...")

  useEffect(() => {
    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "NEW_NOTIFICATION") {
        setNotifications((prev) => [message.data, ...prev])
        setStatus("Active")
      }
    })
  }, [])

  return (
    <div className="w-80 h-96 bg-gray-50 flex flex-col font-sans">
      <div className="bg-black text-white p-4 shadow-md">
        <h1 className="font-bold text-lg">Notify</h1>
        <div className="flex items-center gap-2 mt-1">
          <div className={`w-2 h-2 rounded-full ${status === "Active" ? "bg-green-400" : "bg-red-500"}`}></div>
          <p className="text-xs opacity-80">{status}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {notifications.length === 0 && (
          <p className="text-center text-gray-400 mt-10 text-sm">No new notifications...</p>
        )}
        {notifications.map((n, i) => (
          <div key={i} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">{n.app_name}</span>
              <span className="text-[10px] text-gray-400">{n.timestamp}</span>
            </div>
            <p className="text-sm font-semibold text-gray-800 line-clamp-1">{n.title}</p>
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IndexPopup