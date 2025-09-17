import React from 'react';
import { useGame } from '../App.jsx';

export default function TitleScreen(){
  const game = useGame();
  const hasSave = !!game.state && (game.state.savedPokemons > 0 || game.state.sceneId !== 'LAB');

  return (
    <div className="title-screen">
      <div className="title-card">
        <h1>Pokecloud VN</h1>
        <div className="menu">
          <button onClick={() => game.go('LAB')}>Novo Jogo</button>
          <button className="btn-ghost" onClick={() => game.go(game.state.sceneId)} disabled={!hasSave}>Continuar</button>
          <button className="btn-ghost" onClick={() => navigator.serviceWorker?.getRegistration().then(r=>r?.update())}>Atualizar PWA</button>
        </div>
        <div className="badge">Autosave • LocalStorage • PWA Ready</div>
      </div>
    </div>
  );
}