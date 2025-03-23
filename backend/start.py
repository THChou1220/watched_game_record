import os
import subprocess
import time

cmd = 'pip install -r requirements.txt --user'
os.system(cmd)

cmd = 'python database.py'
os.system(cmd)

cmd = 'python -B app.py'
os.system(cmd)
