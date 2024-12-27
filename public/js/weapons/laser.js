class Laser {
    constructor(_pos, _vel, _angle) {
        this.pos = new THREE.Vector2(_pos.x, _pos.y);
        this.vel = new THREE.Vector2(_vel.x, _vel.y);
        this.acc = new THREE.Vector2(0, 0);
        this.angle = _angle;

        // let spriteMap = new THREE.TextureLoader().load("./assets/images/Space Ship.png");
        // let spriteMaterial = new THREE.SpriteMaterial({
        //     map: spriteMap,
        //     color: 0xffffff
        // });

        this.scale = 0.1;

        var rectShape = new THREE.Shape();

        rectShape.moveTo(0, 0);
        rectShape.lineTo(0, 11 * this.scale);
        rectShape.lineTo(11 * this.scale, -6 * this.scale);
        rectShape.lineTo(5 * this.scale, -10 * this.scale);
        rectShape.lineTo(0, -6 * this.scale);
        rectShape.lineTo(-5 * this.scale, -10 * this.scale);
        rectShape.lineTo(-11 * this.scale, -6 * this.scale);
        rectShape.lineTo(0, 11 * this.scale);
        rectShape.lineTo(0, 0);

        var geometry = new THREE.ShapeBufferGeometry(rectShape);

        var material = new THREE.MeshPhongMaterial({  
            color: 0xffffff,
        });

        this.shipSprite = new THREE.Mesh(geometry, material);
        this.shipSprite.castShadow = false; //default is false
        this.shipSprite.receiveShadow = false; //default false
        this.shipSprite.name = "Player Laser Sprite";
        scene.add(this.shipSprite);

        // this.shipSprite = player.shipSprite.clone();
        // scene.add(this.shipSprite);
    }

    update() {        
        this.acc.multiplyScalar(deltaTime);

        this.vel.add(this.acc);

        this.pos.add(this.vel);
        this.shipSprite.position.set(this.pos.x, this.pos.y, 0);
        this.shipSprite.rotation.z = this.angle - Math.PI / 2;
        this.acc.multiplyScalar(0);

        // console.log("this.acc.x == " + this.acc.x);
        // console.log("this.vel.x == " + this.vel.x);
        // console.log("this.pos.x == " + this.pos.x);
    }

    outofbounds() {
        // x
        if (world.width / 2 < this.pos.x) {
            return true;
        }
        if (-world.width / 2 > this.pos.x) {
            return true;
        }
        // y
        if (world.height / 2 < this.pos.y) {
            return true;
        }
        if (-world.height / 2 > this.pos.y) {
            return true;
        }
        return false;
    }

    remove() {
        scene.remove(this.shipSprite);
    }

    // render() { }
}