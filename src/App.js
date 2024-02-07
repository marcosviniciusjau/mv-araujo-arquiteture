import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import { Container } from 'react-bootstrap';
import Containers from '../src/components/layouts/Container';
import Navbar from '../src/components/layouts/Navbar';
import Footer from '../src/components/layouts/Footer';
import Projects from '../src/components/pages/Projects';
import Project from '../src/components/pages/Project';

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
<a href="https://www.flaticon.com/br/icones-gratis/casa" title="casa ícones">
  Casa ícones criados por Prosymbols Premium - Flaticon
</a>
export default App;