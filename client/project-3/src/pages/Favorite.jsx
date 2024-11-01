import { useEffect, useState } from "react";
import axios from "axios"
import { pull } from "@/utils/axios";

export default function Favorite() {
  const [fav, setFav] = useState([]);

  const fetchFav = async () => {
    try {
        const response = await pull({
            method: "GET",
            url: "/favorite",

        })

        setFav(response.data.data)
    } catch (error) {
        console.log("🚀 ~ fetchFav ~ error:", error)
        
    }
  }

  useEffect(() => {
    fetchFav()
  }, [])
  return(
    <div className="container mx-auto max-w-screen-md border-x border-gray-300 px-4 py-6">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {fav.map((item, index) => (
          <div
            key={index}
            className="mb-4 overflow-hidden rounded-lg cursor-pointer"
            
          >
            <img
              src={item.webformatURL}
              alt={item.tags}
              className="w-full h-auto object-cover rounded-lg hover:opacity-90 transition-opacity duration-200"
            />
          </div>
        ))}
      </div>
      
    </div>
  )
}
