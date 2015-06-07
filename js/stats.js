﻿function updateHtml() {
    if (player.stats >= 1) { // Show "plus" image when player level up
        document.getElementById("vis1").style.visibility = "visible";
        document.getElementById("vis2").style.visibility = "visible";
        document.getElementById("vis3").style.visibility = "visible";
        document.getElementById("vis4").style.visibility = "visible";
        document.getElementById("vis5").style.visibility = "visible";
        document.getElementById("vis6").style.visibility = "visible";
        document.getElementById("vis7").style.visibility = "visible";
    } else {
        document.getElementById("vis1").style.visibility = "hidden";
        document.getElementById("vis2").style.visibility = "hidden";
        document.getElementById("vis3").style.visibility = "hidden";
        document.getElementById("vis4").style.visibility = "hidden";
        document.getElementById("vis5").style.visibility = "hidden";
        document.getElementById("vis6").style.visibility = "hidden";
        document.getElementById("vis7").style.visibility = "hidden";
    }
    var minDamage;
    var maxDamage;
    var strength;
    var endurance;
    var agility;
    var dexterity;
    var intelligence;
    var wisdom;
    var luck;
    var hpRegen;
    var stats;
    var accuracy;
    var defense;
    var criticalDamage;
    var criticalChance;
    var mana;
    var maxMana;
    var manaRegen;
    var evasion;
    var dropRate;
    var expRate;
    var goldRate;
    var level;
    var maxExperience;
    var experience;
    var gold;
    var buyBackpack;
    var buyStat;
    var potion;
    var superPotion;
    var megaPotion;
    var skillPoints;

    minDamage = document.getElementById('mindamage');
    maxDamage = document.getElementById('maxdamage');
    strength = document.getElementById('strength');
    endurance = document.getElementById("endurance");
    hpRegen = document.getElementById("hpregen");
    stats = document.getElementById("stats");
    agility = document.getElementById("agility");
    dexterity = document.getElementById("dexterity");
    wisdom = document.getElementById("wisdom");
    intelligence = document.getElementById("intelligence");
    luck = document.getElementById("luck");
    mana = document.getElementById("mana");
    manaRegen = document.getElementById("manaRegen");
    maxMana = document.getElementById("maxmana");
    criticalDamage = document.getElementById("criticalDamage");
    criticalChance = document.getElementById("criticalChance");
    defense = document.getElementById("defense");
    evasion = document.getElementById("evasion");
    accuracy = document.getElementById("accuracy");
    dropRate = document.getElementById("dropRate");
    expRate = document.getElementById("expRate");
    goldRate = document.getElementById("goldRate");
    level = document.getElementById("level");
    maxExperience = document.getElementById("maxexperience");
    experience = document.getElementById("experience");
    gold = document.getElementById("gold");
    buyBackpack = document.getElementById("buyBackpack");
    buyStat = document.getElementById("buyStat");
    potion = document.getElementById('potion');
    superPotion = document.getElementById('superPotion');
    megaPotion = document.getElementById('megaPotion');
    skillPoints = document.getElementById('skillPoints');
    minDamage.innerHTML = player.minDamage().toFixed(0);
    maxDamage.innerHTML = player.maxDamage().toFixed(0);
    strength.innerHTML = player.totalStrength() + " (" + '<font color="blue">' + player.equipStrength() + '</font>' + ")";
    endurance.innerHTML = player.totalEndurance() + " (" + '<font color="blue">' + player.equipEndurance() + '</font>' + ")";
    hpRegen.innerHTML = player.hpregen();
    stats.innerHTML = player.stats;
    agility.innerHTML = player.totalAgility() + " (" + '<font color="blue">' + player.equipAgility() + '</font>' + ")";
    accuracy.innerHTML = player.accuracy().toFixed(2);
    dexterity.innerHTML = player.totalDexterity() + " (" + '<font color="blue">' + player.equipDexterity() + '</font>' + ")";
    defense.innerHTML = player.defense().toFixed(0);
    criticalDamage.innerHTML = (player.criticalDamage() * 100).toFixed(0) + "%";
    criticalChance.innerHTML = player.criticalChance().toFixed(1);
    intelligence.innerHTML = player.totalIntelligence() + " (" + '<font color="blue">' + player.equipIntelligence() + '</font>' + ")";
    mana.innerHTML = player.mana.toFixed(0);
    maxMana.innerHTML = player.maxMana().toFixed(0);
    wisdom.innerHTML = player.totalWisdom() + " (" + '<font color="blue">' + player.equipWisdom() + '</font>' + ")";
    manaRegen.innerHTML = player.manaRegen();
    luck.innerHTML = player.totalLuck() + " (" + '<font color="blue">' + player.equipLuck() + '</font>' + ")";
    evasion.innerHTML = player.evasion().toFixed(1);
    dropRate.innerHTML = (player.dropRate() * 100).toFixed(0);
    expRate.innerHTML = (player.expRate() * 100).toFixed(0);
    goldRate.innerHTML = (player.goldRate() * 100).toFixed(0);
    level.innerHTML = player.level;
    maxExperience.innerHTML = player.maxExperience;
    experience.innerHTML = player.experience;
    gold.innerHTML = player.gold.toFixed(0);
    buyBackpack.innerHTML = backpackStatus.price;
    buyStat.innerHTML = statStatus.price;
    potion.innerHTML = pot;
    superPotion.innerHTML = spot;
    megaPotion.innerHTML = mpot;
    skillPoints.innerHTML = player.skillPoints;
};
//auto Save
window.setInterval(function () {
    saveGameFunction("autoSave")
}, 10000);

