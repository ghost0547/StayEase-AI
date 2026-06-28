import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";

function Home() {
  const [homestays, setHomestays] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/homestays")
      .then((res) => res.json())
      .then((data) => setHomestays(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Hero />

      <div className="grid md:grid-cols-2 gap-4 p-6">
        {homestays.map((home) => (
          <Card
            key={home.id}
            title={home.name}
            description={`${home.location} - ₹${home.price}`}
          />
        ))}
      </div>
    </>
  );
}

export default Home;