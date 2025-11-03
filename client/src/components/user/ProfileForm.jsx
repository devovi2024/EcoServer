import React, { useEffect } from "react";
import UserStore from "../../store/UserStore";

const ProfileForm = () => {
  const {
    ProfileForm,
    ProfileFormChange,
    ProfileDetailsReq,
    ProfileSaveRequest,
    isFormSubmit,
  } = UserStore();

  useEffect(() => {
    ProfileDetailsReq();
  }, [ProfileDetailsReq]);

  const handleChange = (e) => {
    ProfileFormChange(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ProfileSaveRequest();
  };

  if (!ProfileForm) return <div className="text-center mt-10">Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow rounded space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Profile Details</h2>

      {/* Customer Details */}
      <div className="border p-4 rounded space-y-4">
        <h3 className="text-xl font-semibold">Customer Details</h3>

        <input type="text" name="customerName" value={ProfileForm.customerName || ""} onChange={handleChange} placeholder="Customer Name" className="w-full p-2 border rounded" />
        <input type="text" name="customerAddress" value={ProfileForm.customerAddress || ""} onChange={handleChange} placeholder="Customer Address" className="w-full p-2 border rounded" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="customerCity" value={ProfileForm.customerCity || ""} onChange={handleChange} placeholder="Customer City" className="w-full p-2 border rounded" />
          <input type="text" name="customerState" value={ProfileForm.customerState || ""} onChange={handleChange} placeholder="Customer State" className="w-full p-2 border rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="customerCountry" value={ProfileForm.customerCountry || ""} onChange={handleChange} placeholder="Customer Country" className="w-full p-2 border rounded" />
          <input type="text" name="customerZipcode" value={ProfileForm.customerZipcode || ""} onChange={handleChange} placeholder="Customer Zipcode" className="w-full p-2 border rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="customerPhone" value={ProfileForm.customerPhone || ""} onChange={handleChange} placeholder="Customer Phone" className="w-full p-2 border rounded" />
          <input type="text" name="customerFax" value={ProfileForm.customerFax || ""} onChange={handleChange} placeholder="Customer Fax" className="w-full p-2 border rounded" />
        </div>
      </div>

      {/* Shipping Details */}
      <div className="border p-4 rounded space-y-4">
        <h3 className="text-xl font-semibold">Shipping Details</h3>

        <input type="text" name="shipName" value={ProfileForm.shipName || ""} onChange={handleChange} placeholder="Shipping Name" className="w-full p-2 border rounded" />
        <input type="text" name="shipAddress" value={ProfileForm.shipAddress || ""} onChange={handleChange} placeholder="Shipping Address" className="w-full p-2 border rounded" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="shipCity" value={ProfileForm.shipCity || ""} onChange={handleChange} placeholder="Shipping City" className="w-full p-2 border rounded" />
          <input type="text" name="shipState" value={ProfileForm.shipState || ""} onChange={handleChange} placeholder="Shipping State" className="w-full p-2 border rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="shipCountry" value={ProfileForm.shipCountry || ""} onChange={handleChange} placeholder="Shipping Country" className="w-full p-2 border rounded" />
          <input type="text" name="shipZipcode" value={ProfileForm.shipZipcode || ""} onChange={handleChange} placeholder="Shipping Zipcode" className="w-full p-2 border rounded" />
        </div>

        <input type="text" name="shipPhone" value={ProfileForm.shipPhone || ""} onChange={handleChange} placeholder="Shipping Phone" className="w-full p-2 border rounded" />
      </div>

      <button type="submit" disabled={isFormSubmit} className="w-full p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
        {isFormSubmit ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
};

export default ProfileForm;
