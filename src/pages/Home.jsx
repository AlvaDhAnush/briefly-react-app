// import { useState, useEffect } from 'react';
// import ArticleCard from '../components/ArticleCard';
// import axios from 'axios';
// import FilterSearch from '../components/FilterSearch';

// const Home = () => {
//   const [articles, setArticles] = useState([]); // State to store fetched articles
//   const [searchTerm, setSearchTerm] = useState('technology');
//   const [filters, setFilters] = useState({
//     searchIn: 'title,content', // Restrict search to specific fields (optional)
//     from: '2024-12-20',    // Articles from this date (optional)
//     to: '2024-12-21',      // Articles to this date (optional)
//     language: 'en',        // Language of the articles
//     sortBy: 'publishedAt', // Sort by relevancy, popularity, or publishedAt
//     pageSize: '18',        // Number of results per page (default 20)
//     page: '1',
//     categories: [],
//     sources: [],            // Page number
//     apiKey: import.meta.env.VITE_NEWSAPI_API_KEY         // Your API key
//   });

//   //   Fetch articles from APIs
//   useEffect(() => {
//     const fetchArticles = async () => {
//       const queryParams = new URLSearchParams({
//         ...filters,
//         q: searchTerm,
//         categories:filters?.categories.toString(),
//         sources:filters?.sources.toString(),
//         apiKey: import.meta.env.VITE_NEWSAPI_API_KEY // Ensure this is defined in your environment variables
//       });
//       try {
//         const response = await axios.get(`https://newsapi.org/v2/everything?${queryParams.toString()}`);
//         if (filters.page === '1') {
//           setArticles(response.data.articles);
//         }
//         else {
//           setArticles(prevArticles => [...prevArticles, ...response.data.articles]);
//         }
//       } catch (error) {
//         console.error('Error fetching articles:', error);
//       }
//     };

//     fetchArticles();
//   }, [searchTerm, filters]);

//   const handlePage = () => {
//     setFilters({ ...filters, page: Number(filters.page) + 1 })
//   }

//   const handleSearch = (value) => {
//     setSearchTerm(value)
//   }
//   const filterHandler = (value)=>{
//     setFilters(value)
//   }

//   return (
//     <div className="container mx-auto p-4">
//       {/* Search bar component */}
//       {/* <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
//       {/* Filters component */}
//       {/* <Filters filters={filters} setFilters={setFilters} /> */}
//       {/* Articles list */}
//       <FilterSearch handleSearchFunction={handleSearch} filterHandler={filterHandler}/>
//       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//         {articles.length > 0 && articles.map((article, index) => (
//           <ArticleCard
//            key={index}
//            imageUrl={article?.urlToImage}
//            title={article?.title}
//            url={article?.url}
//            description={article?.description}
//            article={article} />
//         ))
//       }

//       </div>
//       {articles.length === 0 ? <div className='font-roboto text-[30px] text-center w-full'>
//         No articles match your search. Try a different keyword or come back soon!
//       </div> :
//       <div className='w-full flex justify-center mt-3'>
//         <button className='bg-black font-roboto text-white p-3 rounded-md' onClick={() => handlePage()}>Load more</button>
//       </div>}
//     </div>
//   );
// };

// export default Home;


import { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import Shimmer from '../components/Shimmer'; // Import shimmer component
import axios from 'axios';
import FilterSearch from '../components/FilterSearch';

const Home = () => {
  const [articles, setArticles] = useState([]); // State to store fetched articles
  const [loading, setLoading] = useState(true); // State for loading status
  const [searchTerm, setSearchTerm] = useState('technology');
  const [filters, setFilters] = useState({
    searchIn: 'title,content',
    from: '2024-12-20',
    to: '2024-12-21',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: '18',
    page: '1',
    categories: [],
    sources: [],
    apiKey: import.meta.env.VITE_NEWSAPI_API_KEY,
  });

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true); // Start loading
      const queryParams = new URLSearchParams({
        ...filters,
        q: searchTerm,
        categories: filters?.categories.toString(),
        sources: filters?.sources.toString(),
        apiKey: import.meta.env.VITE_NEWSAPI_API_KEY,
      });

      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?${queryParams.toString()}`
        );
        if (filters.page === '1') {
          setArticles(response.data.articles);
        } else {
          setArticles((prevArticles) => [
            ...prevArticles,
            ...response.data.articles,
          ]);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchArticles();
  }, [searchTerm, filters]);

  const handlePage = () => {
    setFilters({ ...filters, page: Number(filters.page) + 1 });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filterHandler = (value) => {
    setFilters(value);
  };

  return (
    <div className="container mx-auto p-4">
      <FilterSearch
        handleSearchFunction={handleSearch}
        filterHandler={filterHandler}
      />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {loading
          ? // Display shimmer placeholders while loading
            Array.from({ length: 9 }).map((_, index) => <Shimmer key={index} />)
          : articles.map((article, index) => (
              <ArticleCard
                key={index}
                imageUrl={article?.urlToImage}
                title={article?.title}
                url={article?.url}
                description={article?.description}
                article={article}
              />
            ))}
      </div>
      {articles.length === 0 && !loading ? (
        <div className="font-roboto text-[30px] text-center w-full">
          No articles match your search. Try a different keyword or come back
          soon!
        </div>
      ) : (
        <div className="w-full flex justify-center mt-3">
          <button
            className="bg-black font-roboto text-white p-3 rounded-md"
            onClick={handlePage}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;


