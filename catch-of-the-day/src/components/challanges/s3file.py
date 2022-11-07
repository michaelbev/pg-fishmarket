import requests
import boto3
from botocore import UNSIGNED
from botocore.client import Config

bucket_name = "coderbytechallengesandbox"
prefix = "__cb__"
challengeToken = "x0fi7mc6"

s3_client = boto3.client('s3', config=Config(signature_version=UNSIGNED))

def replace_str_index(text,index=0,replacement=''):
    return '%s%s%s'%(text[:index],replacement,text[index+1:])

result = s3_client.list_objects(Bucket = bucket_name, Prefix=prefix)

for o in result.get('Contents'):
    data = s3_client.get_object(Bucket=bucket_name, Key=o.get('Key'))
    contents = data['Body'].read()
    stringContent = (contents.decode("utf-8") + challengeToken)

# replace every third character with X
# need for loop

newString = ''
delimiter = 'X'

for idx, ele in enumerate(stringContent,1):
  if idx % 3 == 0 and idx != 0:
    newString = newString + delimiter
  else:
    newString = newString + ele

# print(stringContent)
# print(newString)

s3 = newString

print(s3)
