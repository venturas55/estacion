#!/usr/bin/python

import time
import math
import random
import pymysql
from sqlite3 import OperationalError

tiempo =  8                    #Tiempo del periodo de muestreo
contVueltas = 0                 # contador del numero de muestras 
vueltas = 1                    #numero de muestras a tomar
ips=0                           #impulsos por periodo
nudos=0                         #almacena la velocidad
direccion=""                    #alacena string con la veleta
sensorVeleta=[11,12,13,15,16,18,19,21,3]
maximo = 0.0
minimo = 100.0
suma = 0.0



def conversor(val):
        y = float("2e-5")*math.pow(val,2)+0.35*val+0.11
        if y < 0.2:
                y=0
        return y


def veleta():
        global veleta
        global sensorVeleta
        return "SE";

while 1:
        nudos = conversor(10)
        ips=0
        direccion = veleta()
        print(direccion)
        suma+=nudos
        if contVueltas == vueltas:
            try:
                db = pymysql.connect(host="152.228.133.198",user="venturas",password="weR65hS",database="estacion")
                pass
            except OperationalError:
                pass
            except:
                pass
            else:
                minimo=10
                maximo=120
                nudos=15
                cursor = db.cursor()
                cursor.execute("INSERT INTO anemometro (minima,nudos,maxima,direccion) VALUES (%s,%s,%s,%s)",(minimo,(suma/vueltas),maximo,direccion))
                db.commit()
                cursor.close()
                db.close()
                pass
            contVueltas = 0
            suma=0
            maximo=0
            minimo=100
        else:
                print ("%f knots" % nudos)
                contVueltas = contVueltas + 1
        time.sleep(tiempo)
        
