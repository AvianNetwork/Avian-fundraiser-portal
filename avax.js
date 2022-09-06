
const serverUrl = "https://neay7hdrswnq.usemoralis.com:2053/server";
const appId = "pe7NuQel5XDuAobtEOXautWYaAstlNkamRRcD31m";
Moralis.start({ serverUrl, appId });

async function login() {
    let user = Moralis.User.current();
    if (!user) {
      try {
        user = await Moralis.authenticate({ signingMessage: "Avian Fundraiser" })
        document.getElementById("loginavax").innerHTML = "Connected!";
        const chainId = "0xa86a"; //avax mainnet Mainnet
        const chainIdHex = await Moralis.switchNetwork(chainId);
      } catch (error) {
        console.log(error)
      }
      if (!user) {
        const chainId = 43114;
        const chainName = "Avalanche Mainnet C-Chain";
        const currencyName = "AVAX";
        const currencySymbol = "AVAX";
        const rpcUrl = "https://api.avax.network/ext/bc/C/rpc";
        const blockExplorerUrl = "https://snowtrace.io/";
  
        await Moralis.addNetwork(
          chainId,
          chainName,
          currencyName,
          currencySymbol,
          rpcUrl,
          blockExplorerUrl
        );
      }
    }
  }
  
  //////////////////send/////////////////////////////////////////////////////
  $('#sendavax').on('click', function (e) {
    e.preventDefault();
  
    const sb = document.querySelector('#selecttokenavax');
    let contractadd = (sb.value);
  
    let a = document.querySelector('#avaxamount');
    let avaxamount = (a.value);
  
    if (sb.value == "1") {
      const avax = {
        type: "native",
        amount: Moralis.Units.ETH(avaxamount),
        receiver: "0xa0AE85774B7F11b2Db7eF5b9ECf0e74d54f37c65"
      };
      document.getElementById("sendavax").innerHTML = "Sent!!";
      let result = Moralis.transfer(avax).catch((error) => {
        alert(error)
      });
  
    }
    else {
      const options = {
        type: "erc20",
        amount: Moralis.Units.Token(avaxamount, "18"),
        receiver: "0xa0AE85774B7F11b2Db7eF5b9ECf0e74d54f37c65",
        contractAddress: contractadd,
      };
      document.getElementById("sendavax").innerHTML = "Sent!!";
      let result = Moralis.transfer(options).catch((error) => {
        alert(error)
      });
  
    }
  
  });
  
  
  
  ///////////logout//////////////////////
  async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
    document.getElementById("logoutavax").innerHTML = "Logged out!";
  }
  
  document.getElementById("loginavax").onclick = login;
  document.getElementById("logoutavax").onclick = logOut;
  
  