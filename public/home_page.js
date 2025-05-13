async function createCustomer() {
    await fetch(`/customer`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: `${document.getElementById('firstName').value}`,
        lastName: `${document.getElementById('lastName').value}`,
        state: `${document.getElementById('state').value}`,
      }),
      headers: {
        'content-type': 'application/json',
      },
    }).then((result) => result.json());
  
    await loadCustomerData();
  }
  
  async function loadCustomerData() {
    await fetch(`/customers`)
      .then((result) => result.json())
      .then((resultJson) => {
        const table = document.createElement('table');
        table.setAttribute('id', 'customerInfo');
  
        const tableRow = document.createElement('tr');
  
        const tableHeadingFirstName = document.createElement('th');
        tableHeadingFirstName.innerHTML = 'First Name';
        tableRow.appendChild(tableHeadingFirstName);
  
        const tableHeadingLastName = document.createElement('th');
        tableHeadingLastName.innerHTML = 'Last Name';
        tableRow.appendChild(tableHeadingLastName);
  
        const tableHeadingState = document.createElement('th');
        tableHeadingState.innerHTML = 'State';
        tableRow.appendChild(tableHeadingState);
  
        table.appendChild(tableRow);
  
        resultJson.forEach((customer) => {
          const customerTableRow = document.createElement('tr');
          const customerTableFirstName = document.createElement('td');
          const customerTableLastName = document.createElement('td');
          const customerTableState = document.createElement('td');
  
          customerTableFirstName.innerHTML = customer.customer_first_name;
          customerTableLastName.innerHTML = customer.customer_last_name;
          customerTableState.innerHTML = customer.customer_state;
  
          customerTableRow.appendChild(customerTableFirstName);
          customerTableRow.appendChild(customerTableLastName);
          customerTableRow.appendChild(customerTableState);
  
          table.appendChild(customerTableRow);
        });
  
        const preExistingTable = document.getElementById('customerInfo');
        if (preExistingTable) {
          preExistingTable.remove();
        }
  
        document.body.appendChild(table);
      });
  }
  $(document).ready(function() {
    $(window).on('scroll', function() {
     if($(window).scrollTop() < 1000) {
       $('.hero').css('background-size', 130 + parseInt($(window).scrollTop() / 5) + '%');
       $('.hero h1').css('top', 50 + ($(window).scrollTop() * .1) + '%');
       $('.hero h1').css('opacity', 1 - ($(window).scrollTop() * .003));
     }
      
      if($(window).scrollTop() >= $('.content-wrapper').offset().top - 300) {
        $('.nav-bg').removeClass('bg-hidden');
        $('.nav-bg').addClass('bg-visible');
      } else {
        $('.nav-bg').removeClass('bg-visible');
        $('.nav-bg').addClass('bg-hidden');
      }
   });
 });
  window.onload = loadCustomerData;