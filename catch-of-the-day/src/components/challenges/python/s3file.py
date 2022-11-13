# grab contents from s3 file
# append a challengeToken to the end of the file
# replace every third character with X
# print out contents

import requests
import boto3
from botocore import UNSIGNED
from botocore.client import Config
import stringFunctions as sF

# fetch string from a bucket file
# append a challenge string
# replace every # character with a delimiter

def s3fun (replacement, spacing):
  bucket_name = "coderbytechallengesandbox"
  prefix = "__cb__"
  challengeToken = "x0fi7mc6"

  s3_client = boto3.client('s3', config=Config(signature_version=UNSIGNED))

  result = s3_client.list_objects(Bucket = bucket_name, Prefix=prefix)

  for o in result.get('Contents'):
    data = s3_client.get_object(Bucket=bucket_name, Key=o.get('Key'))
    contents = data['Body'].read()
    stringContent = (contents.decode("utf-8") + challengeToken)

  return (sF.replace3rd(stringContent, replacement, spacing))
