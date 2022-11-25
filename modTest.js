G.AddData({
name:'Mod Test',
author:'Orteil',
desc:'I don't know yet.',
engineVersion:1,
manifest:0,
requires:['Default dataset*'],
sheets:{'icon':'img/iconSheet.png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{
	var numbersInfo='//The number on the left is how many are in use, while the number on the right is how many you have in total.';
	
	//First we create a couple new resources :
	new G.Res({ 
		name:'power', 
		desc:'[power] comes in many different forms, such as steam turbines or voltage. Either way, they are all used by many machines.' +numbersInfo, 
		limit:'power-storage', 
		icon:[6,1], 
		category:'essentials'
	});
	new G.Res({ 
		name:'power-torage', 
		hidden = true,
		icon:[6,1], 
	});
	new G.Res({
		name:'torch',
		desc:'A simple portable light source made by lighting the end of a [stick] on fire. Helpful for [wanderer]s and [scout]s.' +numbersInfo,
		displayUsed:true,
		icon:[6,1],
		category:'gear',
	});
	
	//Then we augment the base data to incorporate our new resources :
	G.getDict('grass').res['gather']['power']=3;
	G.getDict('firekeeper').modes['torch']={name:'Light torches',desc:'Wrap 3 flammable [herb]s around a [stick] to create a torch.',req:{'torch-making':true}};
	G.getDict('firekeeper').effects.push({type:'convert',from:{'stick':1,'herb':3},into:{'torch':1},every:3,mode:'torch'});
	
	new G.Tech({
		name:'torch-making',
		desc:'@[artisan]s can now produce [torch]es@Unlocks a new modes for [wanderer]s and [scout]s which increase searching speed using torches// by wrapping flammable [herb]s around a [stick] and setting fire to it, we create a portable light.',
		icon:[0,1],
		cost:{'insight':10},
		req:{'speech':true},
	});

	new G.Trait({
		name:'herbidity',
		desc:'@your people appreciate [herb]s twice as much and will be twice as happy from consuming it.',
		icon:[6,1],
		chance:0.1,
		req:{'torch-making':true},
		effects:[
			{type:'function',func:function(){G.getDict('herb').turnToByContext['eat']['happiness']=0.2;}},//this is a custom function executed when we gain the trait
		],
	});
	
	//There are many other ways of adding and changing content; refer to /data.js, the default dataset, if you want to see how everything is done in the base game. Good luck!
}
});
