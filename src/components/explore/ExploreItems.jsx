import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown"; // Reuses the Countdown UI component

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8); // Starts by showing 8 items
  const [filter, setFilter] = useState(""); // Tracks the dropdown selection

  useEffect(() => {
    // Whenever the filter changes, fetch new data and reset the view
    const fetchExploreItems = async () => {
      setLoading(true);
      setVisibleCount(8); // Resets back to 8 visible items when a new filter is applied

      try {
        // Dynamically builds the endpoint based on whether a filter is selected
        const endpoint = filter
          ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
          : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

        const response = await fetch(endpoint);
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching explore items:", error);
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [filter]); // Dependency array: Re-run this effect when `filter` changes

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4); // Loads 4 more items each time
  };

  return (
    <>
      <div>
        {/* Sorting Dropdown */}
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? (
        // --- SKELETON LOADING STATE ---
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
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
      ) : items.length > 0 ? (
        // --- ACTUAL DATA STATE ---
        // Uses .slice(0, visibleCount) to only render up to the limit
        items.slice(0, visibleCount).map((item, index) => (
          <div
            key={item.id || index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              {/* Dynamic Timer using the Countdown reusable component */}
              {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}

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
                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt={item.title}
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}>
                  <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        // --- EMPTY STATE ---
        <div className="col-md-12 text-center">
          <h4>No items found.</h4>
        </div>
      )}

      {/* Load More Button */}
      {/* Only show this button if the visible count is less than the total items available */}
      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={(e) => {
              e.preventDefault(); // Prevents page jump
              handleLoadMore();
            }}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
