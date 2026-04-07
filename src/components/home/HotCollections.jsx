import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "jquery";
window.$ = window.jQuery = require("jquery");

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        const data = await response.json();
        setCollections(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const owlOptions = {
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 3 },
      1200: { items: 4 },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            // Skeleton Loading State
            <>
              {new Array(4).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      {/* Image Skeleton */}
                      <div
                        className="skeleton-box"
                        style={{ width: "100%", height: "200px" }}
                      ></div>
                    </div>
                    <div className="nft_coll_pp">
                      {/* Profile Picture Skeleton */}
                      <div
                        className="skeleton-box"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      ></div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      {/* Title & Code Skeletons */}
                      <div
                        className="skeleton-box"
                        style={{ width: "100px", height: "20px" }}
                      ></div>
                      <br />
                      <div
                        className="skeleton-box"
                        style={{
                          width: "60px",
                          height: "15px",
                          marginTop: "5px",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : collections.length > 0 ? (
            // Actual Content State
            <div className="col-lg-12">
              <OwlCarousel className="owl-theme" {...owlOptions}>
                {collections.map((collection, index) => (
                  <div className="nft_coll" key={collection.id || index}>
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt="Author"
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          ) : (
            <div className="col-lg-12 text-center">No collections found.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
