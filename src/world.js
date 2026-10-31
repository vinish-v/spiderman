import * as three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import earthTextureUrl from "./assets/earth_atmos_2048.jpg";

export function initEarth(container) {
    const w = 500;
    const h = 500;
    const renderer = new three.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);

    // Clean up previous canvas if any
    container.querySelectorAll("canvas").forEach((el) => el.remove());
    container.appendChild(renderer.domElement);

    const fov = 75;
    const aspect = w / h;
    const near = 0.1;
    const far = 10;
    const camera = new three.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new three.Scene();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.3;
    controls.enableZoom = false;

    const textureLoader = new three.TextureLoader();
    const earthTexture = textureLoader.load(earthTextureUrl);
    earthTexture.colorSpace = three.SRGBColorSpace;

    const geo = new three.IcosahedronGeometry(1, 32);
    const mat = new three.MeshStandardMaterial({
        color: "white", flatShading: true, map: earthTexture, roughness: 0.7, metalness: 0.1
    });
    const mesh = new three.Mesh(geo, mat);
    scene.add(mesh);

    const hemLight = new three.HemisphereLight(0xffffff, 0xffffff, 3);
    scene.add(hemLight);

    let animationId;
    function animate() {
        animationId = requestAnimationFrame(animate);
        mesh.scale.set(1, 1, 1);
        mesh.rotation.y += 0.005;

        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    return () => {
        cancelAnimationFrame(animationId);
        renderer.dispose();
    };
}