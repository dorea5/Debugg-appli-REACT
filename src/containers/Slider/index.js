import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Vérifiez que data et data.focus sont définis
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  );

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    const interval = setInterval(nextCard, 5000);
    return () => clearInterval(interval);
  }, [index, byDateDesc?.length]);

  // Vérifiez que byDateDesc est défini avant de rendre les éléments
  if (!byDateDesc) {
    return <div>Loading...</div>; // Ou un autre message de chargement
  }

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div key={`slide-${event.title}`} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, radioIdx) => (
            <input
              key={`radio-${event.title}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

