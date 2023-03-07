MONTH = {
	"Jan": "01",
	"Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12",
}

def generique(date):
    c = 0
    for i in range (0, 9):
        if date[i].isnumeric():
            c += 1
    if c == 2:
        c = 0
    else:
        c = 1
    res = ""
    for i in range (12 - c, 16 - c):
        res += date[i]
    res += '-'
    m = ""
    for i in range (8 - c, 11 - c):
        m += date[i]
    res += MONTH[m]
    res += "-"
    if c == 1:
        res += "0"
    for i in range (5, 7 - c):
        res += date[i]
    res += "T"
    for i in range (17 - c, 22 - c):
        res += date[i]
    return res

def format_0400(date): #"27 Oct 2020 08:06:28 -0400"   2023-02-14T10:11
    res = ""
    m = ""
    for i in range (6, 11):
        res += date[i]
    res += '-'
    for i in range (3, 6):
        m += date[i]
    res += MONTH[m]
    res += "-"
    for i in range (0, 2):
        res += date[i]
    res += "T"
    for i in range (12, 17):
        res += date[i]
    return res

def change_format_date(date):
    res = ""
    if len(date) <= 26:
        res = format_0400(date)
    else:
        res = generique(date)
    return res

def parse_time(time, nb):
    res = ""
    for i in range(0, nb):
        res += time[i]
    return res

def get_email_adress(from_name): #Doctolib <no-reply@doctolib.fr>
    res = ""
    enter_mail = 0
    for i in range(0, len(from_name)):
        if from_name[i] == '>':
            return res
        if enter_mail == 1:
            res += from_name[i]
        if from_name[i] == '<':
            enter_mail = 1
    return res

def compare_date(now, date): #2023-02-14T10:11
    comp_now = ""
    comp_date = ""
    pos_min = 0
    if len(now) != len(date):
        return 0
    if now == date:
        return 1
    for i in range(0, len(now) - 3):
        if now[i] != date[i]:
            return 0
        if now[i] == ':':
            pos_min = i
            break
    for i in range(pos_min + 1, len(now)):
        comp_date += date[i]
        comp_now += now[i]
    if int(comp_date) <= int(comp_now) + 2 or  int(comp_date) >= int(comp_now) - 2:
        return 1
    return 0