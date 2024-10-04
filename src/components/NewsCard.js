import React from "react";

const NewsCard = ({ data }) => {
    if (!data || !data.title) {
        return <div>Loading...</div>;
      }
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">

    <div className="text-lg font-bold text-gray-900">
      {data.title}
    </div>
    <div className="text-gray-700 mt-2 mb-4">
      {data.abstract}
    </div>
      {data.multimedia && data.multimedia.length > 0 && (
             
                  <img 
              src={data.multimedia[0].url} 
              alt={data.title} 
              className="w-full h-48 object-cover rounded mb-2"
              />
             
          )}

  </div>
  );
};
export default NewsCard;
