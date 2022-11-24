G.AddData({
name:'Mod Test',
author:'Orteil',
desc:'A simple example mod that adds hot peppers and hot sauce.',
engineVersion:1,
manifest:'myModManifest.js',
requires:['Default dataset*'],
sheets:{'icon':'img/iconSheet.png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{
	var numbersInfo='//The number on the left is how many are in use, while the number on the right is how many you have in total.';
	
	//First we create a couple new resources :
	new G.Res({
		name:'torch',
		desc:'A simple portable light source made by lighting the end of a [stick] on fire. Helpful for [wanderer]s and [scout]s.' +numbersInfo,
		displayUsed:true,
		icon:[6,1],
		category:'gear',
	});
	
	//Then we augment the base data to incorporate our new resources :
		//adding hot pepper as something that can be gathered from grass
	G.getDict('grass').res['gather']['torch']=3;
		//adding a new mode to artisans so they can make hot sauce from hot peppers
	G.getDict('firekeeper').modes['torch']={name:'Light torches',desc:'Wrap 3 flammable [herb]s around a [stick] to create a torch.',req:{'torch-making':true}};
		//adding a new effect to artisans that handles the actual hot sauce preparing and is only active when the unit has the mode "hot sauce"
	G.getDict('firekeeper').effects.push({type:'convert',from:{'stick':1,'herb':3},into:{'torch':1},every:3,mode:'torch'});
	
	//Then we add a new technology which is required by the artisans to gain access to the "hot sauce" mode :
	new G.Tech({
		name:'torch-making',
		desc:'@[artisan]s can now produce [torch]es@Unlocks a new modes for [wanderer]s and [scout]s which increase searching speed using torches// by wrapping flammable [herb]s around a [stick] and setting fire to it, we create a portable light.',
		icon:[0,1],
		cost:{'insight':10},
		req:{'speech':true},
	});
	new G.Tech({
		name:'steam-power',
		desc:'@unlocks the [power plant] and the [battery]// by heating [water] with [coal], we can create steam to power various devices.',
		icon:[3,2]],
		cost:{'insight':10},
		req:{'speech':true},
	});
	
	//Finally, we add a trait that amplifies the benefits of consuming hot sauce; it will take on average 20 years to appear once the conditions (knowing the "Hot sauce preparing" tech) is fulfilled.
	new G.Trait({
		name:'hot sauce madness',
		desc:'@your people appreciate [hot sauce] twice as much and will be twice as happy from consuming it.',
		icon:[1,1],
		chance:0.1,
		req:{'torch-making':true},
		effects:[
			{type:'function',func:function(){G.getDict('hot sauce').turnToByContext['eat']['happiness']=0.2;}},//this is a custom function executed when we gain the trait
		],
	});
	
	//There are many other ways of adding and changing content; refer to /data.js, the default dataset, if you want to see how everything is done in the base game. Good luck!
}
});
