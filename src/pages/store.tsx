import React from "react";
import Header from "../components/header";
import Services from "../components/services";
import Store from "../components/store";

const StorePage: React.FC = () => {
  return (
    <main>
      <Header />
      <Store />
      <Services />
    </main>
  );
};

export default StorePage;
