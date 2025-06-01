import socketserver
import subprocess
import sys
import threading
from _thread import start_new_thread
import time
#import RPi.GPIO as GPIO
import math
import time
import pymysql
import random

sensor = 7

# RPi.GPIO Layout verwenden (wie Pin-Nummern)
#GPIO.setmode(GPIO.BOARD)

# Pin 3 (GPIO 0) auf Input setzen
#GPIO.setup(sensor, GPIO.IN, pull_up_down=GPIO.PUD_UP)

impulsos = 0
impulsosT = 0
tiempo = 1
casos=10.0
actual_windspeed_msec = 0
viento_knots = 0
vuelta=0
events = []
db = pymysql.connect(host="141.94.20.248",user="venturas",password="Administrador1",database="anemometro")

def interrupt(val):
        global impulsos
        global impulsosT
        impulsos += 1
        impulsosT += 1
        
#GPIO.add_event_detect(sensor, GPIO.RISING, callback = interrupt, bouncetime = 5)

def ws100_imp_to_mpersec(val):
        global tiempo 
        #y = 8E-09x5 - 2E-06x4 + ,0002x3 - 0,0073x2 + 0,4503x + 0,11
        val=val/tiempo
        y = float("8e-9") * math.pow(val,5) - float("2e-6") * math.pow(val,4) + float("2e-2") * math.pow(val,3) - float("7.3e-3") * math.pow(val,2) + 0.903 * val + 0.11
        if y < 0.2:
                y = 0
        return y

def threadeval():
        global impulsos
        global casos
        global actual_windspeed_msec
        global vuelta
        global tiempo
        global db
        global viento_knots
        minimo = 50
        maximo = 0
        acum =0
        while 1:
                time.sleep(tiempo)
               # actual_windspeed_msec = ws100_imp_to_mpersec(impulsos)
                actual_windspeed_msec =random.randrange(20)
                viento_knots = actual_windspeed_msec * 3600.0 / 1852.0
                acum += viento_knots
                
                if viento_knots > maximo:
                        maximo=viento_knots
                if viento_knots<minimo:
                        minimo=viento_knots
                #print ("%i" % impulsos)
                impulsos = 0
                if vuelta == casos:
                    print ("%f" % (acum/casos+1))
             
                    cursor = db.cursor()
                    try:
                        print ("%f - %f  - %f" %(minimo,acum/casos,maximo))
                        #print ("%f knots a la BBDD" % viento_knots)
                        #cursor.execute("INSERT INTO viento (nudos) VALUES (%s)",( viento_knots))
                        #db.commit()
                    except:
                        db.rollback()

                    vuelta = 0
                    minimo = 50
                    maximo = 0
                    acum =0
                else:
                    print ("%f knots acum %f" %(viento_knots,acum))
                    vuelta = vuelta + 1

start_new_thread(threadeval, ())

HOST = ''
PORT = 2400

############################################################################
'''  One instance per connection.
     Override handle(self) to customize action. '''

class TCPConnectionHandler(socketserver.BaseRequestHandler):
    def handle(self):
        global viento_knots
        self.event = threading.Event()
        events.append(self.event)
        while 1:
            self.event.wait()
            self.event.clear()
            try:
                self.request.sendall('{"windspeed": %f knots, "time": "%s"}' % (viento_knots,time.strftime('%X %x %Z')))
            except:
                break
        events.remove(self.event)

############################################################################

class Server(socketserver.ThreadingMixIn, socketserver.TCPServer):
    # Ctrl-C will cleanly kill all spawned threads
    daemon_threads = True
    # much faster rebinding
    allow_reuse_address = True

    def __init__(self, server_address, RequestHandlerClass):
        socketserver.TCPServer.__init__(\
        self,\
        server_address,\
        RequestHandlerClass)

############################################################################

if __name__ == "__main__":
    server = Server((HOST, PORT), TCPConnectionHandler)
    # terminate with Ctrl-C
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        sys.exit(0)

############################################################################
