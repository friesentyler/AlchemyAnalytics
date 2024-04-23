# Alchemy Analytics
Source code for the website AlchemyAnalytics

# Python Dependencies:
* django
* django-allauth
* django-ipware
* python-decouple
* requests
* stripe
* django-cors-headers

# Google Sign in Integration
* Somebody else setting up Google sign in for their Django website
* https://www.youtube.com/watch?v=NM9BE0iUB5Q

# Me running through and setting up the project on my local machine
* https://youtu.be/_gI47uxN788

# Working with Github
* The project has two branches master and dev. Master is for working/production code only.
* Master can only be merged with, I have branch protections in place so that you cannot push directly to it
* Dev is editable and is where you should do all your development work, this branch is okay to break (although I would prefer you try to avoid that)
* after cloning the project and getting it working you will need to switch to the dev branch using these commands in the Pycharm terminal
* git switch dev
* You can see which branch you are currently on using the following command
* git branch
* to make changes do these commands
* git add .
* git commit -m "YOUR MEANINGFUL COMMIT MESSAGE HERE. SHOULD BE A SENTENCE OR TWO"
* git push origin
* the first command adds all files that are not listed in the .gitignore file to staging to be committed to the local repo
* the second command commits all the files to your local git repository (with the specified commit message)
* the final command pushes the commit the remote repository on github. Remember you will only be able to push to dev! not master!
* In order to get your changes merged from dev to master you will need to submit a "pull request" Google should be able to tell you how to do it
* FINALLY, at the beginning of any coding session make sure you run the command "git pull" this will make sure that your
* local repository has the most recent changes from the remote repository. This will prevent some nasty headaches with merge conflicts.

# Setting Up A Dummy Database
* create a super user for the admin panel using "python manage.py createsuperuser" in the terminal
* navigate to the admin panel by adding /admin to the default URL
* login
* Under the "Sites" tab change the example site to http://127.0.0.1:8000 for the domain name
* Now under Social Applications create a new one with the Provider as Google, give it a name, fill in the client id and secret key from the .env file. Now move the http://127.0.0.1:8000 from available sites to chosen sites. Save and then close.
* You might need to delete your dummy database and restart this process if it doesn't work