database name : 'evoting'

the user type can only read 'Voter', 'Host', and 'Admin' in case sensitive 

to insert column in user table, enum values read as '0' for 'Voter', '1' for 'Host', and '2' for 'Admin' 
(applies to campaign and voter tables)

to run frontend:
cd frontend
npm install react-router-dom axios 
npm start
