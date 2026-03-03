(function () {
            // ---------- question bank for grade 2 olympiad (pattern, arithmetic, geometry, logic) ----------
            const questions = [
                {
                    question: "🏀 45 + 27 = ?",
                    options: ["62", "72", "82", "92"],
                    correct: 1 // index 1 -> 72
                },
                {
                    question: "🧩 Which number is the largest?  589,  612,  598,  621",
                    options: ["589", "612", "598", "621"],
                    correct: 3 // 621
                },
                {
                    question: "🍭 8 × 6 = ?",
                    options: ["42", "48", "56", "64"],
                    correct: 1 // 48
                },
                {
                    question: "⏰ What time is half past 3 ?",
                    options: ["3:30", "4:00", "3:15", "3:45"],
                    correct: 0 // 3:30
                },
                {
                    question: "📐 How many sides does a rectangle have?",
                    options: ["3", "4", "5", "6"],
                    correct: 1 // 4
                },
                {
                    question: "🍬 63 – 28 = ?",
                    options: ["35", "45", "41", "31"],
                    correct: 0 // 35
                },
                {
                    question: "🐼 Which is the smallest?  312,  299,  301,  289",
                    options: ["312", "299", "301", "289"],
                    correct: 3 // 289
                },
                {
                    question: "⚖️ 24 ÷ 3 = ?",
                    options: ["6", "8", "7", "9"],
                    correct: 1 // 8
                },
                {
                    question: "🧸 100 – 43 = ?",
                    options: ["57", "67", "53", "63"],
                    correct: 0 // 57
                },
                {
                    question: "🔢 What is the next number?  5, 10, 15, 20, __",
                    options: ["22", "25", "30", "35"],
                    correct: 1 // 25
                },
                {
                    question: "🍉 How many corners does a cube have?",
                    options: ["6", "8", "12", "4"],
                    correct: 1 // 8
                },
                {
                    question: "✏️ 7 + 9 + 6 = ?",
                    options: ["21", "22", "23", "24"],
                    correct: 1 // 22
                },
                {
                    question: "🐠 Which fraction is shaded if half of a circle is colored?",
                    options: ["1/2", "1/3", "1/4", "2/3"],
                    correct: 0 // 1/2
                },
                {
                    question: "🚲 9 × 9 = ?",
                    options: ["81", "72", "63", "99"],
                    correct: 0 // 81
                },
                {
                    question: "📏 How many centimeters in 1 meter?",
                    options: ["10", "100", "1000", "50"],
                    correct: 1 // 100
                }
            ];

            // ----- state -----
            let currentQuestionIndex = 0;          // start from first
            let score = 0;
            let lock = false;                      // block multiple answers
            let correctAnswerIndex = 0;
            let totalAnswered = 0;                  // just for internal (not used in score)
            let currentQuestionObject = null;

            // DOM elements
            const questionEl = document.getElementById('questionText');
            const optionsEl = document.getElementById('optionsContainer');
            const scoreDisplay = document.getElementById('scoreDisplay');
            const nextButton = document.getElementById('nextButton');
            const hintEl = document.getElementById('hintMessage');

            // helper to shuffle array? but we keep order as is – you can add shuffle if you want.
            // we'll just rotate sequentially, but questions are fixed.

            function loadQuestion(index) {
                // wrap around if index exceeds questions
                if (index >= questions.length) {
                    // congrats! you finished all. we can reset or keep showing final.
                    // we show a completion message and reset to first.
                    if (index >= questions.length) {
                        hintEl.textContent = "🎉 GREAT JOB! 🎉 starting again...";
                        currentQuestionIndex = 0;
                        index = 0;
                    }
                }

                const q = questions[index];
                currentQuestionObject = q;
                correctAnswerIndex = q.correct;

                // display question
                questionEl.textContent = q.question;

                // clear old options and create fresh ones
                optionsEl.innerHTML = '';
                q.options.forEach((opt, idx) => {
                    const btn = document.createElement('div');
                    btn.classList.add('option-btn');
                    btn.textContent = opt;
                    btn.dataset.index = idx;

                    // add click handler
                    btn.addEventListener('click', optionClickHandler);
                    optionsEl.appendChild(btn);
                });

                // reset lock & remove any special classes from options
                lock = false;
                // also remove any leftover feedback classes
                document.querySelectorAll('.option-btn').forEach(b => {
                    b.classList.remove('correct-feedback', 'wrong-feedback', 'no-click');
                });
            }

            // option click handler
            function optionClickHandler(e) {
                if (lock) {
                    hintEl.textContent = '⏳ already answered! click NEXT ➡️';
                    return;
                }

                const selectedBtn = e.currentTarget;
                const selectedIdx = parseInt(selectedBtn.dataset.index);
                const isCorrect = (selectedIdx === correctAnswerIndex);

                // disable all buttons temporarily (avoid double click)
                lock = true;

                // mark correct / wrong visual
                const allBtns = document.querySelectorAll('.option-btn');
                allBtns.forEach(btn => {
                    btn.style.pointerEvents = 'none';   // prevent any further clicks
                });

                // highlight correct (green) and if wrong highlight the wrong one (red)
                allBtns.forEach(btn => {
                    const idx = parseInt(btn.dataset.index);
                    if (idx === correctAnswerIndex) {
                        btn.classList.add('correct-feedback');
                    }
                    if (!isCorrect && idx === selectedIdx) {
                        btn.classList.add('wrong-feedback');   // selected wrong option
                    }
                });

                // update score only if correct
                if (isCorrect) {
                    score += 1;
                    scoreDisplay.textContent = score;
                    hintEl.textContent = '✅ correct! well done.';
                } else {
                    hintEl.textContent = `❌ oops! correct is ${currentQuestionObject.options[correctAnswerIndex]}`;
                }

                // (optional) increment total answered – not needed
            }

            // move to next question
            function nextQuestion() {
                // increase index
                currentQuestionIndex++;

                // if we have completed all, give congrats & reset cycle, but keep score? up to you, we'll keep score for motivation.
                if (currentQuestionIndex >= questions.length) {
                    // show celebration
                    hintEl.textContent = '🌟 you finished the set! starting round 2 🌟';
                    currentQuestionIndex = 0; // loop
                    // we can keep score continuing (infinite fun)
                }

                // load next question
                loadQuestion(currentQuestionIndex);
            }

            // event listener for next button
            nextButton.addEventListener('click', function () {
                // even if lock is false (no answer given) we allow next – but give hint
                if (!lock) {
                    // no answer yet, but we still move on? maybe encourage to answer
                    hintEl.textContent = '👀 try a question first, or skip ➡️';
                    // but we allow skip anyway – olympiad practice – allow skip
                    // we'll allow skip and reset lock for next question.
                }
                // move to next question, but remove any leftover classes
                currentQuestionIndex++;
                if (currentQuestionIndex >= questions.length) {
                    hintEl.textContent = '🔄 back to first! keep practicing';
                    currentQuestionIndex = 0;
                }
                loadQuestion(currentQuestionIndex);
            });

            // reset/init: load first question
            function initGame() {
                // randomize start? we can start at random for fun
                // but let's keep index 0
                currentQuestionIndex = Math.floor(Math.random() * questions.length); // random start each time
                score = 0;
                scoreDisplay.textContent = '0';
                loadQuestion(currentQuestionIndex);
            }

            initGame();

            // additional: if the user clicks outside, no effect
        })();