window.setInterval(function () {
    var exppercent = 0; //Player experience in % values at the top bar
    exppercent = (Math.floor((player.experience / player.maxExperience) * 100));
    var divArray = document.getElementById('progressBar');
    divArray.style.width = ((exppercent) + '%');
    document.getElementById("exppercent").innerHTML = exppercent + "%";
}, 100);
window.setInterval(function () {
    var healthPercent = (Math.floor((player.health / player.maxhealth()) * 100));
    var divArray = document.getElementById('progressBar2');
    divArray.style.width = ((healthPercent) + '%');
}, 100);
window.setInterval(function () { //Health regen
    if (player.isDead == false) {
        if (player.health < player.maxhealth()) player.health += player.hpregen();
        if (player.health > player.maxhealth()) player.health = player.maxhealth();
    }
    document.getElementById('health').innerHTML = player.health + "/" + player.maxhealth();
}, 1000);
window.setInterval(function () { //Mana regen
    if (player.mana < player.maxMana()) player.mana += player.manaRegen();
    if (player.mana > player.maxMana()) player.mana = player.maxMana();
    document.getElementById('mana').innerHTML = player.mana.toFixed(0);
}, 1000);

function levelUp() {
    for (var hero in characterClasses) {
        var heroClass = characterClasses[hero];
        if (player.heroClass === heroClass.name) {
            player.baseStrength += heroClass.strength;
            player.baseEndurance += heroClass.endurance;
            player.baseAgility += heroClass.agility;;
            player.baseDexterity += heroClass.dexterity;
            player.baseWisdom += heroClass.wisdom;
            player.baseIntelligence += heroClass.intelligence;
            player.baseLuck += heroClass.luck;
            player.skillPoints += 1;
        };
    };
    quest();
    CreateMonsterHtml();
    updateHtml();
    CreatePlayerSkillsHtml();
    CreatePlayerHotBar();
};

function loadIsEquipped() {
    if (equippedItems.weapon.subType === "sword") {
        player.isSword = true;
    }
    else if (equippedItems.weapon.subType === "axe") {
        player.isAxe = true;
    }
    else if (equippedItems.weapon.subType === "mace") {
        player.isMace = true;
    }
    else if (equippedItems.weapon.subType === "staff") {
        player.isStaff = true;
    }
    else if (equippedItems.weapon.subType === "ranged") {
        player.isRanged = true;
    };
};

function resetIsEquipped() {
        player.isSword = false;
        player.isAxe = false;
        player.isMace = false;
        player.isStaff = false;
        player.isRanged = false;
};


//Upgrading player stats

