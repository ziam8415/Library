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
    const {
      name,
      author,
      status,
      description,
      quantity,
      price,
      category,
      image,
    } = data;

    try {
      const imageUrl = await imageUpload(image[0]);

      const bookData = {
        image: imageUrl,
        name,
        author,
        status,
        description,
        quantity: Number(quantity),
        price: Number(price),
        category,
        createdAt: Date.now(),
        seller: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };
      console.log(bookData);

      await mutateAsync(bookData);
      //reset();
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
        className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-10 space-y-10 border"
      >
        <h2 className="text-2xl font-semibold text-gray-900">Add New Book</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Book Name */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">Book Name</label>
            <input
              type="text"
              placeholder="Enter book name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-emerald-500"
              {...register("name", { required: "Book name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Author Name */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">Author</label>
            <input
              type="text"
              placeholder="Enter author name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-emerald-500"
              {...register("author", { required: "Author name is required" })}
            />
            {errors.author && (
              <p className="text-sm text-red-500">{errors.author.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">Price</label>
            <input
              type="number"
              placeholder="Price"
              className="w-full px-4 py-3 border rounded-lg focus:outline-emerald-500"
              {...register("price", { required: "Price is required" })}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              className="w-full px-4 py-3 border rounded-lg focus:outline-emerald-500"
              {...register("quantity", {
                required: "Quantity is required",
                min: 1,
              })}
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity.message}</p>
            )}
          </div>

          {/* Category (Optional) */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">Category</label>
            <select
              className="w-full px-4 py-3 border rounded-lg focus:outline-emerald-500"
              {...register("category")}
            >
              <option value="Novel">Novel</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Technology">Technology</option>
              <option value="Fantasy">Fantasy</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">Status</label>
            <select
              className="w-full px-4 py-3 border rounded-lg focus:outline-emerald-500"
              {...register("status", { required: "Status is required" })}
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-500">{errors.status.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1 md:col-span-2">
            <label className="block text-gray-700 font-medium">
              Description
            </label>
            <textarea
              placeholder="Write book description..."
              className="w-full h-32 px-4 py-3 border rounded-lg focus:outline-emerald-500"
              {...register("description")}
            ></textarea>
          </div>

          {/* Image */}
          <div className="space-y-1 md:col-span-2">
            <label className="block text-gray-700 font-medium">
              Book Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg p-3 cursor-pointer bg-gray-50"
              {...register("image", { required: "Book image is required" })}
            />
            {errors.image && (
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 transition text-white py-3 rounded-lg flex justify-center font-medium"
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
