import { create } from "zustand";
import axios from "axios";

const ProductStore = create((set, get) => ({
  // ===== State =====
  ListProduct: null,
  BrandList: null,
  CategoryList: null,
  SliderList: null,
  Details: null,            // Single product details object
  ProductReviews: [],       // Product reviews array
  SearchKeyword: "",
  isLoading: false,

  // ===== Brand List =====
  BrandListRequest: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/api/ProductBrandList");
      set({ BrandList: res.data?.status === "success" ? res.data.data : [], isLoading: false });
    } catch (error) {
      console.error(error);
      set({ BrandList: [], isLoading: false });
    }
  },

  // ===== Category List =====
  CategoryListRequest: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/api/ProductCategoryList");
      set({ CategoryList: res.data?.status === "success" ? res.data.data : [], isLoading: false });
    } catch (error) {
      console.error(error);
      set({ CategoryList: [], isLoading: false });
    }
  },

  // ===== Slider List =====
  SliderListRequest: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/api/ProductSliderList");
      set({ SliderList: res.data?.status === "success" ? res.data.data : [], isLoading: false });
    } catch (error) {
      console.error(error);
      set({ SliderList: [], isLoading: false });
    }
  },

  // ===== Product List Filters =====
  ListByProductRemarkRequest: async (Remark) => {
    set({ ListProduct: null, isLoading: true });
    try {
      const res = await axios.get(`/api/ProductListByRemark/${Remark}`);
      set({ ListProduct: res.data?.status === "success" ? res.data.data : [], isLoading: false });
    } catch (error) {
      console.error(error);
      set({ ListProduct: [], isLoading: false });
    }
  },

  ListByProductBrandRequest: async (BrandID) => {
    set({ ListProduct: null, isLoading: true });
    try {
      const res = await axios.get(`/api/ProductListByBrand/${BrandID}`);
      set({ ListProduct: res.data?.status === "success" ? res.data.data : [], isLoading: false });
    } catch (error) {
      console.error(error);
      set({ ListProduct: [], isLoading: false });
    }
  },

  ListByProductCategoryRequest: async (CategoryID) => {
    set({ ListProduct: null, isLoading: true });
    try {
      const res = await axios.get(`/api/ProductListByCategory/${CategoryID}`);
      set({ ListProduct: res.data?.status === "success" ? res.data.data : [], isLoading: false });
    } catch (error) {
      console.error(error);
      set({ ListProduct: [], isLoading: false });
    }
  },

  ListByProductSimilarRequest: async (CategoryID) => {
    set({ ListProduct: null, isLoading: true });
    try {
      const res = await axios.get(`/api/ProductListBySimilar/${CategoryID}`);
      set({ ListProduct: res.data?.status === "success" ? res.data.data : [], isLoading: false });
    } catch (error) {
      console.error(error);
      set({ ListProduct: [], isLoading: false });
    }
  },

  ListByProductKeywordRequest: async (Keyword) => {
    set({ ListProduct: null, SearchKeyword: Keyword, isLoading: true });
    try {
      const res = await axios.get(`/api/ProductListByKeyword/${Keyword}`);
      set({ ListProduct: res.data?.status === "success" ? res.data.data : [], isLoading: false });
    } catch (error) {
      console.error(error);
      set({ ListProduct: [], isLoading: false });
    }
  },

  // ===== Product Details =====
  ProductDetailsRequest: async (ProductID) => {
    set({ Details: null });
    try {
      const res = await axios.get(`/api/ProductDetails/${ProductID}`);
      if(res.data?.status === "success") {
        set({ Details: res.data.data });
      }
    } catch (error) {
      console.error("ProductDetailsRequest error:", error);
      set({ Details: null });
    }
  },

  // ===== Product Reviews =====
  ProductReviewListRequest: async (ProductID) => {
    set({ ProductReviews: [], isLoading: true });
    try {
      const res = await axios.get(`/api/ProductReviewList/${ProductID}`);
      set({
        ProductReviews: res.data?.status === "success" ? res.data.data : [],
        isLoading: false
      });
    } catch (error) {
      console.error("ProductReviewListRequest error:", error);
      set({ ProductReviews: [], isLoading: false });
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

  // ===== Search Keyword =====
  SetSearchKeyword: (Keyword) => set({ SearchKeyword: Keyword }),

  // ===== List by Filter =====
  ListByFilterRequest: async (postBody) => {
    set({ ListProduct: null, isLoading: true });
    try {
      const res = await axios.post("/api/ProductListByFilter", postBody);
      set({ ListProduct: res.data?.status === "success" ? res.data.data : [], isLoading: false });
      return res.data;
    } catch (error) {
      console.error("Filter request error:", error);
      set({ ListProduct: [], isLoading: false });
      return { status: "error", message: "Filter request failed" };
    }
  },
}));

export default ProductStore;
