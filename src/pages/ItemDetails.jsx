import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItemDetails = async () => {
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
        );
        const data = await response.json();
        setItem(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item details:", error);
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                // --- SKELETON LOADING STATE ---
                <>
                  {/* Left Column: Image Skeleton */}
                  <div className="col-md-6 text-center">
                    <div
                      className="skeleton-box"
                      style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "500px",
                        borderRadius: "8px",
                      }}
                    ></div>
                  </div>

                  {/* Right Column: Details Skeleton */}
                  <div className="col-md-6">
                    <div className="item_info">
                      {/* Title */}
                      <div
                        className="skeleton-box"
                        style={{
                          width: "80%",
                          height: "40px",
                          marginBottom: "20px",
                        }}
                      ></div>

                      {/* Views & Likes */}
                      <div className="item_info_counts">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "60px",
                            height: "30px",
                            marginRight: "10px",
                          }}
                        ></div>
                        <div
                          className="skeleton-box"
                          style={{ width: "60px", height: "30px" }}
                        ></div>
                      </div>

                      {/* Description */}
                      <div
                        className="skeleton-box"
                        style={{
                          width: "100%",
                          height: "80px",
                          marginTop: "15px",
                        }}
                      ></div>

                      <div className="d-flex flex-row mt-4">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              {/* Avatar Skeleton */}
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              ></div>
                            </div>
                            <div className="author_list_info">
                              {/* Name Skeleton */}
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "100px",
                                  height: "20px",
                                  marginTop: "12px",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>

                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              {/* Avatar Skeleton */}
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              ></div>
                            </div>
                            <div className="author_list_info">
                              {/* Name Skeleton */}
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "100px",
                                  height: "20px",
                                  marginTop: "12px",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          {/* Price Skeleton */}
                          <div
                            className="skeleton-box"
                            style={{ width: "120px", height: "30px" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : item ? (
                // --- ACTUAL DATA STATE ---
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={item.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt={item.title}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{item.title}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {item.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {item.likes}
                        </div>
                      </div>
                      <p>{item.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={item.ownerImage}
                                  alt="Owner"
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.ownerId}`}>
                                {item.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={item.creatorImage}
                                  alt="Creator"
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.creatorId}`}>
                                {item.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="Ethereum" />
                          <span>{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // --- ERROR / NOT FOUND STATE ---
                <div className="col-md-12 text-center">
                  <h2>Item not found.</h2>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
