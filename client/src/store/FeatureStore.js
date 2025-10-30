import { create } from 'zustand';
import axios from 'axios';

const FeatureStore = create((set) => ({
  FeatureList: null,
  FeatureListRequest: async () => {
    try {
      let res = await axios.get(`/api/v1/FeaturesList`);
      if (res.data['status'] === "success") {
        set({ FeatureList: res.data['data'] });
      }
    } catch (e) {
      console.error(e);
    }
  },
}));

export default FeatureStore;
