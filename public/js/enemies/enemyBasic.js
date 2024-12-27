

/**
 * EnemyBasic
 */
class EnemyBasic {

    constructor(_pos) {
        this.pos = new THREE.Vector2(_pos.x, _pos.y);
        this.vel = new THREE.Vector2(0, 0);
        this.acc = new THREE.Vector2(10, 0);
        this.angle = 0;
        this.maxSpeed = 1;

        this.health = 100;
    
        this.scale = 0.1;
        this.createShipSprite();

        scene.add(this.shipSprite);

    }

    update() {
        let targetVector = controller.mouse.clone();
        targetVector.sub(this.pos);
        this.angle = targetVector.angle();

        // if (controller.uparrow) {
            let thrust = new THREE.Vector2(3, 0);
            thrust.rotateAround(new THREE.Vector2(0, 0), this.angle);
            this.acc.add(thrust);
        // }
        // if (controller.downarrow) {
        //     let thrust = new THREE.Vector2(-3, 0);
        //     thrust.rotateAround(new THREE.Vector2(0, 0), this.angle);
        //     this.acc.add(thrust);
        // }
        // if (controller.leftarrow) {
        //     let thrust = new THREE.Vector2(3, 0);
        //     thrust.rotateAround(new THREE.Vector2(0, 0), this.angle + Math.PI / 2);
        //     this.acc.add(thrust);
        // }
        // if (controller.rightarrow) {
        //     let thrust = new THREE.Vector2(3, 0);
        //     thrust.rotateAround(new THREE.Vector2(0, 0), this.angle - Math.PI / 2);
        //     this.acc.add(thrust);
        // }

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

    }

    // render() { }

    // function for when this ship is hit by a laser
    damage() {
        this.health -= 10;
        if (this.health <= 0) {
            // destroy the ship
        }
    }

    fireLaser() {
        // console.log("laser fire");

        let dir = new THREE.Vector2(2, 0);
        dir.rotateAround(new THREE.Vector2(0, 0), this.angle);

        dir.add(this.vel);

        lasers.push(new Laser(this.pos, dir, this.angle));
    }

    createShipSprite() {
        var shipShape = new THREE.Shape();
        shipShape.moveTo(0, 0);
        shipShape.lineTo(0, 11 * this.scale);
        shipShape.lineTo(11 * this.scale, -6 * this.scale);
        shipShape.lineTo(5 * this.scale, -10 * this.scale);
        shipShape.lineTo(0, -6 * this.scale);
        shipShape.lineTo(-5 * this.scale, -10 * this.scale);
        shipShape.lineTo(-11 * this.scale, -6 * this.scale);
        shipShape.lineTo(0, 11 * this.scale);
        shipShape.lineTo(0, 0);

        var geometry = new THREE.ShapeBufferGeometry(shipShape);

        var material = new THREE.MeshPhongMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide
        });

        this.shipSprite = new THREE.Mesh(geometry, material);
        this.shipSprite.castShadow = true; //default is false
        this.shipSprite.receiveShadow = true; //default false
        this.shipSprite.name = "Enemy Basic Ship Sprite";

        // let spriteMap = new THREE.TextureLoader().load("./assets/images/Space Ship.png");

        // let spriteMaterial = new THREE.SpriteMaterial({
        //     map: spriteMap,
        //     color: 0xffffff
        // });
        // this.shipSprite = new THREE.Sprite(spriteMaterial);
        // scene.add(this.shipSprite);
    }

}