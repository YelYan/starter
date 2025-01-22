import React from "react";
import FeatureHero from "./FeatureHero";
import CategoryHome from "@/components/shopping-view/CategoryHome";
const Home = () => {
  return (
    <div className="relative">
      <FeatureHero />
      <CategoryHome />
    </div>
  );
};

export default Home;
