#!/usr/bin/python

import time
import RPi.GPIO as GPIO
import math
import random
import pymysql
from sqlite3 import OperationalError

tiempo =  8                    #Tiempo del periodo de muestreo
contVueltas = 0                 # contador del numero de muestras 
vueltas = 40                    #numero de muestras a tomar
ips=0                           #impulsos por periodo
nudos=0                         #almacena la velocidad
direccion=""                    #alacena string con la veleta
sensorVeleta=[11,12,13,15,16,18,19,21,3]
GPIO.setmode(GPIO.BOARD)
maximo = 0.0
minimo = 100.0
suma = 0.0

GPIO.setup(sensorVeleta[0], GPIO.IN, pull_up_down=GPIO.PUD_UP) #N  01111111 127 000        00111111 NNO 22.5
GPIO.setup(sensorVeleta[1], GPIO.IN, pull_up_down=GPIO.PUD_UP) #NO 10111111 191 315        10011111 ONO 192.5
GPIO.setup(sensorVeleta[2], GPIO.IN, pull_up_down=GPIO.PUD_UP) #O  11011111 223 270        11001111 OSO 147.5
GPIO.setup(sensorVeleta[3], GPIO.IN, pull_up_down=GPIO.PUD_UP) #SO 11101111 239 225        11100111 SSO 202.5
GPIO.setup(sensorVeleta[4], GPIO.IN, pull_up_down=GPIO.PUD_UP) #S  11110111 247 180        11110011 SSE 157.5
GPIO.setup(sensorVeleta[5], GPIO.IN, pull_up_down=GPIO.PUD_UP) #SE 11111011 251 135        11111001 ESE 112.5
GPIO.setup(sensorVeleta[6], GPIO.IN, pull_up_down=GPIO.PUD_UP) #E  11111101 253 090        11111100 ENE 67.5
GPIO.setup(sensorVeleta[7], GPIO.IN, pull_up_down=GPIO.PUD_UP) #NE 11111110 254 045        01111110 NNE 22.5
GPIO.setup(sensorVeleta[8], GPIO.IN, pull_up_down=GPIO.PUD_UP) #anemometro
def interrupt(val):
        global ips
        ips+=1
        #print(ips)


GPIO.add_event_detect(sensorVeleta[8],GPIO.RISING, callback = interrupt , bouncetime=5)

def conversor(val):
        y = float("2e-5")*math.pow(val,2)+0.35*val+0.11
        if y < 0.2:
                y=0
        return y


def veleta():
        global veleta
        global sensorVeleta
        direccion=str(GPIO.input(sensorVeleta[0]))+str(GPIO.input(sensorVeleta[1]))+str(GPIO.input(sensorVeleta[2]))+str(GPIO.input(sensorVeleta[3]))+str(GPIO.input(sensorVeleta[4]))+str(GPIO.input(sensorVeleta[5]))+str(GPIO.input(sensorVeleta[6]))+str(GPIO.input(sensorVeleta[7]))

        if(direccion=="01111111"):
                return "N"
        elif (direccion=="00111111") :             
                return "NNO"
        elif (direccion=="10111111") :             
                return "NO"
        elif (direccion=="10011111") :             
                return "ONO"
        elif (direccion=="11011111"):            
                return "O"
        elif (direccion=="11001111"):            
                return "OSO"                
        elif (direccion=="11101111"):       
                return "SO"
        elif (direccion=="11100111"):       
                return "SSO"
        elif(direccion=="11110111"):             
                return "S"
        elif(direccion=="11110011"):             
                return "SSE"                
        elif (direccion=="11111011"):             
                return "SE"
        elif (direccion=="11111001"):             
                return "ESE"                
        elif  (direccion=="11111101"):           
                return "E"
        elif  (direccion=="11111100"):           
                return "ENE"
        elif (direccion=="11111110"):
                return "NE"
        elif (direccion=="01111110"):
                return "NNE"  
        else:
                return direccion           
        


while 1:
        nudos = conversor(ips)
        ips=0
        direccion = veleta()
        print(direccion)
        if(nudos>maximo):
                maximo=nudos
        if(nudos<minimo):
                minimo=nudos
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
                print ("%f maxima a la BBDD " % maximo)
                print ("%f minimo a la BBDD " % minimo)
                print ("%f media a la BBDD " % (suma/vueltas))
                print ("%f direccion a la BBDD " % direccion)
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
        
