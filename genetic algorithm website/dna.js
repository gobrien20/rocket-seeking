function DNA(first){
	this.genes = [];
	if(first){
		for( var i = 0; i < lifespan; i++){
			this.genes[i] = p5.Vector.random2D();
			this.genes[i].setMag(maxForce);
		}
	}

	this.crossover = function(partner){
		var newdna = new DNA(false);
		var mid = floor(random(this.genes.length));
		for(var i = 0; i < this.genes.length; i++){
			if(i > mid){
				newdna.genes[i] = this.genes[i];
			}else{
				newdna.genes[i] = partner.genes[i];
			}
		}
		return newdna;
	}

	this.mutation = function(){
		for(var i = 0; i < this.genes.length; i ++){
			if(random(1) < 0.01){
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(maxForce)
			}
		}
	}
}
