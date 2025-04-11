import ReactMarkdown from "react-markdown";
import { StrapiMedia } from "../StrapiMedia"; 
import { ParagraphWithMediaProps } from "@/types";

export function ParagraphWithMedia({
  content,
  media,
  youtubeUrl,
  reversed,
  imageLandscape,
}: Readonly<ParagraphWithMediaProps>) {
  const isYouTube = !!youtubeUrl;  // Check if YouTube URL is present
  const isVideo = media?.mime?.startsWith("video");  // Check if media is a video
  const isAudio = media?.mime?.startsWith("audio");  // Check if media is an audio file
  const isImage = media?.mime?.startsWith("image");  // Check if media is an image
  const hasText = !!content?.trim();
  const hasMedia = isYouTube || isVideo || isAudio || isImage;
  const layoutClass = !hasMedia
    ? "article-text-image--no-media"
    : !hasText
    ? "article-text-image--no-text"
    : "";
  return (
  <div
    className={`article-text-image ${
        reversed ? "article-text-image--reversed" : ""
      } ${imageLandscape ? "" : "article-text-image--portrait"} ${layoutClass}`}
    >
      {hasText && (
        <ReactMarkdown className="copy article-text-image__text article-paragraph">
          {content}
        </ReactMarkdown>
      )}

      {hasMedia && (
        <div className="article-text-image__container">
          {isYouTube ? (
            <div className="article-text-image__video-wrapper">
              <iframe
                src={youtubeUrl?.replace("watch?v=", "embed/")}
                title="YouTube Video"
                allowFullScreen
                className="article-text-image__video"
                width="100%"
              ></iframe>
            </div>
          ) : (
            <StrapiMedia
              src={media?.url || ""}
              alt={media?.alternativeText || "No alternative text provided"}
              type={isVideo ? "video" : isAudio ? "audio" : "image"}
              className="article-text-image__media"
            />
          )}
        </div>
      )}
    </div>
  );
}
