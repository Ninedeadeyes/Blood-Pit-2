let herbPower=150;
let root="images/";
let monster;
let hero = getHero();
let strong=false;
let powerful=false;
let crit=false;
let focusPoint=false;

//text boes 
let text=document.getElementById("text");
let foe=document.getElementById("foe-info");
let stats=document.getElementById("stats");

//image
let image=document.getElementById("foe-image");
image.src=root+"hero.png";

//buttons
let fightButton=document.getElementById("fight");
let herbButton=document.getElementById("herb");
let defendButton=document.getElementById("defend");
let runButton=document.getElementById("run");
let hardHitButton=document.getElementById("hardHit");
let focusButton=document.getElementById("focus");
let okButton=document.getElementById("ok");
const bkMusic = document.getElementById("backgroundMusic");

focusButton.onclick=focus;
hardHitButton.onclick=hardHit;
fightButton.onclick=fight;
herbButton.onclick=herb;
defendButton.onclick =defend;
runButton.onclick=run;
okButton.onclick= startGame;

let info ="<h3>Welcome to the Blood Pit </h3>";          // connects to css code 
info +="<p>You are Nine Dead Eyes a master assassin.";                 // <p> =html code 
info +=" After being caught, you requested a trial by combat.</p> ";
info +=" <p> You are thrown into the Blood Pit along with 100 demons." 
info +=" Defeat the 100 demons and win your freedom. </p> ";
info +="<p> Click ready to begin the slaughter.</p>";

text.innerHTML =info;
showOk(true);

class Enemy {
    constructor(name,src,hpMax,gold,xp,attack,defense){
        this.name=name;
        this.src=src;
        this.hpMax=hpMax;
        this.gold=gold;
        this.xp=xp;
        this.attack=attack;
        this.defense=defense;
    }
}

function getHero()
{
    let hero={
        name:"Nine Dead Eyes",
        hp:100,
        hpMax:100,
        attack:12,
        defense:10,
        defending:false,
        herbs:3,
        xp:0,
        accXp:0,
        level:1,
        gold:0,
        stamina:0,
        enemies:0
    };

    return hero;
}

function endGame()
{   
    showOk(true);
}   
   
function startGame()
{
    showOk(false);
    bkMusic.play();
    okButton.onclick=nextMonster;
    okButton.innerHTML="Ready";
    text.innerHTML="";
    hero=getHero();
    monster= getMonster();
    showStats();
}    

function showOk(show)
{
    if (show)
    {
        okButton.style.display="block";   //css code
    }
    
    else
    {
        okButton.style.display="none";
    }
}

   function showStats()
{
    stats.innerHTML="HP: "+hero.hp+"/"+hero.hpMax;
    stats.innerHTML+="<br>Herbs: "+hero.herbs;
    stats.innerHTML+="<br>XP: "+hero.accXp;
    stats.innerHTML+="<br>Gold: "+hero.gold;
    stats.innerHTML+="<br>Attack: "+hero.attack;
    stats.innerHTML+="<br>Defense: "+hero.defense;
    stats.innerHTML+="<br>Rage: "+hero.stamina;
    stats.innerHTML+="<br>Level: "+hero.level;
    stats.innerHTML+="<br>Defeated: "+hero.enemies;
    
    foe.innerHTML=monster.name;
    foe.innerHTML+="<br>HP: "+monster.hp+"/"+monster.hpMax;
    foe.innerHTML+="<br>Attack: "+monster.attack;
    foe.innerHTML+="<br>Defense: "+monster.defense;
}

   function getMonster()
{
    let mon={};
    let pick = Math.floor(Math.random()*(hero.level+1));
    if (pick===0)

    {
        mon= new Enemy ("Fire Imp","demon1.png",40,5,4,7,3);                   
    }

    else if  (pick===1)
    {
         mon=new Enemy("Spawn of Cthulhu","demon2.png",60,10,6,10,10);
    }

    else if  (pick===2)    
    {
      mon=new Enemy("Death Knight","demon0.png",70,15,12,12,25);
    }
    
    else if  (pick===3)
    {
        mon=new Enemy("Rag Man ","demon4.png",80,20,14,20,5);
    }

    else if  (pick===4)
    {
        mon=new Enemy("Blood Gazer","demon5.png",100,25,16,18,15);
    }

    else if  (pick===5)
    {
        mon=new Enemy("Chaos Engine","demon3.png",120,35,20,25,40);
    }

    else if  (pick===6)
    {
        mon=new Enemy("Soul Eater","demon7.png",150,50,22,40,10);
    }

    else if  (pick===7)
    {
        mon=new Enemy("Harbinger Of Doom","demon8.png",160,70,25,38,30);
    }

    else if  (pick===8)
    {
        mon=new Enemy("Butcher of Tristram","demon6.png",180,100,40,45,150);
    }

    else if  (pick===9)    
    {
        mon=new Enemy("Chaos War Machine","demon9.png",200,300,50,55,250);
    }
    
    else 
    {
        mon=new Enemy("Chaos War Machine v2","demon9.png",200,300,60,65,300);
    }
    
    image.src=root+mon.src;
    mon.hp=mon.hpMax;
    text.innerHTML+="<h3> A " +mon.name+" enter the blood pit. </h3>";
    return mon;
}

