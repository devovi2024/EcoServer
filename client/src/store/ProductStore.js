import { create } from "zustand";
import axios from "axios";

const ProductStore = create((set, get) => ({
  ListProduct: null,
  BrandList: null,
  CategoryList: null,
  SliderList: null,
  ProductDetailsData: {},
  ProductReviews: {},
  SearchKeyword: "",

  BrandListRequest: async () => {
    try {
      const res = await axios.get("/api/ProductBrandList");
      set({ BrandList: res.data?.status === "success" ? res.data.data : [] });
    } catch (error) {
      console.error(error);
      set({ BrandList: [] });
    }
  },

  CategoryListRequest: async () => {
    try {
      const res = await axios.get("/api/ProductCategoryList");
      set({ CategoryList: res.data?.status === "success" ? res.data.data : [] });
    } catch (error) {
      console.error(error);
      set({ CategoryList: [] });
    }
  },

  SliderListRequest: async () => {
    try {
      const res = await axios.get("/api/ProductSliderList");
      set({ SliderList: res.data?.status === "success" ? res.data.data : [] });
    } catch (error) {
      console.error(error);
      set({ SliderList: [] });
    }
  },

  ListByProductRemarkRequest: async (Remark) => {
    try {
      set({ ListProduct: null });
      const res = await axios.get(`/api/ProductListByRemark/${Remark}`);
      set({ ListProduct: res.data?.status === "success" ? res.data.data : [] });
    } catch (error) {
      console.error(error);
      set({ ListProduct: [] });
    }
  },

  ListByProductBrandRequest: async (BrandID) => {
    try {
      set({ ListProduct: null });
      const res = await axios.get(`/api/ProductListByBrand/${BrandID}`);
      set({ ListProduct: res.data?.status === "success" ? res.data.data : [] });
    } catch (error) {
      console.error(error);
      set({ ListProduct: [] });
    }
  },

  ListByProductCategoryRequest: async (CategoryID) => {
    try {
      set({ ListProduct: null });
      const res = await axios.get(`/api/ProductListByCategory/${CategoryID}`);
      set({ ListProduct: res.data?.status === "success" ? res.data.data : [] });
    } catch (error) {
      console.error(error);
      set({ ListProduct: [] });
    }
  },

  ListByProductSimilarRequest: async (CategoryID) => {
    try {
      set({ ListProduct: null });
      const res = await axios.get(`/api/ProductListBySimilar/${CategoryID}`);
      set({ ListProduct: res.data?.status === "success" ? res.data.data : [] });
    } catch (error) {
      console.error(error);
      set({ ListProduct: [] });
    }
  },

  ListByProductKeywordRequest: async (Keyword) => {
    try {
      set({ ListProduct: null, SearchKeyword: Keyword });
      const res = await axios.get(`/api/ProductListByKeyword/${Keyword}`);
      set({ ListProduct: res.data?.status === "success" ? res.data.data : [] });
    } catch (error) {
      console.error(error);
      set({ ListProduct: [] });
    }
  },

  ProductDetailsRequest: async (ProductID) => {
    try {
      set({ ProductDetailsData: {} });
      const res = await axios.get(`/api/ProductDetails/${ProductID}`);
      set({ ProductDetailsData: res.data?.status === "success" ? res.data.data : {} });
    } catch (error) {
      console.error(error);
      set({ ProductDetailsData: {} });
    }
  },

  ProductReviewListRequest: async (ProductID) => {
    try {
      set({ ProductReviews: {} });
      const res = await axios.get(`/api/ProductReviewList/${ProductID}`);
      set({ ProductReviews: res.data?.status === "success" ? res.data.data : {} });
    } catch (error) {
      console.error(error);
      set({ ProductReviews: {} });
    }
  },

  ProductCreateReviewRequest: async (reviewData) => {
    try {
      const res = await axios.post(`/api/ProductCreateReview`, reviewData);
      return res.data;
    } catch (error) {
      console.error(error);
      return { status: "error", message: "Review create failed" };
    }
  },

  SetSearchKeyword: (Keyword) => {
    set({ SearchKeyword: Keyword });
  },
}));

export default ProductStore;
