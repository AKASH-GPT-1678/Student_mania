import { Route, Routes } from 'react-router-dom'
import './App.css'
import BrandForm from './components/BrandSignup'
import VerifyBrand from './components/VerifyBrand'


function App() {
 

  return (
    <>
    <Routes>

      <Route path="/" element={<BrandForm />} />
      <Route path='/verify' element={<VerifyBrand />} />
    </Routes>
     
    </>
  )
}

export default App
