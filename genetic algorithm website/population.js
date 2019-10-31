function Population(){
	this.rockets = [];
	this.popsize = 50;
	this.matingPool = [];
	var hues = [];

	for(var j = 0; j < this.popsize; j++){
		hues[j] = random(255);
	}

	for(var i = 0; i < this.popsize; i++){
		this.rockets[i] = new Rocket(hues[i]);
	}

	this.run = function(){
		for(var i = 0; i < this.popsize; i++){
			this.rockets[i].update();
			this.rockets[i].show();
		}
	}

	this.evaluate = function(){
		this.matingPool = [];
		for(var i = 0; i < this.popsize; i++){
			this.rockets[i].calcFitness();
			var n  = this.rockets[i].fitness * 100;
			for(var j = 0; j < n; j++){
				this.matingPool.push(this.rockets[i]);
			}
		}
	}

	this.selection = function(){
		var newRockets = [];
		for(var i = 0; i < this.rockets.length; i++){
			var parentA = random(this.matingPool);
			var parentB = random(this.matingPool);
			var dnaparentA = parentA.dna;
			var dnaparentB = parentB.dna;
			if(random(1) < 0.5){
				hue = parentA.hue + randomGaussian(0, 20)
			}else{
				hue = parentB.hue + randomGaussian(0, 20)
			}
			var child = dnaparentA.crossover(dnaparentB);
			child.mutation();
			newRockets[i] = new Rocket(hue, child);
		}
		this.rockets = newRockets;
	}
}
