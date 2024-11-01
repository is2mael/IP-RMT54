import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { pull } from "@/utils/axios";

export default function Favorite() {
  const [fav, setFav] = useState([]);

  const fetchFav = async () => {
    try {
      const response = await pull({
        method: "GET",
        url: "/favorites",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setFav(response.data.data);
    } catch (error) {
      console.log("🚀 ~ fetchFav ~ error:", error);
    }
  };

  const removeFav = async (id) => {
    try {
      await pull({
        method: "DELETE",
        url: `/favorites/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      // Update state by filtering out the deleted favorite
      setFav(fav.filter((item) => item.id !== id));
    } catch (error) {
      console.log("🚀 ~ removeFav ~ error:", error);
    }
  };

  useEffect(() => {
    fetchFav();
  }, []);

  return (
    <div className="container mx-auto max-w-screen-md border-x border-gray-300 px-4 py-6">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {fav.map((item, index) => (
          <div
            key={index}
            className="mb-4 overflow-hidden rounded-lg cursor-pointer relative group"
          >
            <img
              src={item.imgUrl}
              alt={item.tags}
              className="w-full h-auto object-cover rounded-lg hover:opacity-90 transition-opacity duration-200"
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                auto
                size="xs"
                color="error"
                onClick={() => removeFav(item.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
