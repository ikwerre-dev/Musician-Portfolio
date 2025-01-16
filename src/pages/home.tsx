import React from "react";
import Header from '../components/header';
import Hero from '../components/hero';
import About from '../components/about';
import Services from '../components/services';
import Store from '../components/store';
import { Gallery } from "../components/components/Gallery";

const Home: React.FC = () => {
  return (
    <main>
      <Header />
           <Hero />
           <About />
           <Store />
           <Gallery />
           <Services />
      </main>
  );
};

export default Home;