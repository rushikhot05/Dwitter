pragma solidity >=0.5.0;

contract DwitterMain {
   address owner;
  
   
    struct Dweet {
        uint id;
        string content;
        uint timestamp;
        uint upvotes;
        uint reports;
        string hashtag;
       
    }
   
    struct User{
        uint id;
        address pkey;
        string firstname;
        string lastname;
        string userName;
        string bio;
       // string photoUrl;  //profile picture
    }
   
    uint public dweet_count=0;
    uint public user_count=0;
   
    uint date = block.timestamp;
   
    Dweet[] public dweets;
    User[] public users;
   
   
    mapping(uint => address) public dweetToAuthor;  //maps dweet's id to author's address
    mapping(address => uint) public dweetCountAuthor; //stores number of dweets by individual author
    mapping(address => bool) accountCheck;  //only one account per public key
    mapping(string => bool) userNameCheck;   //check if username already taken
   // mapping(uint => string) DweetToHashtag;  
   
   event  NewUserAdd( string userName, address pkey);
   event NewDweetAdd(string content, string hashtag, uint timestamp);
   
   
   /*
   
     modifier onlyOwner(){
         require(msg.sender == owner);
         _;
     }
*/

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
   
    function addNewUser(string memory _firstName, string memory _lastName, string memory _userName, string memory _bio) public accountAlreadyExists userNameAlreadyExists(_userName){

        users.push(User(user_count++, msg.sender, _firstName, _lastName, _userName, _bio));
        accountCheck[msg.sender] = true;
        userNameCheck[_userName] = true;
        
        // fire event new user added
            emit NewUserAdd(_userName, msg.sender);
       
       
    }
   
    function addNewDweet(string memory _content, string memory _hashtag) public{
         dweet_count++;
        //string[] memory hashtagList = identifyHashtags(_content);  
       
        dweets.push(Dweet(dweet_count, _content, block.timestamp, 0, 0, _hashtag));
       
        dweetToAuthor[dweet_count] = msg.sender;
        dweetCountAuthor[msg.sender]++;
        
        //fire event new dweet added
        emit NewDweetAdd(_content, _hashtag, block.timestamp);
       
    }
   
   
}
