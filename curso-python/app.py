import colorama
from colorama import Fore, Style, init, just_fix_windows_console
import random

just_fix_windows_console()

print(Fore.BLUE + "Gerador de números aleatórios" + Style.RESET_ALL)
numero = random.randint(1, 100)
print(f"Número gerado: {Fore.GREEN}{numero}{Style.RESET_ALL}")
