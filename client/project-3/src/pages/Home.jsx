import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const [photo, setPhoto] = useState([]);

  const fetchPhoto = async () => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=46784376-200601a720db128ab514508ae`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      setPhoto(data.hits);
    } catch (error) {
      console.log(error.response.data);
      Swal.fire({
        title: `Error ${error.response.data.statusCode}!`,
        text: error.response.data.error,
        icon: "error",
        confirmButtonText: "Oke",
      });
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, []);
  return (
    <div className="container mx-auto max-w-screen-md border-x border-gray-300 px-4 py-6">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {photo.map((item, index) => (
          <div key={index} className="mb-4 overflow-hidden rounded-lg">
            <img
              src={item.webformatURL}
              alt={item.tags}
              className="w-full h-auto object-cover rounded-lg hover:opacity-90 transition-opacity duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
