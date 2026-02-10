
        // Story Data
        const characters = [
            {
                name: "King CREATE",
                role: "The Founder",
                icon: "fa-crown",
                description: "Establishes new structures (tables, databases). The visionary who started SQLandia.",
                sql: "CREATE TABLE Citizens (ID INT, Name VARCHAR(100));"
            },
            {
                name: "Queen ALTER",
                role: "The Renovator",
                icon: "fa-tools",
                description: "Modifies existing structures. Adapts the kingdom to changing needs.",
                sql: "ALTER TABLE Citizens ADD COLUMN Age INT;"
            },
            {
                name: "Sir SELECT",
                role: "Royal Inquisitor",
                icon: "fa-search",
                description: "Gathers information from the kingdom. Always asking the right questions.",
                sql: "SELECT Name, Age FROM Citizens WHERE Age > 18;"
            },
            {
                name: "Lady INSERT",
                role: "Citizen Registrar",
                icon: "fa-user-plus",
                description: "Welcomes new citizens (records) to SQLandia with proper documentation.",
                sql: "INSERT INTO Citizens (ID, Name) VALUES (1, 'Sir Lancelot');"
            },
            {
                name: "Lord UPDATE",
                role: "The Reformer",
                icon: "fa-edit",
                description: "Modifies citizen information. Handles promotions and corrections.",
                sql: "UPDATE Citizens SET Age = 30 WHERE Name = 'Sir Lancelot';"
            },
            {
                name: "The Executioner DELETE",
                role: "Record Remover",
                icon: "fa-trash-alt",
                description: "Removes citizens from records. Must be used with caution!",
                sql: "DELETE FROM Citizens WHERE ID = 5;"
            },
            {
                name: "Ambassador INNER JOIN",
                role: "Alliance Specialist",
                icon: "fa-handshake",
                description: "Creates alliances where both sides match. Mutual agreements only.",
                sql: "SELECT * FROM Citizens INNER JOIN Orders ON Citizens.ID = Orders.CustomerID;"
            },
            {
                name: "Archmage STORED PROCEDURE",
                role: "Master of Scripts",
                icon: "fa-hat-wizard",
                description: "Creates reusable code blocks. Powerful and parameterized.",
                sql: "CREATE PROCEDURE AddCitizen @Name VARCHAR(100) AS INSERT INTO Citizens (Name) VALUES (@Name);"
            }
        ];

        const storyChapters = [
            {
                title: "Chapter 1: The Founding",
                content: "King CREATE established the kingdom with its first structures. The foundation was set for order in the data chaos.",
                sql: "CREATE DATABASE KingdomOf_SQLandia;"
            },
            {
                title: "Chapter 2: The First Citizens",
                content: "Lady INSERT welcomed the first citizens to SQLandia, carefully recording each one in the citizen registry.",
                sql: "INSERT INTO Castle_Citizens VALUES (1, 'King Structurus', 980, 1);"
            },
            {
                title: "Chapter 3: The Royal Census",
                content: "Sir SELECT conducted the first census, gathering information about all citizens with precise questions.",
                sql: "SELECT FullName, BirthYear FROM Castle_Citizens WHERE Royalty = 1;"
            },
            {
                title: "Chapter 4: The Great Alliance",
                content: "Ambassador INNER JOIN forged alliances between different parts of the kingdom, creating meaningful connections.",
                sql: "SELECT C.FullName, T.Amount FROM Citizens C INNER JOIN Treasury T ON C.ID = T.OwnerID;"
            },
            {
                title: "Chapter 5: The Royal Decrees",
                content: "Archmage STORED PROCEDURE created reusable royal decrees, making kingdom management more efficient.",
                sql: "CREATE PROCEDURE PromoteCitizen @CitizenID INT AS UPDATE Citizens SET Status = 'Noble' WHERE ID = @CitizenID;"
            }
        ];

        const castles = [
            { name: "Castle CREATE", x: 10, y: 50, command: "CREATE", color: "#8B4513" },
            { name: "Palace SELECT", x: 25, y: 20, command: "SELECT", color: "#4169E1" },
            { name: "Fort INSERT", x: 25, y: 80, command: "INSERT", color: "#32CD32" },
            { name: "Tower UPDATE", x: 40, y: 30, command: "UPDATE", color: "#FF8C00" },
            { name: "Dungeon DELETE", x: 40, y: 70, command: "DELETE", color: "#DC143C" },
            { name: "Hall JOIN", x: 55, y: 50, command: "JOIN", color: "#9370DB" },
            { name: "Library INDEX", x: 70, y: 30, command: "INDEX", color: "#20B2AA" },
            { name: "Vault BACKUP", x: 70, y: 70, command: "BACKUP", color: "#FFD700" }
        ];

        // App State
        let currentChapter = 'intro';
        let draggedCommand = null;
        let progress = 0;

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function () {
            loadCharacters();
            loadStoryChapters();
            createKingdomMap();
            setupDragAndDrop();
            updateProgress();

            // Set up navigation tabs
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.addEventListener('click', function () {
                    const chapter = this.getAttribute('data-chapter');
                    switchChapter(chapter);
                });
            });
        });

        // Load characters into the characters chapter
        function loadCharacters() {
            const container = document.getElementById('characters-container');
            container.innerHTML = '';

            characters.forEach(char => {
                const card = document.createElement('div');
                card.className = 'character-card';
                card.innerHTML = `
                    <div class="character-header">
                        <div class="character-icon">
                            <i class="fas ${char.icon}"></i>
                        </div>
                        <div>
                            <div class="character-name">${char.name}</div>
                            <div class="character-role">${char.role}</div>
                        </div>
                    </div>
                    <div class="character-description">
                        ${char.description}
                    </div>
                    <div class="sql-code" style="margin-top: 10px; font-size: 0.9rem;">
                        ${formatSQL(char.sql)}
                    </div>
                `;
                container.appendChild(card);
            });
        }

        // Load story chapters
        function loadStoryChapters() {
            const container = document.getElementById('story-chapters');
            container.innerHTML = '';

            storyChapters.forEach((chapter, index) => {
                const chapterDiv = document.createElement('div');
                chapterDiv.style.marginBottom = '30px';
                chapterDiv.innerHTML = `
                    <h3 style="color: #1a2980; margin-bottom: 15px;">${chapter.title}</h3>
                    <p>${chapter.content}</p>
                    <div class="sql-code" style="margin-top: 10px;">
                        ${formatSQL(chapter.sql)}
                    </div>
                `;
                container.appendChild(chapterDiv);
            });
        }

        // Create the interactive kingdom map
        function createKingdomMap() {
            const map = document.getElementById('kingdom-map');
            map.innerHTML = '';

            castles.forEach(castle => {
                const castleEl = document.createElement('div');
                castleEl.className = 'castle';
                castleEl.style.left = `${castle.x}%`;
                castleEl.style.top = `${castle.y}%`;
                castleEl.style.background = castle.color;
                castleEl.innerHTML = `
                    <div class="castle-roof" style="background: ${castle.color}"></div>
                    <i class="fas fa-${getCastleIcon(castle.command)}" style="font-size: 2rem; color: white;"></i>
                    <div class="castle-label">${castle.name}</div>
                `;

                castleEl.addEventListener('click', function () {
                    showCastleInfo(castle);
                });

                map.appendChild(castleEl);
            });
        }

        // Get appropriate icon for each castle
        function getCastleIcon(command) {
            const icons = {
                'CREATE': 'crown',
                'SELECT': 'search',
                'INSERT': 'user-plus',
                'UPDATE': 'edit',
                'DELETE': 'trash-alt',
                'JOIN': 'handshake',
                'INDEX': 'book',
                'BACKUP': 'shield-alt'
            };
            return icons[command] || 'chess-rook';
        }

        // Show castle information when clicked
        function showCastleInfo(castle) {
            document.getElementById('castle-name').textContent = castle.name;

            const descriptions = {
                'CREATE': 'The founding castle where all structures are born. King CREATE rules here, establishing tables and databases.',
                'SELECT': 'The observation tower where Sir SELECT gathers information about the kingdom.',
                'INSERT': 'The welcoming fort where new citizens are registered by Lady INSERT.',
                'UPDATE': 'The modification tower where Lord UPDATE reforms and corrects citizen information.',
                'DELETE': 'The dangerous dungeon where The Executioner removes records. Approach with caution!',
                'JOIN': 'The alliance hall where relationships between different parts of the kingdom are formed.',
                'INDEX': 'The royal library where fast lookup paths are created for efficient searching.',
                'BACKUP': 'The secure vault where kingdom backups are stored for safety.'
            };

            const sqlExamples = {
                'CREATE': 'CREATE TABLE Citizens (ID INT PRIMARY KEY, Name VARCHAR(100));',
                'SELECT': 'SELECT Name, Age FROM Citizens WHERE Age > 18;',
                'INSERT': 'INSERT INTO Citizens (Name, Age) VALUES (\'Sir Lancelot\', 30);',
                'UPDATE': 'UPDATE Citizens SET Age = 31 WHERE Name = \'Sir Lancelot\';',
                'DELETE': 'DELETE FROM Citizens WHERE ID = 5;',
                'JOIN': 'SELECT C.Name, O.OrderDate FROM Citizens C JOIN Orders O ON C.ID = O.CustomerID;',
                'INDEX': 'CREATE INDEX idx_Name ON Citizens(Name);',
                'BACKUP': 'BACKUP DATABASE SQLandia TO DISK = \'backup.bak\';'
            };

            document.getElementById('castle-description').textContent = descriptions[castle.command];
            document.getElementById('castle-sql').innerHTML = formatSQL(sqlExamples[castle.command]);

            document.getElementById('castle-info').style.display = 'block';
        }

        // Setup drag and drop for query builder
        function setupDragAndDrop() {
            const parts = document.querySelectorAll('.query-part');
            parts.forEach(part => {
                part.addEventListener('dragstart', function (e) {
                    draggedCommand = this.getAttribute('data-command');
                    e.dataTransfer.setData('text/plain', draggedCommand);
                    this.style.opacity = '0.5';
                });

                part.addEventListener('dragend', function () {
                    this.style.opacity = '1';
                });
            });
        }

        // Allow drop in query canvas
        function allowDrop(e) {
            e.preventDefault();
        }

        // Handle drop in query canvas
        function drop(e) {
            e.preventDefault();
            const command = e.dataTransfer.getData('text/plain');

            if (command) {
                const canvas = document.getElementById('query-canvas');
                const emptyMsg = document.getElementById('empty-canvas');

                if (emptyMsg) {
                    emptyMsg.style.display = 'none';
                }

                const commandSpan = document.createElement('span');
                commandSpan.textContent = command;
                commandSpan.className = 'sql-command';
                commandSpan.style.marginRight = '10px';
                commandSpan.style.cursor = 'pointer';
                commandSpan.title = 'Click to remove';

                commandSpan.addEventListener('click', function () {
                    this.remove();
                    if (canvas.children.length === 1) {
                        emptyMsg.style.display = 'block';
                    }
                });

                canvas.appendChild(commandSpan);

                // Add a space after the command for readability
                canvas.appendChild(document.createTextNode(' '));
            }
        }

        // Execute the built query
        function executeQuery() {
            const canvas = document.getElementById('query-canvas');
            const commands = Array.from(canvas.querySelectorAll('.sql-command'))
                .map(el => el.textContent)
                .join(' ');

            if (commands.trim() === '') {
                alert('Please build a query first!');
                return;
            }

            const resultDiv = document.getElementById('query-result');
            const resultContent = document.getElementById('result-content');

            resultContent.innerHTML = formatSQL(commands + ';');

            // Add some mock results based on the query
            let mockResult = '';
            if (commands.includes('SELECT')) {
                mockResult = `
+--------------+-------+
| Name         | Age   |
+--------------+-------+
| Sir Lancelot | 30    |
| King Arthur  | 45    |
| Queen Guine  | 42    |
+--------------+-------+
3 rows returned
                `;
            } else if (commands.includes('INSERT')) {
                mockResult = 'Query successful: 1 row affected';
            } else if (commands.includes('UPDATE')) {
                mockResult = 'Query successful: 1 row updated';
            } else if (commands.includes('DELETE')) {
                mockResult = 'Query successful: 1 row deleted';
            } else {
                mockResult = 'Query executed successfully';
            }

            resultContent.innerHTML += '\n<span class="sql-comment">-- Result:</span>\n' + mockResult;
            resultDiv.style.display = 'block';

            // Increase progress for completing a query
            if (progress < 100) {
                progress += 10;
                updateProgress();
            }
        }

        // Check practice queries
        function checkPractice(challengeNum) {
            const input = document.getElementById(`practice-${challengeNum}`).innerText.trim().toUpperCase();
            const resultDiv = document.getElementById(`practice-${challengeNum}-result`);

            let correct = false;
            let feedback = '';

            switch (challengeNum) {
                case 1:
                    correct = input.includes('SELECT') && input.includes('FROM') && input.includes('WHERE') && input.includes('ROYALTY = 1');
                    feedback = correct ?
                        '<span style="color: green;"><i class="fas fa-check"></i> Correct! You found all royal citizens.</span>' :
                        '<span style="color: red;"><i class="fas fa-times"></i> Not quite. Try: SELECT * FROM Castle_Citizens WHERE Royalty = 1;</span>';
                    break;
                case 2:
                    correct = input.includes('INSERT INTO') && input.includes('VALUES') && input.includes('SIR GALAHAD') && input.includes('1015') && (input.includes('0') || input.includes('FALSE'));
                    feedback = correct ?
                        '<span style="color: green;"><i class="fas fa-check"></i> Excellent! Sir Galahad is now a citizen.</span>' :
                        '<span style="color: red;"><i class="fas fa-times"></i> Try: INSERT INTO Castle_Citizens (FullName, BirthYear, Royalty) VALUES (\'Sir Galahad\', 1015, 0);</span>';
                    break;
                case 3:
                    correct = input.includes('UPDATE') && input.includes('SET') && input.includes('PROFESSION') && input.includes('ROYAL ADVISOR') && input.includes('WHERE') && input.includes('CITIZENID = 3');
                    feedback = correct ?
                        '<span style="color: green;"><i class="fas fa-check"></i> Perfect! Citizen 3 is now a Royal Advisor.</span>' :
                        '<span style="color: red;"><i class="fas fa-times"></i> Try: UPDATE Castle_Citizens SET Profession = \'Royal Advisor\' WHERE CitizenID = 3;</span>';
                    break;
            }

            resultDiv.innerHTML = feedback;

            if (correct && progress < 100) {
                progress += 20;
                updateProgress();
            }
        }

        // Update progress bar
        function updateProgress() {
            document.getElementById('progress-fill').style.width = `${progress}%`;
        }

        // Switch between chapters
        function switchChapter(chapterId) {
            // Update active tab
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-chapter') === chapterId) {
                    tab.classList.add('active');
                }
            });

            // Update active chapter
            document.querySelectorAll('.chapter').forEach(chapter => {
                chapter.classList.remove('active');
                if (chapter.id === chapterId) {
                    chapter.classList.add('active');
                }
            });

            currentChapter = chapterId;
        }

        // Navigate to next chapter
        function nextChapter() {
            const chapters = ['intro', 'characters', 'story', 'kingdom', 'queries', 'practice'];
            const currentIndex = chapters.indexOf(currentChapter);

            if (currentIndex < chapters.length - 1) {
                switchChapter(chapters[currentIndex + 1]);
            }
        }

        // Navigate to previous chapter
        function prevChapter() {
            const chapters = ['intro', 'characters', 'story', 'kingdom', 'queries', 'practice'];
            const currentIndex = chapters.indexOf(currentChapter);

            if (currentIndex > 0) {
                switchChapter(chapters[currentIndex - 1]);
            }
        }

        // Restart the adventure
        function restartAdventure() {
            progress = 0;
            updateProgress();
            switchChapter('intro');

            // Clear query builder
            const canvas = document.getElementById('query-canvas');
            canvas.innerHTML = '<p style="color: #999; text-align: center; line-height: 70px;" id="empty-canvas">Drag SQL commands here to build your query</p>';

            // Clear practice results
            for (let i = 1; i <= 3; i++) {
                document.getElementById(`practice-${i}-result`).innerHTML = '';
            }

            // Reset practice inputs
            document.querySelectorAll('.sql-code[contenteditable="true"]').forEach(el => {
                el.innerHTML = '<span contenteditable="true" style="outline: none; min-height: 30px; display: block;">Type your query here...</span>';
            });
        }

        // Format SQL code with syntax highlighting
        function formatSQL(sql) {
            if (!sql) return '';

            // Define SQL keywords to highlight
            const keywords = [
                'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET',
                'DELETE', 'CREATE', 'TABLE', 'DATABASE', 'ALTER', 'DROP', 'JOIN', 'INNER',
                'LEFT', 'RIGHT', 'FULL', 'OUTER', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING',
                'AND', 'OR', 'NOT', 'NULL', 'PRIMARY KEY', 'FOREIGN KEY', 'REFERENCES',
                'INT', 'VARCHAR', 'DATE', 'DECIMAL', 'BIT', 'DEFAULT', 'AS', 'IS'
            ];

            let formatted = sql;

            // Highlight keywords
            keywords.forEach(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                formatted = formatted.replace(regex, `<span class="sql-keyword">$&</span>`);
            });

            // Highlight strings (text in single quotes)
            formatted = formatted.replace(/'[^']*'/g, `<span class="sql-string">$&</span>`);

            // Highlight comments
            formatted = formatted.replace(/--.*$/gm, `<span class="sql-comment">$&</span>`);

            // Highlight table names (words after CREATE TABLE or FROM)
            const tableRegex = /(?:CREATE TABLE|FROM|INSERT INTO|UPDATE|JOIN)\s+(\w+)/gi;
            formatted = formatted.replace(tableRegex, (match, tableName) => {
                return match.replace(tableName, `<span class="sql-table">${tableName}</span>`);
            });

            // Highlight column names (words in parentheses)
            const columnRegex = /\(([^)]+)\)/g;
            formatted = formatted.replace(columnRegex, (match, columns) => {
                const highlighted = columns.split(',').map(col => {
                    const colName = col.trim().split(' ')[0];
                    return col.replace(colName, `<span class="sql-column">${colName}</span>`);
                }).join(', ');
                return `(${highlighted})`;
            });

            return formatted;
        }