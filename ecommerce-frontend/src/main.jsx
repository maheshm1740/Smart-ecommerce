import { createRoot } from 'react-dom/client'
import App from './App'
import "./index.css"
import { AuthProvider } from './contexts/AuthProvider'
import { CartProvider } from './contexts/CartContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CartProvider>
      <App/>
    </CartProvider>
  </AuthProvider>,
)
