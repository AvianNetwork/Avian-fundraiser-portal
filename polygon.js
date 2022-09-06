
const serverUrl = "https://neay7hdrswnq.usemoralis.com:2053/server";
const appId = "pe7NuQel5XDuAobtEOXautWYaAstlNkamRRcD31m";
Moralis.start({ serverUrl, appId });


async function login() {
  let user = Moralis.User.current();
  if (!user) {
    try {
      user = await Moralis.authenticate({ signingMessage: "Avian Fundraiser" })
      document.getElementById("loginpoly").innerHTML = "Connected!";
      const chainId = "0x89"; //polygon Mainnet
      const chainIdHex = await Moralis.switchNetwork(chainId);
    } catch (error) {
      console.log(error)
    }
    if (!user) {
      const chainId = 137;
      const chainName = "Polygon Mainnet";
      const currencyName = "Matic";
      const currencySymbol = "MATIC";
      const rpcUrl = "https://polygon-rpc.com/";
      const blockExplorerUrl = "https://polygonscan.com/";

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
$('#sendpoly').on('click', function (e) {
  e.preventDefault();

  const sb = document.querySelector('#selecttoken');
  let contractadd = (sb.value);

  let a = document.querySelector('#polygonamount');
  let polyamount = (a.value);

  if (sb.value == "0x0000000000000000000000000000000000001010") {
    const matic = {
      type: "native",
      amount: Moralis.Units.ETH(polyamount),
      receiver: "0xDe0DE663345Fb6c24aB340E38a574dF31E9cFB88"
    };
    document.getElementById("sendpoly").innerHTML = "Sent!!";
    let result = Moralis.transfer(matic).catch((error) => {
      alert(error)
    });

  }
  else {
    const options = {
      type: "erc20",
      amount: Moralis.Units.Token(polyamount, "18"),
      receiver: "0xDe0DE663345Fb6c24aB340E38a574dF31E9cFB88",
      contractAddress: contractadd,
    };
    document.getElementById("sendpoly").innerHTML = "Sent!!";
    let result = Moralis.transfer(options).catch((error) => {
      alert(error)
    });

  }

});



///////////logout//////////////////////
async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
  document.getElementById("logoutpoly").innerHTML = "Logged out!";
}

document.getElementById("loginpoly").onclick = login;
document.getElementById("logoutpoly").onclick = logOut;
