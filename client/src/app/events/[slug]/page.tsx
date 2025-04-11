import type { ArticleProps, Block } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentBySlug } from "@/data/loaders";

import { BlockRenderer } from "@/components/BlockRenderer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { Card, type CardProps } from "@/components/Card";
import { ContentList } from "@/components/ContentList";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function loader(slug: string) {
  const { data } = await getContentBySlug(slug, "/api/events");
  const article = data[0];
  if (!article) throw notFound();
  return { article: article as ArticleProps, blocks: article?.blocks };
}

interface ArticleOverviewProps {
  headline: string;
  description: string;
  tableOfContent: { heading: string; linkId: string }[];
}

function ArticleOverview({
  headline,
  description,
  tableOfContent,
}: Readonly<ArticleOverviewProps>) {
  return (
    <div className="article-overview">
      <div className="article-overview__info">
        <h3 className="article-overview__headline">{headline}</h3>
        <p className="article-overview__description">{description}</p>
      </div>
      {tableOfContent && (
        <ul className="article-overview__contents">
          {tableOfContent.map((item, index) => (
            <li key={index}>
              <Link href={`#${item.linkId}`} className="article-overview__link">
                {index + 1}. {item.heading}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const EventCard = (props: Readonly<CardProps>) => <Card {...props} basePath="events" />;


export default async function SingleBlogRoute({ params }: PageProps) {
  const slug = (await params).slug;
  const { article, blocks } = await loader(slug);
  const { title, author, publishedAt, description, image } = article;

  console.dir(blocks, { depth: null });

  const tableOfContent = blocks?.filter(
    (block: Block) => block.__component === "blocks.heading"
  );

  return (
    <div>
      <HeroSection
        id={article.id}
        heading={title}
        theme="orange"
        image={image}
        darken={true}
      />

      <div className="container">
        <ArticleOverview
          headline={title}
          description={description}
          tableOfContent={tableOfContent}
        />
        <BlockRenderer blocks={blocks} />
        <ContentList
          headline="Related events"
          path="/api/events"
          component={EventCard}
          featured={true}
        />
      </div>
    </div>
  );
}
