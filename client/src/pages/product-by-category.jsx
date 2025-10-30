import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProductStore from "../store/ProductStore";
import ProductList from "../components/product/product-list";

const ProductByCategory = () => {
  const { id } = useParams();
  const { ListByProductCategoryRequest } = ProductStore();

  useEffect(() => {
    const fetchProducts = async () => {
      if (id) {
        await ListByProductCategoryRequest(id);
      }
    };
    fetchProducts();
  }, [id, ListByProductCategoryRequest]);

  return (
    <Layout>
      <ProductList remark={`category_${id}`} />
    </Layout>
  );
};

export default ProductByCategory;
