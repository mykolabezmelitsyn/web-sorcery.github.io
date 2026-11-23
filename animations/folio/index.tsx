import React, { useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CONFIG, type FolioConfig } from "./config";
import { imageUrl, items, type FolioItem } from "./items";
import { createReel, type Reel } from "./reel";
import "./folio.css";

gsap.registerPlugin(useGSAP);

function Photo({ item }: { item: FolioItem }) {
  const style = { objectPosition: item.imagePosition ?? "center" };
  return item.videoSrc ? (
    <video
      muted
      loop
      playsInline
      preload="metadata"
      src={item.videoSrc}
      style={style}
      aria-label={item.alt}
    />
  ) : (
    <img
      src={imageUrl(item)}
      width="900"
      height="1125"
      alt={item.alt}
      style={style}
      draggable="false"
    />
  );
}

function Detail({ item, contact }: { item: FolioItem; contact: string }) {
  const rows = [
    ["Client", item.client],
    ["Year", item.year],
    ["Industry", item.industry],
    ["Discipline", item.discipline],
  ];
  return (
    <section
      className="folio-detail"
      role="dialog"
      aria-modal="true"
      aria-labelledby="folio-detail-title"
    >
      <div className="folio-scrim" data-detail-scrim data-folio-close />
      <div className="folio-detail-scroll" data-no-wheel>
        <div className="folio-detail-copy">
          <button
            type="button"
            className="folio-back"
            data-folio-close
            data-detail-reveal
          >
            ← Back
          </button>
          <h2
            id="folio-detail-title"
            className="folio-title folio-detail-title"
          >
            {item.title}
          </h2>
          <p className="folio-summary" data-detail-reveal>
            {item.summary}
          </p>
          <dl className="folio-meta" data-detail-reveal>
            {rows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="folio-review" data-detail-reveal>
            <p className="folio-rating">
              <span className="folio-stars" aria-hidden="true">
                ☆☆☆☆☆
                <span style={{ width: `${item.rating * 20}%` }}>★★★★★</span>
              </span>
              <span>
                {item.rating.toFixed(1)} / 5 · {item.reviewCount} sample reviews
              </span>
            </p>
            {item.awards?.length ? <p>{item.awards.join(" · ")}</p> : null}
            <blockquote>
              “{item.reviewQuote}”<cite>{item.reviewer}</cite>
            </blockquote>
          </div>
          <div className="folio-contact" data-detail-reveal>
            <a href={contact}>
              Hire us for your next one <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="folio-detail-media">
          <div className="folio-photo folio-detail-photo" data-detail-image>
            <Photo item={item} />
          </div>
          <button
            type="button"
            className="folio-close"
            data-folio-close
            data-detail-reveal
            aria-label="Close project"
          >
            ✕
          </button>
        </div>
      </div>
    </section>
  );
}

function Folio({
  config,
  expose,
}: {
  config: FolioConfig;
  expose: (api: Reel) => void;
}) {
  const section = useRef<HTMLElement>(null);
  const api = useRef<Reel | null>(null);
  const [detail, setDetail] = useState<number | null>(null);
  const archive = Array.from(
    { length: items.length * config.copies },
    (_, index) => items[index % items.length],
  );

  useGSAP(
    () => {
      const root = section.current;
      if (!root) return;
      const reel = createReel(root, items.length, config, setDetail);
      api.current = reel;
      expose(reel);
      return () => {
        reel.destroy();
        api.current = null;
      };
    },
    { scope: section },
  );

  useLayoutEffect(() => {
    if (detail !== null) api.current?.mountDetail();
  }, [detail]);

  return (
    <section
      className="folio"
      ref={section}
      aria-label="Project reel"
      tabIndex={0}
    >
      <div className="folio-reel">
        <div className="folio-counter" data-chrome aria-hidden="true">
          <span className="folio-current">01</span>
          <span className="folio-divider">/</span>
          <span>{String(items.length).padStart(2, "0")}</span>
          <span className="folio-hairline" />
        </div>
        <div className="folio-title-window">
          <div className="folio-title-entrance">
            <div className="folio-titles">
              {archive.map((item, index) => (
                <div key={index} className="folio-row" data-folio-title={index}>
                  <h3 className="folio-title">
                    <button type="button" tabIndex={-1}>
                      {item.title}
                    </button>
                  </h3>
                  <span className="folio-credit">
                    {item.client} · {item.discipline} · {item.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="folio-image-window">
          <div className="folio-image-entrance">
            <div className="folio-images">
              {archive.map((item, index) => (
                <div key={index} className="folio-slot">
                  <button
                    type="button"
                    className="folio-photo"
                    data-folio-photo={index}
                    aria-label={`View ${item.title}`}
                    tabIndex={-1}
                  >
                    <Photo item={item} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="folio-cursor" aria-hidden="true">
          <span>View</span>
        </div>
      </div>
      {detail !== null ? (
        <Detail item={items[detail]} contact={config.contact} />
      ) : null}
      <div className="folio-motion" aria-hidden="true" />
    </section>
  );
}

export function mountAnimation(
  container: HTMLElement,
  options: Partial<FolioConfig> = {},
) {
  const host = document.createElement("div");
  container.append(host);
  const root = createRoot(host);
  let reel: Reel | null = null;
  let destroyed = false;
  flushSync(() =>
    root.render(
      <Folio
        config={{ ...CONFIG, ...options }}
        expose={(api) => {
          reel = api;
        }}
      />,
    ),
  );
  return {
    play: () => reel?.play(),
    pause: () => reel?.pause(),
    destroy() {
      if (destroyed) return;
      destroyed = true;
      root.unmount();
      host.remove();
      reel = null;
    },
  };
}

const root = document.querySelector<HTMLElement>("#animation-root");
if (root) mountAnimation(root);
