import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://url-shortener-qo7f.onrender.com";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [urls, setUrls] = useState([]);

  const fetchUrls = async () => {
    const res = await axios.get(`${API_URL}/api/urls`);
    setUrls(res.data);
  };

  const handleShorten = async (e) => {
    e.preventDefault();

    if (!originalUrl.trim()) return;

    await axios.post(`${API_URL}/api/shorten`, {
      originalUrl,
    });

    setOriginalUrl("");
    fetchUrls();
  };

  const handleCopy = (shortCode) => {
    navigator.clipboard.writeText(`${API_URL}/${shortCode}`);
    alert("Short URL copied!");
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/api/urls/${id}`);
    fetchUrls();
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          URL Shortener
        </h1>

        <form onSubmit={handleShorten} className="flex gap-3 mb-8">
          <input
            type="url"
            placeholder="Enter long URL..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700">
            Shorten
          </button>
        </form>

        <div className="space-y-4">
          {urls.length === 0 ? (
            <p className="text-center text-gray-500">No URLs created yet.</p>
          ) : (
            urls.map((url) => (
              <div
                key={url._id}
                className="border rounded-xl p-4 flex flex-col gap-3 bg-gray-50"
              >
                <p className="text-sm text-gray-600 break-all">
                  Original: {url.originalUrl}
                </p>

                <a
                  href={`${API_URL}/${url.shortCode}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-semibold break-all"
                >
                  {API_URL}/{url.shortCode}
                </a>

                <p className="text-sm">Clicks: {url.clicks}</p>

                <p className="text-xs text-gray-500">
                  Created: {new Date(url.createdAt).toLocaleString()}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleCopy(url.shortCode)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => handleDelete(url._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;