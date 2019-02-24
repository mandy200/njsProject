var easycam;
var canvas;
var managerOfPolygon = {};
var polygons = [];
var up = {x:0,y:0,z:0};
var rotation = {x:0,y:0,z:0};
var sizeOfGround = 100;
var speed = 15;

var reflectionCube;
var material1;
var material2;
var mouse = new THREE.Vector2();
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
var camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 2000 );
var controls = new THREE.OrbitControls( camera, renderer.domElement );
var scene = new THREE.Scene();
var matFloor = new THREE.MeshPhongMaterial();
var matBox = new THREE.MeshPhongMaterial( { color: 0xaaaaaa } );
var geoFloor = new THREE.PlaneBufferGeometry( 200, 200 );
var geoBox = new THREE.BoxBufferGeometry( 3, 1, 2 );
var mshFloor = new THREE.Mesh( geoFloor, matFloor );
mshFloor.rotation.x = - Math.PI * 0.5;
var mshBox = new THREE.Mesh( geoBox, matBox );
var ambient = new THREE.AmbientLight( 0xFFFFFF );
var dirLight;
var cubeMaterial;
var container = document.getElementById("container");

var gui ;
managerOfPolygon.addPolygon = function (points,name) {
    //console.log(points);
    var values = points.map(function(x) {
        return {x:x.x*0.1,y:x.y*0.1};
    });
    var p = new Polygon();
    for(var point = 0;point<values.length;point++) {
        if(point+1 == values.length) {
            p.addVerteces({x: values[point].x, y: 0, z: values[point].y});
            p.addVerteces({x: values[0].x, y: 0, z: values[0].y});
            p.addVerteces({x: values[0].x, y: 5, z: values[0].y});
            p.addVerteces({x: values[point].x, y: 5, z: values[point].y});
            //console.log("defined");
        }else {
            p.addVerteces({x: values[point].x, y: 0, z: values[point].y});
            p.addVerteces({x: values[point+1].x, y: 0, z: values[point+1].y});
            p.addVerteces({x: values[point+1].x, y: 5, z: values[point+1].y});
            p.addVerteces({x: values[point].x, y: 5, z: values[point].y});
            //console.log("undefined");
        }
        //augmentation du terrain
        if(values[point].x> sizeOfGround)
            sizeOfGround = values[point].x+5;
        if(values[point].z> sizeOfGround)
            sizeOfGround = values[point].z+5;
    }
    polygons.push(p);
    var group = new THREE.Object3D();
    group.shopName = name[0].Name;
    if(values.length>0) {
        var walls = (p.getWalls());
        var roof = p.getRoof();
        group.add(walls);
        group.add(roof);
        scene.add(group);
    }
}
managerOfPolygon.selectPolygon = function(name) {
    scene.children.forEach((object) => {
        if(object.shopName !== undefined) {
            if (object.shopName === name) {
                //alert("found");
                setColorOfGroup(object.children,"rgb(255, 0, 0)");
            } else {
                //console.log(object);
                setColorOfGroup(object.children,0xCECECE);
            }
        }
    })
}
function setColorOfGroup(group, color)
{
    for(var i = 0; i<group.length;i++){
        group[i].material.color = new THREE.Color(color);
    }
}

class Polygon {
    constructor() {
        this.verteces = [];
        this.geometry;
        this.roof;
        this.center = function(){
            var sumx =0;
            var sumy = 0;
            for(var i=0;i<this.verteces.length;i++)
            {
                sumx+=this.verteces[i].x;
                sumy+=this.verteces[i].z;
            }
            return {x:sumx/this.verteces.length,y:sumy/this.verteces.length}
        };
        this.getRoof = function(){
            var points = [];

            for(var i = 0;i<this.verteces.length;i+=4){
              points.push(new THREE.Vector2(this.verteces[i].x,this.verteces[i].z));
              points.push(new THREE.Vector2(this.verteces[i+1].x,this.verteces[i+1].z));
            }
            points.push(new THREE.Vector2(this.verteces[0].x,this.verteces[0].z));
            //try with shape.moveTo and lineTo
            /*
            shape.moveTo(this.verteces[0].x,5,this.verteces[0].z);
            shape.lineTo(this.verteces[1].x,5,this.verteces[1].z);
            for(var i = 4;i<this.verteces.length;i+=4){
                shape.lineTo(this.verteces[i].x,5,this.verteces[i].z);
                shape.lineTo(this.verteces[i+1].x,5,this.verteces[i+1].z);
            }*/
            //shape.lineTo(this.verteces[0].x,5,this.verteces[0].z);
              //triangulateShape(shape,[]);
              //mesh.RotateX(Math.PI/2);
            var shape = new THREE.Shape(points);
            var geometry = new THREE.ShapeBufferGeometry( shape );
            var mesh = new THREE.Mesh( geometry, material2.clone() ) ;
            mesh.rotation.x = Math.PI/2;
            mesh.position.y = 5;
            //scene.add( mesh );
              return mesh;
        }
        this.getWalls = function() {
            this.constructShape();
            var object = new THREE.Mesh( this.geometry, material1.clone());
            //console.log(object);
            object.castShadow = true;
            object.receiveShadow = true;
            return object;
        };
        this.constructShape = function() {
            //console.log(this);
            //drawing all the walls
            //var theCenter = this.center();
            //var normalDir = new THREE.Vector3();
            this.geometry = new THREE.Geometry();
           for(var counter = 0 ; counter< this.verteces.length;counter+=4) {
               this.geometry.vertices.push(new THREE.Vector3(this.verteces[counter].x, this.verteces[counter].y, this.verteces[counter].z),
                   new THREE.Vector3(this.verteces[counter+1].x, this.verteces[counter+1].y, this.verteces[counter+1].z),
                   new THREE.Vector3(this.verteces[counter + 2].x, this.verteces[counter + 2].y, this.verteces[counter + 2].z),
                   new THREE.Vector3(this.verteces[counter + 3].x, this.verteces[counter + 3].y, this.verteces[counter + 3].z));
               this.geometry.faces.push(new THREE.Face3(counter,counter+1,counter+3),
                   new THREE.Face3(counter+3,counter+1,counter+2));
               //var middle = {x:this.verteces[counter].x-this.verteces[counter+1].x,y:this.verteces[counter].y-this.verteces[counter+1].y}
               //normalDir.subVectors((theCenter.x,0,theCenter.y),(middle.x,0,middle.y)).normalize();
               this.geometry.computeFlatVertexNormals();
           }

           //finish the store
            /*
            beginShape();
            vertex(this.verteces[0].x, this.verteces[0].y, this.verteces[0].z);
            vertex(this.verteces[1].x, this.verteces[1].y, this.verteces[1].z);
            vertex(this.verteces[this.verteces.length-1].x, this.verteces[this.verteces.length-1].y, this.verteces[this.verteces.length-1].z);
            vertex(this.verteces[this.verteces.length-2].x, this.verteces[this.verteces.length-2].y, this.verteces[this.verteces.length-2].z);
            endShape(CLOSE);*/
        };
        this.addVerteces = function(vertex) {
            this.verteces.push(vertex);
        }
    }
}
if ( WEBGL.isWebGLAvailable() === false ) {
    container.appendChild( WEBGL.getWebGLErrorMessage() );
}

