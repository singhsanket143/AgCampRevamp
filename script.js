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

    // Code Snippets Database - Learning Outcomes
    const codeSnippets = {
        // Phase 1: Foundation
        'gradle': 'Learning Outcomes:\n• Master Gradle build scripts and multi-module projects\n• Create fat jars and custom Gradle tasks\n• Understand dependency management and build lifecycle\n• Configure Gradle for Spring Boot applications',
        'jvm': 'Learning Outcomes:\n• Deep dive into JVM internals and memory model\n• Master garbage collection algorithms and tuning\n• Understand class loading and bytecode execution\n• Performance profiling and optimization techniques',
        'aop': 'Learning Outcomes:\n• Create custom annotations in Spring\n• Implement Aspect-Oriented Programming (AOP)\n• Understand JDK Dynamic Proxies vs CGLIB\n• Apply cross-cutting concerns (logging, security)',
        'lld': 'Learning Outcomes:\n• Master OOP principles in Java\n• Implement design patterns: Builder, Singleton, Strategy, Observer\n• Design clean, maintainable class hierarchies\n• Apply SOLID principles in practice',
        'spring-basics': 'Learning Outcomes:\n• Understand Spring Boot auto-configuration\n• Master dependency injection and inversion\n• Configure applications with application.properties\n• Create REST APIs with Spring MVC\n• Document APIs using OpenAPI/Swagger',
        'rest-api': 'Learning Outcomes:\n• Build RESTful services with Spring MVC\n• Implement CRUD operations\n• Handle exceptions with @ControllerAdvice\n• Call external APIs using RestTemplate\n• Create DTOs and manage request/response mapping',
        
        // Phase 2: Architecture
        'mvc': 'Learning Outcomes:\n• Design industry-ready project structure\n• Implement layered architecture (Controller, Service, Repository)\n• Organize config, seeders, jobs, and consumers\n• Build scalable MVC and modified MVC patterns',
        'microservices': 'Learning Outcomes:\n• Understand Modular Monolith vs Microservices\n• Design microservices with Spring Cloud\n• Implement Feign Clients for service communication\n• Create HLD for Ecommerce, Uber, and Wallet systems\n• Master synchronous & asynchronous communication',
        
        // Phase 3: Data Layer
        'jpa': 'Learning Outcomes:\n• Create entities with UUIDs and Lombok\n• Master inheritance strategies (@MappedSuperclass, @TablePerClass, @Joined)\n• Implement relational mappings (1:1, 1:N, M:N)\n• Write JPQL, Raw SQL, and Criteria API queries\n• Solve N+1 problem and optimize fetch strategies\n• Use Flyway for schema migrations',
        'db-basics': 'Learning Outcomes:\n• Master DB normalization and ACID properties\n• Understand transaction isolation levels\n• Design schemas for E-commerce, Uber, Wallet apps\n• Optimize queries and understand indexing\n• Introduction to NoSQL (MongoDB) and use cases',
        'indexing': 'Learning Outcomes:\n• Create and manage database indexes\n• Understand types of indexes (B-Tree, Hash, etc.)\n• Analyze query performance with/without indexes\n• Master B-Tree internals and index optimization',
        'sharding': 'Learning Outcomes:\n• Understand partitioning and sharding strategies\n• Implement horizontal sharding in databases\n• Design shard keys for optimal distribution\n• Handle cross-shard queries and transactions',
        'replication': 'Learning Outcomes:\n• Master Master-Slave replication architecture\n• Implement Multi-Master replication\n• Understand Leaderless architecture and quorums\n• Design replication for write/read heavy systems\n• Handle replication lag and consistency',
        'transactions': 'Learning Outcomes:\n• Deep dive into ACID properties implementation\n• Master atomicity, consistency, isolation, durability\n• Understand strong vs eventual consistency\n• Implement pessimistic & optimistic concurrency control\n• Handle isolation levels and serialization',
        'schema-design': 'Learning Outcomes:\n• Design complex schemas for Twitter & Airbnb\n• Normalize databases effectively\n• Optimize for different edge cases\n• Balance normalization vs denormalization',
        'mongodb': 'Learning Outcomes:\n• Backup and restore MongoDB databases\n• Implement sharding and replication in MongoDB\n• Master transactions and ACID in MongoDB\n• Optimize with indexing and aggregation framework\n• Secure MongoDB deployments',
        
        // Phase 4: Distributed Patterns
        'cqrs': 'Learning Outcomes:\n• Understand Command Query Responsibility Segregation\n• Scale queries and mutations separately\n• Implement eventual consistency in CQRS\n• Design read and write models\n• Build materialized views for queries',
        'saga': 'Learning Outcomes:\n• Master SAGA pattern for distributed transactions\n• Implement Orchestration-based SAGA\n• Implement Choreography-based SAGA (event-based)\n• Handle compensation and rollback strategies\n• Design SAGA for financial systems',
        'event-sourcing': 'Learning Outcomes:\n• Implement Event Sourcing with Kafka\n• Store events as source of truth\n• Rebuild state from event stream\n• Handle event versioning and migration\n• Combine with CQRS for scalable systems',
        'outbox': 'Learning Outcomes:\n• Understand Transactional Outbox Pattern\n• Guarantee event publishing with outbox\n• Configure databases for Change Data Capture (CDC)\n• Implement CDC using Debezium\n• Handle event ordering and idempotency',
        'kafka': 'Learning Outcomes:\n• Master Kafka architecture (Topics, Partitions, Brokers)\n• Implement Kafka Producers and Consumers\n• Handle Kafka Stream processing\n• Build real-time data pipelines\n• Understand consumer groups and offsets',
        'rabbitmq': 'Learning Outcomes:\n• Understand RabbitMQ architecture\n• Implement message exchange patterns\n• Build publish-subscribe patterns\n• Handle message acknowledgments and delivery guarantees\n• Configure dead letter queues and retry mechanisms',
        'consistency': 'Learning Outcomes:\n• Master consistency models: Eventual, Causal, Immediate\n• Understand CAP theorem trade-offs\n• Design for strong vs eventual consistency\n• Implement consistency patterns in distributed systems',
        
        // Phase 5: Communication
        'grpc': 'Learning Outcomes:\n• Understand gRPC for inter-service communication\n• Compare Protobufs with Thrift and JSON\n• Understand performance improvements and payload size\n• Implement gRPC services in Spring Boot\n• Handle streaming and bidirectional communication',
        'caching': 'Learning Outcomes:\n• Integrate Redis with Spring Data Redis\n• Implement caching strategies (TTL, eviction)\n• Master cache invalidation patterns\n• Build layered caching (Read Back, Read Through, Read Around)\n• Optimize cache hit rates',
        'websockets': 'Learning Outcomes:\n• Implement WebSockets using STOMP and SockJS\n• Build real-time chat/order updates\n• Handle WebSocket connections in Spring Boot\n• Design real-time notification systems\n• Manage connection lifecycle and error handling',
        'auth': 'Learning Outcomes:\n• Configure Spring Security\n• Implement JWT-based authentication\n• Build role-based access control (RBAC)\n• Understand OAuth 2.0 basics\n• Secure microservices with authentication',
        'spring-ai': 'Learning Outcomes:\n• Integrate and configure LLM models with Spring AI\n• Build AI-powered features in Spring Boot\n• Understand prompt engineering\n• Handle AI API calls and responses',
        'distributed-locks': 'Learning Outcomes:\n• Implement distributed locks using Redis\n• Compare with pessimistic and optimistic locking\n• Build optimistic, pessimistic, and distributed lock implementations\n• Handle lock expiration and deadlocks\n• Design lock-based concurrency control',
        
        // Phase 6: API & Gateway
        'idempotency': 'Learning Outcomes:\n• Understand idempotency and its use cases\n• Implement idempotent APIs\n• Handle idempotency keys and tokens\n• Design idempotent payment and transaction APIs\n• Prevent duplicate operations',
        'api-gateway': 'Learning Outcomes:\n• Implement API Gateway patterns (Kong, AWS API Gateway)\n• Configure rate limiting and throttling\n• Handle request/response transformation\n• Implement API versioning and documentation\n• Set up authentication at gateway level\n• Build circuit breaking and fallback mechanisms',
        'geohashing': 'Learning Outcomes:\n• Understand how GeoHashing works\n• Compare GeoHashing with quadtrees\n• Use databases with GeoHashing for location search\n• Find nearby drivers/users using spatial indexes\n• Build scalable location-based APIs',
        'aws-db': 'Learning Outcomes:\n• Use AWS RDS for relational databases\n• Configure AWS DocumentDB and MongoDB Atlas\n• Master Amazon DynamoDB\n• Implement Amazon S3 for blob storage\n• Use Amazon Redshift for analytics',
        'aws-lambda': 'Learning Outcomes:\n• Create serverless functions in AWS Lambda\n• Set up permissions using IAM\n• Integrate Lambda with ELB\n• Build event-driven architectures\n• Optimize Lambda performance and costs',
        
        // Phase 7: Projects
        'uber-project': 'Learning Outcomes:\n• Build Uber-like ride hailing backend with HLD & LLD\n• Implement GeoHashing for driver-rider matching\n• Use databases for spatial queries\n• Build scalable APIs for real-time location tracking\n• Implement WebSockets for real-time notifications\n• Design order matching and pricing algorithms',
        'wallet-project': 'Learning Outcomes:\n• Build payment wallet system (Paytm/Uber wallet)\n• Handle distributed transactions for financial systems\n• Integrate high-consistency databases\n• Optimize SAGA using choreography and orchestration\n• Implement idempotent payment APIs\n• Design ledger and transaction systems',
        'airbnb-project': 'Learning Outcomes:\n• Setup microservices-based hotel booking application\n• Integrate MySQL and MongoDB for different services\n• Implement JWT-based authentication\n• Handle concurrency issues with transactional APIs\n• Build idempotent booking APIs\n• Integrate migrations in MySQL',
        'stock-project': 'Learning Outcomes:\n• Build stock exchange for order matching (like NSE)\n• Understand order matching algorithms\n• Implement design patterns (Strategy, Builder)\n• Maintain order book in memory using Redis\n• Create limit order algorithms\n• Master multi-threading for scalable exchange',
        'quora-project': 'Learning Outcomes:\n• Build Quora clone with Q&A and social features\n• Understand complex schema setup\n• Implement MVC architecture with services/repositories\n• Build complex ODM queries\n• Integrate ElasticSearch for inverted index search\n• Design feed generation pipelines',
        'ecommerce-project': 'Learning Outcomes:\n• Build monolithic ecommerce application\n• Understand Spring Boot annotations\n• Integrate databases and understand services/repositories\n• Implement REST APIs in industry standard format\n• Design product catalog and order management\n• Handle inventory and payment flows',
        
        // Legacy entries (keeping for compatibility)
        'eureka': 'Learning Outcomes:\n• Implement Service Discovery using Spring Cloud Netflix Eureka\n• Register and discover microservices\n• Handle service health checks\n• Configure Eureka server and clients\n• Build resilient service communication',
        'resilience': 'Learning Outcomes:\n• Implement Circuit Breakers for fault tolerance\n• Build fallback mechanisms\n• Handle cascading failures\n• Monitor and manage service resilience\n• Implement retry and timeout strategies',
        'cdc': 'Learning Outcomes:\n• Configure databases for Change Data Capture\n• Implement CDC using Debezium\n• Capture database changes in real-time\n• Stream changes to event bus\n• Handle schema evolution',
        'docker': 'Learning Outcomes:\n• Containerize Spring Boot applications\n• Understand Docker networking\n• Build multi-stage Dockerfiles\n• Optimize Docker images\n• Manage container lifecycle',
        'k8s': 'Learning Outcomes:\n• Deploy applications to Kubernetes\n• Configure Deployments, Services, and Ingress\n• Manage pods and replicas\n• Implement health checks and probes\n• Scale applications horizontally',
        'chaos': 'Learning Outcomes:\n• Implement chaos engineering practices\n• Test system resilience\n• Simulate failures and recovery\n• Build fault-tolerant systems\n• Monitor system behavior under stress'
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
