Full stack notes app

## Description of project:
This project allows users to create an account, login, then create and save notes. The structure of notes is a title and the content but in the content it also shows the date created. 

## Installing the project
1. Clone the repository.
2. Using the computer terminal, cd into the project directory.
3. Run the commands 'python3 -m venv env' and then 'source env/bin/activate' to create the virutal environment that will be used to install the python packages required. If you are on windows, the commands are slightly differnt, you instead run 'python -m venv env' and 'env/Scripts/activate.bat'
4. 
5. cd into the backend directory and then run the command 'python manage.py makemigrations' and then 'python manage.py migrate'. Note if on windows then replace the 'python' in the commands with 'python3'.
6. Next, cd out of the backend directory and then cd into the frontend directory. Here, run the command 'npm install'.
7. Next create another terminal and then using that terminal cd into the backend directory.
8. In the first terminal that is still in the frontend directory run teh command 'npm run dev' and in the second terminal that is in the backend directory, run the command 'python manage.py runserver' remembering to replace 'python' with 'python3' if you are on windows.
9. 

