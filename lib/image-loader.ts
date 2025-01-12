import { type CloudinaryLoaderProps } from "@/types/game"

const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL;

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: CloudinaryLoaderProps): string {
  const params = ["f_auto", "c_scale", `w_${width}`, `q_${quality || 80}`];

  return `${CLOUDINARY_BASE_URL}/${params.join(",")}/2048/${src}`;
}