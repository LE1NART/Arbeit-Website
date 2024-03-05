#!/usr/bin/env python3
import cgitb
cgitb.enable()



import cgi, os

print("Content-Type: text/plain;charset=utf-8")
print()
print("Test")

form = cgi.FieldStorage()


filetext = form.getvalue("file")
print(filetext)


fo = open("/var/www/phydi00.rz.uni-potsdam.de/data/"+'test.csv', 'wt')
fo.write(filetext)
fo.close()
message = 'The file was uploaded successfully'



