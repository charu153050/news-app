import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
const url = `${process.env.REACT_APP_API_URL}?api-key=${process.env.REACT_APP_API_KEY}`;

const News = () => {
  const [cardData, setCardData] = useState(() => {
    const savedNews = JSON.parse(localStorage.getItem("newsList"));
    return savedNews || [];
  });

  const limit = 10;

  const getData = async () => {
    try {
      const res = await axios(url);

      const data = res.data.results;
      //   console.log(data)
      setCardData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getNewStory = () => {
    if (cardData.length > 0) {
      const randomIndex = Math.floor(Math.random() * cardData.length);
      const newStory = cardData[randomIndex];
      setCardData((prevData) => {
        const updatedNews = [newStory, ...prevData.slice(0, limit - 1)];
        localStorage.setItem("newsList", JSON.stringify(updatedNews));
        return updatedNews;
      });
    }
  };

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getNewStory();
    }, 60000); // Fetch new story every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardData.map((data, index) => {
          return (
            <div key={index}>
              <NewsCard data={data} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
