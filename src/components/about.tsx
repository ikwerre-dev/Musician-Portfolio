import React from 'react';

const About: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
          About Lainey Wilson
        </h2>
        
        <p className="text-center max-w-3xl mx-auto text-gray-300 mb-16">
          Lainey Denay Wilson is a 32-year-old American country singer-songwriter hailing from Baskin, Louisiana. With a career that spans over a decade, Lainey has grown to become one of country music’s rising stars. Her music is a blend of country, southern rock, and pop, and she has garnered widespread acclaim for her powerful songwriting and voice.
        </p>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-5xl md:text-6xl font-bold text-pink-200 mb-2">7</h3>
            <p className="text-gray-300">CMA Awards</p>
          </div>
          <div className="text-center">
            <h3 className="text-5xl md:text-6xl font-bold text-pink-200 mb-2">1</h3>
            <p className="text-gray-300">Grammy Award</p>
          </div>
          <div className="text-center">
            <h3 className="text-5xl md:text-6xl font-bold text-pink-200 mb-2">6</h3>
            <p className="text-gray-300">ACM Awards</p>
          </div>
        </div>

        <div className="mt-16">
          
          <h3 className="text-3xl font-bold text-center text-pink-200 mb-4">Career Highlights</h3>
          <p className="text-center max-w-3xl mx-auto text-gray-300 mb-8">
            Lainey’s breakthrough came with her 2020 hit single "Things a Man Oughta Know," which reached number one on the Billboard Country Airplay chart. She has released multiple albums, received numerous award nominations, and appeared on the popular TV series Yellowstone. Her 2021 album *Sayin' What I'm Thinkin'* and her 2022 album *Bell Bottom Country* have solidified her place in the country music industry.
          </p>
 
        </div>
      </div>
    </section>
  );
};

export default About;