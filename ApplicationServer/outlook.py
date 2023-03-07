#!/usr/bin/env python3
##
## EPITECH PROJECT, 2023
## outlook
## File description:
## test send email
##

import win32com.client

ol=win32com.client.Dispatch("outlook.application")
olmailitem=0x0 #size of the new email
newmail=ol.CreateItem(olmailitem)
newmail.Subject= 'Testing Mail'
newmail.To='marius.nowak54@gmail.com'
newmail.Body= 'Hello, this is a test email to showcase how to send emails from Python and Outlook.'
# attach='C:\\Users\\admin\\Desktop\\Python\\Sample.xlsx'
# newmail.Attachments.Add(attach)
# To display the mail before sending it
# newmail.Display() 
newmail.Send()

# import win32com.client as win32

# olApp = win32.Dispatch("Outlook.Application")
# olNS = olApp.GetNamespace("MAPI")

# mailItem = olApp.CreateItem(0)
# mailItem.Subject = "Hello 123"
# mailItem.BodyFormat = 1
# mailItem.Body = "Hello There"
# mailItem.To = "marius.nowak54@gmail.com"
# mailItem.__oleobj_.Invoke(*(64209, 0, 8, 0, olNS.Accounts.Item("marius.nowak@epitech.eu")))

# mailItem.Display()

# mailItem.BodyFormat = 2
# mailItem.HTMLBody = "<html><body><h1>Hello There</h1></body></html>"
