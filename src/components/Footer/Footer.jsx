import { useState, useEffect } from "react";
import "./Footer.css";

const emptyFeedback = { rating: 0, remarks: "" };
const FORM_URL = "https://formspree.io/f/xaeodrgd"; // paste your own URL here
 // "", "sending", "sent" or "failed"

function Footer() {
  // Saved feedback, loaded from localStorage (same lazy-initializer idea as books)
  const [savedFeedback, setSavedFeedback] = useState(() => {
    try {
      const saved = localStorage.getItem("instructorFeedback");
      return saved ? JSON.parse(saved) : emptyFeedback;
    } catch (error) {
      return emptyFeedback;
    }
  });

  // What the instructor is currently typing or selecting
  const [rating, setRating] = useState(savedFeedback.rating);
  const [remarks, setRemarks] = useState(savedFeedback.remarks);
  const [isEditing, setIsEditing] = useState(savedFeedback.rating === 0);
  const [error, setError] = useState("");
  const [sendStatus, setSendStatus] = useState("");

  useEffect(() => {
    localStorage.setItem("instructorFeedback", JSON.stringify(savedFeedback));
  }, [savedFeedback]);

  async function handleSave() {
  if (rating === 0) {
    setError("Please select a rating from 1 to 5.");
    return;
  }

  const cleanRemarks = remarks.trim();
  setError("");
  setSendStatus("sending");

  try {
    const response = await fetch(FORM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        project: "Book Library",
        rating: `${rating} / 5`,
        remarks: cleanRemarks,
      }),
    });

    if (response.ok) {
      setSendStatus("sent");
    } else {
      setSendStatus("failed");
    }
  } catch (err) {
    setSendStatus("failed");
  }

  // The feedback is saved on screen either way
  setSavedFeedback({ rating, remarks: cleanRemarks });
  setIsEditing(false);
}

  function handleEditClick() {
    setRating(savedFeedback.rating);
    setRemarks(savedFeedback.remarks);
    setIsEditing(true);
  }

  return (
    <footer className="footer">
      <p className="footer-statement">
        Submitted to our instructor <strong>Tharuni</strong>
      </p>

      <div className="feedback-card">
        <h3 className="feedback-title">Instructor Feedback</h3>

        {isEditing ? (
          <>
            <div className="star-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={star <= rating ? "star filled" : "star"}
                  onClick={() => setRating(star)}
                  aria-label={`${star} out of 5`}
                >
                  ★
                </button>
              ))}
              <span className="rating-text">
                {rating === 0 ? "Not rated" : `${rating} / 5`}
              </span>
            </div>

            <textarea
              className="feedback-input"
              rows="3"
              placeholder="Type your remarks here..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />

            {error && <p className="feedback-error">{error}</p>}
            {sendStatus === "sending" && <p className="send-status">Sending...</p>}
{sendStatus === "sent" && <p className="send-status sent">Feedback sent to the student. Thank you!</p>}
{sendStatus === "failed" && <p className="send-status failed">Saved here, but could not be sent. Please try again.</p>}

            <button className="btn btn-primary" onClick={handleSave} disabled={sendStatus === "sending"}>
  {sendStatus === "sending" ? "Sending..." : "Save Feedback"}
</button>
          </>
        ) : (
          <>
            <div className="star-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= savedFeedback.rating ? "star filled" : "star"}
                >
                  ★
                </span>
              ))}
              <span className="rating-text">{savedFeedback.rating} / 5</span>
            </div>

            <p className="feedback-remarks">
              {savedFeedback.remarks === "" ? "No remarks added." : savedFeedback.remarks}
            </p>

            <button className="btn btn-secondary" onClick={handleEditClick}>
              Edit Feedback
            </button>
          </>
        )}
      </div>
    </footer>
  );
}

export default Footer;