//Strength
function upgradeStrength(event) {
    if (event.shiftKey) {
        if (player.stats >= 100) {
            player.stats = player.stats - 100;
            player.baseStrength += 100;
        }
    }
    if (event.ctrlKey) {
        if (player.stats >= 10) {
            player.stats = player.stats - 10;
            player.baseStrength += 10;

        }
    }
    else if (!event.shiftKey && !event.ctrlKey) {
        if (player.stats >= 1) {
            player.stats = player.stats - 1;
            player.baseStrength += 1;
        }
    }
    updateHtml();
}
//Endurance
function upgradeEndurance(event) {
    if (event.shiftKey) {
        if (player.stats >= 100) {
            player.stats = player.stats - 100;
            player.baseEndurance += 100;
        }
    }
    if (event.ctrlKey) {
        if (player.stats >= 10) {
            player.stats = player.stats - 10;
            player.baseEndurance += 10;

        }
    }
    else if (!event.shiftKey && !event.ctrlKey) {
        if (player.stats >= 1) {
            player.stats = player.stats - 1;
            player.baseEndurance += 1;
        }
    }
    updateHtml();
}
//Agility
function upgradeAgility(event) {
    if (event.shiftKey) {
        if (player.stats >= 100) {
            player.stats = player.stats - 100;
            player.baseAgility += 100;
        }
    }
    if (event.ctrlKey) {
        if (player.stats >= 10) {
            player.stats = player.stats - 10;
            player.baseAgility += 10;

        }
    }
    else if (!event.shiftKey && !event.ctrlKey) {
        if (player.stats >= 1) {
            player.stats = player.stats - 1;
            player.baseAgility += 1;
        }
    }
    updateHtml();
}
//Dexterity
function upgradeDexterity(event) {
    if (event.shiftKey) {
        if (player.stats >= 100) {
            player.stats = player.stats - 100;
            player.baseDexterity += 100;
        }
    }
    if (event.ctrlKey) {
        if (player.stats >= 10) {
            player.stats = player.stats - 10;
            player.baseDexterity += 10;

        }
    }
    else if (!event.shiftKey && !event.ctrlKey) {
        if (player.stats >= 1) {
            player.stats = player.stats - 1;
            player.baseDexterity += 1;
        }
    }
    updateHtml();
}
//Wisdom
function upgradeWisdom(event) {
    if (event.shiftKey) {
        if (player.stats >= 100) {
            player.stats = player.stats - 100;
            player.baseWisdom += 100;
        }
    }
    if (event.ctrlKey) {
        if (player.stats >= 10) {
            player.stats = player.stats - 10;
            player.baseWisdom += 10;

        }
    }
    else if (!event.shiftKey && !event.ctrlKey) {
        if (player.stats >= 1) {
            player.stats = player.stats - 1;
            player.baseWisdom += 1;
        }
    }
    updateHtml();
}
//Intelligence
function upgradeIntelligence(event) {
    if (event.shiftKey) {
        if (player.stats >= 100) {
            player.stats = player.stats - 100;
            player.baseIntelligence += 100;
        }
    }
    if (event.ctrlKey) {
        if (player.stats >= 10) {
            player.stats = player.stats - 10;
            player.baseIntelligence += 10;

        }
    }
    else if (!event.shiftKey && !event.ctrlKey) {
        if (player.stats >= 1) {
            player.stats = player.stats - 1;
            player.baseIntelligence += 1;
        }
    }
    updateHtml();
}
//Luck
function upgradeLuck(event) {
    if (event.shiftKey) {
        if (player.stats >= 100) {
            player.stats = player.stats - 100;
            player.baseLuck += 100;
        }
    }
    if (event.ctrlKey) {
        if (player.stats >= 10) {
            player.stats = player.stats - 10;
            player.baseLuck += 10;

        }
    }
    else if (!event.shiftKey && !event.ctrlKey) {
        if (player.stats >= 1) {
            player.stats = player.stats - 1;
            player.baseLuck += 1;
        }
    }
    updateHtml();
}
function autoAttack(monster, monsterStats) {
    var ManaCost = monster.Stats.manaCost;
    var autoBattle = window.setInterval(function () {
        if (player.mana >= ManaCost && player.autoBattle == true) {
            player.mana -= ManaCost;
            attack(monster, monsterStats)
        }
        else if (player.autoBattle == false) {
            clearInterval(autoBattle);
            player.isAuto = false;
        };
    }, 1000)
};

//All skill charge = maxCharge, when game loads, player equips items i.e change his stats like wisdom/int that can provide more/less charges.
function skillChargeFill() {
    var skill = player.activeSpells;
    for (spell in skill) {
        var selectedSpell = skill[spell];
        selectedSpell.charge = selectedSpell.maxCharge();
    };
};

function upgradeSpell(spellName) {

    if (activeSpells.hasOwnProperty(spellName)) {
        var selectedSpell = activeSpells[spellName];
        if (selectedSpell.levelReq < player.level) {
            if (selectedSpell.level < 5) {
                if (player.skillPoints > 0) {
                    player.skillPoints--;
                    selectedSpell.level++;
                    selectedSpell.levelReq++;
                    Log(selectedSpell.name + " level is now " + selectedSpell.level)
                }
                else {
                    Log("You do not have enough skill points.")
                }
            }
            else {
                Log(selectedSpell.name + " is already max level.")
            };
        }
        else {
            Log("Your level is not high enough to upgrade this skill.");
        };
    };
    CreatePlayerSkillsHtml();
    CreatePlayerHotBar();
    updateHtml();
};
var spellTotalManaCost = 0;
function spellActivation(spellName) {
    if (activeSpells.hasOwnProperty(spellName)) {
        var selectedSpell = activeSpells[spellName];
        if (selectedSpell.isActive == true) {
            selectedSpell.isActive = false;
            spellTotalManaCost -= selectedSpell.manaReq;
        }
        else if (selectedSpell.levelReq > player.level) {
            Log("Your level is not high enough to activate it")
        }
        else if (spellTotalManaCost + selectedSpell.manaReq <= player.maxMana()){
            selectedSpell.isActive = true;
            spellTotalManaCost += selectedSpell.manaReq;
        }
        else {
            Log("You do not have enough \"Max Mana\" to activate this spell. You need " + selectedSpell.manaReq + " Max Mana.")
        }
    };
    CreatePlayerSkillsHtml();
    CreatePlayerHotBar();
};
