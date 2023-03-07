from hashlib import sha256

def area_hash(msg:str):
    h = sha256()
    h.update(msg.encode("utf-8"))
    return h.hexdigest()
