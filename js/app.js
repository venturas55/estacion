var app = new Vue({
    el: '#miApp',
    data: {
        meses: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        listado: [],
        fechas: [],
        nudos: [],
        maxima: [],
        minima: [],
        actual: [],
        rep: "",
        int: "",
        forecast1: "",
        forecastToday: "",
        forecastTomorrow: "",
        PrevToday: [],
        PrevToday: [],
        PrevToday: [],
        fechasPrevTomorrow: [],
        nudosPrevTomorrow: [],
        rachasPrevTomorrow: [],
        localidad: "cullera",
        latitud: "",
        longitud: ""

    },
    computed: {},
    methods: {
        consulta: function () {
            console.log("consulta");
            axios.post('action.php', {
                action: 'fetchall'
            })
                .then(function (response) {
                    app.listado = response.data;
                    //Borramos arrays
                    app.fechas = [];
                    app.nudos = [];
                    for (var i = app.listado.length - 1; i >= 0; i--) {
                        app.fechas.push(app.listado[i][0]);
                        app.nudos.push(parseFloat(app.listado[i][1]).toFixed(2));
                        app.minima.push(parseFloat(app.listado[i][2]).toFixed(2));
                        app.maxima.push(parseFloat(app.listado[i][3]).toFixed(2));
                    }
                    //console.log(app.listado);
                    //console.log(JSON.stringify(app.listado[0]));
                    app.actual = [];
                    app.actual.push(app.listado[0][0]);
                    app.actual.push(parseFloat(app.listado[0][1]).toFixed(2));
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        mostrar: function () {
            //girar las flechas de las tablas
            for (i = 0; i < 48; i++) {
                document.getElementById("arrowb" + i).style.transform = 'rotate(' + this.forecast1.hourly[i].wind_deg + 'deg)';

            }

            //fin de girar las flechas
            //this.consulta();

            //GAUGE
            var data = [{
                domain: {
                    x: [0, 1],
                    y: [0, 1]
                },
                value: this.actual[1],
                title: {
                    text: "Knots"
                },
                type: "indicator",
                mode: "gauge+number",
                delta: {
                    reference: 20
                },
                gauge: {
                    axis: {
                        range: [null, 40]
                    },
                    steps: [{
                        range: [0, 10],
                        color: "#f58aec"
                    },
                    {
                        range: [10, 14],
                        color: "#fffe7a"
                    },
                    {
                        range: [14, 18],
                        color: "#a7ffb5"
                    },
                    {
                        range: [18, 24],
                        color: "#a6f2f9"
                    },
                    {
                        range: [24, 33],
                        color: "#f9cfc3"
                    },
                    {
                        range: [33, 40],
                        color: "#f58aec"
                    }
                    ],
                    /*         threshold: {
                                line: { color: "red", width: 4 },
                                thickness: 0.75,
                                value: 14
                            } */
                },

            }];
            var layout2 = {
                width: 600,
                height: 400,
                paper_bgcolor: '#f5deb3',
                plot_bgcolor: '#ffeec3',
            };
            Plotly.newPlot('myGauge', data, layout2);


            //GRAFICA HISTORICO VIENTO
            //Historico nudos
            var trace1 = {
                type: "scatter",
                mode: "lines",
                name: 'media',
                x: this.fechas,
                y: this.nudos,
                line: {
                    color: 'rgba(63, 191, 95, 1)',
                    width: 3
                }
            }
            //Historico nudos minima
            var trace2 = {
                type: "scatter",
                mode: "lines",
                name: 'Minima',
                x: this.fechas,
                y: this.minima,
                line: {
                    color: 'rgba(63, 146, 191, 0.3)',
                    width: 3
                }
            }
            //Historico nudos maxima
            var trace3 = {
                type: "scatter",
                mode: "lines",
                name: 'Maxima',
                x: this.fechas,
                y: this.maxima,
                line: {
                    color: 'rgba(191, 63, 63, 0.3)',
                    width: 3
                }
            }
            //Historico nudos direccion
            var trace4 = {
                type: "scatter",
                mode: "lines",
                name: 'Direccion',
                x: this.fechas,
                y: [0],
                line: {
                    color: 'rgba(148, 103, 189,0.6)',
                    width: 1
                },
                yaxis: 'y2',
            }
            var data = [trace1, trace2, trace3];
            var layout = {
                title: 'Historico Estación de Cullera',
                yaxis: {
                    range: [0, 25],
                    title: {
                        text: "Nudos",
                        standoff: 10
                    }
                },
                yaxis2: {
                    title: 'Dirección',
                    range: [0, 360],
                    titlefont: {
                        color: 'rgba(148, 103, 189,0.6)'
                    },
                    tickfont: {
                        color: 'rgba(148, 103, 189,0.6)'
                    },
                    overlaying: 'y',
                    side: 'right'
                },
                paper_bgcolor: '#f5deb3',
                plot_bgcolor: '#ffeec3',
                font: {
                    size: 18
                }
            };
            Plotly.newPlot('myGraph', data, layout, {
                displayModeBar: false
            });



            //GRAFICA PREVISION VIENTO hoy 
            var tracePreviHoy = {
                type: "scatter",
                mode: "lines",
                name: 'Velocidad',
                x: this.fechaPrevToday,
                y: this.nudosPrevToday,
                line: {
                    color: '#17BECF',
                    width: 3
                }
            }
            var dataHoy = [tracePreviHoy];
            var layoutPreviHoy = {
                title: 'Predicción para ' + this.localidad + ' hoy',
                yaxis: {
                    range: [0, 25],
                    title: {
                        text: "Nudos",
                        standoff: 10
                    }
                },

                paper_bgcolor: '#f5deb3',
                plot_bgcolor: '#ffeec3',
                font: {
                    size: 18
                }
            };
            Plotly.newPlot('myGraphHoy', dataHoy, layoutPreviHoy, {
                displayModeBar: false
            });

            //GRAFICA PREVISION VIENTO manana
            var tracePreviManana = {
                type: "scatter",
                mode: "lines",
                name: 'Velocidad',
                x: this.fechaPrevTomorrow,
                y: this.nudosPrevTomorrow,
                line: {
                    color: '#17BECF',
                    width: 3
                }
            }
            var dataManana = [tracePreviManana];
            var layoutPreviManana = {
                title: 'Predicción para ' + this.localidad + ' mañana',
                yaxis: {
                    range: [0, 25],
                    title: {
                        text: "Nudos",
                        standoff: 10
                    }
                },

                paper_bgcolor: '#f5deb3',
                plot_bgcolor: '#ffeec3',
                font: {
                    size: 18
                }
            };
            Plotly.newPlot('myGraphManana', dataManana, layoutPreviManana, {
                displayModeBar: false
            });

        },
        recargar: function () {
            //this.rep = setInterval(this.mostrar, 5000);
            // this.ret = setTimeout(this.mostrar(), 1000);
        },
        peticion: async function () {
            switch (this.localidad) {
                case 'alboraya':
                    this.longitud = -0.33802;
                    this.latitud = 39.504532;
                    break;
                case 'saler':
                    this.longitud = -0.33333;
                    this.latitud = 39.383331;
                    break;
                case 'cullera':
                    this.longitud = -0.25;
                    this.latitud = 39.166672;
                    break;
            }
            var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + this.latitud + "&lon=" + this.longitud + "&exclude=minutely&appid=40c80c4ba17021c74a82c737871c6673"
            try {
                let response = await fetch(apiURL);
                this.forecast1 = await response.json();
            } catch (error) {
                console.log(error);
            }
            await this.prevision();
            await this.mostrar();
        },
        prevision: function () {
            var meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            this.forecastToday = this.forecast1.hourly.slice(0, 24);
            this.forecastTomorrow = this.forecast1.hourly.slice(24, 49);
            this.nudosPrevToday = this.forecastToday.map(function (item) { return item.wind_speed * 1.94384.toFixed(1) });
            this.rachasPrevToday = this.forecastToday.map(function (item) { return item.wind_gust * 1.94384.toFixed(1) });
            this.fechaPrevToday = this.forecastToday.map(function (item) { return new Date(item.dt * 1000).getHours() + "h " + new Date(item.dt * 1000).getDate() + meses[new Date(item.dt * 1000).getMonth()] });
            this.nudosPrevTomorrow = this.forecastTomorrow.map(function (item) { return item.wind_speed * 1.94384.toFixed(1) });
            this.rachasPrevTomorrow = this.forecastTomorrow.map(function (item) { return item.wind_gust * 1.94384.toFixed(1) });
            this.fechaPrevTomorrow = this.forecastTomorrow.map(function (item) { return new Date(item.dt * 1000).getHours() + "h " + new Date(item.dt * 1000).getDate() + meses[new Date(item.dt * 1000).getMonth()] });
   
   
            /*          this.PrevToday = this.forecastToday.map(function (item) {
                return {
                    "nudos": item.wind_speed * 1.94384.toFixed(1),
                    "rachas": item.wind_gust * 1.94384.toFixed(1),
                    "fecha": new Date(item.dt * 1000).getHours() + "h " + new Date(item.dt * 1000).getDate() + meses[new Date(item.dt * 1000).getMonth()]
                }
            }); 

            this.PrevTomorrow = this.forecastTomorrow.map(function (item) {
                return {
                    "nudos": item.wind_speed * 1.94384.toFixed(1),
                    "rachas": item.wind_gust * 1.94384.toFixed(1),
                    "fecha": new Date(item.dt * 1000).getHours() + "h " + new Date(item.dt * 1000).getDate() + meses[new Date(item.dt * 1000).getMonth()]
                }
            });*/
    
            var textoHoy = "<tr><th> Fecha</th>" + this.forecastToday.map(item => ("<td> " + new Date(item.dt * 1000).getHours() + "h " + new Date(item.dt * 1000).getDate() + meses[new Date(item.dt * 1000).getMonth()] + "</td>")).join('') + "</tr>";
            textoHoy += "<tr><th> Vel</th>" + this.forecastToday.map(item => ("<td> " + (item.wind_gust * 1.94384).toFixed(1) + "</td>")).join('') + "</tr>";
            textoHoy += "<tr><th> Racha</th>" + this.forecastToday.map(item => ("<td>" + (item.wind_speed * 1.94384).toFixed(1) + "</td>")).join('') + "</tr>";
            textoHoy += "<tr><th> Dir</th>" + this.forecastToday.map((item, i) => ('<td><img src="./img/arrow.png" class="arrow" id="arrowb' + i + '" /></td>')).join('') + "</tr>";
            textoHoy += "<tr><th> Nubes</th>" + this.forecastToday.map(item => ("<td>" + (item.clouds + "%</td>"))).join('') + "</tr>";
            textoHoy += "<tr><th> Temp</th>" + this.forecastToday.map(item => ("<td>" + (item.temp - 273.15).toFixed(1) + "</td>")).join('') + "</tr>";
            textoHoy += "<tr><th> Icon</th>" + this.forecastToday.map(item => ("<td><img src='http://api.openweathermap.org/img/w/" + item.weather[0].icon + ".png' /></td>")).join('') + "</tr>";


            var textoManana = "<tr><th> Fecha</th>" + this.forecastTomorrow.map(item => ("<td> " + new Date(item.dt * 1000).getHours() + "h " + new Date(item.dt * 1000).getDate() + meses[new Date(item.dt * 1000).getMonth()] + "</td>")).join('') + "</tr>";
            textoManana += "<tr><th> Vel</th>" + this.forecastTomorrow.map(item => ("<td> " + (item.wind_gust * 1.94384).toFixed(1) + "</td>")).join('') + "</tr>";
            textoManana += "<tr><th> Racha</th>" + this.forecastTomorrow.map(item => ("<td>" + (item.wind_speed * 1.94384).toFixed(1) + "</td>")).join('') + "</tr>";
            textoManana += "<tr><th> Dir</th>" + this.forecastTomorrow.map((item, i) => ('<td><img src="./img/arrow.png" class="arrow" id="arrowb' + (i + 24) + '" /></td>')).join('') + "</tr>";
            textoManana += "<tr><th> Nubes</th>" + this.forecastTomorrow.map(item => ("<td>" + (item.clouds + "%</td>"))).join('') + "</tr>";
            textoManana += "<tr><th> Temp</th>" + this.forecastTomorrow.map(item => ("<td>" + (item.temp - 273.15).toFixed(1) + "</td>")).join('') + "</tr>";
            textoManana += "<tr><th> Icon</th>" + this.forecastTomorrow.map(item => ("<td><img src='http://api.openweathermap.org/img/w/" + item.weather[0].icon + ".png' /></td>")).join('') + "</tr>";

            var tablaToday = document.getElementById("tablaHoy");
            var tablaTomorrow = document.getElementById("tablaManana")
            tablaToday.innerHTML = textoHoy;
            tablaTomorrow.innerHTML = textoManana;
        },
        openDia: function (dia, event) {
            // Declare all variables
            var i, tabcontent, tablinks;

            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }

            // Show the current tab, and add an "active" class to the button that opened the tab
            document.getElementById(dia).style.display = "block";
            event.currentTarget.className += " active";
        }
    },

    mounted: function () {
        this.peticion();
        document.getElementById("contenidoHoy").style.display = "block";
        //this.mostrar();
        //this.int = setTimeout(this.mostrar, 500);
        //this.rep = setInterval(this.mostrar, 300000);
    }

});