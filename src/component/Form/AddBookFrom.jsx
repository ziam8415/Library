import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";

const AddBookForm = () => {
  const { user } = useAuth();

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/books`, payload),

    onSuccess: () => {
      toast.success("Book added successfully!");
      mutationReset();
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, description, quantity, price, category, image } = data;

    try {
      const imageUrl = await imageUpload(image[0]);

      const bookData = {
        image: imageUrl,
        name,
        description,
        quantity: Number(quantity),
        price: Number(price),
        category,
        seller: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      await mutateAsync(bookData);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="w-full min-h-[calc(100vh-60px)] flex justify-center items-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white shadow-md rounded-xl p-10 space-y-10 border"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Book
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Book Name */}
          <div className="space-y-1">
            <label className="block text-gray-700">Book Name</label>
            <input
              type="text"
              placeholder="Enter book name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-indigo-500"
              {...register("name", {
                required: "Book name is required",
                maxLength: 40,
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="block text-gray-700">Category</label>
            <select
              className="w-full px-4 py-3 border rounded-lg focus:outline-indigo-500"
              {...register("category", { required: "Category is required" })}
            >
              <option value="Novel">Novel</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Fantasy">Fantasy</option>
            </select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-1">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              placeholder="Price"
              className="w-full px-4 py-3 border rounded-lg focus:outline-indigo-500"
              {...register("price", { required: "Price is required" })}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-1">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              className="w-full px-4 py-3 border rounded-lg focus:outline-indigo-500"
              {...register("quantity", {
                required: "Quantity is required",
                min: 1,
              })}
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1 md:col-span-2">
            <label className="block text-gray-700">Description</label>
            <textarea
              placeholder="Write book description..."
              className="w-full h-32 px-4 py-3 border rounded-lg focus:outline-indigo-500"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div className="space-y-1 md:col-span-2">
            <label className="block text-gray-700">Book Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg p-3 cursor-pointer bg-gray-50"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-lg flex justify-center"
        >
          {isPending ? (
            <TbFidgetSpinner className="animate-spin text-2xl" />
          ) : (
            "Add Book"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
