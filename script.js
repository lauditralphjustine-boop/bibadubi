// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDsBXS-gWAZawP4WK5PFVinhPIhs2fBaSs",
  authDomain: "bibadubi-k5.firebaseapp.com",
  databaseURL: "https://bibadubi-k5-default-rtdb.asia-east1.firebasedatabase.app",
  projectId: "bibadubi-k5",
  storageBucket: "bibadubi-k5.firebasestorage.app",
  messagingSenderId: "664396621773",
  appId: "1:664396621773:web:379b0595dec73a5be38684"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Handle remarks
const remarkForm = document.getElementById("remarkForm");
const remarkList = document.getElementById("remarkList");

remarkForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const remark = document.getElementById("remark").value.trim();

  if (name && remark) {
    const newRemarkRef = database.ref("remarks").push();
    newRemarkRef.set({
      name: name,
      remark: remark,
      date: new Date().toLocaleString(),
    });

    remarkForm.reset();
  }
});

// Load remarks from Firebase
database.ref("remarks").on("value", (snapshot) => {
  const data = snapshot.val();
  remarkList.innerHTML = "";
  for (let id in data) {
    const { name, remark, date } = data[id];
    remarkList.innerHTML += `
      <div class="remark">
        <h4>${name}</h4>
        <p>${remark}</p>
        <small>${date}</small>
      </div>
    `;
  }
});
