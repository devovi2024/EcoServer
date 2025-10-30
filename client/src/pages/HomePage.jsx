import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import ProductStore from "../store/ProductStore";
import Slider from "../components/product/slider";
// import Features from "../components/features/features";
import Categories from "../components/product/categories";
import Products from "../components/product/products";
import Brands from "../components/product/brands";

const HomePage = () => {
  const { 
    BrandListRequest,
    CategoryListRequest,
    SliderListRequest,
    ListByProductRemarkRequest
  } = ProductStore();

  useEffect(() => {
    const fetchData = async () => {
      await BrandListRequest();         
      await CategoryListRequest();        
      await SliderListRequest();         
      await ListByProductRemarkRequest("new"); 
    };

    fetchData();
  }, []); 

  return (
    <Layout>
      <Slider />
      <Brands />
      {/* <Features /> */}
      <Categories />
      <Products />
    </Layout>
  );
};

export default HomePage;
