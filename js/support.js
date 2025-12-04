/**
 * Baricoin Support & FAQ System
 * Handles FAQ search, filtering, and accordion functionality
 */

class SupportSystem {
    constructor() {
        this.faqs = [];
        this.categories = [];
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.init();
    }

    async init() {
        await this.loadFAQData();
        this.renderCategories();
        this.renderFAQs();
        this.setupEventListeners();
    }

    async loadFAQData() {
        try {
            const response = await fetch('js/faq-data.json');
            const data = await response.json();
            this.faqs = data.faqs;
            this.categories = data.categories;
        } catch (error) {
            console.error('Error loading FAQ data:', error);
            this.faqs = [];
            this.categories = [];
        }
    }

    renderCategories() {
        const container = document.getElementById('faq-categories');
        if (!container) return;

        const categoriesHTML = `
            <button class="faq-category-btn active" data-category="all">
                📚 All FAQs
            </button>
            ${this.categories.map(cat => `
                <button class="faq-category-btn" data-category="${cat.id}">
                    ${cat.icon} ${cat.name}
                </button>
            `).join('')}
        `;

        container.innerHTML = categoriesHTML;
    }

    setupEventListeners() {
        // FAQ accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', (e) => {
                const faqItem = e.currentTarget.closest('.faq-item');
                const wasActive = faqItem.classList.contains('active');

                // Close all FAQs
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) answer.style.maxHeight = null;
                });

                // Open clicked FAQ if it wasn't active
                if (!wasActive) {
                    faqItem.classList.add('active');
                    const answer = faqItem.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                }
            });
        });

        // Search functionality
        const searchInput = document.getElementById('faq-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.renderFAQs();
            });
        }

        // Category filtering
        const categoryButtons = document.querySelectorAll('.faq-category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                categoryButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
                this.renderFAQs();
            });
        });

        // Helpful voting
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('helpful-btn')) {
                const faqId = e.target.dataset.faqId;
                this.markHelpful(faqId);
                e.target.textContent = '✓ Helpful';
                e.target.disabled = true;
            }
        });
    }

    getFilteredFAQs() {
        let filtered = this.faqs;

        // Filter by category
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(faq => faq.category === this.currentCategory);
        }

        // Filter by search query
        if (this.searchQuery) {
            filtered = filtered.filter(faq =>
                faq.question.toLowerCase().includes(this.searchQuery) ||
                faq.answer.toLowerCase().includes(this.searchQuery)
            );
        }

        return filtered;
    }

    renderFAQs() {
        const container = document.getElementById('faq-container');
        if (!container) return;

        const filteredFAQs = this.getFilteredFAQs();

        if (filteredFAQs.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--color-gray-600); padding: 3rem;">No FAQs found matching your search.</p>';
            return;
        }

        container.innerHTML = filteredFAQs.map(faq => `
            <div class="faq-item">
                <div class="faq-question">
                    <h3>${faq.question}</h3>
                    <div class="faq-icon">+</div>
                </div>
                <div class="faq-answer">
                    <div class="faq-answer-content">
                        ${faq.answer}
                        <div class="faq-helpful">
                            <button class="helpful-btn" data-faq-id="${faq.id}">Was this helpful?</button>
                            <span class="helpful-count">${faq.helpful} people found this helpful</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Re-attach event listeners
        this.setupEventListeners();
    }

    markHelpful(faqId) {
        const faq = this.faqs.find(f => f.id == faqId);
        if (faq) {
            faq.helpful++;
            // Store in localStorage
            const helpful = JSON.parse(localStorage.getItem('faqHelpful') || '[]');
            helpful.push(faqId);
            localStorage.setItem('faqHelpful', JSON.stringify(helpful));
        }
    }
}

// Initialize support system when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.SupportSystem = new SupportSystem();
    });
} else {
    window.SupportSystem = new SupportSystem();
}
