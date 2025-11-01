import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductStore from "../store/ProductStore";
import Details from "./details";
import Brands from "../components/product/brands";
import Layout from "../components/layout/Layout";

const ProductDetails = () => {
  const { id } = useParams();
  const { ProductDetailsRequest, ProductReviewListRequest, BrandList, BrandListRequest } = ProductStore();

  useEffect(() => {
    (async () => {
      if (id) {
        await ProductDetailsRequest(id);
        await ProductReviewListRequest(id);
        if (!BrandList || BrandList.length === 0) {
          await BrandListRequest();
        }
      }
    })();
  }, [id, ProductDetailsRequest, ProductReviewListRequest, BrandList, BrandListRequest]);

  return (
    <Layout>
      <Details />
      <Brands />
    </Layout>
  );
};

export default ProductDetails;
