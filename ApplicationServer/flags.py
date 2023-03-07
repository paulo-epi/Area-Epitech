import sys

def help():
    for arg in sys.argv:
        if arg == "-h" or arg == "--help":
            display_help()
            sys.exit(0)

def get_port():
    hasPortFlag = False
    for arg in sys.argv:
        if hasPortFlag:
            return arg
        if arg == "-p" or arg == "--port":
            hasPortFlag = True
    return "8080"

def display_help():
    print("AREA APPLICATION SERVER")
    print()
    print("USAGE")
    print("\tpython3 index.py")
    print("\t./index.py")
    print()
    print("DESCRIPTION")
    print("\tA simple Application Server for the area project")
    print()
    print("FLAGS")
    print("\t-h,--help\t\tdisplay this message")
    print("\t-p,--port\t\tallows you to specify a port")
    print()
