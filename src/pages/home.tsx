import React from "react";
import Header from '../components/header';
import Hero from '../components/hero';
import About from '../components/about';
import Services from '../components/services';
import Store from '../components/store';

const Home: React.FC = () => {
  return (
    <main>
      <Header />
           <Hero />
           <About />
           <Store />
           <Services />
      </main>
  );
};

export default Home;