function init() {
    container = document.getElementById("container");
    renderer.setSize($(container).width(), $(container).height());
    //renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    camera.position.set( 46, 22, - 21 );
    setSkybox();
    var texture1 = new THREE.TextureLoader().load( "/javascripts/MapManager/textures/water.jpg" );
    texture1.wrapS = THREE.RepeatWrapping;
    texture1.wrapT = THREE.RepeatWrapping;
    texture1.repeat.set( 4, 4 );
    matFloor.color.set( 0x808080 );
    mshFloor.receiveShadow = true;
    mshFloor.position.set( 0, - 0.05, 0 );
    mshFloor.material = new THREE.MeshToonMaterial({map:texture1, opacity:0.5,transparent : true});

    scene.add( mshFloor );
    //scene.add( mshBox );
    scene.add( ambient );
    //dirlight
    dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( - 1, 1.75, 1 );
    dirLight.position.multiplyScalar( 30 );
    scene.add( dirLight );
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    var d = 50;
    dirLight.shadow.camera.left = - d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = - d;
    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = - 0.0001;
    //skybox
    onResize();
    var texture2 = new THREE.TextureLoader().load( "/javascripts/MapManager/textures/carrelage.jpg" );
    texture2.repeat.set( 0.5, 0.5 );
    var texture3 = new THREE.TextureLoader().load( "/javascripts/MapManager/textures/couverture-04.jpg" );
    texture3.wrapS = THREE.RepeatWrapping;
    texture3.wrapT = THREE.RepeatWrapping;
    texture3.repeat.set( 0.5, 0.5 );
    material1 = new THREE.MeshPhongMaterial( { color: 0xCECECE, side: THREE.DoubleSide ,envMap: reflectionCube, reflectivity: 0.3 ,map : texture2} );
    material2 = new THREE.MeshPhongMaterial( { color: 0xCECECE, side: THREE.DoubleSide ,envMap: reflectionCube, reflectivity: 0.3 ,map : texture3} );
    window.addEventListener( 'resize', onResize, false );
    controls.target.set( 0, 7, 0 );
    controls.minDistance = 5;
    controls.maxDistance = 60;
    controls.maxPolarAngle = Math.PI / 2;
    controls.update();
    container.appendChild( renderer.domElement );
}
function setSkybox() {
    var r = "/javascripts/MapManager/textures/cube/Bridge2/";
    var urls = [ r + "posx.jpg", r + "negx.jpg",
        r + "posy.jpg", r + "negy.jpg",
        r + "posz.jpg", r + "negz.jpg" ];
    reflectionCube = new THREE.CubeTextureLoader().load( urls );
    reflectionCube.format = THREE.RGBFormat;

    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = reflectionCube;

    var material = new THREE.ShaderMaterial( {
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
    });
    //and material
    var cubeShader = THREE.ShaderLib[ "cube" ];
    cubeMaterial = new THREE.ShaderMaterial( {
        fragmentShader: cubeShader.fragmentShader,
        vertexShader: cubeShader.vertexShader,
        uniforms: cubeShader.uniforms,
        depthWrite: false,
        side: THREE.DoubleSide
    } );
    cubeMaterial.uniforms[ "tCube" ].value = reflectionCube;
    Object.defineProperty( cubeMaterial, 'map', {
        get: function () {
            return this.uniforms.tCube.value;
        }
    } );

    mesh = new THREE.Mesh(new THREE.BoxGeometry(1000, 1000, 1000), material);
    scene.add(mesh);
}
function onResize() {
    camera.aspect = $(container).width() / $(container).height();
    camera.updateProjectionMatrix();
    renderer.setSize($(container).width(), $(container).height());
    /*camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );*/
}
function animate() {
}
function render() {
    renderer.render( scene, camera );
    requestAnimationFrame( render );
}
init();
render();
animate();