'use client'
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('FIRST NAME IS REQUIRED')
    .matches(/^[A-Z]/, 'FIRST LETTER MUST BE UPPERCASE'),
  lastName: yup
    .string()
    .required('LAST NAME IS REQUIRED')
    .matches(/^[A-Z]/, 'FIRST LETTER MUST BE UPPERCASE'),
  email: yup
    .string()
    .required('EMAIL IS REQUIRED')
    .matches(/@/, 'EMAIL MUST CONTAIN @')
    .email('EMAIL MUST BE VALID'),
  mobileNumber: yup
    .string()
    .required('MOBILE NUMBER IS REQUIRED')
    .matches(/^\d+$/, 'ONLY NUMBERS ARE ALLOWED')
    .min(10, 'MOBILE NUMBER MUST BE AT LEAST 10 DIGITS')
    .max(12, 'MOBILE NUMBER MUST BE AT MOST 12 DIGITS'),
});

export default function Form1() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // Validate on change (while typing)
  });

  const onSubmit = (data) => {
    console.log(data); // Log the form data to the console
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 m-4">
      <h1 className="font-semibold m-4 text-2xl text-center">FORM1</h1>

      <div>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="First name"
              className={`w-full p-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
          )}
        />
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
      </div>

      <div>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Last name"
              className={`w-full p-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
          )}
        />
        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
      </div>

      <div>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Email"
              className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
          )}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Controller
          name="mobileNumber"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Mobile number"
              className={`w-full p-2 border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
          )}
        />
        {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber.message}</p>}
      </div>

      <div>
        <Controller
          name="textarea"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Textarea"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          )}
        />
      </div>


      <input 
        type="submit" 
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer" 
      />
    </form>
  );
}
