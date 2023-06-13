// Verificador de usuario valido
function verificarusuario()
{
        function mostrarusuario()
        {
            if(localStorage.getItem('Nombre'))
            {
                let Unombre =localStorage.getItem('Nombre')
                document.getElementById('Usuario').innerHTML = Unombre
            }
            else
            {
                window.location.href= './index.html'
            }
        }
        mostrarusuario()
}
verificarusuario()


// De aqui para abajo solo llamados a la API

// Las funciones async (asincronas)
// Siempre deben tener try,await y una fetch
const API = async()=>{
    // try= si funciona dejalo
try{
//Mostrar el nombre y precio de la criptomoneda
        //await = espera  // Fetch es una promesa
        //en la promesa se inserta el link de la API en este caso llame a las mejores criptomonedas del mercado
        const respuesta = await fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD');
        console.log("Criptomoneda"+respuesta);
        const datos = await respuesta.json();
        console.log(datos);
        let monedas = '';

        //Api del bolivar
        const respuestaboli = await fetch('https://s3.amazonaws.com/dolartoday/data.json');
        const datosb = await respuestaboli.json();
        console.log(datosb)
        let bolivares = datosb.USD.transferencia
        console.log(bolivares)

        //foreach Por cada moneda q haya en la data va a generar todo lo q contenga esta parte del codigo
        datos.Data.forEach(moneda =>{
            monedas = monedas + `<li class='tiposmonedas'>${moneda.CoinInfo.FullName} (${moneda.CoinInfo.Name})<br> <div class='precio'>$${(moneda.RAW.USD.PRICE).toFixed(3)}<br><p class='bolivares'>${(moneda.RAW.USD.PRICE*bolivares).toFixed(3)}Bs</p></div></li>`
        });
        document.getElementById('lista').innerHTML = monedas
        console.log(datos.Data)
} 
// catch Si no funciona me dices
catch(error){
    console.log('Algo salio mal'+error)
}
}
API()

// Cotizar

