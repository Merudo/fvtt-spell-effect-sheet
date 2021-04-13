import ActorSheet5eNPC from "../../systems/dnd5e/module/actor/sheets/npc.js";

class SpellEfffectSheet extends ActorSheet5eNPC {

    get template() {
        
        const path = "systems/dnd5e/templates/actors/";
        if (!game.user.isGM && this.actor.limited) return path + "limited-sheet.html";
        return "modules/spell-effect-sheet/template/spell-effect-sheet.html";
    }

    static get defaultOptions() {
        const options = super.defaultOptions;

        mergeObject(options, {
            classes: ["dnd5e sheet actor npc npc-sheet spell-effect-sheet"],
            width: 800,
            height: 250
        });
        return options;
    }

    async getData() {
        const sheetData = super.getData();

        if (game.user.isGM) sheetData.isGM = true;
        else sheetData.isGM = false;

        console.log(sheetData);
        return sheetData;
    }


    


}

Hooks.once('init', async function () {

    Handlebars.registerHelper('ifeq', function (a, b, options) {
        if (a == b) { return options.fn(this); }
        return options.inverse(this);
    });
    
    Handlebars.registerHelper('ifnoteq', function (a, b, options) {
        if (a != b) { return options.fn(this); }
        return options.inverse(this);
    });

    console.log("SpellEfffectSheet | Loaded");

    //Register the loot sheet
    Actors.registerSheet("dnd5e", SpellEfffectSheet, {
        types: ["npc"],
        makeDefault: false
    });
	
    return '';
});

    



Hooks.on('ready', () => {
    try {
      window.BetterRolls.hooks.addActorSheet("SpellEfffectSheet");
      window.BetterRolls.hooks.addItemSheet("SpellEfffectSheet");
      console.log("SpellEfffectSheet | Enabled support for Better Rolls 5e");
    } catch (error) {
      console.log("SpellEfffectSheet | Better Rolls 5e module not installed - no big deal, carry on!");
    }
    
  });