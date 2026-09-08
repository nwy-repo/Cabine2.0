import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./Header.jsx"
import Home from './Home.jsx'
import OperatorPage from './OperatorPage.jsx'
import InternetCatalog from './InternetCatalog.jsx'
import MixCatalog from './MixCatalog.jsx'
import Transfer from './Transfer.jsx'
import Checkout from './Checkout.jsx'
import { PaymentSuccess, PaymentError } from './PaymentResult.jsx'
import Contact from './Contact.jsx'
import AdminPage from './admin/AdminPage.jsx'
import { CartProvider } from './context/CartContext.jsx'

function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/operateur/:operatorId' element={<OperatorPage/>} />
          <Route path='/operateur/:operatorId/internet' element={<InternetCatalog/>} />
          <Route path='/operateur/:operatorId/mix' element={<MixCatalog/>} />
          <Route path='/operateur/:operatorId/transfert' element={<Transfer/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/paiement/succes' element={<PaymentSuccess/>} />
          <Route path='/paiement/echec' element={<PaymentError/>} />
          <Route path='/Contact' element={<Contact/>} />
          <Route path='/admin' element={<AdminPage/>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
