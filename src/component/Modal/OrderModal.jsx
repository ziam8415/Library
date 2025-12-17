import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

const OrderModal = ({ book, onClose, onSuccessOrder }) => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (orderData) =>
      axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData),

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
    /* BACKDROP */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      {/* MODAL CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-2xl bg-white  shadow-2xl p-6"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 "
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white">
          Place Order for "{book.name}"
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              value={user.displayName}
              readOnly
              className="w-full px-4 py-2 rounded-lg  border"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              value={user.email}
              readOnly
              className="w-full px-4 py-2 rounded-lg  border"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              {...register("phone", { required: "Phone number is required" })}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition font-medium"
          >
            {isPending ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default OrderModal;
