import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SC2Entity } from '../types/starcraft';
import { Eye, Shield } from 'lucide-react';

interface MiniPortrait3DProps {
  entity: SC2Entity;
  isSpeaking: boolean;
}

export const MiniPortrait3D: React.FC<MiniPortrait3DProps> = ({ entity, isSpeaking }) => {
  const [viewMode, setViewMode] = useState<'ripped' | 'mesh3d'>('ripped');
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const headGroupRef = useRef<THREE.Group | null>(null);
  const jawRef = useRef<THREE.Mesh | null>(null);

  // Reset img error on entity change
  useEffect(() => {
    setImgError(false);
  }, [entity.id]);

  // 3D Canvas Fallback / Toggle
  useEffect(() => {
    if (viewMode !== 'mesh3d' && !imgError && entity.portraitPath) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 144;
    const height = container.clientHeight || 144;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 10);
    camera.position.set(0, 0, 2.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(
      entity.race === 'terran' ? 0x38bdf8 : entity.race === 'zerg' ? 0xa855f7 : 0xfacc15,
      2.5
    );
    dirLight.position.set(2, 3, 2);
    scene.add(dirLight);

    const headGroup = new THREE.Group();
    const primaryColor = new THREE.Color(entity.modelConfig.primaryColor);
    const glowColor = new THREE.Color(entity.modelConfig.glowColor);

    const headMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      roughness: 0.4,
      metalness: entity.race === 'terran' ? 0.8 : 0.2
    });

    const glowMat = new THREE.MeshBasicMaterial({ color: glowColor });

    if (entity.race === 'terran') {
      const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), headMat);
      const visor = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.35, 0.5), glowMat);
      visor.position.set(0, 0.05, 0.5);
      const chin = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.4), headMat);
      chin.position.set(0, -0.45, 0.3);
      jawRef.current = chin;
      const mic = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5), headMat);
      mic.rotateZ(Math.PI / 4);
      mic.position.set(0.45, -0.2, 0.4);
      headGroup.add(helmet, visor, chin, mic);
    } else if (entity.race === 'zerg') {
      const headGeom = new THREE.ConeGeometry(0.65, 1.4, 8);
      headGeom.rotateX(Math.PI / 2);
      const skull = new THREE.Mesh(headGeom, headMat);
      const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), glowMat);
      eyeL.position.set(-0.25, 0.2, 0.4);
      const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), glowMat);
      eyeR.position.set(0.25, 0.2, 0.4);
      const mandible = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.3), glowMat);
      mandible.position.set(0, -0.35, 0.5);
      jawRef.current = mandible;
      headGroup.add(skull, eyeL, eyeR, mandible);
    } else {
      const headCrest = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.2, 6), headMat);
      headCrest.rotateX(-0.3);
      const eyes = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.2), glowMat);
      eyes.position.set(0, 0.1, 0.45);
      const cordL = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8), glowMat);
      cordL.position.set(-0.35, -0.4, -0.2);
      const cordR = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8), glowMat);
      cordR.position.set(0.35, -0.4, -0.2);
      headGroup.add(headCrest, eyes, cordL, cordR);
    }

    scene.add(headGroup);
    headGroupRef.current = headGroup;

    let animId: number;
    let clock = 0;

    const render = () => {
      clock += 0.03;
      if (headGroupRef.current) {
        headGroupRef.current.rotation.y = Math.sin(clock * 1.2) * 0.15;
        headGroupRef.current.rotation.x = Math.sin(clock * 0.8) * 0.08;
        if (jawRef.current) {
          jawRef.current.position.y = isSpeaking ? -0.45 + Math.sin(clock * 18) * 0.08 : -0.45;
        }
      }
      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [entity, isSpeaking, viewMode, imgError]);

  const showRippedPortrait = viewMode === 'ripped' && !imgError && Boolean(entity.portraitPath);

  const getBorderColor = () => {
    if (entity.race === 'terran') return 'border-cyan-500/80 shadow-[0_0_15px_rgba(6,182,212,0.35)]';
    if (entity.race === 'zerg') return 'border-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.35)]';
    return 'border-yellow-500/80 shadow-[0_0_15px_rgba(234,179,8,0.35)]';
  };

  return (
    <div
      className={`relative w-28 h-28 md:w-36 md:h-36 bg-slate-950/95 rounded border-2 overflow-hidden flex flex-col justify-between select-none ${getBorderColor()}`}
    >
      {/* 1. AUTHENTIC RIPPED PORTRAIT (IMAGE / ANIMATED GIF) */}
      {showRippedPortrait ? (
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-black">
          <img
            src={entity.portraitPath}
            alt={entity.name}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-top transition-transform duration-100 ${
              isSpeaking ? 'scale-105 filter brightness-110 contrast-125' : 'scale-100'
            }`}
          />
          {/* Speaking ripple glow effect */}
          {isSpeaking && (
            <div className="absolute inset-0 bg-cyan-400/10 mix-blend-screen pointer-events-none animate-pulse" />
          )}
        </div>
      ) : (
        /* 2. 3D WEBGL HEAD CANVAS */
        <div ref={containerRef} className="w-full h-full" />
      )}

      {/* Hologram CRT Grid Overlay & Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none opacity-80" />

      {/* Top Header Badge */}
      <div className="absolute top-1 left-1 right-1 flex justify-between items-center text-[9px] font-sc2-mono text-slate-300 pointer-events-none px-1.5 py-0.5 bg-black/75 rounded backdrop-blur-xs">
        <span className="text-emerald-400 font-bold uppercase truncate max-w-[65%]">{entity.name}</span>
        <span className={`text-[8px] font-bold ${isSpeaking ? 'text-amber-400 animate-ping' : 'text-cyan-400'}`}>
          {isSpeaking ? '● TRANSMITIENDO' : '● ONLINE'}
        </span>
      </div>

      {/* View Toggle Pill (Ripped Portrait vs 3D Head) */}
      <button
        onClick={() => setViewMode(prev => prev === 'ripped' ? 'mesh3d' : 'ripped')}
        title="Alternar entre Retrato Ripeado y Malla 3D"
        className="absolute top-7 right-1 z-10 px-1 py-0.5 rounded bg-black/70 hover:bg-slate-800 text-[8px] font-sc2-mono text-slate-300 hover:text-white border border-slate-700/80 transition"
      >
        {viewMode === 'ripped' ? '3D' : '2D'}
      </button>

      {/* Cockpit HUD Corner Brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

      {/* Real-time Voice Waveform Equalizer Bars */}
      <div className="absolute bottom-1 left-2 right-2 flex justify-between items-end h-3 gap-0.5 pointer-events-none">
        {[40, 70, 95, 60, 85, 30, 90, 50, 80, 65, 45, 95].map((baseHeight, idx) => {
          const height = isSpeaking
            ? `${Math.max(15, (baseHeight * (idx % 2 === 0 ? 1 : 0.6)))}%`
            : '20%';
          return (
            <div
              key={idx}
              className={`w-1 rounded-t-sm transition-all duration-75 ${
                entity.race === 'terran'
                  ? 'bg-cyan-400 shadow-[0_0_4px_#38bdf8]'
                  : entity.race === 'zerg'
                  ? 'bg-purple-400 shadow-[0_0_4px_#c084fc]'
                  : 'bg-yellow-400 shadow-[0_0_4px_#facc15]'
              }`}
              style={{ height }}
            />
          );
        })}
      </div>
    </div>
  );
};
