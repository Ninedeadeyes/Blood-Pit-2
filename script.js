let storyInput=document.querySelector("#story");
let achInput=document.querySelector("#ach");
let rankInput=document.querySelector("#rank");
let invInput=document.querySelector("#inv");
let clickButton=document.querySelector("#click");
const bkMusic = document.querySelector("#theme");
let musicOn=false;
let firstClick=false;  // Used when reload data 
//Achievements variables 
let killCount=0;
let goblinCount=0;
let clickCount=0;
let firstArtFound=false;
let lastArtFound=false;
// inventory 
let inventory =[];
//Quest variables
let gainGold;
let newEnemyNum;
let newNpc;
let newNpcDesc;
let newNpcDesc2;
let newEnvir;
let newEnemyDesc;
let newEnemy; 
let newEnemyAction;
let newQuestItem;
let newQuestAction;
let newQuestAdvance;
let newQuestDesc;
let quest;
let questChoice;
//exp and levelling 
let gainXp;
let accumXp=0;
let levelBreak=120;
let rare=80;
//equipment and Artifact 
let equipmentChance;  // Chance of getting equipment 
let equipChoice;    // What type of equipment 
let equip;  // Which equipiment item once type of equipment has been picked 
let foundItem=false;
let foundArt=false; 
let chanceOfArt;
let printInventory=" ";
let rankTitle="Ranking: The Village Punch Bag";
let endGame=false;
// seperated from explore  so that you can increase item stats forever. 
let lowLowNum=0;
let lowMidNum=3;
let lowHighNum=15;
let midLowNum=25;
let midMidNum= 50;
let midHighNum=75;
let highLowNum=100;
let highMidNum=125;
let highHighNum=150;
let epicNum=200;

const enviroment=[" Woods of the Topsy Turvy King", "Forest of the Humourless Harlequins","Forgotten Graveyard of Ermm..","Castle of the Blackest Knight","Farm of Old McYondor","Bouncy Castle of Borgon",
"Swamp of the Slimy Hobbits", "Lightest Dungeons", "Ruins of the Fallen Turnip God","Fun House of Eternal Damnation","Heart of Darkness" ,"Dead City, that is formerly known as Alive City"
,"Red Jester's Torture Chamber","Temple of Apshai","Dungeons of Doom","Goblin Fortress of Snikrik","Mountains of the Wild Berserker",
"Stronghold of Daggerfall","Walking Hills of Cthulhu","Forlorn Islands of Lost Souls","Mysterious Swampland of Kuluth"];

const enemyDescription=["deranged","tiny","drunk","sadistic","nihilistic","hungry","psychopathic","malnourished","zealous","hot-headed","mad","bitter","hateful",
"racist","nasty","cruel","cherophobic","fanatical","herophobic","tyrannical","chaos"]

const enemy= ["hobbits","ponies ","farmers","kobolds","gnomes","jesters","harlequins","elves","druids","man-size giants","goblins","dwarves","werefish","cowmen","imps","fairies","bandit","bards",
"demons","thieves","knights","rogues","orcs","blobs","zombies","vampires","beholders","trolls","ettins","mimics","red jesters","succubuses","bone devils","ragmen",
"clay golems","drows","gnolls","swamp hags","night goblins","half-ogres","hobgoblins","bog imps","owlbears","winter wolves","abominations", "beastmen","killer clowns"];

const enemyAction=["attacked","tickled","mugged","held captive","harassed","kicked","punched","bullied","slapped"];

const npc= ["hobbit","pony ","farmer","kobold","gnome","jester","harlequin","elf","druid","giant","goblin","dwarf","werefish","cowman","imp","fairy","bandit","bard",
"hermit","ranger","thief","knight","rogue","orc","werepig","wizard","young man","young woman","old man","old woman","tinker","Ragman","blacksmith","clown"];

const npcDescription=["heartbroken","tiny"," skinny","peaceful","silly","young", "shy","talkative", "nihilistic","hungry","lovestruck","sarcastic","forlorn",
"happy","friendly","mysterious","beautiful","malnourished","drunk","poor","dying"]

