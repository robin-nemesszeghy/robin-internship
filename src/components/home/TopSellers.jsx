import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton"; // Imported Skeleton component

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
        );
        const data = await response.json();
        setSellers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      {/* Added fade-in to the container wrapper */}
      <div className="container" data-aos="fade-in" data-aos-delay="100">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading ? (
                // --- SKELETON LOADING STATE updated to use Skeleton component ---
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="author_list_info">
                      <Skeleton width="100px" height="20px" />
                      <Skeleton width="60px" height="15px" />
                    </div>
                  </li>
                ))
              ) : sellers.length > 0 ? (
                // --- ACTUAL DATA STATE ---
                sellers.map((seller) => (
                  <li key={seller.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt={seller.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>
                        {seller.authorName}
                      </Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))
              ) : (
                // --- EMPTY STATE ---
                <div className="text-center">No top sellers found.</div>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
