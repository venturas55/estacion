<!DOCTYPE html>
<html lang="es">

<head>
	<title>Estacion Faro Cullera</title>
	<meta charset="UTF-8">
	<script src='https://cdn.plot.ly/plotly-latest.min.js'></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js'></script>
	<link rel="stylesheet" href="./css/estilo.css">
	<link rel="icon" href="./img/dick.png">
</head>

<body>
	<div id="miApp">
		<header>
			<div class="overlay">
				<h1>Estación Faro de Cullera</h1>
				<h2>Ubicada en el faro de Cullera. Para los enfermos del Kite.</h2>
				<h3>Ultima actualización: {{actual[0]}} </h3>
				<button v-on:click="mostrar()" id="btnActualizar"> Actualizar</button>
			</div>
		</header>
		<div class="historico"> 
			<div class="flex row actual">
				<div  id='myGauge'>
				</div>
				<div>
					<div class="cajita uno">
						<p>Foil Party</p>
					</div>
					<div class="cajita dos">
						<p>Pincho y kite grande</p>
					</div>
					<div class="cajita tres">
						<p>Twintip y kite grande</p>
					</div>
					<div class="cajita cuatro">
						<p>Kite pequeño</p>
					</div>
					<div class="cajita cinco">
						<p>Cerveza o Netflix</p>
					</div>
				</div>
				<div class="imagen" v-if="actual[1]">
					<a v-if="actual[1]>33"  href="./img/netflix.png" target="_blank" ><img src="./img/netflix.png" alt="" > </a>
					<a v-else-if="actual[1]>24"  href="./img/megaloop.png" target="_blank"><img src="./img/megaloop.png" alt="" ></a>
					<a v-else-if="actual[1]>18" href="./img/twintip.jpg" target="_blank" ><img  src="./img/twintip.jpg" alt=""></a>
					<a v-else-if="actual[1]>14" href="./img/pincho.png" target="_blank" ><img  src="./img/pincho.png" alt=""></a>
					<a v-else-if="actual[1]>10" href="./img/foil.png" target="_blank" ><img  src="./img/foil.png" alt="" ></a>
					<a v-else href="./img/beer.png" target="_blank" ><img src="./img/beer.png" alt=""></a>
				</div>
			
			</div>
				<div  class="grafico" id='myGraph'>
				</div>
			</div>
		

		<div class="flex column prediccion">
			<select name="select" v-model="localidad" @change="prevision">
				<option value="1">Localidad</option>
				<option value="alboraya">Alboraya</option>
				<option value="saler">Saler</option>
				<option value="cullera">Cullera</option>
			</select>
			<div class="contenido">
			<div class="grafico" id='myGraph2'>
			</div>
			<table class="prevision" id="previ2">
				<caption> Prevision </caption>
				<tr>
					<th>Hora</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>Racha (knots)</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>

				<tr>
					<th>Media (knots)</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>Direccion</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>Nubosidad</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>Temperatura</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>

				<tr>
					<th>Icon</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>

			</table>
</div>

	
		</div>

	</div>
	<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js"></script>
	<script src="./js/app.js"></script>
</body>

</html>