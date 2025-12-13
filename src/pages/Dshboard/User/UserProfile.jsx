import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../utils";
import useRole from "../../../hooks/useRole";

const UserProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [role, isRoleLoading] = useRole();
  console.log(role);
  const [loading, setLoading] = useState(false);

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

      // upload new image if selected
      if (data.image?.length > 0) {
        photoURL = await imageUpload(data.image[0]);
      }

      await updateUserProfile(data.name, photoURL);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

      {/* Profile Card */}
      <div className="bg-white shadow rounded-xl p-6 mb-6 flex items-center gap-6">
        <img
          src={user?.photoURL || "https://i.ibb.co/2FsfXqM/user.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div>
          <h3 className="text-xl font-medium">
            {user?.displayName || "No Name"}
          </h3>
          <p className="text-gray-500">{user?.email}</p>
          <p className="text-gray-500">Role: {role}</p>
        </div>
      </div>

      {/* Update Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow rounded-xl p-6 space-y-6"
      >
        <h3 className="text-lg font-semibold">Update Profile</h3>

        {/* Name */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg focus:outline-emerald-500"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-medium">
            Profile Image
          </label>

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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 transition text-white py-3 rounded-lg flex justify-center font-medium disabled:opacity-60"
        >
          {loading ? (
            <TbFidgetSpinner className="animate-spin text-2xl" />
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
