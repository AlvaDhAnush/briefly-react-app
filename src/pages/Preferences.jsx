// /* eslint-disable no-unused-vars */


// import { useState } from "react";
// import ArticleCard from "../components/ArticleCard";
// import axios from "axios";

// const Preferences = () => {
//   const [selectedSource, setSelectedSource] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [submitClicked, setSubmitClicked] = useState(false)
//   const sources = ["BBC", "CNN"];
//   const categories = [
//     "general",
//     "business",
//     "entertainment",
//     "health",
//     "science",
//     "sports",
//     "technology"
//   ];
//   const handleCategoryChange = (category) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((cat) => cat !== category)
//         : [...prev, category]
//     );
//   };

//   const fetchNews = async () => {
//     setSubmitClicked(true);
//     const queryParams = new URLSearchParams({
//       source: selectedSource,
//       categories: selectedCategories.join(","),
//       access_key: import.meta.env.VITE_NEWSCRED_API_KEY,
//       offset: 18
//     });

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `http://api.mediastack.com/v1/news?${queryParams}`
//       );
//       const data = response?.data?.data
//       setNews(data || []);
//     } catch (error) {
//       console.error("Error fetching news:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePage = () => {

//   }
//   return (
//     <div className="px-10">
//       <h1 className="text-2xl text-center my-5 font-semibold">Personalized News Feed</h1>

//       {/* Filters Section */}
//       <div className="personalization-section">
//         <div className="flex flex-wrap w-full">
//           {/* Sources Dropdown */}
//           <div className="filter-group w-1/2">
//             <label className="mr-3" htmlFor="sources">Select Source:</label>
//             <select
//               id="sources"
//               value={selectedSource}
//               className="w-1/3 border"
//               onChange={(e) => setSelectedSource(e.target.value)}
//             >
//               <option className="border" value="">All Sources</option>
//               {sources.map((source) => (
//                 <option key={source} value={source.toLowerCase().replace(" ", "-")}>
//                   {source}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Categories Checkboxes */}
//           <div className="filter-group w-1/2">
//             <label className="">Categories:</label>
//             {categories.map((category) => (
//               <div key={category} className="checkbox-group flex items-center">
//                 <input
//                   type="checkbox"
//                   id={category}
//                   value={category}
//                   onChange={() => handleCategoryChange(category)}
//                 />
//                 <label className="ml-3" htmlFor={category}>{category}</label>
//               </div>
//             ))}
//           </div>
//         </div>


//         {/* Submit Button */}
//         <div className="w-full flex justify-center">
//           <button className="submit-button p-3 bg-black rounded-md text-white mt-5" onClick={fetchNews}>
//             Submit
//           </button>
//         </div>

//       </div>

//       {/* News Section */}
//       <div className="container mx-auto p-4">
//         <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//           {news.length > 0 && news.map((article, index) => (
//             <ArticleCard
//               key={index}
//               imageUrl={article?.image}
//               title={article?.title}
//               url={article?.url}
//               description={article?.description}
//               article={article} />
//           ))
//           }

//         </div>
//         {news.length === 0 && submitClicked ? <div className='font-roboto text-[30px] text-center w-full'>
//           No articles match your search. Try a different keyword or come back soon!
//         </div> :
//           // <div className='w-full flex justify-center mt-3'>
//           //   <button className='bg-black font-roboto text-white p-3 rounded-md' onClick={() => handlePage()}>Load more</button>
//           // </div>
//           null
//         }
//       </div>
//     </div>
//   );
// };

// export default Preferences;

/* eslint-disable no-unused-vars */

import { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import Shimmer from "../components/Shimmer"; // Import shimmer component
import axios from "axios";

const Preferences = () => {
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const sources = ["BBC", "CNN"];
  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const fetchNews = async () => {
    setSubmitClicked(true);
    const queryParams = new URLSearchParams({
      source: selectedSource,
      categories: selectedCategories.join(","),
      access_key: import.meta.env.VITE_NEWSCRED_API_KEY,
      offset: 33,
    });

    setLoading(true);
    try {
      const response = await axios.get(
        `http://api.mediastack.com/v1/news?${queryParams}`
      );
      const data = response?.data?.data;
      setNews(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePage = () => {
    // Pagination logic
  };

  return (
    <div className="px-10">
      <h1 className="text-2xl text-center my-5 font-semibold">
        Personalized News Feed
      </h1>

      {/* Filters Section */}
      <div className="personalization-section">
        <div className="flex flex-wrap w-full">
          {/* Sources Dropdown */}
          <div className="filter-group w-1/2">
            <label className="mr-3" htmlFor="sources">
              Select Source:
            </label>
            <select
              id="sources"
              value={selectedSource}
              className="w-1/3 border"
              onChange={(e) => setSelectedSource(e.target.value)}
            >
              <option className="border" value="">
                All Sources
              </option>
              {sources.map((source) => (
                <option
                  key={source}
                  value={source.toLowerCase().replace(" ", "-")}
                >
                  {source}
                </option>
              ))}
            </select>
          </div>

          {/* Categories Checkboxes */}
          <div className="filter-group w-1/2">
            <label className="">Categories:</label>
            {categories.map((category) => (
              <div key={category} className="checkbox-group flex items-center">
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  onChange={() => handleCategoryChange(category)}
                />
                <label className="ml-3" htmlFor={category}>
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center">
          <button
            className="submit-button p-3 bg-black rounded-md text-white mt-5"
            onClick={fetchNews}
          >
            Submit
          </button>
        </div>
      </div>

      {/* News Section */}
      <div className="container mx-auto p-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {loading
            ? // Display shimmer placeholders while loading
              Array.from({ length: 9 }).map((_, index) => (
                <Shimmer key={index} />
              ))
            : news.length > 0 &&
              news.map((article, index) => (
                <ArticleCard
                  key={index}
                  imageUrl={article?.image}
                  title={article?.title}
                  url={article?.url}
                  description={article?.description}
                  article={article}
                />
              ))}
        </div>
        {news.length === 0 && submitClicked && !loading ? (
          <div className="font-roboto text-[30px] text-center w-full">
            No articles match your search. Try a different keyword or come back
            soon!
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Preferences;



