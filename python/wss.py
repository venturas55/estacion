#!/usr/bin/python

import time
import RPi.GPIO as GPIO
import math
import random
import time

sensorVeleta=[11,12,13,15,16,18,19,21]
GPIO.setmode(GPIO.BOARD)

GPIO.setup(sensorVeleta[0], GPIO.IN, pull_up_down=GPIO.PUD_UP) #N  01111111 127         00111111 NNO 
GPIO.setup(sensorVeleta[1], GPIO.IN, pull_up_down=GPIO.PUD_UP) #NO 10111111 191         10011111 ONO
GPIO.setup(sensorVeleta[2], GPIO.IN, pull_up_down=GPIO.PUD_UP) #O  11011111 223         11001111 OSO
GPIO.setup(sensorVeleta[3], GPIO.IN, pull_up_down=GPIO.PUD_UP) #SO 11101111 239         11100111 SSO
GPIO.setup(sensorVeleta[4], GPIO.IN, pull_up_down=GPIO.PUD_UP) #S  11110111 247         11110011 SSE
GPIO.setup(sensorVeleta[5], GPIO.IN, pull_up_down=GPIO.PUD_UP) #SE 11111011 251         11111001 ESE
GPIO.setup(sensorVeleta[6], GPIO.IN, pull_up_down=GPIO.PUD_UP) #E  11111101 253         11111100 ENE
GPIO.setup(sensorVeleta[7], GPIO.IN, pull_up_down=GPIO.PUD_UP) #NE 11111110 254         01111110 NNE

cadena = ""
def direccion():
        global cadena
        global sensorVeleta
        cadena=str(GPIO.input(sensorVeleta[0]))+str(GPIO.input(sensorVeleta[1]))+str(GPIO.input(sensorVeleta[2]))+str(GPIO.input(sensorVeleta[3]))+str(GPIO.input(sensorVeleta[4]))+str(GPIO.input(sensorVeleta[5]))+str(GPIO.input(sensorVeleta[6]))+str(GPIO.input(sensorVeleta[7]))

        if(cadena=="01111111"):
                print("N" )
        elif (cadena=="00111111") :             
                print("NNO")
        elif (cadena=="10111111") :             
                print("NO")
        elif (cadena=="10011111") :             
                print("ONO")
        elif (cadena=="11011111"):            
                print("O")
        elif (cadena=="11001111"):            
                print("OSO")                
        elif (cadena=="11101111"):       
                print("SO")
        elif (cadena=="11100111"):       
                print("SSO")
        elif(cadena=="11110111"):             
                print("S")
        elif(cadena=="11110011"):             
                print("SSE")                
        elif (cadena=="11111011"):             
                print("SE")
        elif (cadena=="11111001"):             
                print("ESE")                
        elif  (cadena=="11111101"):           
                print("E")
        elif  (cadena=="11111100"):           
                print("ENE")
        elif (cadena=="11111110"):
                print("NE")
        elif (cadena=="01111110"):
                print("NNE")   
        else:
                print(cadena)             
        


while 1:
        direccion()
        time.sleep(1)
