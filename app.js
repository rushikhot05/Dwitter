App = {
  loading: false,
  contracts: {},

   load: async () => {
    console.log("load");
       await App.loadWeb3()
       await App.loadAccount()
       await App.loadContract()
       await App.render()
   },

loadWeb3: async() => {
  console.log("loadweb3");
    if (window.ethereum) {
        console.log("Metamask Detected");
        window.web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          res = await ethereum.enable();
          /* if (res) alert("Website Connected using address: " + res);
          web3.eth.net.getNetworkType().then(console.log); */
        } catch (error) {
          alert("Permission Denied, Metamask Not connected!");
        }
      }
      
      else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
        alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
},

loadAccount: async () => {
  console.log("loadacc");
    setInterval(()=>{
        App.account = web3.currentProvider.selectedAddress;
       console.log(App.account)
    }, 10000);

    //set ownerAddress class to App.account 
    App.account = web3.currentProvider.selectedAddress;
    console.log(App.account+"HI")
    $("#account").text(App.account);  
  },

  loadContract: async () => {
    console.log("loadcont");
      let abi =[
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "content",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "hashtag",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "name": "NewDweetAdd",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "userName",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "pkey",
              "type": "address"
            }
          ],
          "name": "NewUserAdd",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "name": "deleted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "downvoter",
              "type": "address"
            }
          ],
          "name": "downvoted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "followers",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "following",
              "type": "uint256"
            }
          ],
          "name": "followed",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "reporter",
              "type": "address"
            }
          ],
          "name": "reported",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "upvoter",
              "type": "address"
            }
          ],
          "name": "upvoted",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "accountCheck",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_content",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_hashtag",
              "type": "string"
            }
          ],
          "name": "addNewDweet",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "addressToId",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "deleteDweet",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "downvoteDweet",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "dweetCountAuthor",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "dweetToAuthor",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "dweet_count",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "dweets",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "content",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "author",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "upvotes",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "reports",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "hashtag",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "deleted",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "followUser",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "idToUsername",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_firstName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_lastName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_userName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_bio",
              "type": "string"
            }
          ],
          "name": "registerNewUser",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "reportDweet",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_userName",
              "type": "string"
            }
          ],
          "name": "search",
          "outputs": [
            {
              "internalType": "string",
              "name": "_firstname",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_lastName",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "pkey",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "_bio",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "followers",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "following",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "upvoteDweet",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "name": "userNameCheck",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "name": "userNameToId",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "user_count",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "users",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "pkey",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "firstname",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "lastname",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "userName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "bio",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "following",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "followers",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];
      let address = '0x94befa2e41b2613b313a97e7bacdd50e6c1f3769';
      App.dwitterManage = new web3.eth.Contract(abi, address);
     console.log(App.dwitterManage);
  },

  render: async () => {
    console.log("loadren");
    // Prevent double render
    if (App.loading) {
      return;
    }
    // Render Account
    App.account = web3.currentProvider.selectedAddress;
    $("#account").html(App.account);  

    const bool= await App.dwitterManage.methods.accountCheck(App.account).call();
    if(bool == false){
      var fname = prompt("Please enter Firstname");
      var lname = prompt("Please enter Lastname");
      var uname = prompt("Please enter username");
      var bio1 = prompt("Please enter Bio");
      const bool1= await App.dwitterManage.methods.userNameCheck(App.account).call();
      if(bool1 == true)
         var uname = prompt("Username already taken. Try something else ");
        await App.dwitterManage.methods.registerNewUser(fname,lname,uname,bio1).send({ from: web3.currentProvider.selectedAddress })
      window.location.reload()
      }
    const id = await App.dwitterManage.methods.addressToId(App.account).call();
    const userName = await App.dwitterManage.methods.idToUsername(id).call();
    const userCount = await App.dwitterManage.methods.user_count().call();
    console.log(`User Count : ${userCount}`)
    const user = await App.dwitterManage.methods.users(id).call();
    const bio = user[5];
    $(".ownerName").text(userName);
    $("#bio").text(bio);
    // Render Tasks
    await App.renderTasks();
  },

  renderTasks: async() => {
    const dweetCount = await App.dwitterManage.methods.dweet_count().call();
    console.log(`Dweet Count : ${dweetCount}`);
    let upvotes; let reports;
   
    const $postTemplate = $(".dweetpost");
   for(let i= dweetCount-1; i>=0; i--){
      const dweet = await App.dwitterManage.methods.dweets(i).call();
      console.log(dweet);
      if(dweet[7] == false) {
         const times = dweet[3];
         const d = new Date(0);
         d.setUTCSeconds(times);
         var datestring = `${d.getDate()}-${(d.getMonth()+1)}-${d.getFullYear()} 
                            ${d.getHours()}:${d.getMinutes()} IST`;
         const id = dweet[0];
         const content = dweet[1];
         upvotes = dweet[4]; console.log(upvotes + " Upvotes")
         reports = dweet[5];
         const hashtag = dweet[6];
         const authorAddress= await App.dwitterManage.methods.dweetToAuthor(i).call();
         const authorId= await App.dwitterManage.methods.addressToId(authorAddress).call();
         const userName= await App.dwitterManage.methods.idToUsername(authorId).call();
   
     
         const $newpostTemplate = $postTemplate.clone();   
         $newpostTemplate.find(".dweetcontent").text(content);
         $newpostTemplate.find(".userName").html(userName);
         $newpostTemplate.find(".hashtags").html(hashtag);
         $newpostTemplate.find(".time").html(datestring);
         $newpostTemplate.find(".upvotes").html(upvotes);
         $newpostTemplate.find(".reports").html(reports);
         $("#post").append($newpostTemplate); 
    


        $newpostTemplate
        .find(".upvoteButton")
        .prop("id", id+"a")
        .prop("style", "visibility:visible")
        .on("click",function(){ App.upvoteDweet(id); }); 
       
        $newpostTemplate
        .find(".downvoteButton")
        .prop("id", id+"b")
        .on("click", function(){ App.downvoteDweet(id); });

        $newpostTemplate
        .find(".reportButton")
        .prop("id", id+"c")
        .prop("style", "visibility:visible")
        .on("click", function(){ App.reportDweet(id); }); 

        $newpostTemplate
        .find(".upvotes")
        .prop("id", id+"d");
        
        $newpostTemplate
        .find(".upvotesChange")
        .prop("id", id+"e");

        $newpostTemplate
        .find(".reports")
        .prop("id", id+"f"); 

        $newpostTemplate
        .find(".reported")
        .prop("id", id+"g");

        $newpostTemplate.show();
      }}
     
      await App.dweetsByUser();
},

