// Utility functions for the entire application

const Utils = {
    // Clear output
    clearOutput: function() {
        document.getElementById('output').innerHTML = '';
    },

    // Append to output
    appendOutput: function(content, type = 'normal') {
        const output = document.getElementById('output');
        const timestamp = new Date().toLocaleTimeString();
        
        if (type === 'error') {
            output.innerHTML += `<div class="error">[${timestamp}] ❌ ${content}</div>`;
        } else if (type === 'success') {
            output.innerHTML += `<div class="success">[${timestamp}] ✅ ${content}</div>`;
        } else {
            output.innerHTML += `<div>[${timestamp}] ${content}</div>`;
        }
    },

    // Format JSON for display
    formatJSON: function(obj) {
        return JSON.stringify(obj, null, 2);
    },

    // Create a divider in output
    addDivider: function(title = '') {
        const output = document.getElementById('output');
        output.innerHTML += `<hr><strong>${title}</strong><hr>`;
    },

    // Delay execution (for async demos)
    delay: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // Get user input (for demos)
    getUserInput: function(prompt) {
        return prompt;
    },

    // Create a card element for demo content
    createDemoCard: function(title, content, demoFunction) {
        return `
            <div class="card">
                <h3>${title}</h3>
                <p>${content}</p>
                <button class="btn" onclick="${demoFunction}">Run Demo</button>
            </div>
        `;
    }
};

// Global error handler
window.onerror = function(msg, url, lineNo, columnNo, error) {
    Utils.appendOutput(`Error: ${msg} at line ${lineNo}`, 'error');
    return false;
};