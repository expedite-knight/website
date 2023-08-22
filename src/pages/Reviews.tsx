import { LiaStar } from "react-icons/lia";
import "../styles/reviews.css";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiArrowLeft, HiArrowLeftCircle, HiArrowRight } from "react-icons/hi2";
import moment from "moment";
import FadeLoader from "react-spinners/FadeLoader";
import Popup from "../components/Popup";

type Props = {
  menuState: boolean;
};

type ReviewType = {
  rating: number;
  name: string;
  body: string;
  anon: boolean;
  updatedAt: number;
};
const Reviews = ({ menuState }: Props) => {
  //set page default value to whatever the page query is or 0
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [update, toggleUpdate] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [anon, setAnon] = useState(false);
  const [body, setBody] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [ratingValid, setRatingValid] = useState(true);
  const { REACT_APP_API_URL } = process.env;
  const [reviews, setReviews] = useState<[ReviewType] | []>([]);
  const [loading, setLoading] = useState(true);
  const [submitSuccessful, setSubmitSuccessful] = useState(false);
  const [popupState, setPopupState] = useState(false);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${REACT_APP_API_URL}/api/v1/reviews?page=${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        setReviews(data.body.reviews);
        setAverageRating(Math.round(100 * data.body.averageRating) / 100);
        setTotalPages(() => {
          const numOfPages = data.body.total / 10;
          if (JSON.stringify(numOfPages).indexOf(".") != -1)
            return Math.round(numOfPages) + 1;
          return Math.round(numOfPages);
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }, [page, update]);

  function validateInputs() {
    if (!anon && name.trim() === "") {
      setNameValid(false);
      return false;
    } else setNameValid(true);
    if (rating === 0) {
      setRatingValid(false);
      return false;
    } else setRatingValid(true);
    return true;
  }

  function handleReviewSubmission() {
    const areInputsValid = validateInputs();
    if (!areInputsValid) return null;

    fetch(`${REACT_APP_API_URL}/api/v1/reviews/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        rating: rating,
        anon: anon,
        body: body,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status == 200) {
          toggleUpdate((prev) => !prev);
          setName("");
          setRating(0);
          setBody("");
          setSubmitSuccessful(true);
          setPopupState(true);
          setTimeout(() => {
            setPopupState(false);
          }, 3000);
        }
      })
      .catch((error) => {
        console.log("ERROR:", error);
        setSubmitSuccessful(false);
        setPopupState(true);
        setTimeout(() => {
          setPopupState(false);
        }, 3000);
      });
  }

  return (
    <div className="container" style={{ zIndex: menuState ? "-1 " : "0" }}>
      <Popup
        background={submitSuccessful ? "rgba(114, 159, 252, 1)" : "red"}
        message={
          submitSuccessful ? "Review submitted!" : "Unable to submit review"
        }
        enabled={popupState}
      />
      <section className="img-container">
        <img
          src="https://img.freepik.com/free-vector/isometric-logistics-composition-with-outdoor-scenery-warehouse-area-with-buldings-parcel-boxes-vans-trucks_1284-61844.jpg?w=1060&t=st=1689303322~exp=1689303922~hmac=aded6f11a3aa031d3e407f1dea6f3def980dc4dd3d2cc666006bbae86a05742f"
          className="header-img"
          alt="error loading img:/"
        />
        <AnimatePresence>
          <motion.h2
            className="img-header"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            key="title"
            style={{ display: "flex", flexDirection: "row", gap: 0 }}
          >
            <span style={{ color: "#d92323" }}>R</span>
            <span>EVIEWS</span>
          </motion.h2>
        </AnimatePresence>
      </section>
      <div className="review-overall">
        <h2 style={{ textAlign: "center", fontSize: "2em" }}>Overall Rating</h2>
        <h2>
          {averageRating ? (
            <div className="home--review-ratings">
              <LiaStar
                color={Math.round(averageRating) >= 1 ? "gold" : "gainsboro"}
                size={45}
              />
              <LiaStar
                color={Math.round(averageRating) >= 2 ? "gold" : "gainsboro"}
                size={45}
              />
              <LiaStar
                color={Math.round(averageRating) >= 3 ? "gold" : "gainsboro"}
                size={45}
              />
              <LiaStar
                color={Math.round(averageRating) >= 4 ? "gold" : "gainsboro"}
                size={45}
              />
              <LiaStar
                color={Math.round(averageRating) >= 5 ? "gold" : "gainsboro"}
                size={45}
              />
            </div>
          ) : (
            <div className="home--review-ratings">
              <LiaStar color={"gainsboro"} size={45} />
              <LiaStar color={"gainsboro"} size={45} />
              <LiaStar color={"gainsboro"} size={45} />
              <LiaStar color={"gainsboro"} size={45} />
              <LiaStar color={"gainsboro"} size={45} />
            </div>
          )}
        </h2>
        <small
          className="review--date"
          style={{ textAlign: "center", fontSize: "1em" }}
        >
          as of {moment().format("ll")}
        </small>
      </div>
      <div className="break"></div>
      <section className="content">
        {loading ? (
          <FadeLoader height={10} width={4} color="gainsboro" />
        ) : (
          <section className="review--reviews">
            {reviews.length > 0 ? (
              reviews.map((review, index) => {
                return (
                  <div className="review--review" key={index}>
                    <h1>{review.anon ? "Anonymous" : review.name}</h1>
                    <div className="home--review-ratings">
                      <LiaStar
                        color={review.rating >= 1 ? "gold" : "gainsboro"}
                        size={30}
                      />
                      <LiaStar
                        color={review.rating >= 2 ? "gold" : "gainsboro"}
                        size={30}
                      />
                      <LiaStar
                        color={review.rating >= 3 ? "gold" : "gainsboro"}
                        size={30}
                      />
                      <LiaStar
                        color={review.rating >= 4 ? "gold" : "gainsboro"}
                        size={30}
                      />
                      <LiaStar
                        color={review.rating >= 5 ? "gold" : "gainsboro"}
                        size={30}
                      />
                    </div>
                    {review.body.trim() !== "" ? (
                      <p className="review--body">{review.body}</p>
                    ) : null}
                    <small className="review--date">
                      {moment(review.updatedAt).format("ll")}
                    </small>
                  </div>
                );
              })
            ) : (
              <small style={{ textAlign: "center" }}>No reviews yet!</small>
            )}
            <small style={{ color: "gainsboro", textAlign: "center" }}>
              {reviews.length} total
            </small>
          </section>
        )}
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <HiArrowLeft
            size={20}
            className="review-arrow"
            onClick={() => {
              if (page - 1 >= 1) setPage((prev) => prev - 1);
            }}
          />
          <p>
            page {page} of {totalPages < 1 ? 1 : totalPages}
          </p>
          <HiArrowRight
            size={20}
            className="review-arrow"
            onClick={() => {
              if (page >= 0 && page < Math.round(totalPages))
                setPage((prev) => prev + 1);
            }}
          />
        </section>
        <section className="review--new">
          <input
            placeholder={anon ? "Anonymous" : "Name"}
            className="input"
            disabled={anon}
            value={name}
            onChange={(e) => {
              setNameValid(true);
              setName(e.target.value);
            }}
            style={{ borderBottomColor: nameValid ? "" : "red" }}
          />
          <div className="home--review-ratings">
            <LiaStar
              color={rating >= 1 ? "gold" : ratingValid ? "gainsboro" : "red"}
              size={30}
              onClick={() => {
                setRatingValid(true);
                setRating(1);
              }}
            />
            <LiaStar
              color={rating >= 2 ? "gold" : ratingValid ? "gainsboro" : "red"}
              size={30}
              onClick={() => {
                setRatingValid(true);
                setRating(2);
              }}
            />
            <LiaStar
              color={rating >= 3 ? "gold" : ratingValid ? "gainsboro" : "red"}
              size={30}
              onClick={() => {
                setRatingValid(true);
                setRating(3);
              }}
            />
            <LiaStar
              color={rating >= 4 ? "gold" : ratingValid ? "gainsboro" : "red"}
              size={30}
              onClick={() => {
                setRatingValid(true);
                setRating(4);
              }}
            />
            <LiaStar
              color={rating >= 5 ? "gold" : ratingValid ? "gainsboro" : "red"}
              size={30}
              onClick={() => {
                setRatingValid(true);
                setRating(5);
              }}
            />
          </div>
          <textarea
            className="textarea"
            placeholder="Write your review here!"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
          <div
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            <input
              type="checkbox"
              value={JSON.stringify(anon)}
              onChange={(e) => {
                setName("");
                setAnon((prev) => !prev);
              }}
              id="anon"
            />
            <label style={{ color: "gray" }} htmlFor="anon">
              Anonymous?
            </label>
          </div>
          <button className="button" onClick={handleReviewSubmission}>
            Publish
          </button>

          {!nameValid && (
            <small style={{ color: "red", textAlign: "center" }}>
              Please fill out all required fields
            </small>
          )}
          {!ratingValid && (
            <small style={{ color: "red", textAlign: "center" }}>
              Please fill out all required fields
            </small>
          )}
        </section>
      </section>
    </div>
  );
};

export default Reviews;
