/**
 * @file ThreeBackground.tsx
 * @description Fundo Interativo 3D em WebGL com Linhas de Código Flutuantes em 3D
 * e Rede de Conexões de Nós Dinâmicos (Constelação Cibernética).
 * 
 * - Renderiza fragmentos de código reais em planos 3D com destaque de sintaxe neon (TypeScript, React, Three.js, Shaders).
 * - Rede de nós 3D interconectados por linhas dinâmicas que se formam e se dissolvem no espaço tridimensional.
 * - Reação fluida ao movimento do mouse (paralaxe 3D) e ao scroll da página.
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CODE_SNIPPETS = [
  { text: 'const matrix = new THREE.Matrix4().makeRotationY(theta);', lang: 'three' },
  { text: 'async function renderQuantumScene(ctx: WebGL2RenderingContext) {', lang: 'ts' },
  { text: 'const [neuralFlow, dispatch] = useCyberKernel(state);', lang: 'react' },
  { text: 'gl_FragColor = vec4(neonColor * intensity, 0.85);', lang: 'glsl' },
  { text: 'export const connectNodes = (p1, p2) => Math.hypot(dx, dy, dz);', lang: 'math' },
  { text: 'await db.collection("innovations").doc("2026").set(data);', lang: 'db' },
  { text: 'interface NeuralPathway<T> extends GraphConnection<T> {}', lang: 'ts' },
  { text: 'gsap.timeline().to(".cyber-node", { stagger: 0.08, opacity: 1 });', lang: 'gsap' },
  { text: 'const raycaster = new THREE.Raycaster(camera.position, dir);', lang: 'three' },
  { text: '<motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} />', lang: 'motion' },
  { text: '01001101 01100001 01110100 01101000 01100101 01110101 01110011', lang: 'bin' },
  { text: 'const lerp = (a: number, b: number, t: number) => a + (b - a) * t;', lang: 'math' },
  { text: 'git commit -m "feat: 3D interactive holographic architecture"', lang: 'git' },
  { text: 'const hash = await crypto.subtle.digest("SHA-256", payload);', lang: 'security' },
  { text: 'while (isStreaming) { yield await socket.receivePacket(); }', lang: 'net' },
  { text: 'const vShader = createShader(gl, gl.VERTEX_SHADER, vSource);', lang: 'glsl' },
  { text: 'return <Canvas camera={{ fov: 60, position: [0, 0, 75] }} />', lang: 'react' },
  { text: 'const nodeGraph = new Map<NodeId, Set<Connection>>();', lang: 'ts' },
];

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Cena, Câmera e Renderizador WebGL
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060813, 0.0014);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Grupo principal para paralaxe e rotação
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 2. Criação das Texturas e Planos de Linhas de Código 3D
    const codeMeshGroup = new THREE.Group();
    worldGroup.add(codeMeshGroup);

    const codePlanes: {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      speedY: number;
      rotSpeed: number;
    }[] = [];

    const texturesToDispose: THREE.Texture[] = [];
    const materialsToDispose: THREE.Material[] = [];
    const geometriesToDispose: THREE.BufferGeometry[] = [];

    // Função utilitária para renderizar linha de código em um canvas 2D de alta definição
    const createCodeTexture = (snippet: { text: string; lang: string }) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Fundo escuro semitransparente com borda neon elegante
      ctx.fillStyle = 'rgba(11, 14, 29, 0.65)';
      ctx.beginPath();
      ctx.roundRect(4, 4, 1016, 120, 16);
      ctx.fill();

      // Borda com gradiente cibernético
      const borderGrad = ctx.createLinearGradient(0, 0, 1024, 0);
      borderGrad.addColorStop(0, 'rgba(99, 102, 241, 0.6)');
      borderGrad.addColorStop(0.5, 'rgba(236, 72, 153, 0.4)');
      borderGrad.addColorStop(1, 'rgba(56, 189, 248, 0.6)');
      ctx.lineWidth = 2;
      ctx.strokeStyle = borderGrad;
      ctx.stroke();

      // Marcador de linha / tag de linguagem no início
      ctx.font = 'bold 24px "Courier New", monospace';
      ctx.fillStyle = 'rgba(99, 102, 241, 0.9)';
      ctx.fillText(`> [${snippet.lang}]`, 24, 72);

      // Texto de código com realce de sintaxe simulado
      ctx.font = '500 28px "Courier New", monospace';
      
      // Cores por tipo
      let textColor = '#e2e8f0';
      if (snippet.text.startsWith('const') || snippet.text.startsWith('async') || snippet.text.startsWith('export')) {
        textColor = '#38bdf8'; // Cyan
      } else if (snippet.text.startsWith('0100') || snippet.text.startsWith('gl_')) {
        textColor = '#ec4899'; // Pink
      } else if (snippet.text.startsWith('<') || snippet.text.startsWith('interface')) {
        textColor = '#a855f7'; // Purple
      } else {
        textColor = '#818cf8'; // Soft Indigo
      }

      ctx.fillStyle = textColor;
      ctx.fillText(snippet.text, 190, 72);

      // Efeito de brilho neon sutil
      ctx.shadowColor = textColor;
      ctx.shadowBlur = 8;
      ctx.fillText(snippet.text, 190, 72);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texturesToDispose.push(texture);
      return texture;
    };

    // Distribuição dos cartões/linhas de código em espaço 3D tridimensional
    CODE_SNIPPETS.forEach((snippet, i) => {
      const texture = createCodeTexture(snippet);
      if (!texture) return;

      // Planes menores para visual mais discreto
      const planeWidth = 18;
      const planeHeight = 2.2;
      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
      geometriesToDispose.push(geometry);

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      materialsToDispose.push(material);

      const mesh = new THREE.Mesh(geometry, material);

      // Posição no espaço tridimensional com profundidade variada
      const angle = (i / CODE_SNIPPETS.length) * Math.PI * 2;
      const radius = 28 + (i % 3) * 12;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 12;
      const y = ((i - CODE_SNIPPETS.length / 2) * 11) + (Math.random() - 0.5) * 8;
      const z = Math.sin(angle) * 28 + (Math.random() - 0.5) * 30 - 12;

      mesh.position.set(x, y, z);
      mesh.rotation.y = (Math.random() - 0.5) * 0.4;
      mesh.rotation.x = (Math.random() - 0.5) * 0.2;
      mesh.rotation.z = (Math.random() - 0.5) * 0.15;

      codeMeshGroup.add(mesh);

      codePlanes.push({
        mesh,
        baseX: x,
        baseY: y,
        baseZ: z,
        speedY: 0.025 + Math.random() * 0.03,
        rotSpeed: (Math.random() - 0.5) * 0.004,
      });
    });

    // 3. Rede de Nós 3D com Conexões Dinâmicas (Graph Network)
    const nodeCount = 50;   // menos nós → visual mais limpo
    const maxDistance = 15; // conexões mais curtas → mais discretas
    const maxDistanceSq = maxDistance * maxDistance;

    interface GraphNode {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
    }

    const nodes: GraphNode[] = [];
    const nodeBounds = { x: 65, y: 65, z: 50 };

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * nodeBounds.x * 2,
        y: (Math.random() - 0.5) * nodeBounds.y * 2,
        z: (Math.random() - 0.5) * nodeBounds.z * 2,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        vz: (Math.random() - 0.5) * 0.06,
      });
    }

    // Geometria dos pontos dos nós
    const nodePointsGeometry = new THREE.BufferGeometry();
    geometriesToDispose.push(nodePointsGeometry);

    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i * 3] = nodes[i].x;
      nodePositions[i * 3 + 1] = nodes[i].y;
      nodePositions[i * 3 + 2] = nodes[i].z;

      // Cores alternadas em índigo e rosa
      if (i % 2 === 0) {
        nodeColors[i * 3] = 0.39; // R (indigo)
        nodeColors[i * 3 + 1] = 0.40; // G
        nodeColors[i * 3 + 2] = 0.95; // B
      } else {
        nodeColors[i * 3] = 0.92; // R (pink)
        nodeColors[i * 3 + 1] = 0.28; // G
        nodeColors[i * 3 + 2] = 0.60; // B
      }
    }

    nodePointsGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodePointsGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    // Textura circular para o ponto do nó
    const createNodeTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, 'rgba(99, 102, 241, 0.9)');
        grad.addColorStop(0.7, 'rgba(236, 72, 153, 0.4)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const nodeTexture = createNodeTexture();
    texturesToDispose.push(nodeTexture);

    const nodeMaterial = new THREE.PointsMaterial({
      size: 1.4, // pontos menores
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      map: nodeTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materialsToDispose.push(nodeMaterial);

    const nodePointsMesh = new THREE.Points(nodePointsGeometry, nodeMaterial);
    worldGroup.add(nodePointsMesh);

    // Linhas de conexão dinâmicas (Buffer pré-alocado para alta performance)
    const maxLines = 200; // menos linhas simultâneas
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const lineGeometry = new THREE.BufferGeometry();
    geometriesToDispose.push(lineGeometry);

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4, // linhas mais sutis
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materialsToDispose.push(lineMaterial);

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    worldGroup.add(lineMesh);

    // 4. Interação com Cursor e Scroll
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // 5. Loop de Renderização Contínua
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Suavização da entrada do mouse e scroll
      targetMouseX += (mouseX - targetMouseX) * 0.04;
      targetMouseY += (mouseY - targetMouseY) * 0.04;
      targetScrollY += (scrollY - targetScrollY) * 0.05;

      // 5.1 Atualização das Linhas de Código 3D (Flutuação suave)
      codePlanes.forEach((cp, idx) => {
        // Movimento orbital e ondulação vertical sutil
        cp.mesh.position.y = cp.baseY + Math.sin(elapsedTime * 0.6 + idx * 0.8) * 3;
        cp.mesh.position.x = cp.baseX + Math.cos(elapsedTime * 0.4 + idx * 0.5) * 2;
        cp.mesh.rotation.y += cp.rotSpeed;
        cp.mesh.rotation.z = Math.sin(elapsedTime * 0.5 + idx) * 0.04;
      });

      // 5.2 Atualização dos Nós 3D
      const nodePosAttr = nodePointsGeometry.attributes.position as THREE.BufferAttribute;
      const nodePosArray = nodePosAttr.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Rebate suave nas bordas do espaço 3D
        if (node.x < -nodeBounds.x || node.x > nodeBounds.x) node.vx *= -1;
        if (node.y < -nodeBounds.y || node.y > nodeBounds.y) node.vy *= -1;
        if (node.z < -nodeBounds.z || node.z > nodeBounds.z) node.vz *= -1;

        nodePosArray[i * 3] = node.x;
        nodePosArray[i * 3 + 1] = node.y;
        nodePosArray[i * 3 + 2] = node.z;
      }
      nodePosAttr.needsUpdate = true;

      // 5.3 Atualização das Linhas de Conexão entre Nós
      let lineIndex = 0;
      const linePosArray = lineGeometry.attributes.position.array as Float32Array;
      const lineColArray = lineGeometry.attributes.color.array as Float32Array;

      for (let i = 0; i < nodeCount && lineIndex < maxLines; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodeCount && lineIndex < maxLines; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dz = n1.z - n2.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistanceSq) {
            const alpha = 1 - Math.sqrt(distSq) / maxDistance;
            const idx6 = lineIndex * 6;

            // Ponto 1 da linha
            linePosArray[idx6] = n1.x;
            linePosArray[idx6 + 1] = n1.y;
            linePosArray[idx6 + 2] = n1.z;

            // Ponto 2 da linha
            linePosArray[idx6 + 3] = n2.x;
            linePosArray[idx6 + 4] = n2.y;
            linePosArray[idx6 + 5] = n2.z;

            // Cores das extremidades com atenuação por distância
            lineColArray[idx6] = 0.39 * alpha;
            lineColArray[idx6 + 1] = 0.40 * alpha;
            lineColArray[idx6 + 2] = 0.95 * alpha;

            lineColArray[idx6 + 3] = 0.92 * alpha;
            lineColArray[idx6 + 4] = 0.28 * alpha;
            lineColArray[idx6 + 5] = 0.60 * alpha;

            lineIndex++;
          }
        }
      }

      // Limpa os slots de linha não utilizados no frame
      for (let i = lineIndex * 6; i < maxLines * 6; i++) {
        linePosArray[i] = 0;
        lineColArray[i] = 0;
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex * 2);

      // 5.4 Paralaxe Tridimensional e Rotação Geral
      worldGroup.rotation.y = elapsedTime * 0.02 + targetMouseX * 0.2;
      worldGroup.rotation.x = Math.sin(elapsedTime * 0.03) * 0.05 + targetMouseY * 0.15;

      // Câmera descendo conforme o scroll da página, navegando pelo túnel de código e conexões
      camera.position.y = -targetScrollY * 0.018;
      camera.position.x = targetMouseX * 5;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Limpeza e Descarte de Recursos WebGL
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      texturesToDispose.forEach((t) => t.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      geometriesToDispose.forEach((g) => g.dispose());
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};

export default ThreeBackground;
