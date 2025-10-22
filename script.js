
        let currentUser = null;
        let isAdminLoggedIn = false;
        let currentJobTitle = '';
        // let backgroundImages = [];
        let currentSlide = 0;
        let slideshowInterval = null;
        // let courseVideos = {
        //     'IELTS': [
        //         { title: 'Introduction to IELTS', description: 'Overview of the IELTS exam structure and format', duration: '15:30' },
        //         { title: 'Speaking Module Basics', description: 'Understanding the speaking test format', duration: '22:45' },
        //         { title: 'Writing Task 1 Strategies', description: 'How to approach academic writing task 1', duration: '28:15' }
        //     ],
        //     'TOEFL': [
        //         { title: 'TOEFL Overview', description: 'Complete guide to TOEFL iBT format', duration: '18:20' },
        //         { title: 'Reading Comprehension', description: 'Strategies for TOEFL reading section', duration: '25:10' },
        //         { title: 'Listening Skills', description: 'Mastering TOEFL listening tasks', duration: '30:45' }
        //     ],
        //     'GRE': [
        //         { title: 'GRE Introduction', description: 'Understanding GRE structure and scoring', duration: '20:15' },
        //         { title: 'Verbal Reasoning', description: 'Techniques for verbal reasoning questions', duration: '35:30' },
        //         { title: 'Quantitative Reasoning', description: 'Math concepts and problem-solving', duration: '40:20' }
        //     ]
        // };

        // Authentication Functions
        function checkAuthAndShow(sectionId) {
            if (sectionId === 'admin') {
                showAdminLogin();
                return;
            }
            showSection(sectionId);
            // Show welcome message for first-time users
            if (sectionId !== 'home' && sectionId !== 'login') {
                setTimeout(() => {
                    showNotification('Welcome to Vistara Learn! Explore our professional learning platform.', 'success');
                }, 500);
            }
        }

        function showAdminLogin() {
            const password = prompt('Enter Admin Password:');
            if (password === 'sar123@123') {
                isAdminLoggedIn = true;
                showSection('admin');
                showNotification('Admin access granted successfully!', 'success');
            } else if (password !== null) {
                showNotification('Invalid admin password. Access denied.', 'error');
            }
        }

        function showAuthOverlay() {
            // No longer needed - keeping for compatibility
        }

        function hideAuthOverlay() {
            // No longer needed - keeping for compatibility
        }

        // Background Slider Functions
        function initBackgroundSlider() {
            backgroundImages = [
                { name: 'Default Gradient', url: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
            ];
            updateBackgroundSlider();
        }

        function updateBackgroundSlider() {
            const slider = document.getElementById('bgSlider');
            slider.innerHTML = '';
            
            backgroundImages.forEach((bg, index) => {
                const slide = document.createElement('div');
                slide.className = `bg-slide ${index === 0 ? 'active' : ''}`;
                if (bg.url.startsWith('linear-gradient')) {
                    slide.style.backgroundImage = bg.url;
                } else {
                    slide.style.backgroundImage = `url(${bg.url})`;
                }
                slider.appendChild(slide);
            });
        }

        function nextSlide() {
            const slides = document.querySelectorAll('.bg-slide');
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        function toggleSlideshow() {
            const btn = document.getElementById('slideshowBtn');
            if (slideshowInterval) {
                clearInterval(slideshowInterval);
                slideshowInterval = null;
                btn.textContent = 'Start Slideshow';
                btn.classList.remove('bg-red-600', 'hover:bg-red-700');
                btn.classList.add('bg-green-600', 'hover:bg-green-700');
            } else {
                slideshowInterval = setInterval(nextSlide, 5000);
                btn.textContent = 'Stop Slideshow';
                btn.classList.remove('bg-green-600', 'hover:bg-green-700');
                btn.classList.add('bg-red-600', 'hover:bg-red-700');
            }
        }

        // Navigation
        function showSection(sectionId) {
            document.querySelectorAll('.section').forEach(section => {
                section.classList.add('hidden');
            });
            document.getElementById(sectionId).classList.remove('hidden');
            
            // Update nav buttons
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('text-blue-600', 'font-bold');
                btn.classList.add('text-gray-700');
            });
        }

        // Video Portal Functions
        function openVideoPortal(courseName) {
            showSection('videoPortal');
            document.getElementById('courseTitle').textContent = `${courseName} Course Videos`;
            loadCourseVideos(courseName);
        }

        function loadCourseVideos(courseName) {
            const playlist = document.getElementById('videoPlaylist');
            const videos = courseVideos[courseName] || [];
            
            playlist.innerHTML = videos.map((video, index) => `
                <div class="bg-white bg-opacity-20 p-4 rounded-lg cursor-pointer hover:bg-opacity-30 transition" onclick="playVideo('${video.title}', '${video.description}', '${video.duration}')">
                    <div class="flex items-center space-x-3">
                        <div class="bg-white bg-opacity-30 rounded-full p-2">
                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                            </svg>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-white font-medium">${video.title}</h4>
                            <p class="text-gray-300 text-sm">${video.duration}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function playVideo(title, description, duration) {
            document.getElementById('currentVideoTitle').textContent = title;
            document.getElementById('currentVideoDesc').textContent = description;
            
            const player = document.getElementById('videoPlayer');
            player.innerHTML = `
                <div class="text-center text-white">
                    <svg class="w-20 h-20 mx-auto mb-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                    </svg>
                    <p class="text-lg">Now Playing: ${title}</p>
                    <p class="text-sm text-gray-300">Duration: ${duration}</p>
                </div>
            `;
        }

        // Job Functions 
        let jobs = [
            {
                id: 1,
                title: "Senior Software Engineer",
                company: "TechCorp Solutions",
                location: "Mumbai",
                type: "Full-time",
                industry: "Technology",
                description: "We're looking for an experienced software engineer to join our growing team. You'll work on cutting-edge projects using modern technologies.",
                skills: ["JavaScript", "React", "Node.js"],
                postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                id: 2,
                title: "Marketing Manager",
                company: "Global Marketing Inc",
                location: "Remote",
                type: "Full-time",
                industry: "Marketing",
                description: "Lead our marketing initiatives and drive brand awareness across multiple channels. Perfect for creative professionals with strategic thinking.",
                skills: ["Digital Marketing", "SEO", "Analytics"],
                postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
        ];

        let currentJobId = null;
        let isAdmin = false;

        // Admin toggle
        document.getElementById('adminToggle').addEventListener('change', function(e) {
            isAdmin = e.target.checked;
            document.getElementById('postJobBtn').classList.toggle('hidden', !isAdmin);
            if (isAdmin) {
                alert('Admin mode enabled! You can now post jobs.');
            }
        });

        // Format date
        function formatDate(date) {
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 0) return 'Posted today';
            if (diffDays === 1) return 'Posted 1 day ago';
            if (diffDays < 7) return `Posted ${diffDays} days ago`;
            if (diffDays < 30) return `Posted ${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
            return `Posted ${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
        }

        // Get skill color
        function getSkillColor(industry) {
            const colors = {
                'Technology': 'blue',
                'Marketing': 'green',
                'Finance': 'purple',
                'Healthcare': 'red',
                'Education': 'yellow'
            };
            return colors[industry] || 'gray';
        }

        // Display jobs
        function displayJobs(jobsToDisplay) {
            const container = document.getElementById('jobListings');
            const noJobsMsg = document.getElementById('noJobsMessage');
            
            if (jobsToDisplay.length === 0) {
                container.innerHTML = '';
                noJobsMsg.classList.remove('hidden');
                return;
            }
            
            noJobsMsg.classList.add('hidden');
            const color = getSkillColor(jobsToDisplay[0].industry);
            
            container.innerHTML = jobsToDisplay.map(job => `
                <div class="bg-white bg-opacity-90 p-6 rounded-lg shadow-md card-hover">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="text-xl font-semibold text-gray-800">${job.title}</h3>
                            <p class="text-gray-600">${job.company} • ${job.location} • ${job.type}</p>
                            <p class="text-sm text-gray-500 mt-1">${formatDate(job.postedDate)}</p>
                        </div>
                        <button onclick="applyForJob(${job.id})" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Apply Now
                        </button>
                    </div>
                    <p class="text-gray-700 mb-4">${job.description}</p>
                    <div class="flex flex-wrap gap-2">
                        ${job.skills.map(skill => {
                            const skillColor = getSkillColor(job.industry);
                            return `<span class="bg-${skillColor}-100 text-${skillColor}-800 px-3 py-1 rounded-full text-sm">${skill}</span>`;
                        }).join('')}
                    </div>
                </div>
            `).join('');
        }

        // Search jobs
        function searchJobs() {
            const keyword = document.getElementById('searchKeyword').value.toLowerCase();
            const location = document.getElementById('searchLocation').value;
            const industry = document.getElementById('searchIndustry').value;
            
            const filtered = jobs.filter(job => {
                const matchKeyword = !keyword || 
                    job.title.toLowerCase().includes(keyword) || 
                    job.description.toLowerCase().includes(keyword) ||
                    job.skills.some(skill => skill.toLowerCase().includes(keyword));
                
                const matchLocation = !location || job.location === location;
                const matchIndustry = !industry || job.industry === industry;
                
                return matchKeyword && matchLocation && matchIndustry;
            });
            
            displayJobs(filtered);
        }

        // Show job form
        function showJobForm() {
            if (!isAdmin) {
                alert('Please enable Admin mode to post jobs.');
                return;
            }
            document.getElementById('jobFormModal').classList.add('active');
        }

        // Close job form
        function closeJobForm() {
            document.getElementById('jobFormModal').classList.remove('active');
            document.getElementById('jobPostForm').reset();
        }

        // Submit job
        function submitJob(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            const newJob = {
                id: jobs.length + 1,
                title: formData.get('title'),
                company: formData.get('company'),
                location: formData.get('location'),
                type: formData.get('type'),
                industry: formData.get('industry'),
                description: formData.get('description'),
                skills: formData.get('skills').split(',').map(s => s.trim()),
                postedDate: new Date()
            };
            
            jobs.unshift(newJob);
            displayJobs(jobs);
            closeJobForm();
            alert('Job posted successfully!');
        }

      // Initialize EmailJS with your public key
  emailjs.init("_uA9wob3Dz-JcRu5U");

//   let currentJobId = null; // Store current job id

  // Open application modal
  function applyForJob(jobId) {
      currentJobId = jobId;
      const job = jobs.find(j => j.id === jobId);
      document.getElementById('applyJobTitle').textContent = job.title;
      document.getElementById('applicationModal').classList.add('active');
  }

  // Close application modal
  function closeApplicationForm() {
      document.getElementById('applicationModal').classList.remove('active');
      document.getElementById('applicationForm').reset();
  }

  // Submit application and send via EmailJS
  function submitApplication(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      
      const application = {
          jobTitle: document.getElementById('applyJobTitle').textContent,
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          currentPosition: formData.get('currentPosition'),
          experience: formData.get('experience'),
          linkedin: formData.get('linkedin'),
          coverLetter: formData.get('coverLetter'),
          submittedDate: new Date().toLocaleString()
      };

      // Send via EmailJS
      emailjs.send("service_davcyh9", "template_ut3ea0p", application)
        .then(() => {
            alert(`✅ Application submitted successfully!\n\nName: ${application.name}\nEmail: ${application.email}\nJob: ${application.jobTitle}`);
            closeApplicationForm();
        })
        .catch((error) => {
            console.error("❌ EmailJS Error:", error);
            alert("Something went wrong while submitting. Please try again later.");
        });
  }

        // Initial display
        displayJobs(jobs);

        // Visa Functions
        function showVisaForm(type) {
            alert(`${type.charAt(0).toUpperCase() + type.slice(1)} visa application form will open soon. Contact us at 8122060821 for immediate assistance.`);
        }

     const questions = {
   'IELTS': [ 
  { q: 'What does IELTS stand for?', options: ['International English Language Testing System', 'International Exam of English Learning Test', 'Intensive English Level Testing System', 'None of these'], answer: 0 },
  { q: 'IELTS is accepted in how many countries?', options: ['140+', '150+', '160+', '180+'], answer: 2 },
  { q: 'Which organization jointly manages IELTS?', options: ['British Council & IDP', 'Cambridge University & TOEFL', 'ETS & Pearson', 'None of these'], answer: 0 },
  { q: 'How many sections are there in the IELTS test?', options: ['3', '4', '5', '6'], answer: 1 },
  { q: 'Which of the following is NOT a section in IELTS?', options: ['Listening', 'Reading', 'Writing', 'Grammar'], answer: 3 },
  { q: 'What is the total test duration of IELTS?', options: ['1 hour', '2 hours', '2 hours 45 minutes', '3 hours'], answer: 2 },
  { q: 'Which version of IELTS is required for study abroad?', options: ['IELTS Academic', 'IELTS General Training', 'IELTS Business', 'IELTS Professional'], answer: 0 },
  { q: 'How long is the IELTS score valid?', options: ['1 year', '2 years', '3 years', '5 years'], answer: 1 },
  { q: 'What is the highest band score in IELTS?', options: ['8', '9', '10', '7'], answer: 1 },
  { q: 'Which skill is tested face-to-face with an examiner?', options: ['Reading', 'Writing', 'Speaking', 'Listening'], answer: 2 },
  { q: 'Can IELTS be taken on a computer?', options: ['Yes', 'No', 'Only for Academic', 'Only for General'], answer: 0 },
  { q: 'How many parts are there in the IELTS Speaking test?', options: ['2', '3', '4', '5'], answer: 1 },
  { q: 'What does the Listening test include?', options: ['Four recorded sections', 'Three recorded lectures', 'Two interviews', 'One conversation only'], answer: 0 },
  { q: 'Which section includes writing an essay?', options: ['Listening', 'Reading', 'Writing', 'Speaking'], answer: 2 },
  { q: 'What is the minimum IELTS band required by most universities?', options: ['4.5', '5.0', '6.0', '7.5'], answer: 2 },
],

  'TOEFL': [
  { q: 'What is the full form of TOEFL?', options: ['Test of English for Foreign Learners', 'Test of English as a Foreign Language', 'Testing English for Learning', 'None of these'], answer: 1 },
  { q: 'TOEFL is primarily used for?', options: ['Immigration', 'University Admission', 'Job Applications', 'Visa Renewal'], answer: 1 },
  { q: 'Which organization conducts the TOEFL test?', options: ['British Council', 'ETS (Educational Testing Service)', 'Cambridge Assessment', 'IDP'], answer: 1 },
  { q: 'How many sections are there in the TOEFL iBT test?', options: ['3', '4', '5', '6'], answer: 1 },
  { q: 'Which of the following is NOT a section in TOEFL?', options: ['Listening', 'Reading', 'Speaking', 'Grammar'], answer: 3 },
  { q: 'What is the total score range of TOEFL iBT?', options: ['0–90', '0–100', '0–120', '0–150'], answer: 2 },
  { q: 'How long is the TOEFL iBT test duration?', options: ['2 hours', '2 hours 30 minutes', '3 hours', '3 hours 30 minutes'], answer: 2 },
  { q: 'How long is a TOEFL score valid?', options: ['1 year', '2 years', '3 years', '5 years'], answer: 1 },
  { q: 'Which section of TOEFL tests your ability to understand academic texts?', options: ['Listening', 'Reading', 'Writing', 'Speaking'], answer: 1 },
  { q: 'How many tasks are there in the TOEFL Writing section?', options: ['1', '2', '3', '4'], answer: 1 },
  { q: 'In the Speaking section, how many tasks are there?', options: ['2', '4', '6', '8'], answer: 2 },
  { q: 'What is the highest score you can get in each TOEFL section?', options: ['25', '30', '35', '40'], answer: 1 },
  { q: 'TOEFL iBT is delivered in which format?', options: ['Paper-based only', 'Computer-based', 'Both paper and computer', 'Interview-based'], answer: 1 },
  { q: 'Which country’s universities mainly require TOEFL scores?', options: ['UK', 'USA', 'Australia', 'Canada'], answer: 1 },
  { q: 'What is the minimum TOEFL score required by most universities?', options: ['50', '60', '70–80', '100+'], answer: 2 },
],

 'GRE': [
  { q: 'GRE stands for?', options: ['Graduate Record Examination', 'General Reading Exam', 'Graduate Research Exam', 'None of these'], answer: 0 },
  { q: 'Which organization conducts GRE?', options: ['ETS', 'Cambridge', 'Pearson', 'British Council'], answer: 0 },
  { q: 'What is the main purpose of the GRE test?', options: ['Job Applications', 'Postgraduate Admissions', 'Immigration', 'High School Graduation'], answer: 1 },
  { q: 'How many main sections are there in the GRE General Test?', options: ['2', '3', '4', '5'], answer: 1 },
  { q: 'Which of the following is NOT a section of the GRE?', options: ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing', 'Speaking'], answer: 3 },
  { q: 'What is the total score range for the GRE General Test?', options: ['260–340', '0–120', '200–800', '100–300'], answer: 0 },
  { q: 'How long is the GRE General Test duration?', options: ['2 hours', '3 hours', '3 hours 45 minutes', '4 hours'], answer: 2 },
  { q: 'How many essays are included in the Analytical Writing section?', options: ['1', '2', '3', '4'], answer: 1 },
  { q: 'What is the score range for each of the Verbal and Quantitative sections?', options: ['130–170', '100–200', '150–200', '0–100'], answer: 0 },
  { q: 'How long is a GRE score valid?', options: ['1 year', '2 years', '5 years', '10 years'], answer: 2 },
  { q: 'Which of the following sections tests mathematical skills?', options: ['Analytical Writing', 'Quantitative Reasoning', 'Verbal Reasoning', 'None of these'], answer: 1 },
  { q: 'In which format can the GRE be taken?', options: ['Paper-based', 'Computer-based', 'Both paper and computer-based', 'Interview-based'], answer: 2 },
  { q: 'Who commonly takes the GRE test?', options: ['Undergraduate students', 'Postgraduate aspirants', 'High school students', 'Working professionals only'], answer: 1 },
  { q: 'What is the highest possible GRE score?', options: ['320', '330', '340', '350'], answer: 2 },
  { q: 'Which section appears first in the GRE General Test?', options: ['Verbal Reasoning', 'Analytical Writing', 'Quantitative Reasoning', 'Any random section'], answer: 1 },
],

  };

  let currentTest = '';
  let timerInterval;
  let timeLeft = 3600; // 1 hour in seconds

  function startMockTest(testType) {
    currentTest = testType;
    document.getElementById('testCards').classList.add('hidden');
    document.getElementById('testResults').classList.add('hidden');
    document.getElementById('testArea').classList.remove('hidden');
    document.getElementById('testTitle').innerText = `${testType} Mock Test`;

    const form = document.getElementById('quizForm');
    form.innerHTML = '';

    questions[testType].forEach((item, index) => {
      const qDiv = document.createElement('div');
      qDiv.innerHTML = `
        <p class="font-semibold mb-2">${index + 1}. ${item.q}</p>
        ${item.options.map((opt, i) => `
          <label class="block">
            <input type="radio" name="q${index}" value="${i}" class="mr-2">
            ${opt}
          </label>
        `).join('')}
      `;
      form.appendChild(qDiv);
    });

    // start timer
    startTimer();
  }

  function startTimer() {
    timeLeft = 3600;
    updateTimerDisplay();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert('Time is up!');
        submitTest();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').innerText = `${minutes}m ${seconds}s left`;
  }

  function submitTest() {
    clearInterval(timerInterval);
    const form = document.getElementById('quizForm');
    const inputs = form.querySelectorAll('input[type="radio"]:checked');
    const answers = questions[currentTest];
    let score = 0;

    inputs.forEach((input, index) => {
      const qIndex = parseInt(input.name.replace('q', ''));
      if (parseInt(input.value) === answers[qIndex].answer) {
        score++;
      }
    });

    const percentage = Math.round((score / answers.length) * 100);
    document.getElementById('resultsContent').innerHTML = `
      <h4 class="text-xl font-semibold mb-4">${currentTest} Test Score</h4>
      <p class="text-lg">You answered <strong>${score}</strong> out of <strong>${answers.length}</strong> correctly.</p>
      <p class="text-lg mt-2">Your Score: <strong>${percentage}%</strong></p>
    `;

    document.getElementById('testArea').classList.add('hidden');
    document.getElementById('testResults').classList.remove('hidden');
    document.getElementById('testCards').classList.remove('hidden');
  }
        // Admin Functions
        function adminLogin(event) {
            // No login required - direct access to admin panel
            alert('Welcome to Admin Panel! You have full administrative access.');
        }

        // function showBackgroundUpload() {
        //     const form = document.getElementById('backgroundUploadForm');
        //     form.classList.toggle('hidden');
        // }

        // function uploadBackground(event) {
        //     event.preventDefault();
        //     const file = document.getElementById('backgroundFile').files[0];
        //     const name = document.getElementById('backgroundName').value;
            
        //     if (file) {
        //         const reader = new FileReader();
        //         reader.onload = function(e) {
        //             backgroundImages.push({
        //                 name: name,
        //                 url: e.target.result
        //             });
        //             updateBackgroundSlider();
        //             updateBackgroundList();
        //             alert(`Background "${name}" uploaded successfully!`);
        //             event.target.reset();
        //             document.getElementById('backgroundUploadForm').classList.add('hidden');
        //         };
        //         reader.readAsDataURL(file);
        //     }
        // }

        // function updateBackgroundList() {
        //     const list = document.getElementById('backgroundList');
        //     list.innerHTML = backgroundImages.map((bg, index) => `
        //         <div class="border rounded-lg p-4">
        //             <div class="w-full h-32 rounded mb-2" style="background-image: ${bg.url.startsWith('linear-gradient') ? bg.url : `url(${bg.url})`}; background-size: cover; background-position: center;"></div>
        //             <h4 class="font-semibold">${bg.name}</h4>
        //             <div class="mt-2">
        //                 <button onclick="removeBackground(${index})" class="text-red-600 hover:underline">Remove</button>
        //             </div>
        //         </div>
        //     `).join('');
        // }

        // function removeBackground(index) {
        //     backgroundImages.splice(index, 1);
        //     updateBackgroundSlider();
        //     updateBackgroundList();
        //     alert('Background removed successfully!');
        // }


          // ---- Globals ----`````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````



  const heroEl = document.getElementById('hero');

  // Start with one default gradient background (matches your default card)
  let backgroundImages = [
    { name: 'Default Gradient', url: 'linear-gradient(90deg, #3b82f6, #7c3aed)' }
  ];
  let currentBackgroundIndex = 0; // index of the background currently applied

  // ---- UI helpers ----
  function showBackgroundUpload() {
    const form = document.getElementById('backgroundUploadForm');
    form.classList.toggle('hidden');
  }

  // Apply background (handles linear-gradient or image URLs)
  function setHeroBackgroundByUrl(url) {
    if (!heroEl) return;
    if (typeof url !== 'string') return;
    if (url.trim().startsWith('linear-gradient')) {
      heroEl.style.backgroundImage = url;
    } else {
      heroEl.style.backgroundImage = `url("${url}")`;
      heroEl.style.backgroundSize = 'cover';
      heroEl.style.backgroundPosition = 'center';
    }
  }

  // Apply background by index in backgroundImages
  function applyBackground(index) {
    if (index < 0 || index >= backgroundImages.length) return;
    currentBackgroundIndex = index;
    setHeroBackgroundByUrl(backgroundImages[index].url);
    updateBackgroundList(); // to update any UI state if needed
  }

  // ---- Upload handler ----
  function uploadBackground(event) {
    event.preventDefault();
    const fileInput = document.getElementById('backgroundFile');
    const nameInput = document.getElementById('backgroundName');
    const file = fileInput.files && fileInput.files[0];
    const name = (nameInput.value || '').trim() || 'Unnamed';

    if (!file) {
      alert('Please choose an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      // push to list
      backgroundImages.push({ name: name, url: dataUrl });
      const newIndex = backgroundImages.length - 1;

      // apply the newly uploaded image immediately
      applyBackground(newIndex);

      // refresh UI
      updateBackgroundList();

      // reset form and hide
      event.target.reset?.(); // form reset
      document.getElementById('backgroundUploadForm').classList.add('hidden');

      alert(`Background "${name}" uploaded and applied!`);
    };
    reader.readAsDataURL(file);
  }

  // ---- List rendering and remove ----
  function updateBackgroundList() {
    const list = document.getElementById('backgroundList');
    if (!list) return;

    list.innerHTML = backgroundImages.map((bg, index) => {
      // small inline style for preview
      const previewStyle = bg.url.startsWith('linear-gradient')
        ? `background-image: ${bg.url};`
        : `background-image: url("${bg.url}"); background-size: cover; background-position: center;`;

      // mark the currently applied background
      const appliedBadge = index === currentBackgroundIndex ? `<span class="text-xs text-green-400 ml-2">Applied</span>` : '';

      return `
        <div class="border rounded-lg p-4">
          <div class="w-full h-32 rounded mb-2" style="${previewStyle}"></div>
          <div class="flex items-center justify-between">
            <h4 class="font-semibold">${escapeHtml(bg.name)} ${appliedBadge}</h4>
            <div class="flex gap-2 items-center">
              <button onclick="applyBackground(${index})" class="text-sm px-2 py-1 bg-white bg-opacity-10 rounded hover:bg-opacity-20">Use</button>
              <button onclick="removeBackground(${index})" class="text-red-600 hover:underline">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function removeBackground(index) {
    // if out of range, ignore
    if (index < 0 || index >= backgroundImages.length) return;

    const removedWasCurrent = index === currentBackgroundIndex;
    backgroundImages.splice(index, 1);

    // adjust currentBackgroundIndex
    if (backgroundImages.length === 0) {
      // re-add default if list becomes empty (safety)
      backgroundImages = [{ name: 'Default Gradient', url: 'linear-gradient(90deg, #3b82f6, #7c3aed)' }];
      currentBackgroundIndex = 0;
    } else if (removedWasCurrent) {
      // if we removed the current one, apply index 0 (or the previous index)
      currentBackgroundIndex = Math.max(0, index - 1);
    } else if (index < currentBackgroundIndex) {
      // shifting indices -> decrement current index
      currentBackgroundIndex -= 1;
    }

    // apply the new current background
    applyBackground(currentBackgroundIndex);
    updateBackgroundList();
    alert('Background removed successfully!');
  }

  // small helper to avoid XSS in names inserted into HTML
  function escapeHtml(unsafe) {
    return unsafe
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  // ---- init ----
  // apply default background on load and render list
  document.addEventListener('DOMContentLoaded', () => {
    applyBackground(0);
    updateBackgroundList();
  });

  // Expose functions to global scope so inline onclicks work
  window.showBackgroundUpload = showBackgroundUpload;
  window.uploadBackground = uploadBackground;
  window.updateBackgroundList = updateBackgroundList;
  window.removeBackground = removeBackground;
  window.applyBackground = applyBackground;




//   0000000000000000000000000000000000000000000000000000000000009999999999999999999999999999999999999999999999999999999999999999999999999999999999999









        function showVideoUpload() {
            const form = document.getElementById('videoUploadForm');
            form.classList.toggle('hidden');
        }

        function uploadVideo(event) {
            event.preventDefault();
            const course = document.getElementById('courseSelect').value;
            const title = document.getElementById('videoTitle').value;
            const description = document.getElementById('videoDescription').value;
            
            // Add video to course
            if (!courseVideos[course]) {
                courseVideos[course] = [];
            }
            
            courseVideos[course].push({
                title: title,
                description: description,
                duration: '25:00' // Default duration
            });
            
            alert(`Video "${title}" for ${course} course uploaded successfully!`);
            event.target.reset();
            document.getElementById('videoUploadForm').classList.add('hidden');
        }

        // Login Functions
        function handleLogin(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simple validation (in real app, this would be server-side)
            if (email && password) {
                currentUser = { email: email, name: email.split('@')[0] };
                document.getElementById('authBtn').textContent = 'Logout';
                document.getElementById('authBtn').onclick = logout;
                hideAuthOverlay();
                alert(`Welcome back, ${currentUser.name}!`);
                showSection('home');
            }
        }

        function handleSignup(event) {
            event.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            
            if (name && email && password) {
                currentUser = { email: email, name: name };
                document.getElementById('authBtn').textContent = 'Logout';
                document.getElementById('authBtn').onclick = logout;
                hideAuthOverlay();
                alert(`Welcome to Vistara Learn, ${name}!`);
                showSection('home');
            }
        }

        function logout() {
            currentUser = null;
            isAdminLoggedIn = false;
            document.getElementById('authBtn').textContent = 'Login';
            document.getElementById('authBtn').onclick = () => showSection('login');
            alert('You have been logged out successfully.');
            showSection('home');
        }

        function showSignup() {
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('signupForm').classList.remove('hidden');
        }

        function showLogin() {
            document.getElementById('signupForm').classList.add('hidden');
            document.getElementById('loginForm').classList.remove('hidden');
        }

        // Modal Functions
        function closeModal(modalId) {
            document.getElementById(modalId).classList.add('hidden');
            document.getElementById(modalId).classList.remove('flex');
        }

        // Professional Notification System
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <div class="flex items-center">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-3"></i>
                    <span>${message}</span>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => notification.classList.add('show'), 100);
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => document.body.removeChild(notification), 300);
            }, 4000);
        }

        // Mobile Menu Toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
        }

        // Professional Loading States
        function showLoading(buttonId) {
            const button = document.getElementById(buttonId);
            const originalText = button.innerHTML;
            button.innerHTML = '<div class="loading-spinner inline-block mr-2"></div>Processing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            showSection('home');
            initBackgroundSlider();
            updateBackgroundList();
            
            // Add smooth scrolling
            document.documentElement.style.scrollBehavior = 'smooth';
            
            // Initialize tooltips and animations
            setTimeout(() => {
                document.querySelectorAll('.fade-in').forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            }, 100);
        });
    
(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9826cac372b2ffa7',t:'MTc1ODQyODY1Ny4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();