function nextMonster()
{
    showOk(false);
    okButton.innerHTML="OK";
    text.innerHTML="";
    monster=getMonster();
    showStats();

}

function fight()
{
    text.innerHTML="";
    doBattle(hero,monster);
    checkMonster();
    
    showStats();
}

function hardHit()
{
    text.innerHTML="";
    hardBattle(hero,monster);
    checkMonster();
    showStats();
}

function herb()
{
    if (hero.herbs===0)
    {
        text.innerHTML= "You do not have any herbs";
    }

    else
    {
        text.innerHTML="You used a herb.";
        hero.herbs--;
        hero.hp+=herbPower;
        hero.hp=Math.min(hero.hp,hero.hpMax)
    }

    monsterTurn();
}

function focus()
{

    focusPoint=true;
    text.innerHTML="You pause for a moment to focus. Your next attack will ignore your opponent's defense. ";
    monsterTurn();
}

function monsterTurn()
{
    enemyBattle(monster,hero);
    checkHero();
    showStats();
}

function doBattle(attacker,defender)
{
    text.innerHTML+="<p>"+attacker.name+" attacks.</p>";
    let attack=attacker.attack;
    let dice=Math.floor(Math.random()*12)+1;
    attack=attack+dice;
    let damage ;

    if (focusPoint===true)
    {
        damage=Math.floor(attack)
        text.innerHTML+="<p> Your attack penetrates through the demon's defense. </p>";
        focusPoint=false;
    }

    else
    {
        let defense=defender.defense;
        let random2=Math.floor(Math.random()*10)  // only 20% chance of a bonus or penalty  (10% each) add variety to stats  
        if (random2===0)
        {
            defense+=3;
        }
    
        else if (random2===1)
        {
            defense-=3;
        }

        damage=Math.floor(attack-(defense/2));
    }
    
    if (damage>0)
    {
        text.innerHTML+=attacker.name+" deals ";
        text.innerHTML+=damage+" point";
        
        if (damage>1)
        {
            text.innerHTML +="s";
        }

        text.innerHTML+=" of damage against ";
        text.innerHTML+=defender.name+".";
        defender.hp-=damage;
        defender.hp=Math.max(defender.hp,0);
    }

    else
    {
        text.innerHTML+=attacker.name+" misses!";
    }

    attacker.stamina+=1

    if (attacker.stamina>10)
        {
            attacker.stamina=10
        }
}

function enemyBattle(attacker,defender)
{
    text.innerHTML+="<p>"+attacker.name+" attacks.</p>";
    let attack=attacker.attack;
    let dice=Math.floor(Math.random()*12)+1;
    attack=attack+dice;
    let defense=defender.defense;
    let random2=Math.floor(Math.random()*10)
    
    if (random2===0)
    {
        defense+=3;
    }

    else if (random2===1)
    {
        defense-=3;
    }

    if (defender.defending)
        {
            text.innerHTML +="<p>"+defender.name+" is defending.</p>";
            defense*=4;
            defender.defending=false; 
        }
    
    let damage=Math.floor(attack-(defense/2));

    if (strong===true)
    {
        damage=damage+5
        text.innerHTML+="<p> The demon performs a strong attack. </p>";
    }

    else if (powerful===true)
    {
        damage=damage*2+5   
        text.innerHTML+="<p> The demon performs a powerful attack. </p>";
    }

    else if (crit===true)
    {
        damage=damage*3+10   
        text.innerHTML+="<p> The demon performs a critical hit. </p>";
    }
    
    if (damage>0)
    {
        text.innerHTML+=attacker.name+" scores ";
        text.innerHTML+=damage+" point";
        
        if (damage>1)
        {
            text.innerHTML +="s";
        }

        text.innerHTML+=" of damage against ";
        text.innerHTML+=defender.name+".";
        defender.hp-=damage;
        defender.hp=Math.max(defender.hp,0);
    }

    else
    {
        text.innerHTML+=attacker.name+" misses!";
    }

    strong=false;
    powerful=false;
    crit=false;

    let chance=Math.floor(Math.random()*10)+1;

    if (chance===1)
    {
        strong=true;
        text.innerHTML+="<p>The next attack from your opponent will be a strong attack. </p>";
    }
    
    else if (chance===2)
    {
        powerful=true;
        text.innerHTML+="<p>The next attack from your opponent  will be a powerful attack. </p>";
    }

    else if (chance===3)
    {
        crit=true;
        text.innerHTML+="<p>The next attack from your opponent  will be a critical hit. </p>";
    }
    
    else
    {
        text.innerHTML+="<p>The next attack from your opponent will be a weak attack </p>";
    }
}

