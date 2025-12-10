import { useForm } from "react-hook-form";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../utils";
import LoadingSpinner from "../../../component/Shared/LoadingSpinner";
import { useEffect } from "react";

const EditBook = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  /**  Fetch the existing book data */
  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });

  /**  React Hook Form */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /**  Prefill form after data loads (FIXED) */
  useEffect(() => {
    if (book) {
      reset({
        name: book.name,
        author: book.author,
        price: book.price,
        quantity: book.quantity,
        category: book.category,
        status: book.status,
        description: book.description,
      });
    }
  }, [book, reset]);

  /**  Mutation for update */
  const { mutateAsync, isPending: isUpdating } = useMutation({
    mutationFn: async (payload) =>
      await axios.put(`${import.meta.env.VITE_API_URL}/books/${id}`, payload),

    onSuccess: () => {
      toast.success("Book updated successfully!");
    },

    onError: () => {
      toast.error("Update failed!");
    },
  });

  const onSubmit = async (data) => {
    try {
      let imageUrl = book.image; // keep old image

      if (data.image?.length > 0) {
        imageUrl = await imageUpload(data.image[0]);
      }

      const updatedData = {
        name: data.name,
        author: data.author,
        price: Number(data.price),
        quantity: Number(data.quantity),
        category: data.category,
        status: data.status,
        description: data.description,
        image: imageUrl,
      };

      await mutateAsync(updatedData);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="w-full min-h-[calc(100vh-60px)] flex justify-center items-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-10 space-y-10 border"
      >
        <h2 className="text-2xl font-semibold text-gray-900">
          Edit Book — {book.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Book Name */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">Book Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg focus:outline-emerald-500"
              {...register("name", { required: "Book name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Author */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">Author</label>
            <input
              type="text"
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
              className="w-full px-4 py-3 border rounded-lg focus:outline-emerald-500"
              {...register("price")}
            />
          </div>

          {/* Quantity */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">Quantity</label>
            <input
              type="number"
              className="w-full px-4 py-3 border rounded-lg focus:outline-emerald-500"
              {...register("quantity")}
            />
          </div>

          {/* Category */}
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
              {...register("status")}
            >
              <option value="Available">Published</option>
              <option value="Out of Stock">Unpublished</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-1 md:col-span-2">
            <label className="block text-gray-700 font-medium">
              Description
            </label>
            <textarea
              className="w-full h-32 px-4 py-3 border rounded-lg focus:outline-emerald-500"
              {...register("description")}
            />
          </div>

          {/* Image */}
          <div className="space-y-1 md:col-span-2">
            <label className="block text-gray-700 font-medium">
              Book Image
            </label>

            <img
              src={book.image}
              alt=""
              className="w-32 h-40 object-cover rounded mb-3 border"
            />

            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg p-3 cursor-pointer bg-gray-50"
              {...register("image")}
            />

            <p className="text-gray-500 text-sm">
              Leave empty to keep the current image.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 transition text-white py-3 rounded-lg flex justify-center font-medium"
        >
          {isUpdating ? (
            <TbFidgetSpinner className="animate-spin text-2xl" />
          ) : (
            "Update Book"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
