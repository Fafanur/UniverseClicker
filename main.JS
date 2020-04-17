// ease formula source https://gamedev.stackexchange.com/questions/122349/ease-out-elastic-function-with-equivalent-start-and-end-values
const width = 1000;
const height = 850;

// Variables
let myStars = [];
let myPlanet;

let starAmount = 0;

let counter;

// Upgrades
let upgradeAmount1 = 0;
let upgradeAmount2 = 0;
let upgradeAmount3 = 0;
let upgradeAmount4 = 0;
let upgradeAmount5 = 0;



function setup() 
{
	document.getElementById("upgrade1").onclick = function() {onClickUpgrade1()};
	document.getElementById("upgrade2").onclick = function() {onClickUpgrade2()};
	document.getElementById("upgrade3").onclick = function() {onClickUpgrade3()};
	document.getElementById("upgrade4").onclick = function() {onClickUpgrade4()};
	document.getElementById("upgrade5").onclick = function() {onClickUpgrade5()};
	document.getElementById("resetButton").onclick = function() {resetValues()};
	
	let canvas = createCanvas(width, height);
	canvas.parent("canvasHolder")
    for(var i = 0; i < 100; i++)
    {
      myStars.push(new StarObject(width * random(0, 1) , height * random(0, 1)));
      
    }
	
	myPlanet = new PlanetObject(width / 2, height / 2, 0);
	
	textSize(50);
	textAlign(CENTER, CENTER);
	fill(255, 255, 255);
	
	//load starAmount from key
	let curStarAmount = getItem("starAmountKey");
	if(curStarAmount !== null)
	{
		starAmount = curStarAmount;
	}
	
	//load Upgrades//
	let curUpgradeAmount1 = getItem("upgradeAmount1Key");
	if(curUpgradeAmount1 !== null)
	{
		upgradeAmount1 = curUpgradeAmount1;
	}
	
	let curUpgradeAmount2 = getItem("upgradeAmount2Key");
	if(curUpgradeAmount2 !== null)
	{
		upgradeAmount2 = curUpgradeAmount2;
	}
	
	let curUpgradeAmount3 = getItem("upgradeAmount3Key");
	if(curUpgradeAmount3 !== null)
	{
		upgradeAmount3 = curUpgradeAmount3;
	}
	
	let curUpgradeAmount4 = getItem("upgradeAmount4Key");
	if(curUpgradeAmount4 !== null)
	{
		upgradeAmount4 = curUpgradeAmount4;
	}
	
	let curUpgradeAmount5 = getItem("upgradeAmount5Key");
	if(curUpgradeAmount5 !== null)
	{
		upgradeAmount5 = curUpgradeAmount5;
	}
	
	gainPassiveIncome();
	updateView();
	myPlanet.setSize(getPlanetSize());
}

function draw() 
{
  clear();
  for(var i = 0; i < myStars.length; i++)
  {
    myStars[i].render();
  }
  
  myPlanet.render();
  
  text("Stars: " + int(starAmount), width / 2, 100);
  
  gainActiveIncome();
}

function resetValues()
{
	if(confirm("Are you sure you want to reset your progress??"))
	{
		starAmount = 0;
		storeItem("starAmountKey", 0);
		removeItem("upgradeAmount1Key");
		removeItem("upgradeAmount2Key");
		removeItem("upgradeAmount3Key");
		removeItem("upgradeAmount4Key");
		removeItem("upgradeAmount5Key");
		removeItem("lastTimeStampKey");
		location.reload();
	}
}

function increaseStarAmount(amount)
{
	starAmount += amount;
	//store staramount under key
	storeItem("starAmountKey", starAmount);
	myPlanet.setSize(getPlanetSize());
	updateView();
}

function decreaseStarAmount(amount)
{
	starAmount -= amount;
	storeItem("starAmountKey", starAmount);
	myPlanet.setSize(getPlanetSize());
	updateView();
}

function getPlanetSize()
{
	let counter = 0;
	let n = starAmount;
	while(n / 10 >= 10)
	{
		counter++;
		n /= 10;
	}
	if(counter > 5)
	{
		counter = 5;
	}
	return (counter * 125) + 300;
	
}

//Upgrades//
function updateView()
{
	document.getElementById("upgradeCost1").innerHTML = getCostUpgrade1();
	document.getElementById("upgradeAmount1").innerHTML = upgradeAmount1;
	
	document.getElementById("upgradeCost2").innerHTML = getCostUpgrade2();
	document.getElementById("upgradeAmount2").innerHTML = upgradeAmount2;
	
	document.getElementById("upgradeCost3").innerHTML = getCostUpgrade3();
	document.getElementById("upgradeAmount3").innerHTML = upgradeAmount3;
	
	document.getElementById("upgradeCost4").innerHTML = getCostUpgrade4();
	document.getElementById("upgradeAmount4").innerHTML = upgradeAmount4;
	
	document.getElementById("upgradeCost5").innerHTML = upgradeAmount5 == 5 ? "MAXED" : getCostUpgrade5();
	document.getElementById("upgradeAmount5").innerHTML = upgradeAmount5 + "/5";
	
	storeItem("lastTimeStampKey", Date.now());
}

function gainPassiveIncome()
{
	let curLastTimeStamp = getItem("lastTimeStampKey");
	if(curLastTimeStamp !== null)
	{
		let milisecondsPassed = Date.now() - curLastTimeStamp;
		doPassiveUpgradeEffect2(milisecondsPassed);
		doPassiveUpgradeEffect4(milisecondsPassed);
		// add other passive upgrades mhere;
	}
}

function gainActiveIncome()
{
	doActiveUpgradeEffect2();
	doActiveUpgradeEffect4();
}

