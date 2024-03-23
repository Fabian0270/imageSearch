import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import SearchEngine from "./components/SearchEngine";
import Profile from "./components/Profile";
import FavouritePictures from "./components/FavouritePictures";

const App = () => {
  const { isAuthenticated, user } = useAuth0(); // Hämta användaruppgifter från Auth0
  const [currentUser, setCurrentUser] = useState(null); // State-variabel för att hålla användaruppgifter

  // Funktion för att uppdatera currentUser-state när användaren loggar in eller loggar ut
  const handleUserChange = (userData) => {
    setCurrentUser(userData);
  };

  return (
    <div>
      {/* Rendera inloggningsknappen om användaren inte är inloggad */}
      {!isAuthenticated && <LoginButton />}

      {/* Rendera komponenter för inloggad användare */}
      {isAuthenticated && (
        <div>
          {/* Loggut-knapp */}
          <LogoutButton />

          {/* Sök-komponent */}
          <SearchEngine />

          {/* Profil-komponent */}
          <Profile user={user} />

          {/* Favoritbilder-komponent och skicka currentUser som prop */}
          <FavouritePictures user={currentUser} />
          <p>{currentUser}</p>
        </div>
      )}
    </div>
  );
};

export default App;