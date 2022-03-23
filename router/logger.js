const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream') // version 2.x

const generate = () => (new Date().toISOString().substring(0,10) + '.log');

const accessLogStream = rfs.createStream(generate(), {
  interval: '1d', // rotate daily
  path: path.join(__dirname, '../', 'log')
})

const opts = { 
  skip: function (req, res) { return res.statusCode < 200 },
  stream: accessLogStream 
}
module.exports = () => [ morgan('combined', opts) ]

let userData = []
  $.ajax({
    type: 'POST',
    url: "https://www.organismo-am.it/elenchi-registri/proxy/RicercaGenerica/RicercaIscritti.php",
    data: { 
     "CODICE_FISCALE": "",
    	"DOMICILIO_SEDE_LEGALE_PROVINCIA_ID": "",
    	"filter": "",
    	"group": "",
    	"ID_REGISTRO": 1,
    	"NOME_VISUALIZZATO": "",
    	"page": 1,
    	"pageSize": 1000,
    	"PERSONA": "",
      "sort": "NOME_VISUALIZZATO-asc" },
      dataType: 'json',
    success: function(responseData, textStatus, jqXHR) {
        const users = responseData.Data.map( cli => ({
          Nome: cli.NOME_VISUALIZZATO,
          Persona: cli.PERSONA,
          IdSoggetto: cli.SOGGETTO_ID,
          IdRegistro: cli.ID_REGISTRO
          }) );

          // dati utente
          for( let user of users)
          $.ajax({
            type: 'POST',
            url: "https://www.organismo-am.it/elenchi-registri/proxy/RicercaGenerica/DettaglioIscritto.php",
            data: user,
              dataType: 'json',
            success: function(resp, textStatus, jqXHR) {
              userData.push(resp)
              console.log( userData )
            },
            error: function (responseData, textStatus, errorThrown) {
                //var errorThrown = [data, url];
                console.error( responseData )
            }
          });
    },
    error: function (responseData, textStatus, errorThrown) {
        //var errorThrown = [data, url];
        console.error( responseData )
    }
});


$.ajax({
  type: 'POST',
  url: "https://www.organismo-am.it/elenchi-registri/proxy/RicercaGenerica/DettaglioIscritto.php",
  data: { 
    "Nome": "1 OF 1 FIN",
    "Persona": "Giuridica",
    "IdSoggetto": "64822a1f-bf2a-4e51-be3a-f2757b2d3b37",
  "IdRegistro": 1 },
    dataType: 'json',
  success: function(resp, textStatus, jqXHR) {
     console.log( resp )

  },
  error: function (responseData, textStatus, errorThrown) {
      //var errorThrown = [data, url];
      callbackFail(responseData, textStatus, errorThrown);
  }
});
