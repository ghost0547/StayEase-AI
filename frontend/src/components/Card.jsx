function Card({ title, description }) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>

      <p className="mt-2">{description}</p>
    </div>
  );
}

export default Card;