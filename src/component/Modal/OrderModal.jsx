import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const OrderModal = ({ book, onClose, onSuccessOrder }) => {
  const { user } = useAuth();
  //console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (orderData) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData),

    onSuccess: (res) => {
      toast.success("Order placed successfully!");
      onClose();
      onSuccessOrder(res.data);
    },

    onError: () => toast.error("Failed to place order."),
  });

  const onSubmit = async (data) => {
    const orderPayload = {
      bookId: book._id,
      bookName: book.name,
      image: book.image,
      price: book.price,
      customerName: user.displayName,
      customerEmail: user.email,
      phone: data.phone,
      address: data.address,
      status: "pending",
      paymentStatus: "unpaid",
      sellerEmail: book.seller.email,
      createdAt: Date.now(),
    };

    await mutateAsync(orderPayload);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">
          Place Order for "{book.name}"
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              value={user.displayName}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              {...register("phone", { required: "Phone number is required" })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Address</label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="w-full px-4 py-2 border rounded-lg"
            ></textarea>
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition flex justify-center"
            disabled={isPending}
          >
            {isPending ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
