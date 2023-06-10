'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = {
      // электрогитары
      "Fender": ["Jaguar", "Jazzmaster", "Mustang", "Stratocaster", "Telecaster", "Jaguar Bass", "Jazz Bass", "Mustang Bass", "Precision Bass", "Bandmaster", "Bandmaster Reverb", "Bassman", "Deluxe", "Deluxe Reverb", "Другая"],
      "Gibson": ["ES", "L", "Explorer", "Firebird", "Flying V", "Les Paul", "SG", "Другая"],
      "PRS": ["SE", "S2", "Bolt-On", "Core", "Private Stock", "Другая"],
      "Ibanez": ["GIO", "Standard", "Premium", "Prestige", "J Custom", "Artcore", "Artstar", "Другая"],
      "ESP": ["Forest", "XJ", "Horizon", "Mirage", "VIPER", "Eclipse", "Другая"],
      "Dean": ["ML", "V", "Z", "Cadillac", "Splittail", "Soltero", "EVO", "Icon", "Custom Zone", "Vendetta", "Deceiver", "Другая"],
      "Yamaha": ["CF", "C", "G", "A", "S", "Z", "AvantGrand", "CP", "PF", "Modus", "CVP", "P", "GC", "F", "FG", "CV", "EG", "ERG", "EX", "Pacifica", "RGX", "SA", "SG", "Другая"],
      "LTD": ["V", "AX", "B", "EC", "F", "FX", "H", "M", "MH", "PB", "ST", "Viper", "Другая"],
      "Jackson": ["Soloist", "Dinky", "Rhoads", "King V", "Juggernaut", "Kelly", "Warrior", "Monarkh", "Demmelition Fury", "Shadowcaster", "Death Angel", "Другая"],
      "Schecter": ["Apocalypse", "Banshee", "Blackjack", "Custom", "Damien", "Demon", "Exotic", "Hellraiser", "Omen", "Reaper", "Другая"],
      // Педали и эффекты
      "ZOOM": ["Другая"],
      "Boss": ["Другая"],
      "BEHRINGER": ["Другая"],
      "TC Electronic": ["Другая"],
      // Усилители и комбоусилители
      "Laney": ["Другая"],
      "Roland": ["Другая"],
      "Marshall": ["Другая"],
      "Vox": ["Другая"],
      // Акустические и классические гитары
      "Martinez": ["Другая"],
      "Vesto": ["Другая"],
      "Flight": ["Другая"],
      "Ashtone": ["Другая"],
      // Бас-гитары
      "Music man": ["Другая"],
      "Rickenbacker": ["Другая"],
      "Warwick": ["Другая"],
      // Ударные и перкуссия
      "TAMA": ["Другая"],
      "Sonor": ["Другая"],
      "Soundking": ["Другая"],
      "DW": ["Другая"],
      "Paiste": ["Другая"],
      "Sabian": ["Другая"],
      "Zildjian": ["Другая"],
      "Maxtone": ["Другая"],
      // Духовые
      "J.Michael": ["Другая"],
      "Eurofon": ["Другая"],
      // Смычковые
      "Leonardo": ["Другая"],
      "Kapok": ["Другая"],
      "Parksons": ["Другая"],
      "Stagg": ["Другая"],
      "Stentor": ["Другая"],
      "Strunal": ["Другая"],
      // Клавишные
      "Kurzweil": ["Другая"],
      "Casio": ["Другая"],
      "Ringway": ["Другая"],
      "Korg": ["Другая"],
      "Roland": ["Другая"],
    };

    for (let man of Object.keys(data)) {
      await queryInterface.bulkInsert('manufacturers', [{ name: man, createdAt: new Date(), updatedAt: new Date() }], {});

      let result = await queryInterface.sequelize.query(
        `SELECT * FROM manufacturers WHERE name = '${man}'`, 
        {
          type: queryInterface.sequelize.QueryTypes.SELECT
        }
      )

      let manufacturerId = result[0].id;

      let models = [];
      for (let m of data[man]) {
        models.push({ manufacturerId, name: m, createdAt: new Date(), updatedAt: new Date() });
      }

      await queryInterface.bulkInsert('instrumentmodels', models, {});
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
