import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAuthorDetails = async () => {
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
        );
        const data = await response.json();
        setAuthor(data);
        setFollowerCount(data.followers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author details:", error);
        setLoading(false);
      }
    };

    fetchAuthorDetails();
  }, [authorId]);

  const handleFollow = () => {
    if (isFollowing) {
      setFollowerCount((prev) => prev - 1);
    } else {
      setFollowerCount((prev) => prev + 1);
    }
    setIsFollowing(!isFollowing);
  };

  const copyToClipboard = () => {
    if (author?.address) {
      navigator.clipboard.writeText(author.address);
      alert("Address copied to clipboard!");
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Static Banner */}
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        // Skeleton for Avatar
                        <div
                          className="skeleton-box"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                          }}
                        ></div>
                      ) : (
                        <img
                          src={author?.authorImage}
                          alt={author?.authorName}
                        />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        {loading ? (
                          // Skeletons for Name, Tag, and Wallet
                          <>
                            <div
                              className="skeleton-box"
                              style={{
                                width: "150px",
                                height: "24px",
                                marginTop: "10px",
                              }}
                            ></div>
                            <div
                              className="skeleton-box"
                              style={{
                                width: "100px",
                                height: "16px",
                                marginTop: "5px",
                              }}
                            ></div>
                            <div
                              className="skeleton-box"
                              style={{
                                width: "200px",
                                height: "16px",
                                marginTop: "5px",
                              }}
                            ></div>
                          </>
                        ) : (
                          <h4>
                            {author?.authorName}
                            <span className="profile_username">
                              @{author?.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author?.address}
                            </span>
                            <button
                              id="btn_copy"
                              title="Copy Text"
                              onClick={copyToClipboard}
                            >
                              Copy
                            </button>
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        // Skeleton for Follower Count
                        <div
                          className="skeleton-box"
                          style={{ width: "80px", height: "30px" }}
                        ></div>
                      ) : (
                        <div className="profile_follower">
                          {followerCount} followers
                        </div>
                      )}

                      {!loading && (
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={(e) => {
                            e.preventDefault();
                            handleFollow();
                          }}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {/* Passes the author data to AuthorItems so it can render the specific NFTs */}
                  <AuthorItems author={author} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
