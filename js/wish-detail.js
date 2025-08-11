// Removed TextAnimator import - no scrambling in modal

export class WishDetailModal {
    constructor() {
        this.modal = null;
        this.isOpen = false;
        this.currentWish = null;
        this.timeline = null;
        this.textAnimators = [];
        this.init();
    }

    init() {
        this.createModalStructure();
        this.attachEventListeners();
    }

    createModalStructure() {
        const modalHTML = `
            <div id="wish-detail-modal" class="wish-modal">
                <div class="wish-modal__overlay"></div>
                <div class="wish-modal__content">
                    <button class="wish-modal__close" aria-label="Close modal">
                        <span>×</span>
                    </button>
                    
                    <div class="wish-modal__header">
                        <span class="wish-modal__id">WISH #<span id="modal-wish-id"></span></span>
                        <span class="wish-modal__category" id="modal-wish-category"></span>
                    </div>

                    <div class="wish-modal__body">
                        <section class="wish-modal__wish-section">
                            <h2 class="wish-modal__title">YOUR WISH</h2>
                            <div class="wish-modal__wish-text" id="modal-wish-text"></div>
                            <div class="wish-modal__timestamp" id="modal-wish-timestamp"></div>
                        </section>

                        <section class="wish-modal__solutions-section">
                            <h2 class="wish-modal__title">HOW WE CAN HELP</h2>
                            <div class="wish-modal__solutions" id="modal-solutions"></div>
                        </section>

                        <section class="wish-modal__offer-section">
                            <h2 class="wish-modal__title">RECOMMENDED SOLUTION</h2>
                            <div class="wish-modal__offer" id="modal-offer">
                                <div class="offer-card">
                                    <h3 class="offer-card__title" id="offer-title"></h3>
                                    <p class="offer-card__description" id="offer-description"></p>
                                    <div class="offer-card__features" id="offer-features"></div>
                                    <div class="offer-card__cta">
                                        <a href="https://grantbot.co/" target="_blank" class="offer-card__button">
                                            LEARN MORE AT GRANTBOT.CO →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('wish-detail-modal');
    }

    attachEventListeners() {
        const closeBtn = this.modal.querySelector('.wish-modal__close');
        const overlay = this.modal.querySelector('.wish-modal__overlay');

        closeBtn.addEventListener('click', () => this.close());
        overlay.addEventListener('click', () => this.close());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    open(wishData) {
        if (this.isOpen) return;

        this.currentWish = wishData;
        this.isOpen = true;
        
        this.populateModal(wishData);
        this.modal.classList.add('wish-modal--active');
        
        requestAnimationFrame(() => {
            this.animateIn();
        });

        document.body.style.overflow = 'hidden';
    }

    close() {
        if (!this.isOpen) return;

        this.animateOut(() => {
            this.modal.classList.remove('wish-modal--active');
            this.isOpen = false;
            this.currentWish = null;
            document.body.style.overflow = '';
            this.cleanupAnimators();
        });
    }

    populateModal(wishData) {
        document.getElementById('modal-wish-id').textContent = wishData.id;
        document.getElementById('modal-wish-category').textContent = wishData.category;
        document.getElementById('modal-wish-text').textContent = wishData.text;
        document.getElementById('modal-wish-timestamp').textContent = wishData.timestamp;

        const solutions = this.generateSolutions(wishData);
        const solutionsContainer = document.getElementById('modal-solutions');
        solutionsContainer.innerHTML = solutions.map((solution, index) => `
            <div class="solution-item" style="--index: ${index}">
                <span class="solution-item__number">${String(index + 1).padStart(2, '0')}</span>
                <span class="solution-item__text">${solution}</span>
            </div>
        `).join('');

        const offer = this.matchOffer(wishData);
        document.getElementById('offer-title').textContent = offer.title;
        document.getElementById('offer-description').textContent = offer.description;
        
        const featuresContainer = document.getElementById('offer-features');
        featuresContainer.innerHTML = offer.features.map(feature => `
            <div class="offer-feature">
                <span class="offer-feature__icon">▶</span>
                <span class="offer-feature__text">${feature}</span>
            </div>
        `).join('');
    }

    generateSolutions(wishData) {
        const { category, text } = wishData;
        const textLower = text.toLowerCase();
        
        const solutionMap = {
            'career': [
                'Automate your job search with AI-powered application tracking',
                'Generate personalized cover letters and resume optimization',
                'Set up automated LinkedIn outreach and networking workflows',
                'Create a personal brand content pipeline with AI assistance'
            ],
            'financial': [
                'Implement automated expense tracking and budget monitoring',
                'Set up intelligent invoice generation and payment reminders',
                'Create financial dashboards with real-time insights',
                'Automate investment research and portfolio tracking'
            ],
            'personal': [
                'Design personalized habit tracking and goal monitoring systems',
                'Build automated reminder and accountability workflows',
                'Create AI-powered journaling and reflection practices',
                'Set up intelligent time management and scheduling'
            ],
            'productivity': [
                'Eliminate repetitive tasks with custom automation workflows',
                'Implement AI-powered email and communication management',
                'Create intelligent project tracking and deadline monitoring',
                'Build automated documentation and knowledge management'
            ],
            'educational': [
                'Generate personalized learning paths and study guides',
                'Create automated research and note-taking workflows',
                'Build AI-powered quiz and assessment systems',
                'Set up intelligent progress tracking and skill monitoring'
            ],
            'health': [
                'Design automated health tracking and wellness monitoring',
                'Create personalized workout and nutrition planning systems',
                'Implement medication and appointment reminder workflows',
                'Build AI-powered health insights and recommendations'
            ]
        };

        const defaultSolutions = [
            'Analyze your current workflows to identify automation opportunities',
            'Design custom AI agents tailored to your specific needs',
            'Implement intelligent task management and prioritization',
            'Create personalized dashboards for tracking progress'
        ];

        if (textLower.includes('time') || textLower.includes('busy')) {
            return [
                'Save 20+ hours per week with intelligent task automation',
                'Delegate repetitive work to AI-powered virtual assistants',
                'Streamline your workflow with custom automation solutions',
                'Focus on high-value activities while AI handles the rest'
            ];
        }

        if (textLower.includes('money') || textLower.includes('income') || textLower.includes('financial')) {
            return solutionMap['financial'];
        }

        if (textLower.includes('learn') || textLower.includes('skill') || textLower.includes('study')) {
            return solutionMap['educational'];
        }

        return solutionMap[category.toLowerCase()] || defaultSolutions;
    }

    matchOffer(wishData) {
        const { category, text } = wishData;
        const textLower = text.toLowerCase();

        const offers = {
            automation: {
                title: 'WORKFLOW AUTOMATION SUITE',
                description: 'Transform your repetitive tasks into automated workflows that run 24/7. Our AI-powered automation platform learns your processes and executes them flawlessly.',
                features: [
                    'Custom workflow design in 5 business days',
                    'Integration with your existing tools',
                    'Save 20+ hours per week',
                    'Continuous optimization and improvements'
                ]
            },
            assistant: {
                title: 'EXECUTIVE ASSISTANT OS',
                description: 'Get a comprehensive AI assistant that manages your calendar, emails, tasks, and communications. Like having a full-time executive assistant at a fraction of the cost.',
                features: [
                    'Intelligent email and calendar management',
                    'Automated meeting scheduling and follow-ups',
                    'Task prioritization and deadline tracking',
                    'Personalized daily briefings and insights'
                ]
            },
            content: {
                title: 'CONTENT GENERATION ENGINE',
                description: 'Create high-quality content at scale with our AI-powered content generation system. From blog posts to social media, we automate your entire content pipeline.',
                features: [
                    'AI-generated content tailored to your voice',
                    'Multi-channel content distribution',
                    'SEO optimization and keyword research',
                    'Automated social media scheduling'
                ]
            },
            business: {
                title: 'BUSINESS PROCESS OPTIMIZATION',
                description: 'Revolutionize your business operations with end-to-end process automation. We analyze, optimize, and automate your critical business workflows.',
                features: [
                    'Comprehensive workflow assessment',
                    'Custom automation implementation',
                    'CRM and sales pipeline automation',
                    'Performance metrics and reporting'
                ]
            },
            productivity: {
                title: 'PRODUCTIVITY MULTIPLIER',
                description: 'Double your team\'s output without hiring. Our AI-powered productivity suite eliminates bottlenecks and supercharges your team\'s efficiency.',
                features: [
                    'Team collaboration automation',
                    'Project management AI assistance',
                    'Automated reporting and analytics',
                    'Knowledge base and documentation AI'
                ]
            }
        };

        if (textLower.includes('automat') || textLower.includes('repetitive') || textLower.includes('workflow')) {
            return offers.automation;
        }

        if (textLower.includes('assistant') || textLower.includes('help') || textLower.includes('manage')) {
            return offers.assistant;
        }

        if (textLower.includes('content') || textLower.includes('write') || textLower.includes('create')) {
            return offers.content;
        }

        if (textLower.includes('business') || textLower.includes('company') || textLower.includes('revenue')) {
            return offers.business;
        }

        const categoryOfferMap = {
            'career': offers.assistant,
            'financial': offers.business,
            'personal': offers.productivity,
            'productivity': offers.productivity,
            'educational': offers.content,
            'health': offers.assistant
        };

        return categoryOfferMap[category.toLowerCase()] || offers.automation;
    }

    animateIn() {
        // Simple, fast animation
        gsap.set('.wish-modal__overlay', { opacity: 1 });
        gsap.set('.wish-modal__content', { opacity: 1, scale: 1, y: 0 });
        gsap.set('.wish-modal__header > *', { opacity: 1, y: 0 });
        gsap.set('.wish-modal__body section', { opacity: 1, y: 0 });
    }

    animateOut(callback) {
        // Instant close
        gsap.set('.wish-modal__overlay', { opacity: 0 });
        gsap.set('.wish-modal__content', { opacity: 0 });
        if (callback) callback();
    }

    cleanupAnimators() {
        this.textAnimators.forEach(animator => {
            if (animator.reset) animator.reset();
        });
        this.textAnimators = [];
    }
}