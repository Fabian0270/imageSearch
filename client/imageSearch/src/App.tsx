import { useAuth0 } from "@auth0/auth0-react"
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"
import SearchEngine from "./components/SearchEngine"

const App = () => {

  const { isAuthenticated } = useAuth0()

  return (

    <div>
      {isAuthenticated ? 
        <div>
        <LogoutButton /> 
        <SearchEngine />
        </div> : <LoginButton />}

    </div>
    

  )
}

export default App