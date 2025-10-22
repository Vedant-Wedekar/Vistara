//    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   // Video data for each course
    const courseVideos = {
        IELTS: [
            {
                title: "IELTS Introduction",
                description: "Overview of the IELTS exam and preparation strategy.",
                url: "v1.mp4"
            },
            {
                title: "IELTS Listening Tips",
                description: "Learn essential strategies for the IELTS Listening section.",
                url: "ep/e2.mp4"
            },
            {
                title: "IELTS Speaking Practice",
                description: "Speaking test samples and preparation guide.",
                url: "ep/e3.mp4"
            }
        ],
        TOEFL: [
            {
                title: "TOEFL Overview",
                description: "Everything you need to know before starting TOEFL prep.",
                url: "https://www.youtube.com/embed/_hYwJQ0Lz7Y"
            },
            {
                title: "TOEFL Reading Section",
                description: "Tips and tricks for mastering TOEFL reading.",
                url: "https://www.youtube.com/embed/Bm5j_Jr3kkM"
            }
        ],
        GRE: [
            {
                title: "GRE Test Pattern Explained",
                description: "A complete guide to GRE structure and sections.",
                url: "https://www.youtube.com/embed/G7J5t0bsh6U"
            },
            {
                title: "GRE Quantitative Prep",
                description: "Maths strategies and shortcuts for GRE.",
                url: "https://www.youtube.com/embed/WBzqX3qG6jI"
            },
            {
                title: "GRE Verbal Reasoning",
                description: "Master the verbal reasoning part with these tricks.",
                url: "https://www.youtube.com/embed/_ZgO1dT_TVw"
            }
        ]
    };

    // Function to open video portal for selected course
    function openVideoPortal(courseName) {
        document.getElementById("exams").classList.add("hidden");
        document.getElementById("videoPortal").classList.remove("hidden");

        const playlistContainer = document.getElementById("videoPlaylist");
        const courseTitle = document.getElementById("courseTitle");
        const videoPlayer = document.getElementById("videoPlayer");
        const currentVideoTitle = document.getElementById("currentVideoTitle");
        const currentVideoDesc = document.getElementById("currentVideoDesc");

        courseTitle.textContent = `${courseName} Course Videos`;
        playlistContainer.innerHTML = ""; // Clear old videos

        const videos = courseVideos[courseName];

        videos.forEach((video, index) => {
            const div = document.createElement("div");
            div.className = "bg-white bg-opacity-20 p-3 rounded-lg cursor-pointer hover:bg-opacity-30 transition";
            div.innerHTML = `
                <h4 class="text-white font-semibold">${video.title}</h4>
                <p class="text-gray-300 text-sm">${video.description}</p>
            `;
            div.addEventListener("click", () => {
                videoPlayer.innerHTML = `
                    <iframe width="100%" height="400" src="${video.url}" 
                    frameborder="0" allowfullscreen class="rounded-lg"></iframe>`;
                currentVideoTitle.textContent = video.title;
                currentVideoDesc.textContent = video.description;
            });
            playlistContainer.appendChild(div);
        });
    }

    // Show section function (back button)
    function showSection(sectionId) {
        document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
        document.getElementById(sectionId).classList.remove("hidden");
    }







   // ✅ Initialize EmailJS with your public key
  (function() {
    emailjs.init("_uA9wob3Dz-JcRu5U");
  })();

  // ✅ Show popup form
  function showVisaForm(type) {
    document.getElementById("visaFormPopup").classList.remove("hidden");
    document.getElementById("visaType").value = type.charAt(0).toUpperCase() + type.slice(1) + " Visa";
  }

  // ✅ Close popup
  function closeVisaForm() {
    document.getElementById("visaFormPopup").classList.add("hidden");
    document.getElementById("visaApplicationForm").reset();
  }

  // ✅ Handle form submission
  document.getElementById("visaApplicationForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = {
      visaType: document.getElementById("visaType").value,
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      country: document.getElementById("country").value,
      message: document.getElementById("message").value
    };

    emailjs.send("service_davcyh9", "template_qd11ky8", formData)
      .then(() => {
        alert("✅ Your visa application has been submitted successfully!");
        closeVisaForm();
      })
      .catch((error) => {
        console.error("❌ EmailJS Error:", error);
        alert("Something went wrong while submitting. Please try again later.");
      });
  });