import React, { useEffect } from "react";
import ProductStore from "../store/ProductStore";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProductList from "../components/product/product-list";

const ProductByBrand = () => {
  const { ListByProductBrandRequest } = ProductStore();
  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      if (id) {
        await ListByProductBrandRequest(id); 
      }
    };
    fetchProducts();
  }, [id, ListByProductBrandRequest]);

  return (
    <Layout>
      <ProductList brandID={id} />
    </Layout>
  );
};

export default ProductByBrand;
