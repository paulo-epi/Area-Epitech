from contextlib import closing
from urllib.request import urlopen
import json
import dateutil.parser
from google_area import *

def temperature_under_0():
    with closing(urlopen('https://api.meteo-concept.com/api/forecast/daily?token=8339e74682326e1cbc25c05c592faef368d54c3dcb6822243613f5b8e1f06e56&insee=54395')) as f:
        decoded = json.loads(f.read())
        (city,forecast) = (decoded[k] for k in ('city','forecast'))
        day = 0
        for i,f in enumerate(forecast):
            day = dateutil.parser.parse(f['datetime']).weekday()
            break
        res = u"De plus, Les températures mini/maxi de demain à {} seront :\n\t{}°C/{}°C.\nPassez une agreable journée.".format(city['name'], forecast[day]['tmin'], forecast[day]['tmax'])
        if (forecast[day]['tmin'] <= 0):
            return 1
        return 0

def cold_weater():
    with closing(urlopen('https://api.meteo-concept.com/api/forecast/daily/0/period/2?token=8339e74682326e1cbc25c05c592faef368d54c3dcb6822243613f5b8e1f06e56&insee=54395')) as f:
        decoded = json.loads(f.read())
        (city, update, forecast) = (decoded[k] for k in ('city', 'update', 'forecast'))
        if (forecast['weather'] >= 4):
            return 1
        return 0