function hardBattle(attacker,defender)
{
    if (attacker.stamina>=5)
    {

        text.innerHTML+="<p>"+attacker.name+" execute the ancient secret technique of the Shadow Hunter 'DEATH GRIP'. </p>";
        
        let attack=attacker.attack;
        
        let dice=Math.floor(Math.random()*10)+10;
            
        attack=(attack*2)+dice;
        
        let damage ;

        if (focusPoint===true)
            {
                damage=Math.floor(attack)
                text.innerHTML+="<p> The crushing attack penetrates through the demon's defense. </p>";
                focusPoint=false;
            }
        
        else
            {       
                let defense=defender.defense;
            
                let random2=Math.floor(Math.random()*10)
                
                if (random2===0)
                    {
                          defense+=3;
                    }
            
                else if (random2===1)
                    {
                        defense-=3;
                    }
        
                damage=Math.floor(attack-(defense/2));
            }
        
            if (damage>0)
            {
                text.innerHTML+=attacker.name+" scores ";
                text.innerHTML+=damage+" point";
                
                if (damage>1)
                {
                    text.innerHTML +="s";
                }
        
                text.innerHTML+=" of damage against ";
                text.innerHTML+=defender.name+".";
                defender.hp-=damage;
                defender.hp=Math.max(defender.hp,0);        
            }
        
            else
            {
                text.innerHTML+=attacker.name+" misses!";
            }
        
            attacker.stamina-=5
        
            if (attacker.stamina>10)
                {
                    attacker.stamina=10        
                }   
    }

    else
    {
        text.innerHTML+=" You do not have enough Rage (require 5 Rage), prepare for pain. ";
    }
}

function checkMonster()
{
    if (monster.hp===0)
    {
        text.innerHTML+="<p>"+monster.name+" has been defeated.</p>";
        hero.enemies+=1
        awardPrizes();
    }

    else
    {
        monsterTurn();
    }
}

function awardPrizes()
{
    text.innerHTML+="<br>"+monster.xp+" XP earned<br>";
    text.innerHTML+=monster.gold+" gold found<br>";
    text.innerHTML+="<p>You defeated "+hero.enemies+" enemies </p>";
    powerful=false;     // resets when enemy dies so the next enemy won't do power attack 
    crit=false;
    focusPoint=false;

    hero.xp+=monster.xp;
    hero.accXp+=monster.xp;
    hero.gold+= monster.gold;
    checkLevelUp();
    if (Math.random()<0.25)  // 25% chance of getting herb 
    {
        text.innerHtml+= "Herb found!";
        hero.herbs++;
    }
    text.innerHTML+= "Get ready for your next battle.";
    showStats();
    
    showOk(true);

    if (hero.enemies===100)
    {
     youWin();
    }
}

function checkHero()
{
    if (hero.hp===0)
    {
        text.innerHTML+="<br>"+hero.name;
        text.innerHTML+=" has been slain.";
        gameOver();
    }
}

function gameOver()
{
    showOk(true);
    okButton.onclick=startGame;
    okButton.innerHtml="You fall in battle, broken and defeated."
    text.innerHTML+="<p>You defeated "+hero.enemies+" enemies. </p>";
    text.innerHTML+="<h3> Click OK to play again.</h3>";
}

function youWin()
{
    showOk(true);
    okButton.onclick=endGame;
    text.innerHTML="<p>You defeated "+hero.enemies+" demons.  </p>";
    text.innerHTML+="<p> As you tore the 100th demon asunder, the crowd cheers your supremacy of the pit. You collect your "+hero.gold+ " gold gained from the slaughter. </p>";
    text.innerHTML+="<p> You walk towards your freedom with bloody hands and a violent grin.</p>";
    text.innerHTML+="<p>The Gods favour your might !!!!!! </p> ";
    text.innerHTML+="<p> Congratulations (Refresh page to play again) </p> ";
    okButton.innerHTML="                                 You Win"                                        ;
}
function run()
{
    if (Math.random()<0.34)   // 1/3 chance to escape  if Math.random()*monster.maxHP<hero.maxHP*0.5)
    {
        text.innerHTML=" You raise your white flag and the crowd approves.";
        okButton.onclick= nextMonster;
        showOk(true);
    }
    else
    {
    text.innerHTML=" You raise your white flag but the crowd wants more blood. .";
    monsterTurn();    
    }
}

function defend()
{
    text.innerHTML=hero.name+" defends";
    hero.defending=true;
    monsterTurn();
}

function checkLevelUp()
{
    if (hero.xp>15*hero.level)
    {

        text.innerHTML+="<h3> you have leveled up! </h3>";
        text.innerHTML+="<h3> You grow stronger with each victory. </h3>";

        let attack =Math.floor(Math.random()*6)+2;
        let defense=Math.floor(Math.random()*6)+2;

        text.innerHTML += "Attack increased by "+attack+". <br>";
        text.innerHTML += "Defense increased by "+defense+". <br>";

        hero.hpMax+=20;
        hero.hp=hero.hpMax;
        hero.attack+=attack;
        hero.defense+=defense;
        hero.level++;
        hero.xp=0;
        
        okButton.innerHTML="LEVEL UP!";
    }
}
