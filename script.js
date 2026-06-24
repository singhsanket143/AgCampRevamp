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
        // threshold 0: tall sections (e.g. #spring-boot-detail on mobile) can never
        // reach 10% intersection ratio because stacked content exceeds viewport height
        threshold: 0
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
        // Phase 1: Python & LLM Foundations
        'python-refresher': 'Learning Outcomes:\n• Python basics, OOP, error handling & file I/O\n• Type hints & Pydantic for validated data models\n• Async Python for concurrent AI workflows\n• NumPy/Pandas foundations for data prep\n• Build reusable AI utility modules',
        'llm-mental-model': 'Learning Outcomes:\n• Understand tokens, context windows & sampling\n• Compare temperature, top-p & max tokens\n• Reason about model capacity vs cost\n• Map prompt size to latency trade-offs\n• Build mental models for LLM behavior',
        'llm-api-setup': 'Learning Outcomes:\n• Configure OpenAI & Gemini API clients\n• Understand LLM API request/response anatomy\n• Handle API keys, models & endpoints securely\n• Debug failed completions & rate limits\n• Compare provider pricing & capabilities',
        'first-chatbot': 'Learning Outcomes:\n• Implement chat roles: system, user & assistant\n• Write effective system prompts\n• Manage multi-turn conversation history\n• Build your first production chatbot\n• Handle context window overflow gracefully',
        'prompt-engineering': 'Learning Outcomes:\n• Zero-shot, one-shot & few-shot prompting\n• Chain-of-Thought (CoT) reasoning techniques\n• Context engineering for better outputs\n• Manage context window with summarization\n• Iterate prompts with structured evaluation',
        'structured-prompts': 'Learning Outcomes:\n• Enforce structured JSON outputs from LLMs\n• Design prompt templates for consistency\n• Context window management strategies\n• Reduce hallucinations with constraints\n• Build reusable prompt libraries',
        'text-tasks': 'Learning Outcomes:\n• Build summarization & translation pipelines\n• Route support tickets with classification\n• Generate and explain code with LLMs\n• Project: OpenAI API utilities library\n• Project: Customer Support Agent',

        // Phase 2: LLM Applications
        'llm-applications': 'Learning Outcomes:\n• Structure end-to-end LLM applications\n• JSON outputs, error handling & batching\n• Rate limit handling & retry strategies\n• Separate prompts, tools & business logic\n• Ship maintainable AI app architectures',
        'fastapi-ai': 'Learning Outcomes:\n• Build FastAPI endpoints for AI workloads\n• Async request handling for LLM calls\n• Request validation with Pydantic models\n• Streaming responses with SSE\n• Deploy AI microservices with FastAPI',
        'function-calling': 'Learning Outcomes:\n• Implement function calling & tool use\n• Parallel & forced tool call patterns\n• Connect LLMs to external APIs & databases\n• Design tool schemas for reliability\n• Debug tool selection & execution loops',
        'pydantic-outputs': 'Learning Outcomes:\n• Parse LLM outputs into Pydantic models\n• Validate structured responses at runtime\n• Handle partial & malformed JSON gracefully\n• Build type-safe AI pipelines\n• Reduce post-processing boilerplate',
        'openai-claude-sdk': 'Learning Outcomes:\n• Master OpenAI Python SDK patterns\n• Integrate Anthropic Claude SDK\n• Compare SDK features across providers\n• Switch models with minimal code changes\n• Handle streaming & async with both SDKs',
        'embeddings': 'Learning Outcomes:\n• Generate and compare text embeddings\n• Build semantic search over documents\n• Measure embedding quality & similarity\n• Project: Exploring Embeddings\n• Choose embedding models for your use case',
        'vector-databases': 'Learning Outcomes:\n• Store & query vectors with ChromaDB\n• Deploy Pinecone for managed vector search\n• Evaluate Milvus for large-scale retrieval\n• Index, filter & hybrid search patterns\n• Project: RAG Chatbot over YouTube Transcripts',

        // Phase 3: RAG Systems
        'rag-fundamentals': 'Learning Outcomes:\n• Build RAG pipelines with LangChain\n• Chunk, embed & retrieve documents\n• Implement hybrid search (keyword + vector)\n• Tune top-k, chunk size & overlap\n• Ground LLM answers in retrieved context',
        'enterprise-rag': 'Learning Outcomes:\n• Advanced RAG: reranking & query rewriting\n• Multi-stage retrieval pipelines\n• RAGAS metrics for faithfulness & relevance\n• Handle enterprise document corpora\n• Reduce retrieval noise at scale',
        'llamaindex-rag': 'Learning Outcomes:\n• Production RAG with LlamaIndex\n• Index management & query engines\n• Connect to diverse data sources\n• Optimize ingestion & retrieval latency\n• Compare LlamaIndex vs LangChain patterns',
        'scalable-rag': 'Learning Outcomes:\n• Scale RAG with Python RQ job queues\n• Redis/Valkey for async task processing\n• FastAPI chat queue for concurrent users\n• Background embedding & indexing jobs\n• Handle burst traffic on RAG endpoints',
        'huggingface-models': 'Learning Outcomes:\n• Navigate Hugging Face Hub & model cards\n• Load models with AutoModel & AutoTokenizer\n• Run Gemma & other open models locally\n• Choose pre-trained models for tasks\n• Deploy HF models in production pipelines',
        'document-qa': 'Learning Outcomes:\n• Build Document Q&A with pre-trained models\n• Fine-tune retrieval for domain documents\n• Handle PDFs, markdown & structured docs\n• Evaluate answer quality on real corpora\n• Ship Chat-with-Docs experiences',
        'rag-evaluation': 'Learning Outcomes:\n• Evaluate RAG with RAGAS framework\n• Bucket failures: retrieval vs generation\n• Three gulfs model for AI system gaps\n• Build automated eval pipelines\n• Iterate RAG based on measured metrics',

        // Phase 4: AI Agents
        'multimodal-hf': 'Learning Outcomes:\n• Computer vision with Hugging Face models\n• Speech-to-text & text-to-speech pipelines\n• CLIP for image-text understanding\n• Visual Q&A & diffusion model basics\n• Combine modalities in unified workflows',
        'ai-agents': 'Learning Outcomes:\n• Build first agents with smolagents\n• Define tools & agent reasoning loops\n• Agentic RAG over dynamic knowledge\n• Handle tool errors & agent recovery\n• Design single-agent task workflows',
        'multi-agent': 'Learning Outcomes:\n• Multi-agent patterns with AutoGen & CrewAI\n• A2A Protocol & subagent delegation\n• Role-based agent teams for complex tasks\n• Coordinate agents with shared state\n• Debug multi-agent communication flows',
        'langgraph': 'Learning Outcomes:\n• Stateful workflows with LangGraph StateGraph\n• Checkpointing agent state with MongoDB\n• Project: Claude Code-like Coding Agent\n• Visual workflows with LangFlow\n• Build resumable, debuggable agent graphs',
        'agent-memory': 'Learning Outcomes:\n• Short-term vs long-term agent memory\n• Vector-backed memory for recall\n• Integrate Mem0 for persistent memory\n• Memory pruning & relevance scoring\n• Design memory layers for production agents',
        'knowledge-graphs': 'Learning Outcomes:\n• Graph memory with Neo4j & Kuzu\n• Write Cypher queries for knowledge retrieval\n• Connect LLMs to structured knowledge graphs\n• Hybrid graph + vector retrieval\n• Build entity-aware agent reasoning',
        'voice-agents': 'Learning Outcomes:\n• STT → LLM → TTS voice agent pipeline\n• Real-time voice interaction patterns\n• Handle latency & interruption in voice UX\n• Project: Voice-Based AI Agent\n• Deploy voice agents with WebSocket streaming',
        'mcp-agents': 'Learning Outcomes:\n• Build MCP servers for tool exposure\n• Integrate Agent SDK tools in workflows\n• Project: AI Code Reviewer like CodeRabbit\n• Standardize agent-tool interfaces with MCP\n• Connect agents to IDE & dev workflows',

        // Phase 5: Production AI
        'streaming-retries': 'Learning Outcomes:\n• Stream LLM responses with SSE\n• Exponential backoff & retry strategies\n• Fallback models & LLM Gateway patterns\n• Handle rate limits gracefully\n• Build resilient production AI APIs',
        'local-llm': 'Learning Outcomes:\n• Deploy local LLMs with Ollama\n• Containerize with Docker & OpenWebUI\n• FastAPI endpoints on local models\n• Compare local vs cloud cost/latency\n• Hybrid routing between local & cloud LLMs',
        'prompt-caching': 'Learning Outcomes:\n• Anthropic & OpenAI prompt caching\n• KV cache optimization for inference\n• Batching requests for cost savings\n• Measure latency vs cost trade-offs\n• Optimize production AI spend',
        'observability': 'Learning Outcomes:\n• Trace LLM calls with Langfuse & LangSmith\n• Braintrust for eval-driven development\n• OpenTelemetry GenAI instrumentation\n• Debug production agent failures\n• Build dashboards for AI system health',
        'llm-evaluations': 'Learning Outcomes:\n• LLM-as-judge evaluation patterns\n• RAGAS & custom eval metrics\n• Failure bucketing & regression tests\n• Three gulfs model for system gaps\n• Continuous eval in CI/CD pipelines',
        'security-guardrails': 'Learning Outcomes:\n• OWASP LLM Top 10 vulnerabilities\n• NeMo Guardrails for output filtering\n• Prompt injection testing & mitigation\n• Responsible AI deployment practices\n• Adversarial testing for production systems',
        'llmops': 'Learning Outcomes:\n• MLOps & LLMOps lifecycle management\n• RAG vs fine-tuning decision framework\n• Model governance & versioning\n• Production moderation & guardrails\n• Project: AI Trading Agent with risk controls',

        // Phase 6: Deep Learning
        'pytorch-foundations': 'Learning Outcomes:\n• Linear algebra & gradient descent fundamentals\n• PyTorch tensors & autograd\n• Training loops & loss functions\n• Mini Project: TensorFlow NN\n• Mini Project: MNIST Autoencoder',
        'computer-vision': 'Learning Outcomes:\n• CNN architectures & convolution layers\n• Batch normalization & regularization\n• Vanishing gradient problem & solutions\n• Image classification pipelines\n• Transfer learning with pre-trained CNNs',
        'sequence-models': 'Learning Outcomes:\n• RNNs, LSTMs & GRUs for sequences\n• Multi-input/output architectures\n• Project: Multi-Input OCR Models\n• Sequence-to-sequence modeling\n• Handle variable-length inputs',
        'transformers-scratch': 'Learning Outcomes:\n• Self-attention mechanism from scratch\n• BPE tokenization implementation\n• GPT vs BERT architecture differences\n• Positional encoding & multi-head attention\n• Build transformer blocks in PyTorch',
        'generative-models': 'Learning Outcomes:\n• GANs & VAEs for generative modeling\n• Training stability & mode collapse\n• TensorBoard for experiment tracking\n• Generate images & latent space exploration\n• Compare generative model families',
        'llm-internals': 'Learning Outcomes:\n• KV Cache & Flash Attention internals\n• Mixture of Experts (MoE) architecture\n• RLHF & alignment fundamentals\n• DeepSeek & modern LLM innovations\n• Connect theory to production LLM behavior',
        'fine-tuning-lora': 'Learning Outcomes:\n• LoRA & QLoRA parameter-efficient fine-tuning\n• Fine-tune with Unsloth for speed\n• Diffusion models & ViT/CLIP trends\n• Choose fine-tuning vs RAG vs prompting\n• Deploy fine-tuned models in production',

        // Phase 7: Projects
        'coding-agent-project': 'Learning Outcomes:\n• Build a Claude Code-like coding agent\n• LangGraph stateful file-editing workflows\n• MCP tools for repo navigation & edits\n• E2B sandbox for safe code execution\n• Ship an autonomous dev assistant',
        'enterprise-rag-project': 'Learning Outcomes:\n• Enterprise RAG with hybrid search\n• Reranking & query decomposition\n• Multi-tenant document ingestion\n• RAGAS eval suite for production QA\n• Deploy scalable retrieval pipelines',
        'customer-support-project': 'Learning Outcomes:\n• Customer Support Agent with ticket routing\n• Multi-turn conversation with tool use\n• Structured outputs for ticket classification\n• Integrate knowledge base via RAG\n• Measure resolution rate & CSAT proxies',
        'youtube-rag-project': 'Learning Outcomes:\n• Ingest YouTube transcripts at scale\n• Pinecone vector store for semantic search\n• RAG chatbot over video content\n• Chunk long transcripts effectively\n• Cite sources in generated answers',
        'code-reviewer-project': 'Learning Outcomes:\n• AI Code Reviewer like CodeRabbit\n• MCP server for PR diff analysis\n• Structured review comments with severity\n• Agent SDK for multi-file context\n• Integrate into developer workflows',
        'voice-agent-project': 'Learning Outcomes:\n• Voice-Based AI Agent end-to-end\n• STT → LLM → TTS real-time pipeline\n• Handle interruptions & turn-taking\n• Voice UX for hands-free interaction\n• Deploy with low-latency streaming',
        'perplexity-project': 'Learning Outcomes:\n• AI Search Engine like Perplexity\n• Agentic web retrieval with citations\n• Hybrid search over web + vector index\n• Streaming answers with source links\n• Faithfulness evaluation on responses',
        'lovable-project': 'Learning Outcomes:\n• AI Web App Builder like Lovable/v0\n• Multi-agent: planner → coder → reviewer\n• Prompt-to-app with live preview\n• E2B sandbox for generated code\n• Ship working web apps from natural language',
        'ai-interview-project': 'Learning Outcomes:\n• AI Interview Taker like Mercor\n• Voice interviews with scoring rubrics\n• Pydantic-structured candidate evaluation\n• Technical & behavioral question flows\n• Post-interview hiring reports',
        'chat-doc-project': 'Learning Outcomes:\n• Chat With Any Document (ChatPDF-style)\n• Chunk, embed & index PDFs & docs\n• Grounded Q&A with source citations\n• ChromaDB for document retrieval\n• Handle large document corpora',
        'trading-agent-project': 'Learning Outcomes:\n• AI Trading Agent (Bonus project)\n• Ingest market data & financial news\n• Agentic RAG over trading signals\n• Structured trade ideas with risk controls\n• Responsible deployment guardrails',
        'dl-mini-projects': 'Learning Outcomes:\n• TensorFlow neural network from scratch\n• MNIST Autoencoder for representation learning\n• Multi-Input OCR model project\n• Training loops, metrics & visualization\n• Bridge deep learning theory to practice'
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

        // Laser Line Effect (Mouse Tracking) — desktop only
        roadmapContainer.addEventListener('mousemove', (e) => {
            if (!window.matchMedia('(min-width: 768px)').matches) return;
            const rect = roadmapContainer.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const percent = Math.min(Math.max((y / rect.height) * 100, 0), 100);

            roadmapLineProgress.classList.add('laser-active');
            roadmapLineProgress.style.height = `${percent}%`;
        });

        roadmapContainer.addEventListener('mouseleave', () => {
            if (!window.matchMedia('(min-width: 768px)').matches) return;
            roadmapLineProgress.classList.remove('laser-active');
        });
    }

    // Mobile portfolio: reveal remaining projects
    const portfolioToggle = document.getElementById('portfolio-mobile-toggle');
    const portfolioMore = document.querySelector('.portfolio-mobile-more');
    if (portfolioToggle && portfolioMore) {
        portfolioToggle.addEventListener('click', () => {
            portfolioMore.classList.remove('hidden');
            portfolioToggle.remove();
            lucide.createIcons();
        });
    }

    // Mobile roadmap: expand collapsed topic lists
    document.querySelectorAll('.roadmap-show-more').forEach(btn => {
        btn.addEventListener('click', () => {
            const phase = btn.closest('.roadmap-phase');
            if (!phase) return;
            phase.querySelectorAll('.roadmap-topic-extra').forEach(item => {
                item.classList.remove('hidden');
                item.classList.add('flex');
            });
            btn.remove();
        });
    });

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

        // Tap-to-preview learning outcomes on touch devices
        if (window.matchMedia('(hover: none)').matches) {
            keyword.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                keyword.dispatchEvent(new MouseEvent('mouseenter', {
                    clientX: e.clientX,
                    clientY: e.clientY,
                    bubbles: true
                }));
            });
        }
    });

    if (window.matchMedia('(hover: none)').matches && codeTerminal) {
        document.addEventListener('click', () => {
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
    }
});
