//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0;
import "./dweet.sol";

contract DwitterManage is DwitterMain {
    //upvote, report, delete, display, follow functionalities
   
   event upvoted(uint id, address upvoter);
   event reported(uint id, address reporter);
   event deleted(uint id, uint timestamp);
   event followed(uint id, uint followers); //id is of the person who is being followed
   
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
   
   
   function search(string memory _userName) userNameExists(_userName) view public {
       uint id1= userNameToId[_userName];
       User memory user1= users[id1];
       //display the profile page of corresponding id
   }
   
   function followUser(uint id) userExists  public {
      // uint id2 = userNameToId[userName];
       User storage user1 = users[id];
       address toBeFollowed1= user1.pkey;
       require(msg.sender != toBeFollowed1);
       user1.followers++;
       //emit event
       
       address follower = msg.sender;
       uint id1 = addressToId[follower];
       User storage user2 = users[id1];
       user2.following++;
       emit followed(id,user1.followers);
   }
   
   
   function getDweet(uint id) dweetNotDeleted(id) view public returns(string memory content,uint timestamp,uint upvotes, uint reports, string memory hashtag) {
       Dweet memory dw = dweets[id];
       return (dw.content, dw.timestamp, dw.upvotes, dw.reports, dw.hashtag);
   }
   
   //stuff to be ensured in front end
   //one upvote,report,follow only per account per dweets
   //call getDweet in loop with id from front end
}
