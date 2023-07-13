import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/pages/home';
import Company from './components/pages/company';
import Contact from './components/pages/contact';
import NewProject from './components/pages/newproject';
import { Container } from 'react-bootstrap';
import Containers from './components/layouts/Container';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Projects from './components/pages/Projects';
function App() {
  return (
    <BrowserRouter> 
    <Navbar/>
    

        <Container>
          <Containers customClass="min-height">
          <Routes>
            <Route path= "/" element={<Home/>}/> 
            <Route path= "/Company" element={<Company/>}/>
            <Route path= "/Projects" element={<Projects/>}/>  
            <Route path= "/Contact" element={<Contact/>}/> 
            <Route path= "/NewProject" element={<NewProject/>}/>    
          </Routes>
          </Containers>
        </Container>

      <Footer/>

    </BrowserRouter>
  );
}

export default App;