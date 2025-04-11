import React from "react";
import { getStrapiURL } from "@/utils/get-strapi-url";

interface StrapiMediaProps {
  src: string;
  alt?: string;  // Optional for videos, etc.
  type: "video" | "audio" | "image";  // To specify what type of media it is
  className?: string;
  [key: string]: string | number | boolean | undefined;
}

export function StrapiMedia({
  src,
  alt,
  type,
  className,
  ...rest
}: Readonly<StrapiMediaProps>) {
  const mediaUrl = getStrapiMedia(src); // Use the same getStrapiMedia function
  
  if (!mediaUrl) return null; // If no media URL, return null

  if (type === "video") {
    return (
      <video controls className={className} {...rest}>
        <source src={mediaUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (type === "audio") {
    return (
      <audio controls className={className} {...rest}>
        <source src={mediaUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    );
  }

  // Default for image or other media
  return <img src={mediaUrl} alt={alt} className={className} {...rest} />;
}
export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return getStrapiURL() + url;
}