import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Mainpage from './pages/Mainpage'

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Mainpage />} />
      </Routes>
    </Router>
    </div>
  )
      
}

export default App
