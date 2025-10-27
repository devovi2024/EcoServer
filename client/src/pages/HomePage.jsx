import React from "react";
import Layout from "../components/layout/Layout";
import Skeliton from "../skeleton/sliderSkeleton"
import featuresSkeleton from "../skeleton/featuresSkeleton"
const HomePage = () => {
  return (
    <Layout>
      <div>
        <Skeliton/>
        <Skeliton/>
      </div>
    </Layout>
  );
};

export default HomePage;
