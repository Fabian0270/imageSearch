import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';


const FavouritePictures = () => {
    const { user } = useAuth0();
    const [favorites, setFavorites] = useState([]);
    const [isReady, setIsReady] = useState(false);

    // Funktion för att hämta användarens favoritbilder från servern  
    const fetchFavorites = async () => {
        if (user?.sub) {
            console.log('SUB', user.sub); 
             
            try {       
                const response = await fetch(`http://localhost:5172/favorite/${user.sub}`);
                const data = await response.json(); 
                
                setFavorites(await data.favorite_images); 
                if (data.favorite_images) {
                    setIsReady(true);  
                }
  
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }            

        } else if(user?.sub === '') {
            console.log('NO SUB', user);
            
            return;
        }  
        console.log('favorites: ', favorites);
    };

    // Anropa fetchFavorites funktionen när komponenten renderas för första gången
    useEffect(() => {
        fetchFavorites();
    }, [user?.sub]); // Uppdatera favoritlistan när användaren ändras


    return (
        <div>
            <h2>Mina Favoritbilder</h2>
            
            { isReady ? <ul>
                
                {favorites.map((favorite, index) => (
                    <li key={index}>  
                        <img src={favorite?.thumbnailLink} alt={favorite?.contextLink} />
                    </li>
                ))}
                </ul> : <p></p>}  

        </div>
    );
}

export default FavouritePictures;
