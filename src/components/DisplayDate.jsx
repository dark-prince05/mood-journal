import { useEffect, useState } from "react";

export default function DisplayLocationAndWeather() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    setDate(today);
  }, []);

  return (
    <>
      <h2>{date}</h2>
    </>
  );
}
