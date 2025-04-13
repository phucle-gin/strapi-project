import { ImageProps } from "@/types";

import Link from "next/link";
import { StrapiImage } from "./StrapiImage";

export interface CardProps {
  documentId: string;
  title: string;
  description: string;
  slug: string;
  image: ImageProps;
  basePath: string;
}

export function Card({
  title,
  description,
  slug,
  image,
  basePath,
}: Readonly<CardProps>) {
  return (
    <Link href={`/${basePath}/${slug}`} className="content-items__card">
      {image?.url && (
        <div className="content-items__card-img">
          <StrapiImage
            src={image.url}
            alt={image.alternativeText || "No alternative text provided"}
            width={400}
            height={400}
          />
        </div>
      )}
      <div className="content-items__card-text">
        <h5>{title}</h5>
        <p>{description.slice(0, 144)}...</p>
      </div>
    </Link>
  );
}
