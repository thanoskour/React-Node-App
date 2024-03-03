"use client"; 
import { useState, useEffect } from 'react';

interface House {
  id: string;
  name: string;
  animal: string;
  houseColours: string;
  founder: string;
}

function getGradient(coloursString:string) {
  const colours = coloursString.split(' and ');
  const isValidColour = (colour:string) => /^#[0-9A-F]{6}$/i.test(colour) || CSS.supports("color", colour);

  if (colours.every(isValidColour)) {
    return `linear-gradient(to right, ${colours[0]}, ${colours[1]})`;
  } else {
    return 'linear-gradient(to right, white, black)';
  }
}


export default function Home() {
  const [data, setData] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://wizard-world-api.herokuapp.com/houses')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="spinner"></div>;


  return (
    <div className="container">
      {data.map(house => (
        <div key={house.id} className="house">
          <h1 className="house-name">{house.name}</h1>
          <span className="house-animal">{house.animal}</span>
          <div className="bar" style={{ background: getGradient(house.houseColours) }}></div>
          <p className="house-founder">Founder: {<span className="bold">{house.founder}</span>}</p>

        </div>
      
      ))}
    </div>
  );
}
