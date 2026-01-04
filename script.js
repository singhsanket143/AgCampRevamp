document.addEventListener('DOMContentLoaded', () => {
    console.log('AlgoCamp Script v3 Loaded - Advanced Interactivity');
    // Icons
    lucide.createIcons();

    // Typing Effect for Header
    const typingHeader = document.getElementById('typing-header');
    if (typingHeader) {
        const phrases = [
            'Master Backend Engineering',
            'Master Software Development',
            'Master AI Engineering'
        ];
        
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let deletingSpeed = 50;
        let pauseTime = 2000; // Pause at end of phrase
        
        function typeHeader() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                // Delete characters
                typingHeader.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                
                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                    setTimeout(typeHeader, 500); // Brief pause before typing next phrase
                    return;
                }
                
                setTimeout(typeHeader, deletingSpeed);
            } else {
                // Type characters
                typingHeader.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                
                if (currentCharIndex === currentPhrase.length) {
                    // Finished typing, pause then start deleting
                    setTimeout(() => {
                        isDeleting = true;
                        typeHeader();
                    }, pauseTime);
                    return;
                }
                
                setTimeout(typeHeader, typingSpeed);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeHeader, 1000);
    }

    // Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                entry.target.classList.remove('reveal-hidden');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach((el, index) => {
        el.classList.add('reveal-hidden');
        el.style.transitionDelay = `${index * 50}ms`;
        observer.observe(el);
    });

    // Spotlight Effect for Cards
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 3D Tilt Effect
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (scaled down for subtlety)
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Infinite Marquee Setup
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        const content = marqueeContent.innerHTML;
        marqueeContent.innerHTML = content + content;
    }

    // Advanced Typewriter Effect - Multi-language
    const codeContainer = document.querySelector('#typewriter-code');
    const codeFilename = document.querySelector('#code-filename');
    
    if (codeContainer) {
        // Code snippets for different languages
        const codeSnippets = [
            {
                language: 'Go',
                filename: 'server.go',
                lines: [
                    { text: 'func main() {', color: 'text-purple-400' },
                    { text: '    // Initialize distributed system', color: 'text-gray-500' },
                    { text: '    cluster := NewCluster(Config{', color: 'text-yellow-300' },
                    { text: '        Region: "us-east-1",', color: 'text-green-400' },
                    { text: '        Nodes:  5000,', color: 'text-orange-400' },
                    { text: '    })', color: 'text-yellow-300' },
                    { text: '    ', color: '' },
                    { text: '    // Ready to serve traffic', color: 'text-gray-500' },
                    { text: '    log.Info("System online 🚀")', color: 'text-cyan-400' },
                    { text: '}', color: 'text-purple-400' },
                ]
            },
            {
                language: 'Java',
                filename: 'Server.java',
                lines: [
                    { text: '@SpringBootApplication', color: 'text-purple-400' },
                    { text: 'public class Server {', color: 'text-yellow-300' },
                    { text: '    ', color: '' },
                    { text: '    public static void main(String[] args) {', color: 'text-purple-400' },
                    { text: '        // Initialize distributed system', color: 'text-gray-500' },
                    { text: '        Cluster cluster = new Cluster(', color: 'text-yellow-300' },
                    { text: '            new Config("us-east-1", 5000)', color: 'text-green-400' },
                    { text: '        );', color: 'text-yellow-300' },
                    { text: '        log.info("System online 🚀");', color: 'text-cyan-400' },
                    { text: '    }', color: 'text-purple-400' },
                    { text: '}', color: 'text-purple-400' },
                ]
            },
            {
                language: 'Python',
                filename: 'server.py',
                lines: [
                    { text: 'from flask import Flask', color: 'text-purple-400' },
                    { text: 'import logging', color: 'text-purple-400' },
                    { text: ' ', color: '' },
                    { text: 'app = Flask(__name__)', color: 'text-yellow-300' },
                    { text: ' ', color: '' },
                    { text: '# Initialize distributed system', color: 'text-gray-500' },
                    { text: 'cluster = Cluster(', color: 'text-yellow-300' },
                    { text: '    region="us-east-1",', color: 'text-green-400' },
                    { text: '    nodes=5000', color: 'text-orange-400' },
                    { text: ')', color: 'text-yellow-300' },
                    { text: ' ', color: '' },
                    { text: 'logging.info("System online 🚀")', color: 'text-cyan-400' },
                ]
            },
            {
                language: 'Ruby',
                filename: 'server.rb',
                lines: [
                    { text: 'require "sinatra"', color: 'text-purple-400' },
                    { text: 'require "logger"', color: 'text-purple-400' },
                    { text: ' ', color: '' },
                    { text: 'class Server', color: 'text-yellow-300' },
                    { text: '  def initialize', color: 'text-purple-400' },
                    { text: '    # Initialize distributed system', color: 'text-gray-500' },
                    { text: '    @cluster = Cluster.new(', color: 'text-yellow-300' },
                    { text: '      region: "us-east-1",', color: 'text-green-400' },
                    { text: '      nodes: 5000', color: 'text-orange-400' },
                    { text: '    )', color: 'text-yellow-300' },
                    { text: '    logger.info("System online 🚀")', color: 'text-cyan-400' },
                    { text: '  end', color: 'text-purple-400' },
                    { text: 'end', color: 'text-yellow-300' },
                ]
            },
            {
                language: 'Node',
                filename: 'server.js',
                lines: [
                    { text: 'const express = require("express");', color: 'text-purple-400' },
                    { text: 'const app = express();', color: 'text-yellow-300' },
                    { text: ' ', color: '' },
                    { text: '// Initialize distributed system', color: 'text-gray-500' },
                    { text: 'const cluster = new Cluster({', color: 'text-yellow-300' },
                    { text: '  region: "us-east-1",', color: 'text-green-400' },
                    { text: '  nodes: 5000', color: 'text-orange-400' },
                    { text: '});', color: 'text-yellow-300' },
                    { text: ' ', color: '' },
                    { text: 'console.log("System online 🚀");', color: 'text-cyan-400' },
                ]
            }
        ];

        let currentSnippetIndex = 0;
        let lineIndex = 0;
        let charIndex = 0;
        let currentLineElement = null;
        let isDeleting = false;
        let pauseAfterComplete = false;

        function updateFilename() {
            if (codeFilename) {
                codeFilename.textContent = codeSnippets[currentSnippetIndex].filename;
            }
        }

        function resetState() {
            lineIndex = 0;
            charIndex = 0;
            currentLineElement = null;
            isDeleting = false;
            pauseAfterComplete = false;
        }

        function typeWriter() {
            // Prevent multiple simultaneous calls during pause
            if (pauseAfterComplete) {
                return;
            }

            const currentSnippet = codeSnippets[currentSnippetIndex];
            const codeLines = currentSnippet.lines;

            if (isDeleting) {
                // Deleting mode - delete character by character from the end
                if (codeContainer.children.length > 0) {
                    const lastLine = codeContainer.lastElementChild;
                    if (lastLine && lastLine.textContent.length > 0) {
                        // Delete one character from the last line
                        lastLine.textContent = lastLine.textContent.slice(0, -1);
                        setTimeout(typeWriter, 20);
                    } else {
                        // Line is empty, remove it and continue with previous line
                        codeContainer.removeChild(lastLine);
                        if (codeContainer.children.length === 0) {
                            // Finished deleting all lines, move to next language
                            codeContainer.innerHTML = ''; // Ensure container is empty
                            resetState();
                            currentSnippetIndex = (currentSnippetIndex + 1) % codeSnippets.length;
                            updateFilename();
                            // Clear and wait before starting next language
                            setTimeout(() => {
                                codeContainer.innerHTML = ''; // Double-check it's empty
                                typeWriter();
                            }, 500);
                        } else {
                            setTimeout(typeWriter, 20);
                        }
                    }
                } else {
                    // No children, move to next language
                    codeContainer.innerHTML = ''; // Ensure container is empty
                    resetState();
                    currentSnippetIndex = (currentSnippetIndex + 1) % codeSnippets.length;
                    updateFilename();
                    // Clear and wait before starting next language
                    setTimeout(() => {
                        codeContainer.innerHTML = ''; // Double-check it's empty
                        typeWriter();
                    }, 500);
                }
            } else {
                // Typing mode
                if (lineIndex < codeLines.length) {
                    if (!currentLineElement) {
                        // Create new line element
                        currentLineElement = document.createElement('div');
                        currentLineElement.className = codeLines[lineIndex].color || 'text-text';
                        codeContainer.appendChild(currentLineElement);
                    }

                    const lineText = codeLines[lineIndex].text;

                    if (charIndex < lineText.length) {
                        // Type next character
                        currentLineElement.textContent += lineText.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeWriter, Math.random() * 30 + 20);
                    } else {
                        // Finished current line, move to next line
                        lineIndex++;
                        charIndex = 0;
                        currentLineElement = null;
                        setTimeout(typeWriter, 100);
                    }
                } else {
                    // Finished typing all lines of current snippet
                    // Pause for 3 seconds, then start deleting
                    pauseAfterComplete = true;
                    setTimeout(() => {
                        pauseAfterComplete = false;
                        isDeleting = true;
                        typeWriter();
                    }, 3000);
                }
            }
        }

        // Initialize with first language
        codeContainer.innerHTML = ''; // Ensure container starts empty
        resetState();
        updateFilename();
        setTimeout(typeWriter, 1000);
    }

    // Roadmap Animation & Interaction Logic
    const roadmapContainer = document.getElementById('roadmap-container');
    const roadmapPhases = document.querySelectorAll('.roadmap-phase');
    const roadmapLineProgress = document.querySelector('.roadmap-line-progress');
    const codeTerminal = document.getElementById('code-terminal');
    const codeContent = document.getElementById('code-content');
    const interactiveKeywords = document.querySelectorAll('[data-code-key]');

    console.log('Terminal element:', codeTerminal);
    console.log('Content element:', codeContent);
    console.log('Interactive keywords found:', interactiveKeywords.length);

    // Code Snippets Database
    const codeSnippets = {
        'eureka': 'eureka:\n  client:\n    registerWithEureka: true\n    fetchRegistry: true\n    serviceUrl:\n      defaultZone: http://localhost:8761/eureka/',
        'resilience': '@CircuitBreaker(name = "backendA", fallbackMethod = "fallback")\npublic String doSomething() {\n    return backendA.failure();\n}',
        'grpc': 'service Greeter {\n  rpc SayHello (HelloRequest) returns (HelloReply) {}\n}\nmessage HelloRequest {\n  string name = 1;\n}',
        'sharding': 'sh.enableSharding("appDB");\nsh.shardCollection("appDB.users", { "country": 1, "userId": 1 });',
        'cdc': '{ "name": "inventory-connector",\n  "config": {\n    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",\n    "database.hostname": "postgres",\n    "table.include.list": "public.inventory"\n  }\n}',
        'caching': '@Cacheable(value = "users", key = "#userId")\npublic User getUser(Long userId) {\n    return repository.findById(userId);\n}',
        'kafka': 'Properties props = new Properties();\nprops.put("bootstrap.servers", "localhost:9092");\nprops.put("key.serializer", "StringSerializer");\nprops.put("value.serializer", "StringSerializer");',
        'docker': 'FROM eclipse-temurin:17-jdk-alpine\nVOLUME /tmp\nCOPY target/*.jar app.jar\nENTRYPOINT ["java","-jar","/app.jar"]',
        'k8s': 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: backend-api\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: backend',
        'chaos': 'apiVersion: chaos-mesh.org/v1alpha1\nkind: PodChaos\nmetadata:\n  name: pod-failure-example\nspec:\n  action: pod-failure\n  mode: one'
    };

    if (roadmapContainer && roadmapPhases.length > 0 && roadmapLineProgress) {
        // Scroll Animation
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0
        };

        const roadmapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    const index = parseInt(entry.target.getAttribute('data-index'));
                    const totalProxy = roadmapPhases.length;
                    const step = 100 / totalProxy;
                    const progress = (index * step) + (step / 2);

                    const fillHeight = Math.min(Math.max(progress + 10, 10), 100);
                    const currentHeight = parseFloat(roadmapLineProgress.style.height || 0);

                    // Only increase height via scroll (the mouse effect handles temporary changes)
                    if (fillHeight > currentHeight) {
                        roadmapLineProgress.style.height = `${fillHeight}%`;
                    }
                }
            });
        }, observerOptions);

        roadmapPhases.forEach(phase => roadmapObserver.observe(phase));

        // Laser Line Effect (Mouse Tracking)
        roadmapContainer.addEventListener('mousemove', (e) => {
            const rect = roadmapContainer.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const percent = Math.min(Math.max((y / rect.height) * 100, 0), 100);

            roadmapLineProgress.classList.add('laser-active');
            roadmapLineProgress.style.height = `${percent}%`;
        });

        roadmapContainer.addEventListener('mouseleave', () => {
            roadmapLineProgress.classList.remove('laser-active');
        });
    }

    // Floating Terminal Logic
    let typeInterval;

    interactiveKeywords.forEach(keyword => {
        keyword.addEventListener('mouseenter', (e) => {
            const key = keyword.getAttribute('data-code-key');
            console.log('Hovered:', key); // DEBUG
            const snippet = codeSnippets[key];
            if (!snippet) {
                console.error('No snippet found for:', key);
                return;
            }
            console.log('Snippet found, length:', snippet.length);

            // Show Terminal
            if (!codeTerminal) {
                console.error('codeTerminal element is null!');
                return;
            }

            // Remove initial hidden class and set all visibility properties
            codeTerminal.classList.remove('opacity-0');
            codeTerminal.classList.add('opacity-100');

            // Set initial position immediately with !important to override Tailwind
            const terminalWidth = 320;
            const terminalHeight = 200; // Approximate height
            const x = e.clientX;
            const y = e.clientY;

            // Calculate position with boundary checks
            let leftPos = x + 20;
            if (leftPos + terminalWidth > window.innerWidth) {
                leftPos = x - terminalWidth - 20;
            }

            // Also check vertical boundary
            let topPos = y - 50;
            if (topPos + terminalHeight > window.innerHeight) {
                topPos = window.innerHeight - terminalHeight - 20;
            }
            if (topPos < 0) {
                topPos = 20;
            }

            codeTerminal.style.cssText = `
                position: fixed !important;
                left: ${leftPos}px !important;
                top: ${topPos}px !important;
                opacity: 1 !important;
                visibility: visible !important;
                z-index: 9999 !important;
                display: block !important;
                pointer-events: none !important;
            `;

            // Typewriter Effect
            codeContent.innerHTML = '<span class="typing-cursor">|</span>'; // Clear
            let i = 0;
            clearInterval(typeInterval);

            typeInterval = setInterval(() => {
                const currentText = snippet.substring(0, i);
                // Simple syntax highlighting (naive)
                const highlighted = currentText
                    .replace(/(@\w+|public|return|import|from|kind|spec|metadata|apiVersion)/g, '<span class="text-purple-400">$1</span>')
                    .replace(/(".+?")/g, '<span class="text-yellow-300">$1</span>')
                    .replace(/(:\s)/g, '<span class="text-white">$1</span>');

                codeContent.innerHTML = highlighted + '<span class="typing-cursor">|</span>';
                i++;
                if (i > snippet.length) clearInterval(typeInterval);
            }, 10);
        });

        keyword.addEventListener('mousemove', (e) => {
            if (!codeTerminal) return;

            // Move terminal with mouse
            const x = e.clientX;
            const y = e.clientY;

            // Check boundaries
            const terminalWidth = 320;
            const terminalHeight = 200;

            let leftPos = x + 20;
            if (leftPos + terminalWidth > window.innerWidth) {
                leftPos = x - terminalWidth - 20;
            }

            let topPos = y - 50;
            if (topPos + terminalHeight > window.innerHeight) {
                topPos = window.innerHeight - terminalHeight - 20;
            }
            if (topPos < 0) {
                topPos = 20;
            }

            codeTerminal.style.left = `${leftPos}px`;
            codeTerminal.style.top = `${topPos}px`;
        });

        keyword.addEventListener('mouseleave', () => {
            if (!codeTerminal) return;

            codeTerminal.classList.remove('opacity-100');
            codeTerminal.classList.add('opacity-0');
            codeTerminal.style.cssText = `
                position: fixed !important;
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
            `;
            clearInterval(typeInterval);
        });
    });
});
