import { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchIlgrams, removeFav } from "@/features/ilGram";

export default function Favorite() {
  const ilgrams = useSelector((state) => state.ilgrams.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIlgrams());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeFav(id));
  };

  return (
    <div className="container mx-auto max-w-screen-md border-x border-gray-300 px-4 py-6">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {ilgrams.map((item, index) => (
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
                onClick={() => handleRemove(item.id)}
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
