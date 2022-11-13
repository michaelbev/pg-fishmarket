import math

# Print letters that are capital
def capital_indexes(input):
  return [i for i, x in enumerate(input) if x.isupper()]

# Print midpoint letter
def mid (input):
    return (input[math.floor((len(input))/2): math.floor((len(input))/2)+1])

# Replace letters
def replace3rd(input, replacement = 'X', spacing = 3):

  def remainder(input):
    remainder = (len(input) % spacing)
    if remainder == 0:
      return ""
    else:
      return input[-remainder:]

  return (''.join([input[i:i+spacing].replace(input[i+spacing-1], replacement) for i in range(0, (len(input)-spacing+1), spacing)])) + remainder(input)
