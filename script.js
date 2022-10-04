"use strict";

var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);

var render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);

var canvas = render.domElement;
document.body.appendChild(canvas);

var materialLinha = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
var pontos = [];
var raio = 1;

// for (var ang = 0; ang <= Math.PI * 2; ang += Math.PI / 50){
//     var x = raio * Math.cos(ang);
//     var y = raio * Math.sin(ang);
//  pontos.push(new THREE.Vector3(x, y, 0));
// }

//Fechar o círculo
// var x = raio * Math.cos(ang);
// var y = raio * Math.sin(ang);
//pontos.push(new THREE.Vector3(x, y, 0));

// forma não paramétrica
// for (var y = -1; y <= 1; y += 0.01){
//     var x = Math.sqrt(raio * raio - y * y);
//     pontos.push(new THREE.Vector3(x, y, 0));
// }

// for (var x = -1; x <= 1; x += 0.01){
//     var y = Math.sqrt(raio * raio - x * x);
//     pontos.push(new THREE.Vector3(x, y, 0));
// }

// curva de Hermite
// var p1 = new THREE.Vector3(-0.5, 0, 0);
// var t1 = new THREE.Vector3(-2, 2, 0); //coordenada assumindo o p1 como origem - indicação de sentido
// var p2 = new THREE.Vector3(0.5, 0, 0);
// var t2 = new THREE.Vector3(1, 1, 0);

// for(var s = 0; s <= 1; s += 0.01){
//     var s2 = s * s;
//     var s3 = s2 * s;
//     var h1 = 2 * s3 - 3 * s2 + 1;
//     var h2 = -2 * s3 + 3 * s2;
//     var h3 = s3 - 2 * s2 + s;
//     var h4 = s3 - s2;
//     var pt = new THREE.Vector3(0, 0, 0);

//     pt.add(p1.clone().multiplyScalar(h1));
//     pt.add(p2.clone().multiplyScalar(h2));
//     pt.add(t1.clone().multiplyScalar(h3));
//     pt.add(t2.clone().multiplyScalar(h4));
//     pontos.push(pt);
// }

//curva de Bézier
var curva = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-0.5, 1.5, 0),
    new THREE.Vector3(2, 1.5, 0),
    new THREE.Vector3(1, 0, 0),
);
pontos = curva.getPoints( 30 ); //resolução

var geometriaLinha = new THREE.BufferGeometry().setFromPoints( pontos );
var linha = new THREE.Line(geometriaLinha, materialLinha);

cena.add(linha);
camera.position.z = 5;

function desenhar(){
    render.render(cena, camera);
    requestAnimationFrame(desenhar);
}

requestAnimationFrame(desenhar);