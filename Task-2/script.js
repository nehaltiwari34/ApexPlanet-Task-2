   // Navigation functionality
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('section');
        
        // Set active navigation link based on scroll position
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
        
        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active class
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Email validation function
        function isValidEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }
        
        // Real-time email validation
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailSuccess = document.getElementById('emailSuccess');
        const emailValidIcon = document.getElementById('emailValidIcon');
        const emailInvalidIcon = document.getElementById('emailInvalidIcon');
        
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            
            if (email === '') {
                // Clear validation if empty
                emailError.style.display = 'none';
                emailSuccess.style.display = 'none';
                emailValidIcon.style.display = 'none';
                emailInvalidIcon.style.display = 'none';
                this.style.borderColor = '#ddd';
            } else if (isValidEmail(email)) {
                // Valid email
                emailError.style.display = 'none';
                emailSuccess.style.display = 'block';
                emailValidIcon.style.display = 'block';
                emailInvalidIcon.style.display = 'none';
                this.style.borderColor = '#2ecc71';
            } else {
                // Invalid email
                emailError.style.display = 'block';
                emailSuccess.style.display = 'none';
                emailValidIcon.style.display = 'none';
                emailInvalidIcon.style.display = 'block';
                this.style.borderColor = '#e74c3c';
            }
        });
        
        // Form Validation
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            
            // Name validation
            if (name === '') {
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('nameError').style.display = 'none';
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                document.getElementById('emailError').style.display = 'block';
                document.getElementById('emailSuccess').style.display = 'none';
                emailValidIcon.style.display = 'none';
                emailInvalidIcon.style.display = 'block';
                emailInput.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                document.getElementById('emailError').style.display = 'none';
            }
            
            if (isValid) {
                alert('Form submitted successfully!');
                this.reset();
                // Reset validation states
                emailValidIcon.style.display = 'none';
                emailInvalidIcon.style.display = 'none';
                emailInput.style.borderColor = '#ddd';
            }
        });

        // To-Do List Functionality
        const todoInput = document.getElementById('todoInput');
        const addTodoBtn = document.getElementById('addTodoBtn');
        const todoList = document.getElementById('todoList');
        
        addTodoBtn.addEventListener('click', addTodoItem);
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodoItem();
            }
        });
        
        function addTodoItem() {
            const taskText = todoInput.value.trim();
            if (taskText === '') return;
            
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <input type="checkbox" class="todo-check">
                <span class="todo-text">${taskText}</span>
                <div class="todo-actions">
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            todoList.appendChild(li);
            todoInput.value = '';
            
            // Add event listeners for the new item
            const deleteBtn = li.querySelector('.delete-btn');
            const checkBox = li.querySelector('.todo-check');
            const todoText = li.querySelector('.todo-text');
            
            deleteBtn.addEventListener('click', function() {
                li.remove();
            });
            
            checkBox.addEventListener('change', function() {
                todoText.classList.toggle('completed', this.checked);
            });
        }
        
        // Image Gallery Functionality
        const imageGallery = document.getElementById('imageGallery');
        const uploadBtn = document.getElementById('uploadBtn');
        const imageUpload = document.getElementById('imageUpload');
        
        // Preload some sample images
        const sampleImages = [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
            'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5'
        ];
        
        sampleImages.forEach(src => {
            addImageToGallery(src);
        });
        
        uploadBtn.addEventListener('click', function() {
            imageUpload.click();
        });
        
        imageUpload.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    addImageToGallery(e.target.result);
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
        
        function addImageToGallery(src) {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `
                <img src="${src}" alt="Gallery image">
                <button class="delete-image"><i class="fas fa-times"></i></button>
            `;
            
            imageGallery.appendChild(div);
            
            // Add event listener for delete button
            const deleteBtn = div.querySelector('.delete-image');
            deleteBtn.addEventListener('click', function() {
                div.remove();
            });
        }