/**
 * Player
 */
class Player {
    constructor() {
        this.pos = new THREE.Vector2(-10, 0);
        this.vel = new THREE.Vector2(0, 0);
        this.acc = new THREE.Vector2(10, 0);
        this.angle = 0;

        this.maxSpeed = 1;

        this.lasers = [];

        // let spriteMap = new THREE.TextureLoader().load("./assets/images/Space Ship.png");

        // let spriteMaterial = new THREE.SpriteMaterial({
        //     map: spriteMap,
        //     color: 0xffffff
        // });
        // this.shipSprite = new THREE.Sprite(spriteMaterial);
        // scene.add(this.shipSprite);

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

        this.shipSprite = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({}));
        this.shipSprite.castShadow = true; //default is false
        this.shipSprite.receiveShadow = true; //default false
        this.shipSprite.name = "Player Ship Sprite";
        scene.add(this.shipSprite);

    }

    update() {
        let targetVector = controller.mouse.clone();
        targetVector.sub(this.pos);
        this.angle = targetVector.angle();

        if (controller.uparrow) {
            let thrust = new THREE.Vector2(3, 0);
            thrust.rotateAround(new THREE.Vector2(0, 0), this.angle);
            this.acc.add(thrust);
        }
        if (controller.downarrow) {
            let thrust = new THREE.Vector2(-3, 0);
            thrust.rotateAround(new THREE.Vector2(0, 0), this.angle);
            this.acc.add(thrust);
        }
        if (controller.leftarrow) {
            let thrust = new THREE.Vector2(3, 0);
            thrust.rotateAround(new THREE.Vector2(0, 0), this.angle + Math.PI / 2);
            this.acc.add(thrust);
        }
        if (controller.rightarrow) {
            let thrust = new THREE.Vector2(3, 0);
            thrust.rotateAround(new THREE.Vector2(0, 0), this.angle - Math.PI / 2);
            this.acc.add(thrust);
        }

        if (controller.keyCodes[32]) {
            this.fireLaser();
        }

        this.acc.multiplyScalar(deltaTime);

        this.vel.add(this.acc);
        this.vel.clampLength(-this.maxSpeed, this.maxSpeed);

        this.pos.add(this.vel);
        this.shipSprite.position.set(this.pos.x, this.pos.y, 0);
        // this.shipSprite.material.rotation = this.angle - Math.PI / 2;
        this.shipSprite.rotation.z = this.angle - Math.PI / 2;
        this.acc.multiplyScalar(0);

        this.vel.multiplyScalar(0.99);

        for (let i = 0; i < this.lasers.length; i++) {
            this.lasers[i].update();
            if (this.lasers[i].outofbounds()) {
                // console.log("outofbounds");
                this.lasers[i].remove();
                this.lasers.splice(i, 1);
            }
        }

        // console.log("this.acc.x == " + this.acc.x);
        // console.log("this.vel.x == " + this.vel.x);
        // console.log("this.pos.x == " + this.pos.x);



        // if (this.acc.x.isNaN()) {
        //     console.error("this.acc.x == " + this.acc.x);
        // }
        // if (this.vel.x.isNaN()) {
        //     console.error("this.vel.x == " + this.vel.x);
        // }
        // if (this.pos.x.isNaN()) {
        //     console.error("this.pos.x == " + this.pos.x);
        // }
    }

    // render() { }

    fireLaser() {
        // console.log("laser fire");

        let dir = new THREE.Vector2(2, 0);
        dir.rotateAround(new THREE.Vector2(0, 0), this.angle);

        dir.add(this.vel);

        this.lasers.push(new Laser(this.pos, dir, this.angle));
    }
}