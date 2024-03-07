import {BrowserRouter} from 'react-router-dom'
import { AppRouter } from './components/AppRouter';
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {checkAuth} from "./http/userService";

function App() {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await checkAuth()
        user.setUser(data)
        user.setIsAuth(true)
      } catch (e) {
        alert(e.response.data.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, []);

  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
