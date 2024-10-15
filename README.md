Full stack notes app

## Description of project:
This project allows users to create an account, login, then create and save notes. The structure of notes is a title and the content but in the content it also shows the date created. 

## Installing the project
1. Clone the repository by using the computer terminal and then using the cd command to go to the directory you want the project to be located in.
2. Then run the command 'git clone https://github.com/sT7-5/Full-stack-notes-app.git'.
3. Using the computer terminal, cd into the project directory.
4. Run the commands 'python3 -m venv env' and then 'source env/bin/activate' to create the virutal environment that will be used to install the python packages required. If you are on windows, the commands are slightly differnt, you instead run 'python -m venv env' and 'env/Scripts/activate.bat', if these do not work and you are on windows you will need to look up the command required for your shell. 
5. Now, run the command 'pip install -r requirements.txt' to install the python packages required.
6. cd into the backend directory and then run the command 'python manage.py makemigrations' and then 'python manage.py migrate'. Note if on windows then replace the 'python' in the commands with 'python3'.
7. Next, create another terminal and then cd into the frontend directory of the project. Here, run the command 'npm install'.
9. In the second terminal that is in the frontend directory run the command 'npm run dev' and in the first terminal that is in the backend directory, run the command 'python manage.py runserver' remembering to replace 'python' with 'python3' if you are on windows.
10. Now the project is up and running. In the second terminal, there will be a local host assigned e.g. 'Local:   http://localhost:5173/'. In a web browser load up that url or just simply hold cmd and click on the url in the terminal. Now you can being using the project.
11. Create a new account and then login to begin creating notes.

## Thing to note
if you done the installation steps above and then closed the project and terminals but then want to re-run the project this is what you will have to re-do steps 3->10 again



