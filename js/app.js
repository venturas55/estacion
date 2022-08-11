var app = new Vue({
    el: '#miApp',
    data: {
        listado: [],
        fechas: [],
        nudos: [],
        maxima: [],
        minima: [],
        actual: [],
        rep: "",
        int: "",
        //ret: "",
        forecast1: "",
        fechasPrev: [],
        nudosPrev: [],
        rachasPrev: [],
        localidad: "cullera",
        latitud: "",
        longitud: ""

    },
    computed: {},
    methods: {
        consulta: function() {
            console.log("consulta");
            axios.post('action.php', {
                    action: 'fetchall'
                })
                .then(function(response) {
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
                .catch(function(error) {
                    console.log(error);
                });
        },
        mostrar: function() {
            console.log("mostrar");
            this.consulta();

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



            //grafica
            var trace1b = {
                type: "scatter",
                mode: "lines",
                name: 'Velocidad',
                x: this.fechasPrev,
                y: this.nudosPrev,
                line: {
                    color: '#17BECF',
                    width: 3
                }
            }



            var datab = [trace1b];

            var layoutb = {
                title: 'Predicción para ' + this.localidad,
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

            Plotly.newPlot('myGraph2', datab, layoutb, {
                displayModeBar: false
            });


        },
        recargar: function() {
            //this.rep = setInterval(this.mostrar, 5000);
            // this.ret = setTimeout(this.mostrar(), 1000);
        },
        async prevision() {
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
            //39.224810 -0.244524
            try {
                let response = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + this.latitud + "&lon=" + this.longitud + "&exclude=minutely&appid=40c80c4ba17021c74a82c737871c6673");
                this.forecast1 = await response.json();;
            } catch (error) {
                console.log(error);
            }
            console.log(this.forecast1);
            var tabla = document.getElementById("previ2");
            var meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            for (i = 1; i <= 48; i++) {
                var unixtime = this.forecast1.hourly[i].dt * 1000;
                const dateObject = new Date(unixtime);
                var hora = dateObject.getHours(); //hora
                var fecha = dateObject.getDate(); //dia
                var mes = meses[dateObject.getMonth()];

                this.fechasPrev[i - 1] = hora + "h" + "\n" + fecha + mes;
                //const humanDateFormat = dateObject.toLocaleString()
                //humanDateFormat = fecha.substring(11, 13);
                tabla.rows[0].cells[i].innerHTML = "";
                tabla.rows[0].cells[i].append(this.fechasPrev[i - 1]); //Cojo de la previ los TR, me quedo con el primero(0), cojo los TD, me quedo con el i
                //$("#previ2").find("tr").eq(0).find("td").eq(i).prepend(diaSemana(fecha + ""));
                this.nudosPrev[i - 1] = this.forecast1.hourly[i].wind_speed * 1.94384; //nudos
                this.rachasPrev[i - 1] = this.forecast1.hourly[i].wind_gust * 1.94384; //nudos
                tabla.rows[1].cells[i].innerHTML = "";
                tabla.rows[2].cells[i].innerHTML = "";
                tabla.rows[1].cells[i].append(this.rachasPrev[i - 1].toFixed(1)); //Cojo de la previ los TR, me quedo con el segundo(1), cojo los TD, me quedo con el i
                tabla.rows[2].cells[i].append(this.nudosPrev[i - 1].toFixed(1)); //Cojo de la previ los TR, me quedo con el segundo(1), cojo los TD, me quedo con el i

                var direccion = this.forecast1.hourly[i].wind_deg;

                var DOM_img = document.createElement("img");
                DOM_img.src = "./img/arrow.png";
                DOM_img.setAttribute('class', 'arrow');
                DOM_img.id = 'arrowb' + i;
                if (document.contains(document.getElementById("arrowb" + i))) {
                    var hijo = document.getElementById("arrowb" + i)
                    tabla.rows[3].cells[i].removeChild(hijo);
                }
                tabla.rows[3].cells[i].appendChild(DOM_img);
                document.getElementById("arrowb" + i).style.transform = 'rotate(' + direccion + 'deg)';


                // tabla.rows[3].cells[i].appendChild('<img src="./img/arrow.png" alt="" class="arrow" id="arrowb' + i + '">'); //Cojo de la previ los TR, me quedo con el tercero(")"), cojo los TD, me quedo con el i
                // tabla.rows[3].cells[i].append(direccion);
                var nubes = this.forecast1.hourly[i].clouds;
                tabla.rows[4].cells[i].innerHTML = "";
                tabla.rows[4].cells[i].append(nubes + "%");
                var temp = this.forecast1.hourly[i].temp - 273.15;
                tabla.rows[5].cells[i].innerHTML = "";
                tabla.rows[5].cells[i].append(temp.toFixed(1));

                if (document.contains(tabla.rows[6].cells[i].getElementsByTagName('img')[0])) {
                    var hijo = tabla.rows[6].cells[i].getElementsByTagName('img')[0]
                    tabla.rows[6].cells[i].removeChild(hijo);
                }

                var DOM_img = document.createElement("img");
                var source = "http://api.openweathermap.org/img/w/" + this.forecast1.hourly[i].weather[0].icon + ".png";
                DOM_img.src = source;
                tabla.rows[6].cells[i].appendChild(DOM_img);
            }
            this.mostrar();
        }

    },
    mounted: function() {

        this.prevision();
        this.mostrar();
        this.int = setTimeout(this.mostrar, 500);
        //this.rep = setInterval(this.mostrar, 300000);
    }

});