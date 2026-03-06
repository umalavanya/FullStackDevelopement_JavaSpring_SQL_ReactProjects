// ===== INTERACTIVE DEVELOPER ROADMAP - JAVASCRIPT =====
// Phase 2: DOM Manipulation, State Management, and LocalStorage

// Wait for the DOM to be fully loaded before running any code
document.addEventListener('DOMContentLoaded', function() {
    // ===== 1. INITIALIZE OUR APP =====
    console.log('🚀 Roadmap initialized! Ready to track your learning journey.');
    
    // Select all skill items on the page
    const skillItems = document.querySelectorAll('.skill-item');
    
    // ===== 2. STATE MANAGEMENT =====
    // This array will store the IDs of completed skills
    // We'll load this from localStorage when the page starts
    let completedSkills = [];
    
    // ===== 3. LOCALSTORAGE FUNCTIONS =====
    
    /**
     * Load completed skills from localStorage
     * Returns an array of skill IDs that were previously completed
     */
    function loadProgressFromStorage() {
        const savedProgress = localStorage.getItem('roadmapCompletedSkills');
        
        if (savedProgress) {
            try {
                // Parse the saved JSON string back into an array
                completedSkills = JSON.parse(savedProgress);
                console.log('📂 Loaded progress:', completedSkills);
            } catch (error) {
                console.error('Error loading progress:', error);
                completedSkills = [];
            }
        } else {
            // No saved progress yet
            console.log('📭 No previous progress found. Starting fresh!');
            completedSkills = [];
        }
        
        return completedSkills;
    }
    
    /**
     * Save completed skills to localStorage
     * @param {Array} skillsArray - Array of skill IDs to save
     */
    function saveProgressToStorage(skillsArray) {
        try {
            // Convert array to JSON string and save
            localStorage.setItem('roadmapCompletedSkills', JSON.stringify(skillsArray));
            console.log('💾 Saved progress:', skillsArray);
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }
    
    /**
     * Update the progress counter in the header
     * Counts completed skills and displays total
     */
    function updateProgressCounter() {
        const progressSpan = document.querySelector('.progress-count');
        if (progressSpan) {
            const totalSkills = document.querySelectorAll('.skill-item').length;
            const completedCount = document.querySelectorAll('.skill-item.completed').length;
            progressSpan.textContent = `${completedCount}/${totalSkills} skills completed`;
            
            // Optional: Add a percentage
            const percentage = Math.round((completedCount / totalSkills) * 100);
            progressSpan.setAttribute('data-percentage', `${percentage}%`);
        }
    }
    
    // ===== 4. DOM MANIPULATION FUNCTIONS =====
    
    /**
     * Apply the completed class to skills based on loaded data
     * @param {Array} skillsArray - Array of skill IDs to mark as completed
     */
    function applyCompletedState(skillsArray) {
        skillsArray.forEach(skillId => {
            // Find the skill item with matching data-skill-id
            const skillElement = document.querySelector(`[data-skill-id="${skillId}"]`);
            if (skillElement) {
                skillElement.classList.add('completed');
                console.log(`✅ Restored completed state for: ${skillId}`);
            } else {
                console.warn(`⚠️ Skill not found: ${skillId}`);
            }
        });
        
        // Update the counter after applying states
        updateProgressCounter();
    }
    
    /**
     * Toggle a skill's completed state
     * @param {HTMLElement} skillElement - The skill item that was clicked
     */
    function toggleSkillComplete(skillElement) {
        // Get the skill's unique ID from data attribute
        const skillId = skillElement.dataset.skillId;
        
        // Toggle the 'completed' class
        skillElement.classList.toggle('completed');
        
        // Check if the skill now has the completed class
        if (skillElement.classList.contains('completed')) {
            // Add to completed skills array if not already there
            if (!completedSkills.includes(skillId)) {
                completedSkills.push(skillId);
                console.log(`➕ Added: ${skillId}`);
                
                // Optional: Show a fun notification
                showTemporaryNotification(`🎉 Great job! You've mastered a new skill!`);
            }
        } else {
            // Remove from completed skills array
            completedSkills = completedSkills.filter(id => id !== skillId);
            console.log(`➖ Removed: ${skillId}`);
        }
        
        // Save the updated array to localStorage
        saveProgressToStorage(completedSkills);
        
        // Update the progress counter
        updateProgressCounter();
        
        // Optional: Play a subtle animation
        animateSkillClick(skillElement);
    }
    
    // ===== 5. UI ENHANCEMENTS =====
    
    /**
     * Show a temporary notification message
     * @param {string} message - Message to display
     */
    function showTemporaryNotification(message) {
        // Check if notification already exists, remove it
        const existingNotification = document.querySelector('.skill-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'skill-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color, #4f46e5);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
            font-weight: 500;
        `;
        
        // Add animation styles if they don't exist
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    /**
     * Animate skill click for visual feedback
     * @param {HTMLElement} element - The clicked skill element
     */
    function animateSkillClick(element) {
        element.style.transform = 'scale(0.98)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }
    
    /**
     * Filter skills based on search input
     * @param {string} searchTerm - The search text
     */
    function filterSkills(searchTerm) {
        const allSkills = document.querySelectorAll('.skill-item');
        const searchLower = searchTerm.toLowerCase();
        let visibleCount = 0;
        
        allSkills.forEach(skill => {
            const skillName = skill.querySelector('.skill-name').textContent.toLowerCase();
            const skillDesc = skill.querySelector('.skill-description').textContent.toLowerCase();
            
            if (skillName.includes(searchLower) || skillDesc.includes(searchLower)) {
                skill.style.display = 'block';
                visibleCount++;
                
                // Highlight matching text (optional)
                if (searchTerm.length > 0) {
                    skill.style.borderColor = 'var(--primary-light)';
                    skill.style.boxShadow = 'var(--shadow-glow)';
                }
            } else {
                skill.style.display = 'none';
            }
        });
        
        // Show search results count
        console.log(`🔍 Search found ${visibleCount} skills`);
    }
    
    /**
     * Reset all filters and show all skills
     */
    function resetFilters() {
        const allSkills = document.querySelectorAll('.skill-item');
        allSkills.forEach(skill => {
            skill.style.display = 'block';
            skill.style.borderColor = '';
            skill.style.boxShadow = '';
        });
    }
    
    // ===== 6. EVENT LISTENERS =====
    
    /**
     * Attach click event listeners to all skill items
     * @param {NodeList} skills - All skill elements
     */
    function attachClickHandlers(skills) {
        skills.forEach(skill => {
            // Remove any existing listeners to prevent duplicates
            skill.removeEventListener('click', handleSkillClick);
            // Add new listener
            skill.addEventListener('click', handleSkillClick);
        });
        console.log(`👂 Attached click handlers to ${skills.length} skills`);
    }
    
    /**
     * Event handler for skill clicks
     * @param {Event} event - The click event
     */
    function handleSkillClick(event) {
        // Prevent event from bubbling up (optional, but good practice)
        event.stopPropagation();
        
        // The element that was clicked (the skill item)
        const skillElement = event.currentTarget;
        
        // Toggle its completed state
        toggleSkillComplete(skillElement);
    }
    
    // ===== 7. SEARCH FUNCTIONALITY =====
    
    /**
     * Create and add a search bar to the page
     */
    function addSearchBar() {
        // Create search container
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.cssText = `
            max-width: 400px;
            margin: 20px auto;
            position: relative;
        `;
        
        // Create search input
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = '🔍 Search skills...';
        searchInput.style.cssText = `
            width: 100%;
            padding: 12px 20px;
            background: var(--card-bg, #1e293b);
            border: 2px solid var(--border-color, #334155);
            border-radius: 50px;
            color: var(--text-primary, #f8fafc);
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
        `;
        
        // Add focus styles
        searchInput.addEventListener('focus', () => {
            searchInput.style.borderColor = 'var(--primary-color, #4f46e5)';
            searchInput.style.boxShadow = 'var(--shadow-glow)';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.style.borderColor = 'var(--border-color, #334155)';
            searchInput.style.boxShadow = 'none';
        });
        
        // Add search functionality
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim();
            if (searchTerm.length > 0) {
                filterSkills(searchTerm);
            } else {
                resetFilters();
            }
        });
        
        // Add clear button
        const clearButton = document.createElement('button');
        clearButton.textContent = '✕';
        clearButton.style.cssText = `
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--text-secondary, #cbd5e1);
            font-size: 18px;
            cursor: pointer;
            display: none;
            padding: 5px 10px;
        `;
        
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            resetFilters();
            clearButton.style.display = 'none';
            searchInput.focus();
        });
        
        searchInput.addEventListener('input', () => {
            clearButton.style.display = searchInput.value.length > 0 ? 'block' : 'none';
        });
        
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(clearButton);
        
        // Insert search bar after header
        const header = document.querySelector('header');
        header.parentNode.insertBefore(searchContainer, header.nextSibling);
    }
    
    /**
     * Add reset progress button
     */
    function addResetButton() {
        const progressIndicator = document.querySelector('.progress-indicator');
        
        if (progressIndicator) {
            const resetButton = document.createElement('button');
            resetButton.textContent = '🔄 Reset All Progress';
            resetButton.style.cssText = `
                background: none;
                border: 1px solid var(--border-color);
                color: var(--text-secondary);
                padding: 4px 12px;
                border-radius: 50px;
                margin-left: 12px;
                cursor: pointer;
                font-size: 0.85rem;
                transition: all 0.3s ease;
            `;
            
            resetButton.addEventListener('mouseenter', () => {
                resetButton.style.background = 'var(--primary-color)';
                resetButton.style.borderColor = 'var(--primary-light)';
                resetButton.style.color = 'white';
            });
            
            resetButton.addEventListener('mouseleave', () => {
                resetButton.style.background = 'none';
                resetButton.style.borderColor = 'var(--border-color)';
                resetButton.style.color = 'var(--text-secondary)';
            });
            
            resetButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to reset all your progress?')) {
                    // Clear all completed classes
                    document.querySelectorAll('.skill-item.completed').forEach(skill => {
                        skill.classList.remove('completed');
                    });
                    
                    // Clear the array and localStorage
                    completedSkills = [];
                    saveProgressToStorage(completedSkills);
                    updateProgressCounter();
                    
                    // Show notification
                    showTemporaryNotification('🔄 Progress reset successfully!');
                }
            });
            
            progressIndicator.appendChild(resetButton);
        }
    }
    
    // ===== 8. KEYBOARD ACCESSIBILITY =====
    
    /**
     * Add keyboard support for skill items
     */
    function addKeyboardSupport() {
        document.querySelectorAll('.skill-item').forEach(skill => {
            skill.setAttribute('tabindex', '0');
            skill.setAttribute('role', 'checkbox');
            skill.setAttribute('aria-checked', 'false');
            
            skill.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    skill.click();
                }
            });
        });
    }
    
    /**
     * Update ARIA attributes based on completion state
     */
    function updateAriaAttributes() {
        document.querySelectorAll('.skill-item').forEach(skill => {
            const isCompleted = skill.classList.contains('completed');
            skill.setAttribute('aria-checked', isCompleted);
        });
    }
    
    // ===== 9. INITIALIZATION =====
    
    /**
     * Initialize the entire application
     */
    function init() {
        console.log('⚡ Initializing Interactive Roadmap...');
        
        // Load saved progress from localStorage
        loadProgressFromStorage();
        
        // Apply completed class to skills from saved data
        applyCompletedState(completedSkills);
        
        // Attach click handlers to all skill items
        attachClickHandlers(skillItems);
        
        // Add extra features
        addSearchBar();
        addResetButton();
        addKeyboardSupport();
        
        // Update ARIA attributes initially
        updateAriaAttributes();
        
        // Add CSS class for JavaScript detection
        document.body.classList.add('js-enabled');
        
        // Final log
        console.log('✅ Roadmap ready! Click on any skill to track your progress.');
        console.log(`📊 Total skills: ${skillItems.length}`);
    }
    
    // Start the application
    init();
});

// ===== 10. EXTRA FEATURE: EXPORT/IMPORT PROGRESS =====

/**
 * Advanced feature: Export progress as JSON file
 */
function exportProgress() {
    const progress = localStorage.getItem('roadmapCompletedSkills');
    if (!progress) {
        alert('No progress to export!');
        return;
    }
    
    const dataStr = JSON.stringify(JSON.parse(progress), null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `roadmap-progress-${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

/**
 * Advanced feature: Import progress from JSON file
 * @param {File} file - The JSON file to import
 */
function importProgress(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedProgress = JSON.parse(e.target.result);
            if (Array.isArray(importedProgress)) {
                localStorage.setItem('roadmapCompletedSkills', JSON.stringify(importedProgress));
                alert('Progress imported successfully! Reloading page...');
                location.reload();
            } else {
                alert('Invalid file format!');
            }
        } catch (error) {
            alert('Error importing file: ' + error.message);
        }
    };
    reader.readAsText(file);
}

// Make export/import functions available globally (optional)
window.exportProgress = exportProgress;
window.importProgress = importProgress;