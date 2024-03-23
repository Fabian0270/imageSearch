import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
//import { IUser } from '../models/IUser';

/*interface IUserProps {
    user: IUser;
}*/

const FavouritePictures = () => {
    const { user } = useAuth0();
    const [favorites, setFavorites] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [userId, setUserId] = useState('');

    // Funktion för att hämta användarens favoritbilder från servern  
    const fetchFavorites = async () => {
        if (user?.sub) {
            console.log('SUB', user); 
           setUserId(user?.sub);   
           console.log('user id: ', userId);
           if (userId) {   
            try {       
                const response = await fetch(`http://localhost:5172/favorite/${userId}`);
                if (response.ok) {
                    const data = await response.json(); 
                    setFavorites(data.favorite_images); 
                    console.log('favorites: ', favorites);
                    if (favorites.length > 0) {
                        setIsReady(true); 
                    }
                     
                } else {
                    console.error('Failed to fetch favorites:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }            
           } else {
            return;
           }


        } else if(user?.sub === '') {
            console.log('NO SUB', user);
            
            return;
        }  

    };

    // Anropa fetchFavorites funktionen när komponenten renderas för första gången
    useEffect(() => {
        fetchFavorites();
    }, [user]); // Uppdatera favoritlistan när användaren ändras


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
