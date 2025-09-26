
        let currentUser = null;
        let isAdminLoggedIn = false;
        let currentJobTitle = '';
        let backgroundImages = [];
        let currentSlide = 0;
        let slideshowInterval = null;
        let courseVideos = {
            'IELTS': [
                { title: 'Introduction to IELTS', description: 'Overview of the IELTS exam structure and format', duration: '15:30' },
                { title: 'Speaking Module Basics', description: 'Understanding the speaking test format', duration: '22:45' },
                { title: 'Writing Task 1 Strategies', description: 'How to approach academic writing task 1', duration: '28:15' }
            ],
            'TOEFL': [
                { title: 'TOEFL Overview', description: 'Complete guide to TOEFL iBT format', duration: '18:20' },
                { title: 'Reading Comprehension', description: 'Strategies for TOEFL reading section', duration: '25:10' },
                { title: 'Listening Skills', description: 'Mastering TOEFL listening tasks', duration: '30:45' }
            ],
            'GRE': [
                { title: 'GRE Introduction', description: 'Understanding GRE structure and scoring', duration: '20:15' },
                { title: 'Verbal Reasoning', description: 'Techniques for verbal reasoning questions', duration: '35:30' },
                { title: 'Quantitative Reasoning', description: 'Math concepts and problem-solving', duration: '40:20' }
            ]
        };

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
        function applyForJob(jobTitle) {
            currentJobTitle = jobTitle;
            document.getElementById('jobApplicationModal').classList.remove('hidden');
            document.getElementById('jobApplicationModal').classList.add('flex');
        }

        function submitJobApplication(event) {
            event.preventDefault();
            const name = document.getElementById('applicantName').value;
            const email = document.getElementById('applicantEmail').value;
            
            alert(`Thank you ${name}! Your application for ${currentJobTitle} has been submitted successfully. We'll contact you at ${email} soon.`);
            closeModal('jobApplicationModal');
            
            // Reset form
            event.target.reset();
        }

        function showJobForm() {
            alert('Job posting feature coming soon! Contact us at 8122060821 to post your job.');
        }

        // Visa Functions
        function showVisaForm(type) {
            alert(`${type.charAt(0).toUpperCase() + type.slice(1)} visa application form will open soon. Contact us at 8122060821 for immediate assistance.`);
        }

        // Mock Test Functions
        function startMockTest(testType) {
            alert(`Starting ${testType} mock test... Good luck!`);
            
            // Simulate test completion after 3 seconds
            setTimeout(() => {
                showTestResults(testType);
            }, 3000);
        }

        function showTestResults(testType) {
            const results = {
                'IELTS': { overall: 7.5, reading: 8.0, writing: 7.0, listening: 7.5, speaking: 7.5 },
                'TOEFL': { total: 95, reading: 24, writing: 23, listening: 24, speaking: 24 },
                'GRE': { total: 320, verbal: 160, quantitative: 160, writing: 4.5 }
            };
            
            const result = results[testType];
            let resultHTML = `<h4 class="text-xl font-semibold mb-4">${testType} Mock Test Results</h4>`;
            
            for (const [key, value] of Object.entries(result)) {
                resultHTML += `<div class="flex justify-between py-2 border-b">
                    <span class="capitalize">${key}:</span>
                    <span class="font-semibold">${value}</span>
                </div>`;
            }
            
            document.getElementById('resultsContent').innerHTML = resultHTML;
            document.getElementById('testResults').classList.remove('hidden');
        }

        // Admin Functions
        function adminLogin(event) {
            // No login required - direct access to admin panel
            alert('Welcome to Admin Panel! You have full administrative access.');
        }

        function showBackgroundUpload() {
            const form = document.getElementById('backgroundUploadForm');
            form.classList.toggle('hidden');
        }

        function uploadBackground(event) {
            event.preventDefault();
            const file = document.getElementById('backgroundFile').files[0];
            const name = document.getElementById('backgroundName').value;
            
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    backgroundImages.push({
                        name: name,
                        url: e.target.result
                    });
                    updateBackgroundSlider();
                    updateBackgroundList();
                    alert(`Background "${name}" uploaded successfully!`);
                    event.target.reset();
                    document.getElementById('backgroundUploadForm').classList.add('hidden');
                };
                reader.readAsDataURL(file);
            }
        }

        function updateBackgroundList() {
            const list = document.getElementById('backgroundList');
            list.innerHTML = backgroundImages.map((bg, index) => `
                <div class="border rounded-lg p-4">
                    <div class="w-full h-32 rounded mb-2" style="background-image: ${bg.url.startsWith('linear-gradient') ? bg.url : `url(${bg.url})`}; background-size: cover; background-position: center;"></div>
                    <h4 class="font-semibold">${bg.name}</h4>
                    <div class="mt-2">
                        <button onclick="removeBackground(${index})" class="text-red-600 hover:underline">Remove</button>
                    </div>
                </div>
            `).join('');
        }

        function removeBackground(index) {
            backgroundImages.splice(index, 1);
            updateBackgroundSlider();
            updateBackgroundList();
            alert('Background removed successfully!');
        }

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