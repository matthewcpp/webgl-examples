import {glMatrix} from "gl-matrix";
import {Arcball, Loader, LightType, Node, Scene} from "webgl"

let webGl: Scene = null;

window.onload = async () => {
    glMatrix.setMatrixArrayType(Array);
    let glCanvas = document.querySelector("#gl-canvas") as HTMLCanvasElement;
    glCanvas.oncontextmenu = () => false;

    webGl = new Scene(glCanvas);
    await webGl.init();

    const loader = new Loader(webGl);
    await loader.load("/models/OrientationTest/OrientationTest.gltf");

    const directionalLight = new Node();
    directionalLight.components.light = webGl.createLight(LightType.Directional, directionalLight);
    directionalLight.position = [0.0, 3, 0.0];
    directionalLight.rotation = [50.0, -30.0, 0.0];
    directionalLight.updateMatrix();
    webGl.rootNode.addChild(directionalLight);

    const updatedWorldBounding = webGl.calculateWorldBounding();

    const arcball = new Arcball(webGl.mainCamera.node, webGl);
    arcball.setInitial(updatedWorldBounding);
    webGl.mainCamera.node.components.behavior = arcball;

    webGl.start();
}