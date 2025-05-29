"use client";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa6";
import StarRatings from "react-star-ratings";
import { db } from "../firebase/config";
import { toast } from "react-toastify";

type Reviews = {
  avgRating: number;
  rating: number;
  reviews: any;
  productImg: string;
  title: string;
  productId: string;
};
type FormData = {
  name: string;
  email: string;
  reviewText: string;
};

const CustomerReviews = ({
  title,
  productImg,
  reviews,
  avgRating,
  rating,
  productId,
}: Reviews) => {
  const [customerReviews, setCustomerReviews] = useState<any>([]);
  const [initialValue, setInitialValue] = useState(5);
  const [ratings, setRatings] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [rate, setRate] = useState(5);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {

    if (reviews && reviews?.length > 0) {
      const ratingCounts = [0, 0, 0, 0, 0];
      reviews.forEach((review: any) => {
        const { rating } = review;
        if (rating >= 1 && rating <= 5) {
          ratingCounts[rating - 1]++;
        }
      });
      const total = ratingCounts.reduce((a, b) => a + b, 0);
      const rating = ratingCounts
        .map((count, i) => ({
          stars: 1 + i,
          count,
          percent: total ? Math.round((count / total) * 100) : 0,
        }))
        .reverse();

      setRatings(rating);
      setInitialValue(avgRating);
    }
    setCustomerReviews(reviews);
  }, [reviews]);

  const onSubmit = async (data: FormData) => {
    try {
      const docRef = doc(collection(db, "reviews"));

      await setDoc(docRef, {
        id: docRef.id,
        ...data,
        rating: rate,
        productId: productId,
        timestamp: serverTimestamp(),
        status: false, // optional: use if you're filtering published reviews
      });
      reset();
      setOpen(false);
      toast.success("Review Submitted");
    } catch (err) {
      console.error("Error adding review: ", err);
    }
  };

  return (
    <div className="sm:px-20 w-full">
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Write Your Review</h2>
            <div className="flex gap-x-3 items-center">
              <img
                src={productImg}
                className="size-20 object-cover rounded-lg"
              />
              <h1 className="bold text-lg">{title}</h1>
            </div>

            <div className="flex justify-center my-4">
              <StarRatings
                rating={rate}
                changeRating={(e) => setRate(e)}
                starRatedColor="#ffe234"
                starHoverColor="#ffe234"
                //   changeRating={(e) => setInitialValue(e)}
                numberOfStars={5}
                name="rate"
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  {...register("name", { required: true })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  placeholder="Your name"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">Name is required</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  placeholder="Your email"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    Email is required
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Review</label>
                <textarea
                  {...register("reviewText", { required: true })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  placeholder="Write your review..."
                />
                {errors.reviewText && (
                  <span className="text-red-500 text-sm">
                    Review is required
                  </span>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="border p-3 sm:p-6">
        <div className="flex justify-between ">
          <h1 className="text-xl sm:text-3xl text-primary bold">
            Customer Reviews{" "}
          </h1>
          <button
            className="rounded-full text-sm bg-primary text-white p-2"
            onClick={() => setOpen(true)}
          >
            Write review
          </button>
        </div>
        {reviews && reviews.length > 0 && (
          <>
            <div className="flex flex-wrap gap-10">
              <div className="flex basis-full sm:basis-1/3 flex-col">
                <div className="text-2xl">
                  <span className="bold text-3xl">{avgRating}</span> / 5
                </div>
                <StarRatings
                  rating={avgRating}
                  starRatedColor="#ffe234"
                  starHoverColor="#ffe234"
                  //   changeRating={(e) => setInitialValue(e)}
                  numberOfStars={5}
                  name="rating"
                  starSpacing="3px"
                  starDimension="23"
                />
                <h1>
                  Based On {rating} {rating === 1 ? "review" : "reviews"}
                </h1>
              </div>
              <div className="border space-y-2 w-full max-w-md">
                {ratings &&
                  ratings.map(
                    ({
                      stars,
                      percent,
                      count,
                    }: {
                      stars: any;
                      percent: any;
                      count: any;
                    }) => (
                      <div key={stars} className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < stars ? "text-yellow-400" : "text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                        <div className="flex text-sm text-gray-600 w-14 text-right">
                          {percent}% <span className="ml-1">({count})</span>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
            <div className="h-1 border-b my-3 w-full border-bg-gray-300" />
            <div className="flex flex-wrap gap-4">
              {customerReviews?.length > 0 &&
                customerReviews?.map((review: any) => (
                  <div
                    key={review.id}
                    className="basis-full sm:basis-[30%]  border p-2 "
                  >
                    <h1 className="text-primary bold">{review.name}</h1>
                    <div className="bg-primary inline px-[3px] text-sm rounded-sm text-white">
                      Verified
                    </div>
                    <div className="text-sm">
                      {new Date(review.timestamp).toLocaleDateString()}
                    </div>
                    <div className="bold text-lg text-gray-500">
                      {review.reviewText}
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerReviews;
