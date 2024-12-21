/* eslint-disable react/prop-types */

const ArticleCard = ({ imageUrl,title,description,url }) => {
  return (
    <div className="border bg-white  rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl || '/no-image.jpg '} alt={title} className={`w-full h-48 ${imageUrl ? 'object-cover':'object-contain'}`} loading="lazy" />
      <div className="p-4">
        <h3 className=" text-2xl mb-2 font-roboto font-semibold text-black">{title}</h3>
        <p className="text-sm mb-4 text-[#000]">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;