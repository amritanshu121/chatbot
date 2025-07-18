const chatBox = document.getElementById("chat-box");
const inputArea = document.getElementById("input-area");

let appointmentData = {
  name: "",
  patientId: "",
  specialty: "",
  doctor: "",
  date: "",
  time: ""
};

function addMessage(text, sender = "bot") {
  const msg = document.createElement("div");
  msg.classList.add("bubble", sender);
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addButtons(options) {
  inputArea.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.innerText = opt.label;
    btn.onclick = () => opt.onClick();
    inputArea.appendChild(btn);
  });
}

function addInput(placeholder, callback) {
  inputArea.innerHTML = "";
  const input = document.createElement("input");
  input.placeholder = placeholder;
  input.classList.add("text-input");
  inputArea.appendChild(input);

  const submit = document.createElement("button");
  submit.classList.add("btn");
  submit.innerText = "Submit";
  submit.onclick = () => {
    if (input.value.trim() !== "") {
      callback(input.value.trim());
    }
  };
  inputArea.appendChild(submit);
}

function startChat() {
  appointmentData = {};
  addMessage("👋 Welcome to CityCare Hospital!");
  addMessage("How can I help you today?");
  addButtons([
    { label: "Book Appointment", onClick: () => handleBooking() },
    { label: "Customer Support", onClick: () => handleSupport() }
  ]);
}

function handleSupport() {
  addMessage("You chose: Customer Support", "user");
  addButtons([
    { label: "Visiting Hours", onClick: () => addMessage("🕐 Visiting Hours: 10am - 5pm") },
    { label: "Departments", onClick: () => addMessage("🏥 Departments: Cardiology, Ortho, Neuro, ENT") },
    { label: "Location", onClick: () => addMessage("📍 We are located at: 123 City Rd, Metro City") },
    { label: "Talk to Human", onClick: () => addMessage("📞 Please call: +91-9876543210") },
    { label: "🔙 Back", onClick: () => startChat() }
  ]);
}

function handleBooking() {
  addMessage("You chose: Book Appointment", "user");
//   addMessage("Are you already registered?");
  addButtons([
    {
      label: "✅ Yes (Already Registered)",
      onClick: () => {
        addInput("Enter your Patient ID", (id) => {
          appointmentData.patientId = id;
          addMessage("Patient ID: " + id, "user");
          selectSpecialty();
        });
      }
    },
    {
      label: "➕ New Registration",
      onClick: () => {
        addInput("Enter your full name", (name) => {
          appointmentData.name = name;
          appointmentData.patientId = "PID" + Math.floor(Math.random() * 10000);
          addMessage("Name: " + name, "user");
          addMessage("Your Patient ID is: " + appointmentData.patientId);
          selectSpecialty();
        });
      }
    },
    { label: "🔙 Back", onClick: () => startChat() }
  ]);
}

function selectSpecialty() {
  addMessage("Please choose a specialty:");
  const specialties = ["Cardiology", "Orthopedics", "Neurology", "ENT"];
  addButtons(
    specialties.map((spec) => ({
      label: spec,
      onClick: () => {
        appointmentData.specialty = spec;
        addMessage("You selected: " + spec, "user");
        selectDoctor(spec);
      }
    }))
  );
}

function selectDoctor(specialty) {
  const doctorMap = {
    Cardiology: ["Dr. Sharma", "Dr. Patel", "Dr. Bansal", "Dr. Joshi"],
    Orthopedics: ["Dr. Mehta", "Dr. Kumar", "Dr. Reddy", "Dr. Rana"],
    Neurology: ["Dr. Iyer", "Dr. Das", "Dr. Roy", "Dr. Saxena"],
    ENT: ["Dr. Singh", "Dr. Verma", "Dr. Yadav", "Dr. Kaur"]
  };

  addMessage(`Choose a doctor from ${specialty}:`);
  addButtons(
    doctorMap[specialty].map((doc) => ({
      label: doc,
      onClick: () => {
        appointmentData.doctor = doc;
        addMessage("You selected: " + doc, "user");
        selectDate();
      }
    }))
  );
}

function selectDate() {
  const dateOptions = [
    "2025-07-19",
    "2025-07-20",
    "2025-07-21"
  ];

  addMessage("Choose a preferred date:");
  addButtons(
    dateOptions.map(date => ({
      label: date,
      onClick: () => {
        appointmentData.date = date;
        addMessage("Date selected", "user");
        selectTime();
      }
    }))
  );
}

function selectTime() {
  const timeOptions = [
    "10:00 AM",
    "2:00 PM",
    "5:00 PM"
  ];

  addMessage("Choose a preferred time:");
  addButtons(
    timeOptions.map(time => ({
      label: time,
      onClick: () => {
        appointmentData.time = time;
        addMessage("Time selected", "user");
        confirmBooking();
      }
    }))
  );
}

function confirmBooking() {
  addMessage("Please confirm your appointment:");
  addMessage(
    `📝 Name: ${appointmentData.name || "(existing patient)"}\n🆔 Patient ID: ${appointmentData.patientId}\n🏥 Specialty: ${appointmentData.specialty}\n👨‍⚕️ Doctor: ${appointmentData.doctor}\n📅 Date: ${appointmentData.date}\n⏰ Time: ${appointmentData.time}`
  );

  addButtons([
    {
      label: "✅ Confirm",
      onClick: () => {
        addMessage("Your appointment has been booked successfully! 🎉");
        addButtons([{ label: "🔁 Book Another", onClick: () => startChat() }]);
        // Here you can call backend API with appointmentData using fetch()
      }
    },
    {
      label: "❌ Cancel",
      onClick: () => {
        addMessage("Appointment cancelled.");
        startChat();
      }
    }
  ]);
}

startChat();
