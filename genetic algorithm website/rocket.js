function Rocket(hue, dna){
	this.pos = createVector(width/2, height - 10);
	this.vel = createVector();
	this.acc = createVector();
	if(dna){
		this.dna = dna;
	}else{
		this.dna = new DNA(true);
	}
	this.fitness = 0;
	this.completed = false;
	this.crashed = false;
	this.hue = hue;

	this.applyForce = function(force){
		this.acc.add(force);
	}

	this.calcFitness = function(){
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		this.fitness = map(d, 0, width, width, 0);

		if(this.completed){
			this.fitness *= 10;
		}else if(this.crashed){
      this.fitness -= 10;
		}
	}

	this.update = function(){

		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		if(d < 20){
			this.completed = true;
			this.pos = target.copy();
		}

		for(var barrier of barriers){
			if((this.pos.x > barrier.x && this.pos.x < barrier.x + barrier.w &&
				this.pos.y > barrier.y && this.pos.y < barrier.y + barrier.h)){
				 this.crashed = true;
	       this.fitnes /= 10;
			}
		}

		if((this.pos.x > width || this.pos.x < 0)||
			(this.pos.y > height || this.pos.y < 0)){
			this.crashed = true;
		}

		this.applyForce(this.dna.genes[count]);
		if(!this.completed && !this.crashed){
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
			this.vel.limit(4);
		}
	}

	this.show = function(){
		push();
		colorMode(HSB, 255);
		noStroke();
		fill(this.hue, 255, 255);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		rectMode(CENTER);
		rect(0, 0, 25, 5);
		pop();
	}
}