const npcDescription2=["heartbroken","tiny"," skinny","silly","young","talkative", "nihilistic","hungry","lovestruck","forlorn",
"mysterious","beautiful","drunk","poor","dying","rich","nasty","clever","creative","holy","greedy","loathsome","fat","stoic","witty","charming","depressed"]

const questDescription=["mysterious","cursed","valuable","holy","damaged","precious","talking","blood soaked","corrupted","beautiful","blessed","cryptic"]

const questItem=["sword","jewel","artifact","earring","book","statue","figurine","pendant","dress","puzzle box","love locket","bone flute","rag doll","voodoo doll"]

const questAction=["deliver", "guard","fetch","steal","find","destroy","collect"]

const questAdvance=[["a bounty sign","You find and capture the "],["a 'missing/reward' poster","You find and rescue the "],["a lost love letter"," After a long search, you give the letter back to the "],
["an angry spirit swearing vengence","You find and lead the spirit to the"]]

const Art=["The Bone Flute of Lim Dul the Hateful","Gargut's Final Death Mask","Necro's Orb of Absolute Chaos","Morgan's Cursed Will","Grim Fangs' Nine Dead Eyes",
"The Red Beherit (Egg of the King)","The Clockwork Devil of Angus","The Necronomicon","The Death Note","Malakbel's Doomsday Clock "]

const lowLowWeapons=["Pointy Feather","Sharp Twig ","Second Hand Toothbrush","Fist of Hay"];
const lowLowArmours=["Old Man Pajamas"," Spaghetti Hoop Mail ","Wrapping Paper","Sun Lotion"];
const lowLowRings=[" Gummy Ring", "Hula Hoop","Rusty Nut","Ring of Absolute Uselessness"];
const lowLowTrinkets=["Old Sock", "Goblin Tooth","Gem of Equal Blessing/Curse","Pog"];
const lowMidWeapons=["Feather Duster","Yo-Yo","Rolling Pin","Toliet Plunger"];
const lowMidArmours=["Tin Foil Plate Mail","Christmas Jumper","Mud Armour","Card Board Box"];
const lowMidRings=["Onion Ring", "Doughnut","Jelly Ring","Promise Ring"];
const lowMidTrinkets=["Lucky Penny", "Shiny Pog","Amulet of Nothingness","Orc Tooth"];
const lowHighWeapons=["Bag of Marbles","Spiked Yo-Yo","Letter Opener","A Ball and Sock"];
const lowHighArmours=["Bear Rug"," Lumberjack Vest","Rags from the Ragman","Wooden Target Sign"];
const lowHighRings=["Bagel", "Sour Jelly Ring ","Ring of .01% Additional Power","Ring of .01% Additional Luck "];
const lowHighTrinkets=["Tin Music Box", "Spooky Rag Doll","Pocket Totem","Imp Bone Flute"];
const midLowWeapons=["Fish Bone Spear","Big Bone","SlingShot","Frying Pan"];
const midLowArmours=["Fur Coat","Leather Hood","Extra Thick Jumper","Monk Robe"];
const midLowRings=["Rusty Ring", "The One Ring (Replica) ","Ring of 1% Additional Health","Ring of 1% Additional Luck"];
const midLowTrinkets=["Voodoo Doll", "Mildly Cursed Gem","Goblin Puppet","Love Locket"];
const midMidWeapons=["Hunting Knife","Wood Axe","Rusty Sword","Wood Club"];
const midMidArmours=["Tin Plate Armour","Fur Armour","Leather Armour","Robe of Lesser Protection"];
const midMidRings=["Stamina Ring", "Gold Ring ","Accuracy Ring","Luck Ring"];
const midMidTrinkets=["Robotic Imp", "Monkey's Paw","Earring of Luck ","Grieving Stone"];
const midHighWeapons=["Mithral Dagger","Two Handed Sword","Crossbow","Orc Mace"];
const midHighArmours=["Chain Mail","Rat Skin Tunic ","Studded Leather Armour","Robe of Protection"];
const midHighRings=["Strength Ring", "Charm Ring ","Magic Ring","Dexterity Ring  "];
const midHighTrinkets=["Blessed Pendant", "Amulet of Hatred"," Devil Bone Flute","Bracelet of Quick Thinking"];
const highLowWeapons=["Blunderbuss","Battle Axe","War Hammer","Demon Bone Shiv"];
const highLowArmours=["Mithral Chain Mail","Full Plated Armour","Troll Hide Armour","Spiked Armour"];
const highLowRings=[" Evil Eye Ring", "Holy Ring ","Ring of Influence ","Ring of Chaos"];
const highLowTrinkets=["Spirit Orb", "Death Totem "," Clockwork Jester","Belt of the Troll"];
const highMidWeapons=["Holy Sword","FaceBreaker Gauntlet","Ratling Death Claws","Greater Demon Axe"];
const highMidArmours=["Dragon Scale Armour","Holy Knight Armour","Grand Wizard Robe","Shadow Armour"];
const highMidRings=[" Ring of The Black Troll ", "Ring of The Fire Snake ","Ring of The Chaos Giant ","Ring of Want"];
const highMidTrinkets=[" Clockwork Fiend", "Dragon Bone Flute","Amulet of Greater Power","Music Box of Madness"];
const highHighWeapons=["Demon Blade","Doom Hammer","Tovek Hand Cannon","Death Lance of Belia"];
const highHighArmours=["Armour of Greater Protection","Dragon Prince Armour ","Tovek Battle Armour","Berserker Armour"];
const highHighRings=[" Ring of Fate Binding", "Ring of Instant Death ","The One Ring","Tovek's Wedding Ring"];
const highHighTrinkets=["Genie in a Lamp", "Lament Configuration","Dice of Death","Tovek War Machine"];
const epicWeapons=["Heavy Bolter","Power Sword","Assault Cannon","ChainSword and Boltgun"];
const epicArmours=["Power Armour","Terminator Armour","Centurion Armour","Runic Power Armour"];
const epicRings=["Inquisitor Signet Ring", "Teleport Transponder Ring ","Power Ring ","Force Ring"];
const epicTrinkets=["Vortex Grenade", "Eye Implant"," Servo-Skull","Healer's Aegis"];
const randomEquipChoice=["Weapon","Armour","Ring","Trinket"];

