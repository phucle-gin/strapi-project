"use client";
import type { LinkProps, LogoProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { StrapiImage } from "../StrapiImage";
import { getBlogEntries } from "@/data/loaders";

interface HeaderProps {
  data: {
    logo: LogoProps;
    navigation: LinkProps[];
    cta: LinkProps;
  };
  blogPosts: any;
  events: any;
}

export function Header({ data, blogPosts, events }: HeaderProps) {
  const pathname = usePathname();
  const headerLight = pathname === "/experience";
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const posts = blogPosts?.data || [];
  const eventList = events?.data || [];
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const isMobileView = window.innerWidth <= 900;

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 900);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 900);
  }, []);

    useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
    }, [menuOpen]);
  
  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  if (!data) return null;

  const { logo, navigation, cta } = data;

  return (
    <header className={`header ${headerLight ? "header--light" : ""}`}>
      <Link href="/">
        <StrapiImage
          src={logo.image.url}
          alt={logo.image.alternativeText || "No alternative text provided"}
          className="header__logo"
          width={120}
          height={120}
        />
      </Link>

      {!isMobile && (
        <>
          <ul className="header__nav">
            {navigation.map((item) => {
              const isDropdownLink = item.href === "/blog" || item.href === "/events";
              return (
                <li
                  key={item.id}
                  className={`nav-item ${isDropdownLink ? "has-dropdown" : ""}`}
                >
                  <Link href={item.href} target={item.isExternal ? "_blank" : "_self"}>
                    <div className="nav-link-with-arrow">
                      <h5>{item.text}</h5>
                      {isDropdownLink && (
                        <svg
                          className="dropdown-arrow"
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                        >
                          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                      )}
                    </div>
                  </Link>

                  {isDropdownLink && (
                    <ul className="dropdown-menu">
                      {item.href === "/blog" &&
                        posts.map((post: any) => (
                          <li key={post.id}>
                            <Link href={`/blog/${post.slug}`}>
                              <span>{post.title}</span>
                            </Link>
                          </li>
                        ))}
                      {item.href === "/events" &&
                        eventList.map((event: any) => (
                          <li key={event.id}>
                            <Link href={`/events/${event.slug}`}>
                              <span>{event.title}</span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {cta && (
            <Link href={cta.href} target={cta.isExternal ? "_blank" : "_self"}>
              <button className="btn btn--black btn--small">{cta.text}</button>
            </Link>
          )}
        </>
      )}

      {isMobile && (
        <>
          <button
            className={`burger-menu ${menuOpen ? "open" : ""}`}
            aria-label="Toggle menu"
            ref={burgerRef}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="burger-icon" width="24" height="24" viewBox="0 0 24 24">
                {menuOpen ? (
                <path className="icon-path" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path className="icon-path" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>

          <div ref={menuRef} className={`mobile-menu ${menuOpen ? "open" : ""}`}>
            <ul className="mobile-menu__nav">
              {navigation.map((item) => {
                const isDropdownLink = item.href === "/blog" || item.href === "/events";
                return (
                  <li key={item.id}>
                    {isDropdownLink ? (
                      <>
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                        >
                          <h5>{item.text}</h5>
                        </Link>
                        <ul className="mobile-submenu">
                          {item.href === "/blog" &&
                            posts.map((post: any) => (
                              <li key={post.id}>
                                <Link
                                  href={`/blog/${post.slug}`}
                                  onClick={() => setMenuOpen(false)}
                                >
                                  <span>{post.title}</span>
                                </Link>
                              </li>
                            ))}
                          {item.href === "/events" &&
                            eventList.map((event: any) => (
                              <li key={event.id}>
                                <Link
                                  href={`/events/${event.slug}`}
                                  onClick={() => setMenuOpen(false)}
                                >
                                  <span>{event.title}</span>
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        target={item.isExternal ? "_blank" : "_self"}
                      >
                        <h5>{item.text}</h5>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            {cta && (
              <div className="mobile-menu__cta">
                <Link
                  href={cta.href}
                  onClick={() => setMenuOpen(false)}
                  target={cta.isExternal ? "_blank" : "_self"}
                >
                  <button className="btn btn--black btn--small">{cta.text}</button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}

    </header>
  );
}
