//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0;

contract DwitterMain {
   
  
    struct Dweet {
        uint id;
        string content;
        address author;
        uint timestamp;
        uint upvotes;
        uint reports;
        string hashtag;
        bool deleted;
       
    }
   
    struct User{
        uint id;
        address pkey;
        string firstname;
        string lastname;
        string userName;
        string bio;
        uint following;
        uint followers;
       // string photoUrl;  //profile picture
    }
   
  /* 
   struct DweetsByAuthor{
       mapping(address => uint) public AuthorToDweet;

   } */
   
    uint public dweet_count=0;
    uint public user_count=0;
   
    Dweet[] public dweets;
    User[] public users;
   
    mapping(address => uint) public addressToId; 
    mapping(string => uint) public userNameToId;
    mapping(uint => address) public dweetToAuthor;  //maps dweet's id to author's address
    mapping(address => uint) public dweetCountAuthor; //stores number of dweets by individual author
    mapping(address => bool) accountCheck;  //only one account per public key
    mapping(string => bool) userNameCheck;   //check if username already taken
   // mapping(uint => string) DweetToHashtag;  
   
   event  NewUserAdd( string userName, address pkey);
   event NewDweetAdd(string content, string hashtag, uint timestamp);
   

     modifier accountAlreadyExists(){
        require(accountCheck[msg.sender] == false);
        _;
        //create alert in front end
    }
    
    modifier userNameAlreadyExists(string memory _userName){
        require(userNameCheck[_userName] == false);
        _;
        //create alert in front end
        
    }
    
    modifier userExists(){
        require(accountCheck[msg.sender] == true);
        _;
    }
    
    modifier userNameExists(string memory _userName){
        require(userNameCheck[_userName] == true);
        _;
        
    }
   
    function registerNewUser(string memory _firstName, string memory _lastName, string memory _userName, string memory _bio) public accountAlreadyExists userNameAlreadyExists(_userName){

        users.push(User(user_count, msg.sender, _firstName, _lastName, _userName, _bio,0,0));
        accountCheck[msg.sender] = true;
        userNameCheck[_userName] = true;
        userNameToId[_userName]= user_count;
        addressToId[msg.sender]= user_count;
        
        user_count++;
        // fire event new user added
            emit NewUserAdd(_userName, msg.sender);
       
       
    }
   
    function addNewDweet(string memory _content, string memory _hashtag) userExists public{
         
        //string[] memory hashtagList = identifyHashtags(_content);  
       
        dweets.push(Dweet(dweet_count, _content, msg.sender, block.timestamp, 0, 0, _hashtag, false));
       
        dweetToAuthor[dweet_count] = msg.sender;
        dweetCountAuthor[msg.sender]++;
        
        dweet_count++;
        //fire event new dweet added
        emit NewDweetAdd(_content, _hashtag, block.timestamp);
       
    }
   
   
}
