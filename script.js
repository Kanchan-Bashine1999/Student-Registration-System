

//Javascript Code
const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const studentidInput = document.getElementById('studentid');
const emailInput = document.getElementById('email');
const rollnoInput = document.getElementById('rollno');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');

// Initialize record from local storage
let records = JSON.parse(localStorage.getItem('records')) || [];
console.log(records.length);
// Function to check for duplicate names
function isDuplicateName(email) {
  return records.some(
    (record) => record.email.toLowerCase() === email.toLowerCase()
  );
}

// Display records
function displayRecords() {
  recordList.innerHTML = '';
  console.log(records.length);
  if (records.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="5" style="text-align:center;color:red;">No Record Found</td>`;
    recordList.appendChild(row);
  } else {
    records.forEach((record, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
                    <td>${record.name}</td>
                    <td>${record.studentid}</td>
                    <td>${record.email}</td>
                    <td>${record.rollno}</td>
                    <td><button onclick="editRecord(${index})">Edit</button></td>
                    <td class="deleteButton"><button onclick="deleteRecord(${index})">Delete</button></td>
                `;
      recordList.appendChild(row);
    });
  }
}

// Adding or Update a record
recordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const studentid = studentidInput.value;
  const email = emailInput.value;
  const rollno = rollnoInput.value;
  const editIndex = parseInt(editIndexInput.value);

  if (name && studentid && email &&rollno) {
    if (isDuplicateName(email) && editIndex === -1) {
      alert('Student already exists.');
      return;
    }

    if (editIndex === -1) {
      // Add a new records
      records.push({ name, studentid, email, rollno });
    } else {
      // Update existing record
      records[editIndex] = { name, studentid, email, rollno };
      editIndexInput.value = -1;
    }

    localStorage.setItem('records', JSON.stringify(records));
    nameInput.value = '';
    studentidInput.value = '';
    emailInput.value = '';
    rollnoInput.value = '';
    displayRecords();
  }
});

// Edit  record
function editRecord(index) {
  const recordToEdit = records[index];
  nameInput.value = recordToEdit.name;
  studentidInput.value = recordToEdit.studentid;
  emailInput.value = recordToEdit.email;
  rollnoInput.value = recordToEdit.rollno;
  editIndexInput.value = index;
}

// Delete  record
function deleteRecord(index) {
  displayRecords();
  let delBtn = document.querySelectorAll('.deleteButton');
  console.log(delBtn);
  delBtn[
    index
  ].innerHTML = `<i id="yesBtn" onclick="confirmDelete(${index})" class="fa-solid fa-check"></i><i id="noBtn" onclick="resetDelete(${index})" class="fa-solid fa-xmark"></i>`;
}

function confirmDelete(index) {
  records.splice(index, 1);
  localStorage.setItem('records', JSON.stringify(records));
  displayRecords();
}

function resetDelete(index) {
  displayRecords();
}

// Starting display
displayRecords();