addNewDweet: async () => {
  const content = $("#dweet").val();
  const hashtag= $("#hashtag").val();

  var rc = await App.dwitterManage.methods
    .addNewDweet(content,hashtag)
    .send({ from: web3.currentProvider.selectedAddress });
  console.log(rc);
  window.location.reload();
  //
},

upvoteDweet: async (id) => { 
  await App.dwitterManage.methods
  .upvoteDweet(id)
  .send({ from: web3.currentProvider.selectedAddress });  
 
   var old = $(`#${id}d`).text()
   console.log(old)
   var curr = parseInt(old)+1;
   console.log("new"+ curr)
   $(`#${id}d`).hide()
   $(`#${id}a`).hide()
   $(`#${id}b`).show()
   $(`#${id}e`).text(curr)
   $(`#${id}e`).show()
   
},

downvoteDweet: async (id) => { 
  await App.dwitterManage.methods
  .downvoteDweet(id)
  .send({ from: web3.currentProvider.selectedAddress }); 
  var old = $(`#${id}e`).text()
  console.log(old)
  var curr = parseInt(old)-1;
  console.log("new"+ curr)
// window.location.reload();
  $(`#${id}b`).hide()
  $(`#${id}e`).hide()
  $(`#${id}a`).show()
  $(`#${id}d`).text(curr)
   $(`#${id}d`).show()
 
},

reportDweet: async (id) => { //pass in the dweet's id
  await App.dwitterManage.methods
  .reportDweet(id)
  .send({ from: web3.currentProvider.selectedAddress });  
  var old = $(`#${id}f`).text()
  var curr = parseInt(old)+1;
  $(`#${id}f`).text(curr)
  $(`#${id}c`).prop("disabled", true);
},

deleteDweet: async (id) => { //pass in the dweet's id
  await App.dwitterManage.methods
  .deleteDweet(id)
  .send({ from: web3.currentProvider.selectedAddress });  
window.location.reload()
},


searchUser: async () => { //get username 
  const userName = $('#search').val();
  console.log(userName)
  const bool1 = await App.dwitterManage.methods.userNameCheck(userName).call();
 if(bool1 == true){
  var rc = await App.dwitterManage.methods
  .search(userName).call();
  const bio = rc[3];
  $("#account").text(rc[2]); 
  $(".ownerName").text(userName);
  $("#bio").text(bio);


}
  else{alert("Invalid username !")}
},

followUser1: async() => { //get the id
  await App.dwitterManage.methods
  .followUser(id)
  .send({ from: web3.currentProvider.selectedAddress });  
},

dweetsByUser : async() => { 
  const $postTemplate = $(".dweetbody1");
  const dweetCount = await App.dwitterManage.methods.dweet_count().call();
 // console.log(dweetCount);
  for(let i = dweetCount-1; i>=0; i--){

  App.account = web3.currentProvider.selectedAddress;
  const dweet = await App.dwitterManage.methods.dweets(i).call();  console.log(dweet);
  if(dweet[7] == false){
   
    const auth = dweet[2];
    var author = auth.toLowerCase();

    if(author == App.account){
         let timestamp = dweet[3];
         const d = new Date(0);
         d.setUTCSeconds(timestamp);
        var datestring = `${d.getDate()}-${(d.getMonth()+1)}-${d.getFullYear()} 
       ${d.getHours()}:${d.getMinutes()} IST`;
         const content = dweet[1];
        const hashtag = dweet[6];

    const $newpostTemplate = $postTemplate.clone();
    $newpostTemplate.find(".dweetcontent1").html(content);
    $newpostTemplate.find(".hashtags1").html(hashtag);
    $newpostTemplate.find(".time1").html(datestring);

      $newpostTemplate
      .find(".deleteButton")
      .prop("id", i)
      .prop("style", "visibility:visible")
      .on("click", function() {App.deleteDweet(i);}); 
     
      $("#post1").append($newpostTemplate);
      $newpostTemplate.show(); 
  }
}}
},
};

$(() => {
  $(window).load(() => {
    App.load();
  });
});
