import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { pull } from "../utils/axios";
import GeminiAi from "../components/Gemini AI";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [showGeminiAi, setShowGeminiAi] = useState(false) 
  const nav = useNavigate();
  const { id } = useParams()
  
  // Function untuk fetch data dengan limit 20 item
  const fetchPhoto = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=46784376-200601a720db128ab514508ae&page=${page}&per_page=20`
      );

      setPhotos((prevPhotos) => [...prevPhotos, ...response.data.hits]);
      setLoading(false);
    } catch (error) {
      console.log(error.response?.data);
      Swal.fire({
        title: `Error ${error.response?.data?.statusCode || ''}!`,
        text: error.response?.data?.error || "Unknown error",
        icon: "error",
        confirmButtonText: "Oke",
      });
      setLoading(false);
    }
  };

  // Fungsi untuk handle favorite
  const handleFavorite = async (photos) => {
    try {
        await pull({
        method: "POST",
        url: `/favorites/${id}`,
        data: {
            id: photos.id,
            webformatURL: photos.webformatURL,
            views: photos.views,
            likes: photos.likes
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })

      Swal.fire({
        title: "Added to Favorites!",
        text: "Photo has been added to your favorites.",
        icon: "success",
        confirmButtonText: "Oke",
      });

      nav("/favorite"); // Arahkan ke halaman favorites setelah foto ditambahkan
    } catch (error) {
      console.log("🚀 ~ handleFavorite ~ error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add to favorites.",
        icon: "error",
        confirmButtonText: "Oke",
      });
    }
  };

  // Panggil fetchPhoto setiap kali halaman (page) berubah
  useEffect(() => {
    fetchPhoto(page);
  }, [page]);

  // Fungsi untuk mendeteksi scroll bawah dan memperbarui halaman jika perlu
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Atur event listener scroll saat komponen dipasang
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container mx-auto max-w-screen-md border-x border-gray-300 px-4 py-6">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {photos.map((item, index) => (
          <div
            key={index}
            className="mb-4 overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handleFavorite(item)} // Panggil handleFavorite dengan ID foto
          >
            <img
              src={item.webformatURL}
              alt={item.tags}
              className="w-full h-auto object-cover rounded-lg hover:opacity-90 transition-opacity duration-200"
            />
          </div>
        ))}
      </div>
      {loading && (
        <div className="text-center my-4">
          <p>Loading...</p>
        </div>
      )}
       <button
        onClick={() => setShowGeminiAi(true)}
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 bg-orange-600 text-white rounded-full mb-3"
      >
        Ask Gemini
      </button>

      {showGeminiAi && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <GeminiAi onClose={() => setShowGeminiAi(false)} />
        </div>
      )}
    </div>
  );
}
