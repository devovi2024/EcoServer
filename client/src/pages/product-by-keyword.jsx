import React, { useEffect } from "react"; 
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProductStore from "../store/ProductStore";
import ProductList from "../components/product/product-list";

const ProductByKeyword = () => {
  const { keyword } = useParams();
  const { SetSearchKeyword } = ProductStore();

  useEffect(() => {
    SetSearchKeyword(keyword || "");
  }, [keyword, SetSearchKeyword]);

  return (
    <Layout>
      <ProductList remark={`keyword_${keyword}`} />
    </Layout>
  );
};

export default ProductByKeyword;
