import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandSchema } from "../schemas/branform";
import type { BrandFormData } from "../schemas/branform";
import axios from "axios";
import { Link } from "react-router-dom";
export default function BrandForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      website: "",
      logoUrl: "",
      description: "",
      category: "",
      location: "",
      sublocation: "",
    },
  });

  const onSubmit: SubmitHandler<BrandFormData> = async (data: BrandFormData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/brands/create-brand`,
      data);

      console.log(response.data);
      if(response.data.success == true) {
        window.location.href = `/verify?email=${data.email}`;
      }

    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Create Brand
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Fill in the details to register your brand
            </p>
             <p className="text-gray-600 text-center mt-2">
              Register your brand to get code and password
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Brand Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Enter brand name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email & Contact - Two columns on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="text"
                  {...register("contactNumber")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="+1234567890"
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>
            </div>

            {/* Website & Logo URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Website <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <input
                  type="url"
                  {...register("website")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="https://example.com"
                />
                {errors.website && (
                  <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Logo URL <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <input
                  type="url"
                  {...register("logoUrl")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="https://logo.png"
                />
                {errors.logoUrl && (
                  <p className="text-red-500 text-sm mt-1">{errors.logoUrl.message}</p>
                )}
              </div>
            </div>


            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Describe your brand and what makes it unique..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                {...register("category")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="e.g., Fashion, Technology, Food"
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Location & Sublocation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  {...register("location")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="City or Region"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sublocation
                </label>
                <input
                  type="text"
                  {...register("sublocation")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="District or Area"
                />
                {errors.sublocation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.sublocation.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create Brand
            </button>
            <Link to={"/verify"}>
              <button
          
            
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get My Code and Password 
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}