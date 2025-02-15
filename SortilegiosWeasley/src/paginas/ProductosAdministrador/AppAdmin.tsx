import NavbarAdmin from './NavbarAdmin';
import './styles.css'; 
import InfoBoton from "../../components/infoBoton";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import ProductList from './ProductList';

const AppAdmin = () => {
    return (
        <Router>
          <div className="profile-container">
            <div className="profile-content">
              <Routes>
                <Route path="/admin" element={<Navigate to="/gestion-producto" replace />} />
                <Route path="/gestion-producto" element={<ProductList />} />
              </Routes>
            </div>
            <InfoBoton/>
          </div>
        </Router>
      );
};

export default AppAdmin;
