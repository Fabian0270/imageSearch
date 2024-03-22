import { useAuth0 } from "@auth0/auth0-react"
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"
import SearchEngine from "./components/SearchEngine"
import Profile from "./components/Profile"
import FavouritePictures from "./components/FavouritePictures"
const App = () => {

  const { isAuthenticated } = useAuth0()

  return (

    <div>
      {isAuthenticated ? 
        <div>
        <LogoutButton /> 
        <SearchEngine />
        <Profile />
        <FavouritePictures />
        </div> : <LoginButton />}

    </div>
    

  )
}

export default App