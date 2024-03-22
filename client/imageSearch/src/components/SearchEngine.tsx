import React, { useEffect, useState } from "react";

const SearchEngine = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [images, setImages] = useState([]);
    const [searchTime, setsearchTime] = useState(null);

    const search = async () => {
        try {
            if (!searchQuery) {
                return;
            }
            const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API_KEY}&cx=22153a4c1db2142f8&num=10&searchType=image&q=${searchQuery}`);
            const data = await response.json();
            console.log(data)
            if (data.items && data.items.length > 0) {
                const imageURLs = data.items.map(item => item.link);
                setImages(imageURLs);
                setsearchTime(data.searchInformation.searchTime);
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        search();
    };

    return (
        <>
            <input
                type="text"
                placeholder="Sök"
                value={searchQuery}
                onChange={handleInputChange}
            />
            <button onClick={handleSearchClick}>Sök</button>
            <div>
                <p>Sökningen tog {searchTime} sekunder</p>
                <ul>
                    {images.map((imageURL, index) => (
                        <li key={index}>
                            <img src={imageURL} alt={`Image ${index}`} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default SearchEngine;