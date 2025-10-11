import { z } from "zod";

export const brandSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number too long"),
  website: z.string().url("Please enter a valid URL").optional(),
  logoUrl: z.string().url("Please enter a valid image URL").optional(),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters")
    .optional(),
  category: z.string().min(2, "Category is required"),
  location: z.string().min(2, "Location is required"),
  sublocation: z.string().min(2, "Sublocation is required"),
});

// ✅ Export type for TypeScript usage
export type BrandFormData = z.infer<typeof brandSchema>;
