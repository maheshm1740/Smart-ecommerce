"use client";

import { useEffect, useState } from "react";
import { getUserAddresses, deleteUserAddress, addUserAddress} from "../api/addressApi"
import { placeOrder } from "../api/orderApi"; 

export default function AddressModal({ userId, onClose, onOrderPlaced }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: "", city: "", pincode: "" });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    const res = await getUserAddresses(userId);
    setAddresses(res.data);
    if(res.data.length) setSelectedAddressId(res.data[0].id);
  };

  const handleDelete = async (id) => {
    await deleteUserAddress(userId, id);
    fetchAddresses();
  };

  const handleAddNew = async (e) => {
    e.preventDefault();
    await addUserAddress(userId, newAddress);
    setNewAddress({ street: "", city: "", pincode: "" });
    setShowForm(false);
    fetchAddresses();
  };

  const handlePlaceOrder = async () => {
    if(!selectedAddressId) return alert("Select an address!");
    await placeOrder(userId, selectedAddressId);
    onOrderPlaced(); // Notify parent
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl w-96 max-h-[80vh] overflow-auto">
        <h2 className="mb-4 text-xl font-bold">Select Delivery Address</h2>

        <div className="mb-4 space-y-2">
          {addresses.map(addr => (
            <div key={addr.id} className="flex items-center justify-between p-2 border rounded">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="address"
                  value={addr.id}
                  checked={selectedAddressId === addr.id}
                  onChange={() => setSelectedAddressId(addr.id)}
                />
                <span>{addr.street}, {addr.city}, {addr.pincode}</span>
              </label>
              <button className="text-sm text-red-500" onClick={() => handleDelete(addr.id)}>Delete</button>
            </div>
          ))}
        </div>

        {!showForm && (
          <button
            className="px-4 py-2 mb-4 text-white bg-green-500 rounded"
            onClick={() => setShowForm(true)}
          >
            Add New Address
          </button>
        )}

        {showForm && (
          <form className="mb-4 space-y-2" onSubmit={handleAddNew}>
            <input
              className="w-full px-2 py-1 border rounded"
              placeholder="Street"
              value={newAddress.street}
              onChange={e => setNewAddress({...newAddress, street: e.target.value})}
              required
            />
            <input
              className="w-full px-2 py-1 border rounded"
              placeholder="City"
              value={newAddress.city}
              onChange={e => setNewAddress({...newAddress, city: e.target.value})}
              required
            />
            <input
              className="w-full px-2 py-1 border rounded"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={e => setNewAddress({...newAddress, pincode: e.target.value})}
              required
            />
            <div className="flex justify-between">
              <button className="px-4 py-2 text-white bg-blue-500 rounded" type="submit">
                Save
              </button>
              <button className="px-4 py-2 bg-gray-300 rounded" type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Close</button>
          <button className="px-4 py-2 text-white bg-blue-600 rounded" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
}
