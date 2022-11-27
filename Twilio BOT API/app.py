from flask import Flask,request
import requests

from twilio import twiml

from flask import Flask, request, redirect
from twilio.twiml.messaging_response import MessagingResponse


from firebase_admin import firestore
import firebase_admin
from firebase_admin import credentials


cred = credentials.Certificate("fir-2784a-firebase-adminsdk-udsc8-727793899e.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

app = Flask(__name__)

flag = 0


@app.route('/sms',methods=['POST'])
def bot():
    number = request.form['From']
    user_msg = request.values.get('Body','').lower()
    resp = MessagingResponse()
    msg = resp.message()

    global flag
    global name,age,incident,domain,transID
   
    if flag == 0:
        msg.body("Welcome to the bot")
        msg.body("Please enter your name")
       
        flag = 1
    elif flag == 1:
        msg.body("Hello "+user_msg)
        name = user_msg
        msg.body("Please enter your age")
        
        flag = 2
    elif flag == 2:
        msg.body("Your age is "+user_msg)
        age = user_msg
        msg.body("Please enter your incident")
        
        flag = 3
    elif flag == 3:
        msg.body("Your incident is "+user_msg)
        incident = user_msg
        msg.body("Please enter your location")
        
        flag = 4
    elif flag == 4:
        msg.body("Your location is in "+user_msg)
        location = user_msg
        msg.body("Please enter your 1.Bank 2.information leak 3.other")
        
        flag = 5 
    elif flag == 5:
        msg.body("Your incident is "+user_msg)
        domain = user_msg
        if(user_msg=='bank'):
            msg.body("Please enter your bank name, TRNASACTION ID")
        elif (user_msg=='information leak'):
            msg.body("will get back to you...")
            flag = 6
    elif flag == 6:
        transID = user_msg
        firebase(number,name,age,incident,location,domain,transID)
        msg.body("Thank you for your response")
        flag = 0
    return str(resp)

def firebase(number,name,age,incident,location,domain,transID,):
    Ref = db.collection(u'sms')
    data = {"name":name,"age":age,"incident":incident,"location":location,"domain":domain,"transID":transID,}
    fireWrite(Ref,data,number)
    return

# firebase function to upload files to firebase storage
def FileUpload(Ref, file, id):
    Ref.document(id).set(file)




def fireWrite(Ref, Data, id):
    Ref.document(id).set(Data)



        
if __name__ == '__main__':
    app.run(debug=True)