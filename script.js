function loadItems() {
  // Create XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Configure it: Use GET method for fetching items
  xhr.open("GET", "http://localhost:5000");

  // Set callback function to handle response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Success: Update table with data
      const items = JSON.parse(xhr.responseText);
      updateTable(items);
    } else {
      // Error: Log the error
      console.error(xhr.statusText);
    }
  };

  // Send the request
  xhr.send();
}

function saveItem() {
  // Get form data
  const itemId = document.getElementById("itemId").value;
  const itemName = document.getElementById("itemName").value;
  const itemDescription = document.getElementById("itemDescription").value;
  const itemQuantity = document.getElementById("itemQuantity").value;
  const itemSeller = document.getElementById("itemSeller").value;
  const itemLocation = document.getElementById("itemLocation").value;
  const itemWarranty = document.getElementById("itemWarranty").value;
  const itemPayment = document.getElementById("itemPayment").value === "true";

  // Create XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Configure it: Use POST method for creating/updating items
  xhr.open(itemId ? "PUT" : "POST", "http://localhost:5000");

  // Set Content-Type header
  xhr.setRequestHeader("Content-Type", "application/json");

  // Set callback function to handle response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Success: Reload table
      loadItems();
      // Clear form
      document.getElementById("itemForm").reset();
    } else {
      // Error: Log the error
      console.error(xhr.statusText);
    }
  };

  // Prepare data and send
  const data = {
    _id: itemId,
    name: itemName,
    description: itemDescription,
    quantity: itemQuantity,
    seller: itemSeller,
    location: itemLocation,
    warranty: itemWarranty,
    payment: itemPayment,
    // Add other fields as needed
  };

  xhr.send(JSON.stringify(data));
}

function updateTable(items) {
  const tableBody = document.getElementById("itemTableBody");
  tableBody.innerHTML = "";

  items.forEach((item) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td>${item._id}</td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.quantity}</td>
        <td>${item.seller}</td>
        <td>${item.location}</td>
        <td>${item.warranty}</td>
        <td>${item.payment ? "Yes" : "No"}</td>
        <td>
          <button type="button" class="btn btn-warning btn-sm" onclick="editItem('${
            item._id
          }')">Edit</button>
          <button type="button" class="btn btn-danger btn-sm" onclick="deleteItem('${
            item._id
          }')">Delete</button>
        </td>
      `;
  });
}

function editItem(itemId) {
  // Find the item by ID and populate the form
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:5000/${itemId}`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const item = JSON.parse(xhr.responseText);
      document.getElementById("itemId").value = item._id;
      document.getElementById("itemName").value = item.name;
      document.getElementById("itemDescription").value = item.description;
      document.getElementById("itemQuantity").value = item.quantity;
      document.getElementById("itemSeller").value = item.seller;
      document.getElementById("itemLocation").value = item.location;
      document.getElementById("itemWarranty").value = item.warranty;
      document.getElementById("itemPayment").value = item.payment
        ? "true"
        : "false";
      // Populate other fields as needed
    } else {
      console.error(xhr.statusText);
    }
  };
  xhr.send();
}

// Initial load of items
loadItems();