const audioArt= new Audio();
audioArt.src="music/Art.wav";
audioArt.volume = 0.9;

const audioItem= new Audio();
audioItem.src="music/Item.wav";
audioItem.volume = 0.6;

const audioLevelUp= new Audio();
audioLevelUp.src="music/Levelup.wav";
audioLevelUp.volume = 0.9;

clickButton.addEventListener("click",()=>{
    explore();

    if (!musicOn){
        musicOn=true;
        bkMusic.play();
    }
});

document.addEventListener("keydown",(event)=>{
    if(event.ctrlKey && event.key=="r" || event.ctrlKey && event.key=="R"){
        resetGame();
    }
})

let saveGame=()=>{

    let gameSave={
        xp:xp,
        gold:gold,
        level:level,
        armour:armour,
        weapon:weapon,
        ring:ring,
        trinket:trinket,
        strength:strength,
        magic:magic,
        dexterity:dexterity,
        charisma:charisma,
        build:build,
        killCount:killCount,
        goblinCount:goblinCount,
        clickCount:clickCount,
        firstArtFound:firstArtFound,
        lastArtFound:lastArtFound,
        inventory:inventory,
        printInventory:printInventory,
        endGame:endGame
    };

    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

let loadGame=()=>{
    let savedGame=JSON.parse(localStorage.getItem("gameSave"));
    if (typeof savedGame.xp !=="undefined") xp= savedGame.xp;
    if (typeof savedGame.gold !=="undefined")gold = savedGame.gold;
    if (typeof savedGame.level !=="undefined") level = savedGame.level;
    if (typeof savedGame.armour !=="undefined") armour = savedGame.armour;
    if (typeof savedGame.weapon !=="undefined") weapon=savedGame.weapon;
    if (typeof savedGame.ring !=="undefined") ring = savedGame.ring;
    if (typeof savedGame.trinket !=="undefined")trinket = savedGame.trinket;
    if (typeof savedGame.strength !=="undefined") strength = savedGame.strength;
    if (typeof savedGame.magic !=="undefined") magic= savedGame.magic;
    if (typeof savedGame.charisma !=="undefined")charisma = savedGame.charisma;
    if (typeof savedGame.build !=="undefined") build= savedGame.build;
    if (typeof savedGame.killCount !=="undefined") killCount= savedGame.killCount;
    if (typeof savedGame.clickCount !=="undefined") clickCount= savedGame.clickCount;
    if (typeof savedGame.firstArtFound !=="undefined") firstArtFound= savedGame.firstArtFound;
    if (typeof savedGame.lastArtFound !=="undefined") lastArtFound= savedGame.lastArtFound;
    if (typeof savedGame.inventory !=="undefined") inventory= savedGame.inventory;
    if (typeof savedGame.printInventory !=="undefined") printInventory= savedGame.printInventory;
    if (typeof savedGame.endGame !=="undefined") endGame= savedGame.endGame;
};

let resetGame=()=>{

  if (confirm("Are you sure you want to reset the game?")){
        let  gameSave={};
        localStorage.setItem("gameSave",JSON.stringify(gameSave));
        location.reload();
    }

}

window.onload = function(){
    loadGame();
    firstClick=true;
    explore();
};

class Player {
    constructor(xp,gold,level,armour,weapon,ring,trinket,strength,magic,dexterity,charisma,build){
        this.xp=xp;
        this.gold=gold;
        this.level=level;
        this.armour=armour;
        this.weapon=weapon;
        this.ring=ring;
        this.trinket=trinket;
        this.strength=strength;
        this.magic=magic
        this.dexterity=dexterity;
        this.charisma=charisma; 
        this.build=build;
    }

}

let player=new Player(0,0,1,"empty","empty","empty","empty",5,5,5,5,"None");
({xp,gold,level,armour,weapon,ring,trinket,strength,magic,dexterity,charisma,build}=player); // destructuring 

let dice=side=>Math.floor(Math.random()*side)+1;

let randomChoice=(arr)=> arr[Math.floor(arr.length * Math.random())];

let rarity=()=>{
    level<=10? rare=90:
    level>=11 && level<=15? rare=140:
    level>=16 && level<=20? rare=160:
    level>=21 && level<=27? rare=300:
    level>=28 && (rare=400);
}

let explore=()=>{
    
    if (firstClick==true){       // Prevents first 'explore()' call on window.onload to increase any stats as we just need it to load data 

    }

    else{
        clickCount+=1;
        gainGold=dice(6)+Math.ceil(charisma/3)
        gold+=gainGold
        gainXp=dice(5)+Math.ceil(level/2);
        xp+=gainXp;
        accumXp+=gainXp;
        newEnemyNum=dice(5)+Math.ceil(strength/3)
        newNpc =randomChoice(npc); 
        newNpcDesc=randomChoice(npcDescription);
        newNpcDesc2=randomChoice(npcDescription2);
        newEnvir=randomChoice(enviroment); 
        newEnemyDesc=randomChoice(enemyDescription);
        newEnemy =randomChoice(enemy); 
        newEnemyAction=randomChoice(enemyAction);
        newQuestItem=randomChoice(questItem);
        newQuestAction=randomChoice(questAction) ;
        newQuestDesc=randomChoice(questDescription);
        newQuestAdvance=randomChoice(questAdvance);
        equipChoice=randomChoice(randomEquipChoice);
        killCount+=newEnemyNum;
        newEnemy=="goblins" && (goblinCount+=newEnemyNum);
    }

        if (accumXp>levelBreak){

            build==="Knight" ? strength+=2:
            build==="Thief" ? dexterity+=2:
            build==="Bard" ? charisma+=2:
            build==="Mage" && (magic+=2);        
            audioLevelUp.play();
            level+=1
            accumXp=0;
            levelBreak+=50+(level*10);
            strength+=dice(4)-1;
            magic+=dice(4)-1;
            dexterity+=dice(4)-1;
            charisma+=dice(4)-1;
            let strDecide=strength+2;
            let magDecide=magic+2;
            let dexDecide=dexterity+2;
            let chrDecide=charisma+2;

            strength>magDecide && strength>dexDecide && strength>chrDecide ?  build="Knight":
            magic>strDecide && magic>dexDecide && magic>chrDecide ?  build="Mage":
            dexterity>magDecide && dexterity>strDecide && dexterity>chrDecide ? build="Thief":
            charisma>magDecide && charisma>dexDecide && charisma>strDecide && (build="Bard");
        }

    rarity();
    equipmentChance=dice(rare);

    if (firstClick) {
        equipmentChance=100;    // Prevents first 'explore()' call on window.onload to increase any stats as we just need it to load data 
    } 

    if  (equipmentChance>=1 && equipmentChance<=4){

        foundItem=true;
        audioItem.play();   

        if (level<=3){
            equipChoice=randomChoice(randomEquipChoice);
            equipChoice=="Weapon" ? equip=randomChoice(lowLowWeapons):
            equipChoice=="Armour" ? equip=randomChoice(lowLowArmours):
            equipChoice=="Ring" ? equip=randomChoice(lowLowRings):
            equipChoice=="Trinket"&&(equip=randomChoice(lowLowTrinkets));
            lowLowNum +=dice(2)-1;
            finalUpgrade=equip+(" + "+lowLowNum)
            
        }

        else if  (level >=4 && level <=6 ){
            equipChoice=randomChoice(randomEquipChoice);
            equipChoice=="Weapon" ? equip=randomChoice(lowMidWeapons):
            equipChoice=="Armour" ? equip=randomChoice(lowMidArmours):
            equipChoice=="Ring" ? equip=randomChoice(lowMidRings):
            equipChoice=="Trinket"&&(equip=randomChoice(lowMidTrinkets));
            lowMidNum +=dice(3)-1;
            finalUpgrade=equip+(" + "+lowMidNum) 

        }

        else if  (level >=7 && level <=9 ){
            equipChoice=randomChoice(randomEquipChoice);
            equipChoice=="Weapon" ? equip=randomChoice(lowHighWeapons):
            equipChoice=="Armour" ? equip=randomChoice(lowHighArmours):
            equipChoice=="Ring" ? equip=randomChoice(lowHighRings):
            equipChoice=="Trinket"&&(equip=randomChoice(lowHighTrinkets));
            lowHighNum+=dice(6)-1;
            finalUpgrade=equip+(" + "+lowHighNum) 
        }

        else if  (level >=10 && level <=12 ){
            equipChoice=randomChoice(randomEquipChoice);
            equipChoice=="Weapon" ? equip=randomChoice(midLowWeapons):
            equipChoice=="Armour" ? equip=randomChoice(midLowArmours):
            equipChoice=="Ring" ? equip=randomChoice(midLowRings):
            equipChoice=="Trinket"&&(equip=randomChoice(midLowTrinkets));
            midLowNum +=dice(8)-2;
            finalUpgrade=equip+(" + "+midLowNum) 
        }

        else if  (level >=13 && level <=15 ){
            equipChoice=randomChoice(randomEquipChoice);
            equipChoice=="Weapon" ? equip=randomChoice(midMidWeapons):
            equipChoice=="Armour" ? equip=randomChoice(midMidArmours):
            equipChoice=="Ring" ? equip=randomChoice(midMidRings):
            equipChoice=="Trinket"&&(equip=randomChoice(midMidTrinkets));
            midMidNum +=dice(10)-2;
            finalUpgrade=equip+(" + "+midMidNum) 
        }

        else if  (level >=16 && level <=18 ){
            equipChoice=randomChoice(randomEquipChoice);
            equipChoice=="Weapon" ? equip=randomChoice(midHighWeapons):
            equipChoice=="Armour" ? equip=randomChoice(midHighArmours):
            equipChoice=="Ring" ? equip=randomChoice(midHighRings):
            equipChoice=="Trinket"&&(equip=randomChoice(midHighTrinkets));
            midHighNum+=dice(12)-2;
            finalUpgrade=equip+(" + "+midHighNum) 
        }

        else if  (level >=19 && level <=21 ){
            equipChoice=randomChoice(randomEquipChoice);
            equipChoice=="Weapon" ? equip=randomChoice(highLowWeapons):
            equipChoice=="Armour" ? equip=randomChoice(highLowArmours):
            equipChoice=="Ring" ? equip=randomChoice(highLowRings):
            equipChoice=="Trinket"&&(equip=randomChoice(highLowTrinkets));
            highLowNum +=dice(14)-3;
            finalUpgrade=equip+(" + "+highLowNum) 
        }

        else if  (level >=22 && level <=24 ){
            equipChoice=randomChoice(randomEquipChoice);
            equipChoice=="Weapon" ? equip=randomChoice(highMidWeapons):
            equipChoice=="Armour" ? equip=randomChoice(highMidArmours):
            equipChoice=="Ring" ? equip=randomChoice(highMidRings):
            equipChoice=="Trinket"&&(equip=randomChoice(highMidTrinkets));
            highMidNum +=dice(16)-3;
            finalUpgrade=equip+(" + "+highMidNum) 
        }

        else if  (level >=25 && level <=27){
            equipChoice=randomChoice(randomEquipChoice);
            equipChoice=="Weapon" ? equip=randomChoice(highHighWeapons):
            equipChoice=="Armour" ? equip=randomChoice(highHighArmours):
            equipChoice=="Ring" ? equip=randomChoice(highHighRings):
            equipChoice=="Trinket"&&(equip=randomChoice(highHighTrinkets));
            highHighNum +=dice(18)-3;
            finalUpgrade=equip+(" + "+highHighNum) 
        }

        else{
            equipChoice=randomChoice(randomEquipChoice);
            equipChoice=="Weapon" ? equip=randomChoice(epicWeapons):
            equipChoice=="Armour" ? equip=randomChoice(epicArmours):
            equipChoice=="Ring" ? equip=randomChoice(epicRings):
            equipChoice=="Trinket"&&(equip=randomChoice(epicTrinkets));
            epicNum +=dice(20)-4;
            finalUpgrade=equip+(" + "+epicNum) 
        }

        equipChoice=="Weapon" ? weapon=finalUpgrade:
        equipChoice=="Armour" ? armour=finalUpgrade:
        equipChoice=="Ring" ? ring=finalUpgrade:
        equipChoice=="Trinket"&&(trinket=finalUpgrade);  
    }

    else{
        foundItem=false;
    }

    if (firstClick){                          // Prevents first 'explore()' call on window.onload to increase any stats as we just need it to load data  
        quest=" Adventure awaits !! ";
    }

    else{

        questChoice=dice(10);
       
        questChoice>=1 && questChoice<=3 ? quest=`You travel to the ${newEnvir}. You find ${newQuestAdvance[0]} for a ${newNpcDesc2} ${newNpc}. ${newQuestAdvance[1]} ${newNpc}. Along the way, you defeat
         ${newEnemyNum} ${newEnemyDesc} ${newEnemy}. You are rewarded with ${gainGold} gold and ${gainXp} experience points.`:
       
        questChoice>=4 && questChoice<=6 ? quest=`You journey towards the ${newEnvir}. You stumble upon a ${newNpcDesc} ${newNpc} who is being ${newEnemyAction} by ${newEnemyNum} ${newEnemyDesc} ${newEnemy}. You defeat the ${newEnemyNum} 
        ${newEnemy}. The ${newNpc} rewards you with a ${newQuestDesc} ${newQuestItem} which you sell for ${gainGold} gold. You gain ${gainXp} experience points.`:
       
        questChoice>=7 && questChoice<=9 ? quest=`You explore the ${newEnvir}. You come across a ${newNpcDesc} ${newNpc}. The ${newNpc} asks you to ${newQuestAction} a ${newQuestDesc} ${newQuestItem}.
        You encounter ${newEnemyNum} ${newEnemyDesc} ${newEnemy},  which you defeat to ${newQuestAction} the item. You are rewarded with ${gainGold} gold and ${gainXp} experience points.`:

        questChoice==10 && (quest=`You wonder into an inn for some rest, but are attacked by ${newEnemyNum} ${newEnemyDesc} ${newEnemy}. 
        You defeat the ${newEnemyNum} ${newEnemy}. You gain ${gainGold} gold and ${gainXp} experience points.`);
        
        if (foundItem==true){
           quest +=`You acquire some better loot ( ${finalUpgrade} )`;
           foundItem=false;
        }
    
        else{
    
        }
    
        chanceOfArt=dice(200);
    
            if (chanceOfArt==1){
    
                randomArt=dice(10)-1
                pickedArt=Art[randomArt];
                let exists=inventory.includes(pickedArt);
    
                if (exists==false){
                    firstArtFound=true;   // achievement 
                    inventory.push(pickedArt)
                    quest += `You find ${pickedArt}`;
                    audioArt.play();
                }

                else{
                        // If it picks the same one, nothing happens 
                }

                printInventory="";   //refresh the Screen so it print fresh ( it will duplicate if not)
                for (let i = 0; i < inventory.length; i++) {
                    printInventory+= " *"+(i+1)+")" + inventory[i]+"<br>";                  
                }
            
            }
    
            else{
            // nothing happens
            }
        
        if (endGame==false){
    
            if (inventory.length==10 ){ 
                lastArtFound=true;  // achievement 
                alert("you have collected all 10 Artifacts of Chaos !! You destroy them with your might powers and save the world from evil. You can retire in peace")
                alert("Or.. You can continue grinding for better loot and power to become the 'Grind King' or even something greater ??  ")
                endGame=true; // So that it is only called once rather everytime you load a game 
            }
        
        }
   
    }

    let achTag="Achievement:"
    clickCount>=1 && (achTag+=" [Hero's First Step] ");
    clickCount>100 && (achTag+=" [100 Quests warm up] ");
    firstArtFound && (achTag+=" [First Artifact] ");
    goblinCount>100 && (achTag+="[Goblin Slayer] ");
    killCount>10000 && (achTag+="[Master Killer (10,000)] ");
    clickCount>3000 && (achTag+="[A few thousand quests later...] ");
    gold>=50000 && (achTag+="[Sir Goldalot (50,000)] ");
    lastArtFound && (achTag+="[Let the End Game Grind Begin] ");
    level>=40 && (achTag+="[Grind Master] ");
    level>=50 && (achTag+="[Grind King] ");
    gold>=1000000 && (achTag+="[ Millionaire ] ");
    level>=70 && (achTag+="[Last Achievement, Congrats and bye ]");
    
    level >=1 && level <=3 ?  rankTitle= "Ranking: The Village Punch Bag":
    level >=4 && level <=5 ?  rankTitle= "Ranking: The Village Weakling ( Making Progress  ) ":
    level >=6 && level <=7 ?  rankTitle= "Ranking: The Average Joe (No one cares) ":
    level >=8 && level <=9 ?  rankTitle= "Ranking: The Village Punch Bag" :
    level >=10 && level <=11 ?  rankTitle= "Ranking: The Beta Adventurer (Some nerds respect you)":
    level >=12 && level <=13 ?  rankTitle= "Ranking: The Mighty Beta Adventurer (Goblins fear you )":
    level >=14 && level <=15 ?  rankTitle= "Ranking: The Try-Hard Hero (Sometimes..You win )":
    level >=16 && level <=17 ?  rankTitle= "Ranking: The Ten a Penny Hero ( win more than you lose )":
    level >=18 && level <=19 ?  rankTitle= "Ranking: The Hardened Hero ( Orcs fear you )":
    level >=20 && level <=21 ?  rankTitle= "Ranking: 1st Class Hero ( They come to you first)":
    level >=22 && level <=25 ?  rankTitle= "Ranking The Champion of Man (The best a man can be )":
    level >=26 && level <=29 ?  rankTitle= "Ranking: Legendary Hero (Books are written about you)":
    level>=30 &&(rankTitle="Ranking: The Chosen one !!" );

    firstClick=false;    // after the first explore call (window.Onload) then progression can be made 
    invInput.innerHTML=printInventory;
    rankInput.innerHTML=rankTitle; 
    achInput.innerHTML=achTag;
    storyInput.innerHTML=quest;

    document.getElementById("goldCount").innerHTML=gold;
    document.getElementById("xpCount").innerHTML=xp;
    document.getElementById("levelCount").innerHTML=level;
    document.getElementById("playerArmour").innerHTML=armour;
    document.getElementById("playerWeapon").innerHTML=weapon;
    document.getElementById("playerRing").innerHTML=ring;
    document.getElementById("playerTrinket").innerHTML=trinket;
    document.getElementById("playerStr").innerHTML=strength;
    document.getElementById("playerMag").innerHTML=magic;
    document.getElementById("playerDex").innerHTML=dexterity;
    document.getElementById("playerChr").innerHTML=charisma;
    document.getElementById("playerClass").innerHTML=build;
    saveGame()
}
