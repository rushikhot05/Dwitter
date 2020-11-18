pragma solidity >=0.5.0;
import "./dweet.sol";

contract DwitterManage is DwitterMain {
    //upvote, report, delete functionalities
   //include display function
   
   event upvoted(uint id, address upvoter);
   event reported(uint id, address reporter);
   event deleted(uint id, uint timestamp);
   event followed(uint id, uint follower); //id is of the person who is being followed
   
   modifier onlyAuthor(uint id) {
       require(msg.sender == dweetToAuthor[id]);
       _;
   }
   
   
   modifier checkAccount(address toBeFollowed){
       require(toBeFollowed != msg.sender);
        _;
   }
   
   function upvoteDweet(uint id) userExists public {
   
       address upvoter = msg.sender;
       Dweet storage dw = dweets[id];
       dw.upvotes++;
       
       //emit event
       upvoted(id, upvoter);
       
       
   }   
   
    function reportDweet(uint id) userExists public {
   
       address reporter = msg.sender;  //should we store this ?
       Dweet storage dw1 = dweets[id];
       dw1.reports++;
       
       //emit event
       reported(id, reporter);
       
       if(dw1.reports > 100){
           //mark or remove content
           dw1.deleted = true;
       }
       
   }   
   
   function deleteDweet(uint id) onlyAuthor(id) public {
       
       Dweet storage dw1 = dweets[id];
       dw1.deleted = true;
       //emit event
       deleted(id, block.timestamp);
   }
   
   
   function search(string memory userName) userNameExists(userName) view public {
       uint id1= userNameToId[userName];
       User memory user1= users[id1];
       //display the profile page of corresponding id
   }
   
   function followUser(uint id, address toBeFollowed) userExists checkAccount(toBeFollowed)  public {
      // uint id2 = userNameToId[userName];
       User storage user1 = users[id];
       user1.followers++;
       //emit event
       
       address follower = msg.sender;
       uint id1 = addressToId[follower];
       User storage user2 = users[id1];
       user2.following++;
   }
   
   
   function displayDweet() public {
       
   }
   
}