const cotizacion = async()=>{
    try{
        const respuesta = await fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD')
        console.log("Criptomonedas"+respuesta)
        const datos = await respuesta.json();
        console.log(datos)
        for(i=0;i<=9;i++)
        {
            let nombrecripto = datos.Data[i].CoinInfo.FullName
            let abreviaturacripto = datos.Data[i].CoinInfo.Name
            document.getElementById(`eligemoneda${i}`).innerHTML= nombrecripto +" ("+abreviaturacripto+')'
            document.getElementById(`eligemoneda${i}`).value= abreviaturacripto
        
        }
        // API  para traer la Tasa de las monedas
        // El llamado a al dinero y sus valores
        const respuestamone = await fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,USDT,BNB,USDC,XRP,BUSD,DOGE,ADA,MATIC&tsyms=USD,JPY,EUR,MXN,PEN,BS');
        console.log('Dinero'+respuestamone);
        const datosmone = await respuestamone.json();
        console.log(datosmone)
        
        // mostrarmoneda = Texto donde se mostrara el resultado de la cotizacion dependiendo
        // de cuales monedas escoja el usuario
        let mostrarmoneda = document.getElementById('mostrarmoneda')
        let cotizar = document.getElementById('cotizar')
        
        // Selector de monedas reales
        const tiposdemonedareal = document.getElementById('tiposdemonedareal')

        // Selector de criptomoneda
        const tiposdemoneda = document.getElementById('tiposdemoneda')
       
    
        tiposdemoneda.addEventListener('change',()=>{
            let seleccionado = tiposdemoneda.value;
            console.log('ELEGISTEEEE '+seleccionado)
        })
            // Aqui se decide que moneda te cotizara, la API podia traerlas todas
            // Ya q es editable
        cotizar.addEventListener('click',()=>{
            // BITCOIN
           if(tiposdemonedareal.value==`USD`&&tiposdemoneda.value=='BTC')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: $${(datosmone.RAW.BTC.USD.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BTC.USD.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BTC.USD.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`JPY`&&tiposdemoneda.value=='BTC')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: ¥${(datosmone.RAW.BTC.JPY.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BTC.JPY.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BTC.USD.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`EUR`&&tiposdemoneda.value=='BTC')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: €${(datosmone.RAW.BTC.EUR.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BTC.EUR.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BTC.EUR.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`MXN`&&tiposdemoneda.value=='BTC')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: MXN.${(datosmone.RAW.BTC.MXN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BTC.MXN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BTC.MXN.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`PEN`&&tiposdemoneda.value=='BTC')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: S/${(datosmone.RAW.BTC.PEN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BTC.PEN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BTC.PEN.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`BS`&&tiposdemoneda.value=='BTC')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: Bs.${(datosmone.RAW.BTC.BS.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BTC.BS.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BTC.BS.CHANGEHOUR).toFixed(3)}</p>`
           }
           // Ether
           if(tiposdemonedareal.value==`USD`&&tiposdemoneda.value=='ETH')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: $${(datosmone.RAW.ETH.USD.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.ETH.USD.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.ETH.USD.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`JPY`&&tiposdemoneda.value=='ETH')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: ¥${(datosmone.RAW.ETH.JPY.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.ETH.JPY.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.ETH.USD.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`EUR`&&tiposdemoneda.value=='ETH')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: €${(datosmone.RAW.ETH.EUR.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.ETH.EUR.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.ETH.EUR.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`MXN`&&tiposdemoneda.value=='ETH')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: MXN.${(datosmone.RAW.ETH.MXN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.ETH.MXN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.ETH.MXN.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`PEN`&&tiposdemoneda.value=='ETH')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: S/${(datosmone.RAW.ETH.PEN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.ETH.PEN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.ETH.PEN.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`BS`&&tiposdemoneda.value=='ETH')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: Bs.${(datosmone.RAW.ETH.BS.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.ETH.BS.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.ETH.BS.CHANGEHOUR).toFixed(3)}</p>`
           }
            // Tether
           if(tiposdemonedareal.value==`USD`&&tiposdemoneda.value=='USDT')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: $${(datosmone.RAW.USDT.USD.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.USDT.USD.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.USDT.USD.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`JPY`&&tiposdemoneda.value=='USDT')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: ¥${(datosmone.RAW.USDT.JPY.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.USDT.JPY.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.USDT.USD.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`EUR`&&tiposdemoneda.value=='USDT')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: €${(datosmone.RAW.USDT.EUR.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.USDT.EUR.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.USDT.EUR.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`MXN`&&tiposdemoneda.value=='USDT')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: MXN.${(datosmone.RAW.USDT.MXN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.USDT.MXN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.USDT.MXN.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`PEN`&&tiposdemoneda.value=='USDT')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: S/${(datosmone.RAW.USDT.PEN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.USDT.PEN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.USDT.PEN.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`BS`&&tiposdemoneda.value=='USDT')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: Bs.${(datosmone.RAW.USDT.BS.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.USDT.BS.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.USDT.BS.CHANGEHOUR).toFixed(3)}</p>`
           }

        //  Binance Coin
          if(tiposdemonedareal.value==`USD`&&tiposdemoneda.value=='BNB')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: $${(datosmone.RAW.BNB.USD.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BNB.USD.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BNB.USD.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`JPY`&&tiposdemoneda.value=='BNB')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: ¥${(datosmone.RAW.BNB.JPY.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BNB.JPY.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BNB.USD.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`EUR`&&tiposdemoneda.value=='BNB')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: €${(datosmone.RAW.BNB.EUR.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BNB.EUR.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BNB.EUR.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`MXN`&&tiposdemoneda.value=='BNB')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: MXN.${(datosmone.RAW.BNB.MXN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BNB.MXN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BNB.MXN.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`PEN`&&tiposdemoneda.value=='BNB')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: S/${(datosmone.RAW.BNB.PEN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BNB.PEN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BNB.PEN.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`BS`&&tiposdemoneda.value=='BNB')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: Bs.${(datosmone.RAW.BNB.BS.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BNB.BS.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BNB.BS.CHANGEHOUR).toFixed(3)}</p>`
           }
           //  USD COIN
          if(tiposdemonedareal.value==`USD`&&tiposdemoneda.value=='USDC')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: $${(datosmone.RAW.USDC.USD.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.USDC.USD.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.USDC.USD.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`JPY`&&tiposdemoneda.value=='USDC')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: ¥${(datosmone.RAW.USDC.JPY.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.USDC.JPY.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.USDC.USD.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`EUR`&&tiposdemoneda.value=='USDC')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: €${(datosmone.RAW.USDC.EUR.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.USDC.EUR.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.USDC.EUR.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`MXN`&&tiposdemoneda.value=='USDC')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: MXN.${(datosmone.RAW.USDC.MXN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.USDC.MXN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.USDC.MXN.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`PEN`&&tiposdemoneda.value=='USDC')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: S/${(datosmone.RAW.USDC.PEN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.USDC.PEN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.USDC.PEN.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`BS`&&tiposdemoneda.value=='USDC')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: Bs.${(datosmone.RAW.USDC.BS.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.USDC.BS.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.USDC.BS.CHANGEHOUR).toFixed(3)}</p>`
          }
        //  XRP
        if(tiposdemonedareal.value==`USD`&&tiposdemoneda.value=='XRP')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: $${(datosmone.RAW.XRP.USD.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.XRP.USD.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.XRP.USD.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`JPY`&&tiposdemoneda.value=='XRP')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: ¥${(datosmone.RAW.XRP.JPY.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.XRP.JPY.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.XRP.USD.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`EUR`&&tiposdemoneda.value=='XRP')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: €${(datosmone.RAW.XRP.EUR.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.XRP.EUR.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.XRP.EUR.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`MXN`&&tiposdemoneda.value=='XRP')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: MXN.${(datosmone.RAW.XRP.MXN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.XRP.MXN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.XRP.MXN.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`PEN`&&tiposdemoneda.value=='XRP')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: S/${(datosmone.RAW.XRP.PEN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.XRP.PEN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.XRP.PEN.CHANGEHOUR).toFixed(3)}</p>`
           }
           if(tiposdemonedareal.value==`BS`&&tiposdemoneda.value=='XRP')
           {    
                mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: Bs.${(datosmone.RAW.XRP.BS.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.XRP.BS.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.XRP.BS.CHANGEHOUR).toFixed(3)}</p>`
           }
           //  BUSD
          if(tiposdemonedareal.value==`USD`&&tiposdemoneda.value=='BUSD')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: $${(datosmone.RAW.BUSD.USD.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BUSD.USD.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BUSD.USD.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`JPY`&&tiposdemoneda.value=='BUSD')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: ¥${(datosmone.RAW.BUSD.JPY.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BUSD.JPY.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BUSD.USD.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`EUR`&&tiposdemoneda.value=='BUSD')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: €${(datosmone.RAW.BUSD.EUR.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BUSD.EUR.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BUSD.EUR.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`MXN`&&tiposdemoneda.value=='BUSD')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: MXN.${(datosmone.RAW.BUSD.MXN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BUSD.MXN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BUSD.MXN.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`PEN`&&tiposdemoneda.value=='BUSD')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: S/${(datosmone.RAW.BUSD.PEN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BUSD.PEN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BUSD.PEN.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`BS`&&tiposdemoneda.value=='BUSD')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: Bs.${(datosmone.RAW.BUSD.BS.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.BUSD.BS.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.BUSD.BS.CHANGEHOUR).toFixed(3)}</p>`
          }
          //  Dogecoin
          if(tiposdemonedareal.value==`USD`&&tiposdemoneda.value=='DOGE')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: $${(datosmone.RAW.DOGE.USD.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.DOGE.USD.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.DOGE.USD.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`JPY`&&tiposdemoneda.value=='DOGE')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: ¥${(datosmone.RAW.DOGE.JPY.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.DOGE.JPY.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.DOGE.USD.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`EUR`&&tiposdemoneda.value=='DOGE')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: €${(datosmone.RAW.DOGE.EUR.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.DOGE.EUR.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.DOGE.EUR.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`MXN`&&tiposdemoneda.value=='DOGE')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: MXN.${(datosmone.RAW.DOGE.MXN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.DOGE.MXN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.DOGE.MXN.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`PEN`&&tiposdemoneda.value=='DOGE')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: S/${(datosmone.RAW.DOGE.PEN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.DOGE.PEN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.DOGE.PEN.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`BS`&&tiposdemoneda.value=='DOGE')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: Bs.${(datosmone.RAW.DOGE.BS.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.DOGE.BS.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.DOGE.BS.CHANGEHOUR).toFixed(3)}</p>`
          }
            //  Cardano
          if(tiposdemonedareal.value==`USD`&&tiposdemoneda.value=='ADA')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: $${(datosmone.RAW.ADA.USD.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.ADA.USD.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.ADA.USD.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`JPY`&&tiposdemoneda.value=='ADA')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: ¥${(datosmone.RAW.ADA.JPY.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.ADA.JPY.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.ADA.USD.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`EUR`&&tiposdemoneda.value=='ADA')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: €${(datosmone.RAW.ADA.EUR.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.ADA.EUR.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.ADA.EUR.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`MXN`&&tiposdemoneda.value=='ADA')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: MXN.${(datosmone.RAW.ADA.MXN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.ADA.MXN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.ADA.MXN.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`PEN`&&tiposdemoneda.value=='ADA')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: S/${(datosmone.RAW.ADA.PEN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.ADA.PEN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.ADA.PEN.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`BS`&&tiposdemoneda.value=='ADA')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: Bs.${(datosmone.RAW.ADA.BS.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.ADA.BS.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.ADA.BS.CHANGEHOUR).toFixed(3)}</p>`
          }
           //  Polygon
          if(tiposdemonedareal.value==`USD`&&tiposdemoneda.value=='MATIC')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: $${(datosmone.RAW.MATIC.USD.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.MATIC.USD.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.MATIC.USD.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`JPY`&&tiposdemoneda.value=='MATIC')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: ¥${(datosmone.RAW.MATIC.JPY.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.MATIC.JPY.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.MATIC.USD.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`EUR`&&tiposdemoneda.value=='MATIC')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: €${(datosmone.RAW.MATIC.EUR.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.MATIC.EUR.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.MATIC.EUR.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`MXN`&&tiposdemoneda.value=='MATIC')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: MXN.${(datosmone.RAW.MATIC.MXN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.MATIC.MXN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.MATIC.MXN.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`PEN`&&tiposdemoneda.value=='MATIC')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: S/${(datosmone.RAW.MATIC.PEN.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.MATIC.PEN.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.MATIC.PEN.CHANGEHOUR).toFixed(3)}</p>`
          }
          if(tiposdemonedareal.value==`BS`&&tiposdemoneda.value=='MATIC')
          {    
               mostrarmoneda.innerHTML = `<p class='titulo1'>${tiposdemoneda.value}</p><br><p class='precio'>Precio: Bs.${(datosmone.RAW.MATIC.BS.PRICE).toFixed(3)}</p><br><p class="cambio24h">Cambios en las últimas 24-h: ${(datosmone.RAW.MATIC.BS.CHANGE24HOUR).toFixed(3)}</p><br><p class="cambio1h">Cambios en la última hora: ${(datosmone.RAW.MATIC.BS.CHANGEHOUR).toFixed(3)}</p>`
          }
          
        })

        
}
    catch(error){
        console.log('Algo salio mal'+error)
    }
}


cotizacion()