function getClickAmount()
{
	return 1 + getUpgradeEffect1() + getUpgradeEffect3();
}

//UPGRADE1//
function onClickUpgrade1()
{
	if(starAmount >= getCostUpgrade1())
	{
		decreaseStarAmount(getCostUpgrade1());
		upgradeAmount1++;
		updateView();
		
		storeItem("upgradeAmount1Key", upgradeAmount1);
	}
}

function getCostUpgrade1()
{
	return ceil(15 * Math.pow(1.15, upgradeAmount1));
}

function getUpgradeEffect1()
{
	return upgradeAmount1 * 1;
}

//UPGRADE2//
function onClickUpgrade2()
{
	if(starAmount >= getCostUpgrade2())
	{
		decreaseStarAmount(getCostUpgrade2());
		upgradeAmount2++;
		updateView();
		
		storeItem("upgradeAmount2Key", upgradeAmount2);
	}
}

function getCostUpgrade2()
{
	return ceil(100 * Math.pow(1.15, upgradeAmount2));
}

function doPassiveUpgradeEffect2(milisecondsPassed)
{
	let secondsPassed = floor(milisecondsPassed / 1000);
	increaseStarAmount(secondsPassed * (1 * upgradeAmount2));
}

function doActiveUpgradeEffect2()
{
	let activeIncome =  (1 * upgradeAmount2)  * (deltaTime/1000);
	increaseStarAmount(activeIncome);
}

//UPGRADE3//
function onClickUpgrade3()
{
	if(starAmount >= getCostUpgrade3())
	{
		decreaseStarAmount(getCostUpgrade3());
		upgradeAmount3++;
		updateView();
		
		storeItem("upgradeAmount3Key", upgradeAmount3);
	}
}

function getCostUpgrade3()
{
	return ceil(1100 * Math.pow(1.15, upgradeAmount3));
}

function getUpgradeEffect3()
{
	return upgradeAmount3 * 8;
}

//UPGRADE4//
function onClickUpgrade4()
{
	if(starAmount >= getCostUpgrade4())
	{
		decreaseStarAmount(getCostUpgrade4());
		upgradeAmount4++;
		updateView();
		
		storeItem("upgradeAmount4Key", upgradeAmount4);
	}
}

function getCostUpgrade4()
{
	return ceil(12000 * Math.pow(1.15, upgradeAmount4));
}

function doPassiveUpgradeEffect4(milisecondsPassed)
{
	let secondsPassed = floor(milisecondsPassed / 1000);
	increaseStarAmount(secondsPassed * (47 * upgradeAmount4));
}

function doActiveUpgradeEffect4()
{
	let activeIncome =  (47 * upgradeAmount4)  * (deltaTime/1000);
	increaseStarAmount(activeIncome);
}

//UPGRADE5//
function onClickUpgrade5()
{
	if(starAmount >= getCostUpgrade5() && upgradeAmount5 < 5)
	{
		decreaseStarAmount(getCostUpgrade5());
		upgradeAmount5++;
		updateView();
		storeItem("upgradeAmount5Key", upgradeAmount5);
		
		if(upgradeAmount5 == 5)
		{
			setTimeout(function() { alert("YOU WON THE GAME. YOU OWN EVERYTHING"); }, 100);
		}
	}
}

function getCostUpgrade5()
{
	return ceil(130000 * Math.pow(1.15, upgradeAmount5));
}
//

function drawStar(x, y, radius1, radius2, npoints) 
{
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) 
  {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

//klik voor sterretjes
function mousePressed()
{
	myPlanet.clicked();
}

function StarObject(x, y)
{
  this.xPos = x;
  this.yPos = y;
  this.size = 0;
  this.rotSpeed = random(0, 1) >= 0.5 ? -100 : 100;

  this.render = function()
  {
    push();
    translate(this.xPos, this.yPos);
    rotate(frameCount / this.rotSpeed);
    drawStar(0, 0, 2, 6, 4);
    pop();
  }
}

function PlanetObject(x, y, size)
{
	this.xPos = x;
	this.yPos = y;
	this.size = size;
	this.c = color(255, 204, 0);
	
	this.curTime = 0;
	this.beginValue = this.size;
	this.newSize = this.size;
	this.isAnimating = false;
	this.animationDur = 1500;
	
	this.render = function()
	{
		if(this.isAnimating)
		{
			this.curTime = constrain(this.curTime + deltaTime, 0, this.animationDur);
			this.size = this.doAnimationStep(this.curTime, this.beginValue, this.newSize - this.beginValue, this.animationDur);
			if(this.curTime == this.animationDur)
			{
				this.isAnimating = false;
			}
		}
		
		push();
		fill(this.c);
		noStroke();
		circle(this.xPos, this.yPos , this.size);
		pop();
		
	}
	
	this.setSize = function(newSize)
	{
		this.curTime = 0;
		this.beginValue = this.size;
		this.newSize = newSize;
		this.isAnimating = true;
	}
	
	this.doAnimationStep = function(curTime, begin, change, dur)
	{
		let ts = (curTime/=dur) * curTime;
		let tc = ts*curTime;
		return begin + change*(33*tc*ts + -106*ts*ts + 126*tc + -67*ts + 15*curTime);
	}
	
	
	//voeg sterretjes toe
	this.clicked = function()
	{

		if(dist(mouseX, mouseY, this.xPos, this.yPos) < this.size / 2)
		{
			//functieIncrease
			increaseStarAmount(getClickAmount());
			
			let delta = 30;
			this.size =  this.newSize - delta;
			this.setSize(this.size + delta);
		}
	}
}




