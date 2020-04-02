# This program just parses data from HTML files present in each data file and create a new file for each season
# Right now, I'm not removing html tags and just removing header from each episode page.
# Thanks to the guy who transcripted all the episodes of Friends.
# All the script and transcribed content belongs to its original owner and I'm just using it for 
# educational purpose.

# Imports

import os
import codecs
from bs4 import BeautifulSoup

HTML_PATH = "Data//HTML"



for page in os.listdir(HTML_PATH):
    print(page)
    COMPLETE_TEXT = ""
    PAGE_PATH = os.path.join(HTML_PATH, page)
    # Now read the page
    f = codecs.open(PAGE_PATH, "r")
    page_data = f.read()
    soup = BeautifulSoup(page_data, "lxml")
    title = soup.title.getText().upper() + '\n'
    COMPLETE_TEXT +=title

    for t in soup.find_all('p'):
        line = t.getText()
        line = line.replace('\n',' ')
        line = line.replace('\r','')
        line = line.replace('    ', ' ')
        COMPLETE_TEXT= COMPLETE_TEXT + line +'\n'
    COMPLETE_TEXT = (COMPLETE_TEXT.encode('ascii', 'ignore')).decode("utf-8")
    with open("Data/Friends_Transcript.txt",'a') as file:
        file.writelines(COMPLETE_TEXT)

# print(COMPLETE_TEXT)



# COMPLETE_TEXT=""

# with open('Data/Season 1/s1.txt', 'r') as var:
#     for line in var:
#         line = line.rstrip()
#         COMPLETE_TEXT+=line

# with open("Data/Season 1/s1.txt",'w') as file:
#     file.write(COMPLETE_TEXT.strip())