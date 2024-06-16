import os
import time

def deploy_firebase():
    while True:
        try:
            print("Eseguendo il comando 'firebase deploy'...")
            exit_code = os.system('npm run deploy')
            if exit_code == 0:
                print("Comando eseguito con successo")
            else:
                print(f"Errore nell'esecuzione del comando. Codice di uscita: {exit_code}")
        except Exception as e:
            print("Errore imprevisto:\n", str(e))

        print("Attesa di 5 minuti prima del prossimo deploy...")
        time.sleep(5 * 60)

if __name__ == "__main__":
    deploy_firebase()
