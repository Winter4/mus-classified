require("dotenv").config();

const { sequelize } = require("./models");

sequelize.sync({ force: true })
.then(() => { console.log('Synchronized successfully.'); })
.catch((error) => { console.error('Unable to sync:', error); })
