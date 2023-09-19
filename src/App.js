import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import { Container } from 'react-bootstrap';
import Containers from './components/layouts/Container';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';
function App() {
  return (
    <BrowserRouter> 
    <Navbar/>
    

        <Container>
          <Containers customClass="min-height">
          <Routes>
            <Route exact path= "/" element={<Home/>}/> 
            <Route path= "/Company" element={<Company/>}/>
            <Route path= "/Projects" element={<Projects/>}/>  
            <Route path= "/Contact" element={<Contact/>}/> 
            <Route path= "/NewProject" element={<NewProject/>}/>
            <Route path= "/Project/:id" element={<Project/>}/>     
          </Routes>
          </Containers>
        </Container>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;