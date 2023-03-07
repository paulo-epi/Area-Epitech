def var(variable_name:str):
    res = ""
    env_file = open(".env")
    file_lines = env_file.read().splitlines()
    for line in file_lines:
        name = line.split("=")[0]
        value = line.split("=")[1]
        if name == variable_name:
            res = value
    env_file.close()
    return res
