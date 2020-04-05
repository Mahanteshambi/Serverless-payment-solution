import json
import boto3
import os
import uuid

from botocore.exceptions import ClientError

def lambda_handler(event, context):
    statusCode = insertPaymentDetails(event)
    return {
        "isBase64Encoded": False,
        "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        'statusCode': statusCode,
        'body': json.dumps('Hello from Lambda!')
    }
    
def insertPaymentDetails(event):
    payment_item = dict()
    PAYEE_ID = os.environ['PAYEE_ID']
    PAYOR_ID = os.environ['PAYER_ID']
    AMOUNT = os.environ['AMOUNT']
    REASON = "reason"
    TABLE_NAME = os.environ['TABLE_NAME']
    if PAYEE_ID not in event or PAYOR_ID not in event or AMOUNT not in event:
        return 400
    else:
        payment_item[PAYEE_ID] = (event[PAYEE_ID])
        payment_item[PAYOR_ID] = event[PAYOR_ID]
        payment_item[AMOUNT] = event[AMOUNT]
        payment_item[REASON] = event[REASON]
        tran_id = uuid.uuid1().int
        print(tran_id)
        payment_item[os.environ['TRANSACTION_ID']] = str(tran_id)
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table(TABLE_NAME)
        print('Inserting payment details into ' + TABLE_NAME)
        try:
            table.put_item(Item = payment_item)
        except ClientError as e:
            if e.response['Error']['Code'] != 'ConditionalCheckFailedException':
                raise
            else:
                print('Payment details is already inserted!')
            return 400
        return 200