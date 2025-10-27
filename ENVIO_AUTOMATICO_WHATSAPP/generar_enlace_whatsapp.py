import pandas as pd
import urllib.parse

file_path = "FORMATO_DATABASE.xlsx"
df = pd.read_excel(file_path)

def generate_whatsapp_link(NOMBRE_ESTUDIANTE, SEDE, CARRERA, CELULAR, EMAIL_PERSONAL, EMAIL_UCB, MENSAJE_WHATSAPP):
    if pd.notnull(NOMBRE_ESTUDIANTE) and pd.notnull(SEDE) and pd.notnull(CARRERA) and pd.notnull(CELULAR) and pd.notnull(EMAIL_PERSONAL) and pd.notnull(EMAIL_UCB) and pd.notnull(MENSAJE_WHATSAPP):
        try:
            phone = f"{int(float(CELULAR))}"  # Formato adecuado del número

            # Convertir todos los valores a string para evitar errores
            NOMBRE_ESTUDIANTE = str(NOMBRE_ESTUDIANTE)
            SEDE = str(SEDE)
            CARRERA = str(CARRERA)
            EMAIL_PERSONAL = str(EMAIL_PERSONAL)
            EMAIL_UCB = str(EMAIL_UCB)
            message = str(MENSAJE_WHATSAPP)

            # Reemplazo de marcadores en el mensaje
            personalized_message = message.replace("[NOMBRE_ESTUDIANTE]", NOMBRE_ESTUDIANTE)
            personalized_message = personalized_message.replace("[SEDE]", SEDE)
            personalized_message = personalized_message.replace("[CARRERA]", CARRERA)
            personalized_message = personalized_message.replace("[CELULAR]", str(CELULAR))
            personalized_message = personalized_message.replace("[EMAIL_PERSONAL]", EMAIL_PERSONAL)
            personalized_message = personalized_message.replace("[EMAIL_UCB]", EMAIL_UCB)

            # *Corrección importante:* Codificar el mensaje para la URL
            formatted_message = urllib.parse.quote(personalized_message)
            print(formatted_message)

            link = f"https://api.whatsapp.com/send/?phone={phone}&text={formatted_message}"

            return link
        except ValueError:
            return None  # Si no se puede convertir el teléfono, devolver None
    return None

df['ENLACE_WHATSAPP'] = df.apply(
    lambda row: generate_whatsapp_link(
        row['NOMBRE_ESTUDIANTE'],
        row['SEDE'],
        row['CARRERA'],
        row['CELULAR'],
        row['EMAIL_PERSONAL'],
        row['EMAIL_UCB'],
        row['MENSAJE_WHATSAPP']),
    axis=1
)

output_file = "FORMATO_ENVIAR_PROCESADO.xlsx"
df.to_excel(output_file, index=False)

print(f"Archivo procesado y guardado como {output_file}")
