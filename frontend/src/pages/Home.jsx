import Hero from "../components/Hero";
import Card from "../components/Card";

function Home() {
  return (
    <>
      <Hero />

      <div className="grid md:grid-cols-2 gap-4 p-6">
        <Card
          title="Homestay Management"
          description="Manage bookings and guests easily."
        />

        <Card
          title="Eco Tourism"
          description="Promote local tourism digitally."
        />
      </div>
    </>
  );
}

export default Home;