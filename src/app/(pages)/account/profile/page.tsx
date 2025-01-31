"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config"; // Replace with your Firebase config
import { toast } from "react-toastify";

interface ProfileFormInputs {
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  state: string;
}

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormInputs>();
  const [isEditProfile, setIsEditProfile] = useState(false);
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, "users", user.uid); // Firestore document path
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data() as ProfileFormInputs;
            reset(userData); // Pre-fill the form with user data
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<ProfileFormInputs> = async (data) => {
    try {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, data, { merge: true }); // Update Firestore document
        toast.success("Profile updated successfully!", {
          hideProgressBar: true,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-10 mt-10">
      <h1 className="text-2xl font-bold mb-4"> Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex gap-x-4">
          <div className="mb-4 grow">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required." })}
              className={`mt-1 h-10 block w-full rounded-md border-gray-300 border pl-3 focus:ring-primary focus:border-primary sm:text-sm ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4 grow">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required." })}
              disabled
              className="mt-1 h-10 pl-3 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex gap-x-4">
          <div className="mb-4 grow">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              type="text"
              {...register("phone", {
                required: "Phone number is required.",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Phone number must be 10 digits.",
                },
              })}
              className={`mt-1 h-10 block w-full rounded-md border-gray-300 border pl-3 focus:ring-primary focus:border-primary sm:text-sm ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div className="mb-4 grow">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              {...register("address", {
                required: "Address is required.",
              })}
              className={`mt-1 h-10 block w-full rounded-md border-gray-300 border pl-3 focus:ring-primary focus:border-primary sm:text-sm ${
                errors.address ? "border-red-500" : ""
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-x-4">
          <div className="mb-4 basis-1/2">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              id="country"
              disabled
              type="text"
              {...register("country", { required: "Country is required." })}
              className={`mt-1 h-10 block w-full rounded-md border-gray-300 border pl-3 focus:ring-primary focus:border-primary sm:text-sm ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>
          <div className="mb-4 basis-1/2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>

            <select
              id="state"
              {...register("state", { required: "State is required" })}
              className={`mt-1 h-10 block w-full rounded-md border-gray-300 border pl-3 focus:ring-primary focus:border-primary sm:text-sm ${
                errors.name ? "border-red-500" : ""
              }`}
            >
              <option value="">Select a state</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
              <option value="Dubai">Dubai</option>
              <option value="Sharjah">Sharjah</option>
              <option value="Ajman">Ajman</option>
              <option value="Umm Al Quwain">Umm Al Quwain</option>
              <option value="Fujairah">Fujairah</option>
              <option value="Ras Al Khaimah">Ras Al Khaimah</option>
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          {isEditProfile ? (
            <button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className={`my-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary bg-[#082e21]`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditProfile(true)}
              className={`my-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary bg-[#082e21]`}
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
