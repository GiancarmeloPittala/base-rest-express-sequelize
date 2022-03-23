(async () => {
  const express = require('express');
  const app = express();
  const { sequelize } = require('./models')
  const api = require('./router')
  require('dotenv').config();

  const { PORT, SYNC_ALTER, SYNC_FORCE } = process.env;

  try {
    await sequelize.sync({ alter: SYNC_ALTER === 'true', force: SYNC_FORCE === 'true' })
    console.log( "Database sincronizzato correttamente")
  } catch (error) {
    console.error( error )
  }

  try {

    app.use('/api', api )
    
    app.get("*", express.static(__dirname + '/public'));
    // app.get("*", (req,res) => {res.status(200).sendFile(__dirname + '/public/dist/404.html')} );
    
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;

    app.listen(PORT, () => {
      console.log(`In ascolto sulla porta ${PORT}`)
      if ( process.env.NODE_ENV === 'development')
        console.log(`http://localhost:${PORT}/api`)
    })  
    
  } catch (error) {
    console.error( error )
  }



})()