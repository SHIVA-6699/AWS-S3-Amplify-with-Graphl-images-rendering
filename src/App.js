import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";

const YourComponent = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const getdata = async () => {
    try {
      const { results } = await Storage.list("real/", { pageSize: "ALL" });
      console.log("Results:", results); // Check the results in the console
      if (results.length > 0) {
        const urls = await Promise.all(
          results.map(async (result) => {
            return await Storage.get(result.key);
          })
        );
        console.log("Image URLs:", urls); // Check the image URLs in the console
        setImageUrls(urls);
      } else {
        console.log("No files found.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      {loading && <p>Loading images...</p>}
      {!loading &&
        imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index + 1}`} />
        ))}
    </div>
  );
};

export default YourComponent;
