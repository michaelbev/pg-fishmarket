import stringFunctions as sF
import unittest

def check_user_input(input):
    try:
        # Convert it into integer
        val = int(input)
        print("Good, input is an integer = ", val)
    except ValueError:
        print("No.. input is not a integer.")

stringInput = input("Input String: ")
if stringInput == "":  # If input is empty
  stringInput = str("AbCDeFABcDEFghIJ")

repChar = input("Replacement char: ")
if repChar == "":  # If input is empty
  repChar = "X"

spacing = input("Replacement spacing #: ")
if spacing == "":  # If input is empty
  spacing = 3
check_user_input(spacing)
spacing = int(spacing)

print ("---------------------")
print ("Input:                    " + stringInput)
print ("Replacement Char:         " + repChar)
print ("Spacing:                 ", str(spacing))
print ("---------------------")
print ("--RESULTS------------")
print ("Capital Indexes:         " , sF.capital_indexes(stringInput))
print ("Midpoint Letter:          " + sF.mid(stringInput))
print ("Replace every third char: " + sF.replace3rd(stringInput, repChar, spacing))
