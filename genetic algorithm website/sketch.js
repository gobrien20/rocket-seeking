var population;
var lifespan = 500;
var count = 0;
var target;
var barriers = [];
var maxForce = 0.2;
var gens = 0;
var xinp;
var yinp;
var winp;
var hinp;
var addNew;
var reset;

function setup() {
  createCanvas(600, 400);
	population = new Population();
	lifeP = createP();
	gensP = createP();
	target = createVector(width/2, 50);
  barriers.push(new Barrier(200, 150, 200, 5));
  xinp = createInput("", "number");
  xinp.size(50);
  yinp = createInput("", "number");
  yinp.size(50);
  winp = createInput("", "number");
  winp.size(50);
  hinp = createInput("", "number");
  hinp.size(50);
  addNew = createButton("Add Barrier");
  addNew.mousePressed(addBarrier);
  reset = createButton("Regenerate");
  reset.mousePressed(regenerate);
}

function draw() {
	for(var i = 0; i < 10; i++){
		background(0);
		population.run();
		lifeP.html(count);
		gensP.html("No of gens " + gens);
		count++;
		if(count >= lifespan){
			population.evaluate();
			population.selection();
			count = 0;
			gens++;
		}
	}

	fill(255);

  for(var barrier of barriers){
    barrier.show();
  }

	ellipse(target.x, target.y, 20, 20);
}

function addBarrier(){
  barriers.push(new Barrier(int(xinp.value()), int(yinp.value()), int(winp.value()), int(hinp.value())));
}

function regenerate(){
  population = new Population();
  count = 0;
  gens = 0;
  console.log("new");
}
