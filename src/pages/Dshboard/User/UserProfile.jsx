import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { FiEdit, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../utils";
import useRole from "../../../hooks/useRole";

const UserProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [role] = useRole();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let photoURL = user?.photoURL;

      if (data.image?.length > 0) {
        photoURL = await imageUpload(data.image[0]);
      }

      await updateUserProfile(data.name, photoURL);
      toast.success("Profile updated successfully!");
      setIsModalOpen(false);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        👤 My Profile
      </h2>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <img
          src={user?.photoURL || "https://i.ibb.co/2FsfXqM/user.png"}
          alt="Profile"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-md"
        />

        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold">
            {user?.displayName || "No Name"}
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">{user?.email}</p>

          {/* Role Badge */}
          <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-emerald-100 text-emerald-700 capitalize">
            {role || "user"}
          </span>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition text-sm sm:text-base mt-3 sm:mt-0"
        >
          <FiEdit />
          Update Profile
        </button>
      </div>

      {/* Update Profile Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative"
            >
              {/* Close */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FiX size={22} />
              </button>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                ✏️ Update Profile
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border focus:outline-emerald-500 text-sm sm:text-base"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Image */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full p-3 rounded-lg border bg-gray-50 text-sm sm:text-base"
                    {...register("image")}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Leave empty to keep current image
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium flex justify-center items-center disabled:opacity-60 text-sm sm:text-base"
                >
                  {loading ? (
                    <TbFidgetSpinner className="animate-spin text-2xl" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;
