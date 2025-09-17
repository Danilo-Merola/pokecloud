import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadGame, saveGame, clearSave } from './engine/save';
import TitleScreen from './components/TitleScreen.jsx';
import SceneRenderer from './components/SceneRenderer.jsx';
import HUD from './components/HUD.jsx';
import { scenesById, firstSceneId, bossSceneId } from './data/scenes';

const Ctx = createContext(null);
export const useGame = () => useContext(Ctx);

export default function App(){
  const [state, setState] = useState(() => loadGame() || {
    sceneId: firstSceneId,
    savedPokemons: 0, // vidas na boss fight
    flags: {},        // para marcar passos concluídos
  });

  // PWA: registra Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  useEffect(() => { saveGame(state); }, [state]);

  const api = useMemo(() => ({
    state,
    go: (nextId) => setState(s => ({ ...s, sceneId: nextId })),
    addLife: (n=1) => setState(s => ({ ...s, savedPokemons: s.savedPokemons + n })),
    setFlag: (k,v=true) => setState(s => ({ ...s, flags: { ...s.flags, [k]: v } })),
    reset: () => { clearSave(); setState({ sceneId: firstSceneId, savedPokemons: 0, flags: {} }); },
  }), [state]);

  const scene = scenesById[state.sceneId];

  return (
    <Ctx.Provider value={api}>
      {state.sceneId === 'TITLE' ? (
        <TitleScreen />
      ) : (
        <div className="game-root">
          <HUD lives={state.savedPokemons} onReset={() => api.reset()} />
          <SceneRenderer scene={scene} />
        </div>
      )}
    </Ctx.Provider>
  );
}