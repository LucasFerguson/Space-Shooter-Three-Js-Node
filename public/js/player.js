class Player {
    constructor() {
        this.pos = new THREE.Vector2(-10, 0);
        this.vel = new THREE.Vector2(0, 0);
        this.acc = new THREE.Vector2(10, 0);
        this.angle = 0;

        this.maxSpeed = 1;

        let spriteMap = new THREE.TextureLoader().load("./assets/images/Space Ship.png");

        let spriteMaterial = new THREE.SpriteMaterial({
            map: spriteMap,
            color: 0xffffff
        });
        this.shipSprite = new THREE.Sprite(spriteMaterial);
        scene.add(this.shipSprite);
    }

    update() {
        let targetVector = controller.mouse.clone();
        targetVector.sub(this.pos);
        this.angle = targetVector.angle();


        if (controller.uparrow) {
            let thrust = new THREE.Vector2(2, 0);
            thrust.rotateAround(new THREE.Vector2(0, 0), this.angle);

            // thrust.multiplyScalar(deltaTime * 0.01);

            // thrust = this.awwwwngle;
            // console.log(thrust);

            // thrust = p5.Vector.mult(thrust, 10)
            this.acc.add(thrust);
        }

        // console.log(this.angle);


        this.acc.multiplyScalar(deltaTime);

        this.vel.add(this.acc);
        this.vel.clampLength(-this.maxSpeed, this.maxSpeed);

        // this.vel.multiplyScalar(deltaTime);

        this.pos.add(this.vel);
        this.shipSprite.position.set(this.pos.x, this.pos.y, 0);
        this.shipSprite.material.rotation = this.angle + -Math.PI / 2;
        this.acc.multiplyScalar(0);

        // console.log(this.pos, this.vel, this.acc);

        // this.vel.multiplyScalar(0.95);

        console.log("this.acc.x == " + this.acc.x);
        console.log("this.vel.x == " + this.vel.x);
        console.log("this.pos.x == " + this.pos.x);



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

    // render() {

    // }
}