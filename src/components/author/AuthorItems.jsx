import React from "react";
import { Link } from "react-router-dom";

// Destructures the props passed from Author.jsx
const AuthorItems = ({ author, loading }) => {
  return (
    <div className="row">
      {loading ? (
        // --- SKELETON LOADING STATE ---
        new Array(8).fill(0).map((_, index) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            <div className="nft__item">
              <div className="author_list_pp">
                <div
                  className="skeleton-box"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                ></div>
              </div>
              <div className="nft__item_wrap">
                <div
                  className="skeleton-box"
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "8px",
                  }}
                ></div>
              </div>
              <div className="nft__item_info">
                <div
                  className="skeleton-box"
                  style={{
                    width: "100px",
                    height: "20px",
                    marginBottom: "8px",
                  }}
                ></div>
                <div
                  className="skeleton-box"
                  style={{ width: "50px", height: "15px" }}
                ></div>
              </div>
            </div>
          </div>
        ))
      ) : author?.nftCollection?.length > 0 ? (
        // --- ACTUAL DATA STATE ---
        author.nftCollection.map((nft, index) => (
          <div
            className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
            key={nft.id || index}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                {/* Author image is the same for all items in their own collection */}
                <Link to="">
                  <img
                    className="lazy"
                    src={author.authorImage}
                    alt={author.authorName}
                  />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Link to the specific item details page */}
                <Link to={`/item-details/${nft.nftId}`}>
                  <img
                    src={nft.nftImage}
                    className="lazy nft__item_preview"
                    alt={nft.title}
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${nft.nftId}`}>
                  <h4>{nft.title}</h4>
                </Link>
                <div className="nft__item_price">{nft.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{nft.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        // --- EMPTY STATE ---
        <div className="col-md-12 text-center">
          <h4>No items found for this author.</h4>
        </div>
      )}
    </div>
  );
};

export default AuthorItems;
