import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SearchEngine = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [images, setImages] = useState([]);
    const [searchTime, setSearchTime] = useState(null);
    const [correctionSpelling, setCorrectionSpelling] = useState("");
    const { user } = useAuth0();

    const search = async () => {
        try {
            if (!searchQuery) {
                return;
            }
            const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API_KEY}&cx=22153a4c1db2142f8&num=10&searchType=image&q=${searchQuery}`);
            const data = await response.json();
            console.log(data)
            if (data.items && data.items.length > 0) {
                const imageArray = data.items;
                setImages(imageArray);
                setSearchTime(data.searchInformation.searchTime);
            }
            if (data.spelling.correctedQuery) {
                setCorrectionSpelling(data.spelling.correctedQuery);
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

    const handleNewSearch = (newQuery) => {
        setSearchQuery(newQuery)
        search();
    };

    const handleFavorite = async (favoriteImage) => {
        try {
            console.log('image: ', favoriteImage);
            const response = await fetch('http://localhost:5172/favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user, favoriteImage })
            });
            console.log(response)
        } catch (error) {
            console.error('Error saving favorite:', error);
        }
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
                {searchTime ? <p>Sökningen tog {searchTime} sekunder</p> : null}
                {correctionSpelling ? (
                    <button onClick={() => handleNewSearch(correctionSpelling)}>Menade du {correctionSpelling}? Dubbelklicka här</button>
                ) : null}
                <ul>
                    {images.map((theImage, index) => (
                        <li key={index}>
                            <img src={theImage.link} alt={`Image ${index}`} />
                            <button onClick={() => handleFavorite(theImage.image)}>
                                Favorisera bild
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default SearchEngine;