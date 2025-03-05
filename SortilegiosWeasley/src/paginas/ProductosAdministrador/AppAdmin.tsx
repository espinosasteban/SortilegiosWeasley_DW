import './styles.css'; 
import InfoBoton from "../../components/infoBoton";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import ProductList from './ProductList';

const AppAdmin = () => {
    return (
        <Router>
          <div className="admin-container">
            <div className="profile-content">
              <Routes>
                <Route path="/gestion-producto" element={<ProductList />} />
              </Routes>
            </div>
            <InfoBoton/>
          </div>
        </Router>
      );
};

export default AppAdmin;