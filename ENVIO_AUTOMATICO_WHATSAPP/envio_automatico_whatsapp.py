import pywhatkit as kit
import pandas as pd
import time
import random
import urllib.parse  # importar para decodificar los caracteres especiales
from datetime import datetime

# configuracion 
file_path = 'FORMATO_ENVIAR_PROCESADO.xlsx'
ouput_file_path = 'FORMATO_ENVIAR_PROCESADO_ACTUALIZADO.xlsx'
daily_limit = 500  # limite seguro por dia 
block_size = 500  # mensaje por bloque 
block_wait_time = 75  # tiempo de espera entre bloques en segundos (5 minutos )

# carga de datos desde el archivo procesado
df = pd.read_excel(file_path)

# validar que las columnas necesarias existn en el archivo 
required_columns = ['ENLACE_WHATSAPP']
if not all(column in df.columns for column in required_columns):
    raise ValueError(f"El archivo {file_path} no contiene las columnas necesarias: {required_columns}")

# variable para controlar el envio
messages_sent = 0

# enviar mensajes
for index, row in df.iterrows():
    if messages_sent >= daily_limit:
        print("Limites diarios alcanzado. deteniendo el envio.")
        break

    whatsapp_link = row['ENLACE_WHATSAPP']
    if pd.notnull(whatsapp_link):
        try:
            # extraer el numero y el mensaje desde el enlace
            phone = whatsapp_link.split("phone=")[1].split("&")[0]
            encoded_message = whatsapp_link.split("text=")[1]
            message = urllib.parse.unquote(encoded_message)

            # enviar el mensaje usando pywhatkit
            kit.sendwhatmsg_instantly(f"+{phone}", message, wait_time=20)
            messages_sent += 1
            print(f"mensaje enviado a {phone}. Total enviados: {messages_sent}")

            # esperar un tiempo aleatorio entre mensajes
            randomWait = random.randint(30, block_wait_time)
            print(f"Esperando {randomWait} seg. antes de continua")
            time.sleep(randomWait)

            # pausa entre bloques
            if messages_sent % block_size == 0:
                print(f"Esperando {block_wait_time // 60} minutos antes de continuar...")
                time.sleep(block_wait_time)

        except Exception as e:
            print(f"Error al enviar el mensaje a {whatsapp_link}: {e}")

# Guardar el archivo actualizado
df.to_excel(ouput_file_path, index=False)
print(f"Proceso de envío finalizado. Archivo actualizado guardado en {ouput_file_path}.")
