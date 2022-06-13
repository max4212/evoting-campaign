
kill tasks on port 8080 / 8081:
in terminal, enter command: netstat -ano | findstr 8080 (change '8080' to existing port no.)
output will display 'TCP    0.0.0.0:8080           0.0.0.0:0              LISTENING       21656'
enter command: taskkill /PID 21656 /F (change '21656' based on output)

create new database 'evoting' on port 3306

import projects from git > existing local repository > selec file

run as spring boot app

mysql workspace will insert tables in database 'evoting'

API Mapping
@PostMapping addUser("/users")					{UserController  	Line 56}
@PostMapping addCampaignWithUser("/users/{id}/campaigns")		{CampaignController	Line 55}
@PostMapping addOptionToCampaign("/campaigns/{id}/options")		{OptionController 	Line 52}
@PostMapping addVoterToCampaign("/campaigns/{id}/voter")			{VoterController	Line 66}

@GetMapping getAllUsers("/users")					{UserController 	Line 32}
@GetMapping getUserById("/users/{id}")					{UserController 	Line 48}
@GetMapping getAllCampaignByUserId("/users/{id}/campaigns")		{CampaignController	Line 37}
@GetMapping getCampaignById("/campaigns/{id}")				{CampaignController	Line 47}
@GetMapping getAllOptionsByCampaignId("/campaigns/{id}/options")		{OptionController 	Line 34}
@GetMapping getOptionById("/options/{id}")				{OptionController	Line 44}
@GetMapping getAllVotersByUserId("/users/{id}/voters")			{VoterController 	Line 38}
@GetMapping getAllVotersByCampaignId("/campaigns/{id}/voters")		{VoterController	Line 48}
@GetMapping getVoterById("/voters/{id}")					{VoterController	Line 58}

@PutMapping editUser("/users/{id}")					{UserController 	Line 62}
@PutMapping editCampaign("/campaigns/{id}")				{CampaignController	Line 66}
@PutMapping editOption("/options/{id}")					{OptionController	Line 63}

@DeleteMapping deleteUser("/users/{id}")				{UserController 	Line 75}
@DeleteMapping deleteCampaignByUser("/deletedUser/{id}/deleteCampaigns")	{CampaignController	Line 86}
@DeleteMapping deleteCampaign("/campaigns/{id}")			{CampaignController	Line 79}
@DeleteMapping deleteOptionsInCampaign("/deletedCampaign/{id}/deleteOptions")	{OptionController	Line 82}
@DeleteMapping deleteOption("/options/{id}")				{OptionController	Line 75}
@DeleteMapping deleteVoterByUser("/deletedUser/{id}/deleteVoters")		{VoterController	Line 84}
@DeleteMapping deleteVoterByCampaign("/deletedCampaign/{id}/deleteVoters")	{VoterController	Line 94}
@DeleteMapping deleteVoter("/voters/{id}")				{VoterController	Line 77}
