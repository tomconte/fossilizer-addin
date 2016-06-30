(function () {
  'use strict';

  var web3 = new Web3(new Web3.providers.HttpProvider("https://localhost:8546"));
  var abi = [{"constant":false,"inputs":[{"name":"hash","type":"uint256"},{"name":"path","type":"string"},{"name":"computer","type":"string"}],"name":"fossilizeDocument","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"emails","outputs":[{"name":"sender","type":"address"},{"name":"subject","type":"string"},{"name":"emailFrom","type":"string"},{"name":"emailTo","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"uint256"},{"name":"subject","type":"string"},{"name":"emailFrom","type":"string"},{"name":"emailTo","type":"string"}],"name":"fossilizeEmail","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"documents","outputs":[{"name":"sender","type":"address"},{"name":"path","type":"string"},{"name":"computer","type":"string"}],"type":"function"}];
  var address = '0x9f1bbdf3f8d4755a46a3486e20157d90436e0ec5';
  var contract = web3.eth.contract(abi).at(address);
  var account = '0x87b3f6def4d451c41be733b8924da66dea0caed4'; // Dev
  web3.eth.defaultAccount = account;

  // The Office initialize function must be run each time a new page is loaded
  Office.initialize = function (reason) {
    jQuery(document).ready(function () {
      app.initialize();

      displayItemDetails();
    });
  };

  // Displays the "Subject" and "From" fields, based on the current mail item
  function displayItemDetails() {
    var item = Office.cast.item.toItemRead(Office.context.mailbox.item);
    $('#subject').text(item.subject);

    var from;
    if (item.itemType === Office.MailboxEnums.ItemType.Message) {
      from = Office.cast.item.toMessageRead(item).from;
    } else if (item.itemType === Office.MailboxEnums.ItemType.Appointment) {
      from = Office.cast.item.toAppointmentRead(item).organizer;
    }

    $('#from').text(from.emailAddress);

    var to = Office.cast.item.toMessageRead(item).to[0];
    $('#to').text(to.emailAddress);

    $('#save').click(function () {
      item.body.getAsync('html', function(result) {
        var hash = '0x' + CryptoJS.SHA256(result.value).toString(CryptoJS.enc.Hex);
        console.log(hash);
        contract.fossilizeEmail(hash, item.subject, from.emailAddress, to.emailAddress, {gas: 900000});
        app.showNotification("Message saved: " + item.subject, "Hash: " + hash);
      });
    });
  }
})();
