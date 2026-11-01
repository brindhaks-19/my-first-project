import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Activity, ChevronDown, ChevronUp } from 'lucide-react';

type ViewPreset = 'mesh' | 'ring' | 'matrix';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewPreset, setViewPreset] = useState<ViewPreset>('mesh');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [pulseCount, setPulseCount] = useState<number>(0);

  // Mutable refs for Three.js state across React renders
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    animFrameId: number;
    timeoutId: number;
    clock: THREE.Clock;
    rootGroup: THREE.Group | null;
    nodeGroup: THREE.Group | null;
    ringGroup: THREE.Group | null;
    packetPoints: THREE.Points | null;
    isSoftwareGl: boolean;
    targetRotation: { x: number; y: number };
    mousePos: { x: number; y: number };
    presetTarget: { rotX: number; rotY: number; zoom: number };
    pulseStartTime: number;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    animFrameId: 0,
    timeoutId: 0,
    clock: new THREE.Clock(),
    rootGroup: null,
    nodeGroup: null,
    ringGroup: null,
    packetPoints: null,
    isSoftwareGl: false,
    targetRotation: { x: 0.2, y: 0 },
    mousePos: { x: 0, y: 0 },
    presetTarget: { rotX: 0.2, rotY: 0, zoom: 18 },
    pulseStartTime: -999,
  });

  // Handle pointer parallax
  const handlePointerMove = useCallback((e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const normX = (e.clientX / innerWidth) * 2 - 1;
    const normY = -(e.clientY / innerHeight) * 2 + 1;
    sceneRef.current.mousePos = { x: normX * 0.45, y: normY * 0.35 };
  }, []);

  const triggerPulse = useCallback(() => {
    sceneRef.current.pulseStartTime = sceneRef.current.clock.getElapsedTime();
    setPulseCount((c) => c + 1);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Detect software WebGL as per guidelines
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    sceneRef.current.isSoftwareGl = isSoftwareGl;

    // 2. Setup Scene, Camera, Renderer
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current.scene = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 18);
    sceneRef.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.appendChild(renderer.domElement);
    sceneRef.current.renderer = renderer;

    // 3. Lighting Rig (Warm Directional Key + Cool Fill + Subtle Rim)
    const keyLight = new THREE.DirectionalLight(0xd4a373, 1.4); // warm bronze/amber accent
    keyLight.position.set(10, 15, 12);
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0x818cf8, 0x1e2430, 0.9); // cool indigo sky / slate ground
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x6366f1, 1.1); // subtle deep indigo rim
    rimLight.position.set(-12, -8, -10);
    scene.add(rimLight);

    // 4. Procedural Procedural 3-12 Part Composite Model (Distributed Consensus Architecture)
    const rootGroup = new THREE.Group();
    sceneRef.current.rootGroup = rootGroup;
    scene.add(rootGroup);

    // Part A: Core Computing Icosahedron Structure
    const coreIcoGeo = new THREE.IcosahedronGeometry(2.8, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1e2533,
      metalness: 0.75,
      roughness: 0.28,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreIcoGeo, coreMat);
    rootGroup.add(coreMesh);

    // Part B: Wireframe Architectural Lattice
    const wireGeo = new THREE.WireframeGeometry(coreIcoGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.35,
    });
    const wireLines = new THREE.LineSegments(wireGeo, wireMat);
    wireLines.scale.setScalar(1.002);
    rootGroup.add(wireLines);

    // Part C: Distributed Node Cluster (Instanced or grouped procedural vertices)
    const nodeGroup = new THREE.Group();
    sceneRef.current.nodeGroup = nodeGroup;
    rootGroup.add(nodeGroup);

    const nodeGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      metalness: 0.8,
      roughness: 0.2,
    });

    const nodePositions: THREE.Vector3[] = [];
    const nodeCount = 28;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < nodeCount; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount);
      const radius = 4.2 + (i % 3) * 0.4;
      const pos = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      nodePositions.push(pos);

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat.clone());
      nodeMesh.position.copy(pos);
      nodeMesh.userData = { originalPos: pos.clone(), index: i };
      nodeGroup.add(nodeMesh);
    }

    // Part D: Distributed Interconnect Lines (Dynamic BufferGeometry)
    const linePairs: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 3.2) {
          linePairs.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }
    const connectGeo = new THREE.BufferGeometry();
    connectGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePairs, 3));
    const connectMat = new THREE.LineBasicMaterial({
      color: 0x3b465a,
      transparent: true,
      opacity: 0.45,
    });
    const connectionLines = new THREE.LineSegments(connectGeo, connectMat);
    rootGroup.add(connectionLines);

    // Part E: Orbital Consensus Rings (3 Axis Rims)
    const ringGroup = new THREE.Group();
    sceneRef.current.ringGroup = ringGroup;
    rootGroup.add(ringGroup);

    const ringRadii = [5.6, 6.2, 7.0];
    ringRadii.forEach((r, idx) => {
      const ringGeo = new THREE.TorusGeometry(r, 0.025, 8, 80);
      const ringMat = new THREE.MeshStandardMaterial({
        color: idx === 1 ? 0xc28955 : 0x4f46e5,
        metalness: 0.85,
        roughness: 0.25,
        transparent: true,
        opacity: 0.4,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = (idx * Math.PI) / 3;
      ringMesh.rotation.y = (idx * Math.PI) / 4;
      ringGroup.add(ringMesh);
    });

    // Part F: Floating Data Packets (Points Particle Buffer)
    const packetCount = isSoftwareGl ? 30 : 90;
    const packetPositions = new Float32Array(packetCount * 3);
    for (let i = 0; i < packetCount; i++) {
      const angle = (i / packetCount) * Math.PI * 2;
      const radius = 3.5 + Math.random() * 3.0;
      packetPositions[i * 3] = Math.cos(angle) * radius;
      packetPositions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      packetPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const packetGeo = new THREE.BufferGeometry();
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
    const packetMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
    });
    const packetPoints = new THREE.Points(packetGeo, packetMat);
    sceneRef.current.packetPoints = packetPoints;
    rootGroup.add(packetPoints);

    // 5. Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 6. Animation Loop with Pacing for Software WebGL
    const clock = sceneRef.current.clock;

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          sceneRef.current.timeoutId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          sceneRef.current.timeoutId = window.setTimeout(cb, 70);
        }
      };
      sceneRef.current.timeoutId = window.setTimeout(poll, 5);
    };

    const tick = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Exponential damping rotation
      if (rootGroup) {
        if (isRotating) {
          rootGroup.rotation.y += delta * 0.18;
        }

        // Parallax mouse tilt
        const targetRotX = sceneRef.current.presetTarget.rotX + sceneRef.current.mousePos.y * 0.3;
        const targetRotY = rootGroup.rotation.y + sceneRef.current.mousePos.x * 0.05;
        rootGroup.rotation.x = THREE.MathUtils.damp(rootGroup.rotation.x, targetRotX, 4.0, delta);

        // Ring orbital rotations
        if (ringGroup) {
          ringGroup.rotation.z += delta * 0.12;
          ringGroup.rotation.x += delta * 0.08;
        }

        // Packet particle motion
        if (packetPoints) {
          packetPoints.rotation.y += delta * 0.25;
        }

        // Pulse wave effect
        const pulseElapsed = elapsedTime - sceneRef.current.pulseStartTime;
        if (pulseElapsed >= 0 && pulseElapsed < 2.5 && nodeGroup) {
          const waveRadius = pulseElapsed * 4.5;
          nodeGroup.children.forEach((child) => {
            const mesh = child as THREE.Mesh;
            const orig = mesh.userData.originalPos as THREE.Vector3;
            if (orig) {
              const dist = orig.length();
              const diff = Math.abs(dist - waveRadius);
              if (diff < 1.2) {
                const scaleBoost = 1 + (1.2 - diff) * 0.6;
                mesh.scale.setScalar(scaleBoost);
              } else {
                mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, 1.0, 6.0, delta));
              }
            }
          });
        }
      }

      // Smooth camera preset adjustments
      if (camera) {
        camera.position.z = THREE.MathUtils.damp(
          camera.position.z,
          sceneRef.current.presetTarget.zoom,
          3.5,
          delta
        );
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        sceneRef.current.animFrameId = requestAnimationFrame(tick);
      }
    };

    tick();

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(sceneRef.current.animFrameId);
      clearTimeout(sceneRef.current.timeoutId);

      // Clean dispose
      coreIcoGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      connectGeo.dispose();
      connectMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [handlePointerMove]);

  // Update preset camera targets
  const applyPreset = (preset: ViewPreset) => {
    setViewPreset(preset);
    if (preset === 'mesh') {
      sceneRef.current.presetTarget = { rotX: 0.2, rotY: 0, zoom: 18 };
    } else if (preset === 'ring') {
      sceneRef.current.presetTarget = { rotX: 0.75, rotY: Math.PI / 4, zoom: 14 };
    } else if (preset === 'matrix') {
      sceneRef.current.presetTarget = { rotX: 0.05, rotY: 0, zoom: 22 };
    }
  };

  return (
    <div className="relative w-full h-[520px] md:h-[620px] lg:h-[700px] overflow-hidden select-none">
      {/* 3D Canvas Mount Point */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

      {/* Subtle Depth Gradient Overlay (Ensures readable typography without obscuring 3D center) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-50 dark:from-[#0e1116] via-transparent to-transparent opacity-90" />
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-slate-50/20 dark:via-[#0e1116]/30 to-slate-50/60 dark:to-[#0e1116]/80" />

      {/* Minimal Spec Badge (Top-Left, non-blocking as per Three.js skill) */}
      <div className="absolute top-4 left-6 z-10 pointer-events-none">
        <div className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 px-3 py-1.5 rounded backdrop-blur-none inline-flex items-center gap-2 shadow-xs">
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">WebGL2 Kernel</span>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span>Adaptive Mesh</span>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span className="text-slate-700 dark:text-slate-300">28 Nodes Active</span>
        </div>
      </div>

      {/* Unified Bottom Control Dock (Three.js Skill §5: Consolidated, collapsible, 100% unobstructed center) */}
      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-20 transition-transform duration-300 ease-out ${
          isDockCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
        }`}
        style={{ maxWidth: 'min(920px, 92vw)' }}
      >
        {/* Collapse / Expand Toggle Button */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsDockCollapsed((c) => !c)}
            className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-white dark:bg-[#161b22] border-t border-x border-slate-200 dark:border-slate-800 rounded-t-md transition-colors shadow-xs"
            title="Toggle 3D Scene Controls (Zen Mode)"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Show 3D Viewport Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Hide Controls</span>
              </>
            )}
          </button>
        </div>

        {/* Horizontal Dock Surface */}
        <div className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800/90 rounded-lg p-2.5 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-700 dark:text-slate-300">
          {/* Preset Camera Views */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium mr-1 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> View:
            </span>
            <div className="flex items-center bg-slate-100 dark:bg-[#0e1116] p-0.5 rounded border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => applyPreset('mesh')}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  viewPreset === 'mesh' ? 'bg-indigo-600 text-white font-medium shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Distributed Mesh
              </button>
              <button
                onClick={() => applyPreset('ring')}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  viewPreset === 'ring' ? 'bg-indigo-600 text-white font-medium shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Consensus Ring
              </button>
              <button
                onClick={() => applyPreset('matrix')}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  viewPreset === 'matrix' ? 'bg-indigo-600 text-white font-medium shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Compute Matrix
              </button>
            </div>
          </div>

          {/* Interactive Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRotating((r) => !r)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs transition-colors ${
                isRotating
                  ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-indigo-700 dark:text-indigo-300 font-medium'
                  : 'bg-white dark:bg-[#0e1116] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
              <span>{isRotating ? 'Orbit Active' : 'Orbit Paused'}</span>
            </button>

            <button
              onClick={triggerPulse}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
            >
              <Activity className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Simulate Consensus Pulse {pulseCount > 0 ? `(${pulseCount})` : ''}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
