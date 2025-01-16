import { Music, Award, Star, Headphones } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
          My Services
        </h2>
        
        <p className="text-center max-w-3xl mx-auto text-gray-700 mb-16">
          Explore my music services, from live performances and songwriting to collaborations and music production. 
          Let's create unforgettable moments together.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            icon={<Music className="w-8 h-8 text-pink-600" />}
            title="Live Performances"
            description="I bring energy and passion to every stage. Let's make your event unforgettable with a live performance filled with my signature country sound."
          />
          <ServiceCard
            icon={<Award className="w-8 h-8 text-pink-600" />}
            title="Songwriting"
            description="I write heartfelt and authentic country songs, blending classic influences with modern storytelling. Let’s create something meaningful together."
          />
          <ServiceCard
            icon={<Star className="w-8 h-8 text-pink-600" />}
            title="Collaborations"
            description="I’m open to collaborations with other artists to create unique musical projects. Let's work together and push the boundaries of country music."
          />
          <ServiceCard
            icon={<Headphones className="w-8 h-8 text-pink-600" />}
            title="Music Production"
            description="I offer music production services, helping bring your ideas to life with a professional touch. Whether it’s a demo or full production, I’ve got you covered."
          />
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-lg border border-gray-300 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-800">{description}</p>
    </div>
  );
};

export default Services;