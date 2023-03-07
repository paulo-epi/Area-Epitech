import time
import pyotp
import qrcode

key = "MyAreaProject"

uri = pyotp.totp.TOTP(key).provisioning_uri(
	name='schneider',
	issuer_name='AreaGroup')

print(uri)


# Qr code generation step
qrcode.make(uri).save("qr.png")

"""Verifying stage starts"""

totp = pyotp.TOTP(key)

# verifying the code
while True:
    print(totp.verify(input(("Enter the Code : "))))
