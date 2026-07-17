import { useState } from "react";

function AIPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setItinerary("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/ai/itinerary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            destination,
            days: Number(days),
            budget: Number(budget),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to generate itinerary");
      }

      setItinerary(data.itinerary);
    } catch (err) {
      setError("Failed to generate itinerary");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Travel Planner</h1>

      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Days"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSubmit}>
        Generate Itinerary
      </button>

      <br />
      <br />

      {loading && <p>Generating itinerary...</p>}

      {error && <p>{error}</p>}

      {itinerary && (
        <div>
          <h2>Your Itinerary</h2>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#f4f4f4",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            {itinerary}
          </pre>
        </div>
      )}
    </div>
  );
}

export default AIPlanner;