# Alchemy Analytics
Source code for the website AlchemyAnalytics

# Python Dependencies:
* django
* django-allauth
* django-ipware
* python-decouple
* requests

# Setting Up A Dummy Database
* create a super user for the admin panel using "python manage.py createsuperuser" in the terminal
* navigate to the admin panel by adding /admin to the default URL
* login
* Under the "Sites" tab change the example site to http://127.0.0.1:8000 for the domain name
* Now under Social Applications create a new one with the Provider as Google, give it a name, fill in the client id and secret key from the .env file. Now move the http://127.0.0.1:8000 from available sites to chosen sites. Save and then close.
* You might need to delete your dummy database and restart this process if it doesn't work