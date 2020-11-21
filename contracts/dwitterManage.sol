//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0;
import "./dweet.sol";

contract DwitterManage is DwitterMain {
    //upvote, report, delete functionalities
   //include display function
   
   event upvoted(uint id, address upvoter);
   event reported(uint id, address reporter);
   event deleted(uint id, uint timestamp);
   event followed(uint followers, uint following); 
   
   modifier onlyAuthor(uint id) {
       require(msg.sender == dweetToAuthor[id]);
       _;
   }
   
   modifier dweetNotDeleted(uint id) {
       Dweet memory dw = dweets[id];
       require(dw.deleted == false);
       _;
   }
  
   
   function upvoteDweet(uint id) userExists public {
   
       address upvoter = msg.sender;
       Dweet storage dw = dweets[id];
       dw.upvotes++;
       
       //emit event
       emit upvoted(id, upvoter);
       
       
   }   
   
    function reportDweet(uint id) userExists public {
   
       address reporter = msg.sender;  //should we store this ?
       Dweet storage dw1 = dweets[id];
       dw1.reports++;
       
       //emit event
       emit reported(id, reporter);
       
       if(dw1.reports > 10){
           //mark or remove content
           dw1.deleted = true;
       }
       
   }   
   
   function deleteDweet(uint id) onlyAuthor(id) public {
       
       Dweet storage dw1 = dweets[id];
       dw1.deleted = true;

       //emit event
       emit deleted(id, block.timestamp);
   }
   
   
   function search(string memory _userName) userNameExists(_userName) view public returns(string memory _firstname, string memory _lastName, address pkey, string memory _bio, uint followers, uint following){
       uint id1= userNameToId[_userName];
       User memory user1= users[id1];
       return(user1.firstname, user1.lastname, user1.pkey, user1.bio, user1.followers, user1.following);
       //display the profile page of corresponding id
   }
   
   function followUser(uint id) userExists  public {
      // uint id2 = userNameToId[userName];
       User storage user1 = users[id];
       address toBeFollowed1= user1.pkey;
       require(msg.sender != toBeFollowed1);
       //a user cannot follow himself
       user1.followers++;
      
       
       address follower = msg.sender;
       uint id1 = addressToId[follower];
       User storage user2 = users[id1];
       user2.following++;
       emit followed(user1.followers, user2.following);
   }
   
  
   function getDweetByUser(uint id, address _author) view public returns(string memory content, address author, uint timestamp,uint upvotes, uint reports, string memory hashtag)
   {
        Dweet memory dw = dweets[id];
       if(_author == dw.author)
       {
           return (dw.content, dw.author, dw.timestamp, dw.upvotes, dw.reports, dw.hashtag);
       }
       
   } 
   
  
   
   function getDweetByHashtag(uint id, string memory _searchHashtag) dweetNotDeleted(id) view public returns(string memory content, address author, uint timestamp,uint upvotes, uint reports, string memory hashtag)
   {
       Dweet memory dw = dweets[id];
       if(keccak256(abi.encodePacked(dw.hashtag)) == keccak256(abi.encodePacked(_searchHashtag)))
       {
           return (dw.content, dw.author, dw.timestamp, dw.upvotes, dw.reports, dw.hashtag);
       }
   }
   
   function getDweet(uint id) dweetNotDeleted(id) view public returns(string memory content, address author, uint timestamp,uint upvotes, uint reports, string memory hashtag) {
       Dweet memory dw = dweets[id];
       
       return (dw.content, dw.author, dw.timestamp, dw.upvotes, dw.reports, dw.hashtag);
   }
   
   //stuff to be ensured in front 
   //one upvote,report,follow only per account per dweets
   //display dweets 
}
