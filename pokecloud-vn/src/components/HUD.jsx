import React from 'react';

export default function HUD({ lives, maxLives = 5, onReset }) {
  // maxLives = número total de slots (ex: 5 pokébolas no máximo)
  const icons = Array.from({ length: maxLives });

  return (
    <div className="hud">
      <div className="hud-group">
        {icons.map((_, i) => (
          <img
            key={i}
            src={i < lives ? '/images/pokebola.png' : '/images/pokebola de nao capturado.png'}
            alt={i < lives ? 'Vida' : 'Vida perdida'}
            className="life-icon"
          />
        ))}
      </div>
      <div className="hud-group">
        <button className="btn-ghost" onClick={onReset}>Reiniciar</button>
      </div>
    </div>
  );
}
