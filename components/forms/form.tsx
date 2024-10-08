"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { TBlogResponse, TCreateBlog } from "@/services/blog/blog.type";
import { Blog } from "@/services/blog";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

// Function to transform the first letter to uppercase
const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const BlogSchema = yup.object({
  userId: yup.number().required(),
  title: yup.string()
})

// Define schema
const userSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required.")
    .test(
      "is-uppercase",
      "First letter must be uppercase",
      (value) =>
        value ? value.charAt(0) === value.charAt(0).toUpperCase() : false
    )
    .min(3, "Must be minimum 3 characters")
    .max(20, "Must be maximum 20 characters"),
  lastName: yup
    .string()
    .required("Last name is required.")
    .test(
      "is-uppercase",
      "First letter must be uppercase",
      (value) =>
        value ? value.charAt(0) === value.charAt(0).toUpperCase() : false
    )
    .min(3, "Must be minimum 3 characters")
    .max(20, "Must be maximum 20 characters"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required.")
    .min(8, "Must be minimum 8 characters"),
});

// Mock function to simulate data saving (in-memory, no localStorage)
const saveData = (newData: FormData): Promise<FormData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newData);
    }, 1000); // Simulate delay
  });
};

export default function Form() {
  const [submittedDataList, setSubmittedDataList] = useState<FormData[]>([]);
  const [clickCount, setClickCount] = useState(0); // State to manage button click count

  // Initialize form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(BlogSchema),
    mode: "all", // Validate on change (while typing)
    defaultValues: {
      userId: 0,
      title:"",
    },
  });

  // Use mutation to handle form submission
  const {
    mutate: mutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: FormData) => saveData(data),
    mutationKey: ["login"],
    onSuccess: (data) => {
      setSubmittedDataList((prevData) => [...prevData, data]);
      reset(); // Reset the form after successful submission
    },
    onError: (error: any) => {
      console.error("Error submitting data:", error);
    },
  });

  const createBlog = useMutation<TBlogResponse, Error, TCreateBlog>({
    mutationKey: ["Create-Blog"],
    mutationFn: (variable) => Blog.createBlog(variable),
    onSuccess: (res) => {
      res.title
    },
    onError: (err : any) => {
      console.log(err?.response?.data?.id)
    }
  })

  const onSubmitCreateBlog = async ( data : any) => {
    await createBlog.mutateAsync(data)
  }

  // On form submission, call the mutation
  const onSubmit = (data: FormData) => {
    // Capitalize the first letter of each input before submitting
    data.firstName = capitalizeFirstLetter(data.firstName);
    data.lastName = capitalizeFirstLetter(data.lastName);
    data.email = capitalizeFirstLetter(data.email);

    mutation(data);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="font-semibold m-4 text-2xl">FORM</h1>
      <form
        onSubmit={handleSubmit(onSubmitCreateBlog)} // Handle form submission
      
        className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-md"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            userId
          </label>
          <Controller
            name="userId"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  type="number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  disabled={isSubmitting} // Use isSubmitting state
                />
                {errors.userId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.userId.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            tittle
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  disabled={isSubmitting} 
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          disabled={isPending || isSubmitting} 
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-1">Error: {error.message}</p>
        )}
      </form>

      {/* Conditionally render the FORM DATA heading */}
      {submittedDataList.length > 0 && (
        <div className="m-8 w-full max-w-md space-y-4">
          <h1 className="font-semibold m-4 text-2xl text-center">FORM DATA</h1>
          {submittedDataList.map((submittedData, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="font-semibold text-xl mb-4">
                Submitted Data {index + 1}
              </h2>
              <p>
                <strong>First Name:</strong> {submittedData.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {submittedData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {submittedData.email}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
