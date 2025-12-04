/**
 * Baricoin Blog System
 * Handles blog post loading, search, filtering, and pagination
 */

class BlogSystem {
    constructor() {
        this.posts = [];
        this.currentPage = 1;
        this.postsPerPage = 6;
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.init();
    }

    async init() {
        await this.loadBlogData();
        this.setupEventListeners();
        if (document.getElementById('blog-posts-container')) {
            this.renderPosts();
        }
    }

    async loadBlogData() {
        try {
            const response = await fetch('js/blog-data.json');
            const data = await response.json();
            this.posts = data.posts;
        } catch (error) {
            console.error('Error loading blog data:', error);
            this.posts = [];
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('blog-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.currentPage = 1;
                this.renderPosts();
            });
        }

        // Category filtering
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                categoryButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
                this.currentPage = 1;
                this.renderPosts();
            });
        });
    }

    getFilteredPosts() {
        let filtered = this.posts;

        // Filter by category
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(post =>
                post.category.toLowerCase() === this.currentCategory.toLowerCase()
            );
        }

        // Filter by search query
        if (this.searchQuery) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(this.searchQuery) ||
                post.excerpt.toLowerCase().includes(this.searchQuery) ||
                post.tags.some(tag => tag.toLowerCase().includes(this.searchQuery)) ||
                post.category.toLowerCase().includes(this.searchQuery)
            );
        }

        return filtered;
    }

    renderPosts() {
        const container = document.getElementById('blog-posts-container');
        if (!container) return;

        const filteredPosts = this.getFilteredPosts();
        const totalPages = Math.ceil(filteredPosts.length / this.postsPerPage);
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        const postsToShow = filteredPosts.slice(startIndex, endIndex);

        if (filteredPosts.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <p style="font-size: 1.5rem; color: var(--color-gray-600);">
                        No posts found matching your search.
                    </p>
                </div>
            `;
            this.renderPagination(0, 0);
            return;
        }

        container.innerHTML = postsToShow.map(post => this.createPostCard(post)).join('');
        this.renderPagination(filteredPosts.length, totalPages);
    }

    createPostCard(post) {
        return `
            <div class="blog-card reveal">
                <div class="blog-card-image">${post.image}</div>
                <div class="blog-card-content">
                    <div class="blog-card-meta">
                        <span class="blog-category-badge">${post.category}</span>
                        <span class="blog-reading-time">${post.readTime}</span>
                    </div>
                    <p class="blog-card-date">${post.date}</p>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="blog-card-footer">
                        <a href="blog-post.html?post=${post.slug}" class="read-more">Read more →</a>
                    </div>
                </div>
            </div>
        `;
    }

    renderPagination(totalPosts, totalPages) {
        const container = document.getElementById('blog-pagination');
        if (!container || totalPages <= 1) {
            if (container) container.innerHTML = '';
            return;
        }

        let paginationHTML = '<div class="pagination">';

        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `<button class="pagination-btn" onclick="window.BlogSystem.goToPage(${this.currentPage - 1})">← Previous</button>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                paginationHTML += `<button class="pagination-btn active">${i}</button>`;
            } else {
                paginationHTML += `<button class="pagination-btn" onclick="window.BlogSystem.goToPage(${i})">${i}</button>`;
            }
        }

        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `<button class="pagination-btn" onclick="window.BlogSystem.goToPage(${this.currentPage + 1})">Next →</button>`;
        }

        paginationHTML += '</div>';
        container.innerHTML = paginationHTML;
    }

    goToPage(page) {
        this.currentPage = page;
        this.renderPosts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Load individual blog post
    loadPost(slug) {
        const post = this.posts.find(p => p.slug === slug);
        if (!post) {
            console.error('Post not found:', slug);
            return;
        }

        // Update page title
        document.title = `${post.title} | Baricoin Blog`;
        document.getElementById('page-title').textContent = `${post.title} | Baricoin Blog`;

        // Update breadcrumb
        document.getElementById('breadcrumb-title').textContent = post.title;

        // Update post content
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-category').textContent = post.category;
        document.getElementById('post-reading-time').textContent = post.readTime;
        document.getElementById('post-author').textContent = post.author;
        document.getElementById('post-date').textContent = post.date;
        document.getElementById('post-image').textContent = post.image;
        document.getElementById('post-content').innerHTML = post.content;

        // Update tags
        const tagsContainer = document.getElementById('post-tags');
        tagsContainer.innerHTML = post.tags.map(tag =>
            `<span class="tag-badge">${tag}</span>`
        ).join('');

        // Load related posts
        this.loadRelatedPosts(post);
    }

    loadRelatedPosts(currentPost) {
        // Find posts in the same category, excluding current post
        let relatedPosts = this.posts.filter(post =>
            post.id !== currentPost.id && post.category === currentPost.category
        );

        // If not enough related posts, add posts with similar tags
        if (relatedPosts.length < 3) {
            const tagMatches = this.posts.filter(post =>
                post.id !== currentPost.id &&
                post.category !== currentPost.category &&
                post.tags.some(tag => currentPost.tags.includes(tag))
            );
            relatedPosts = [...relatedPosts, ...tagMatches];
        }

        // Take only 3 posts
        relatedPosts = relatedPosts.slice(0, 3);

        const container = document.getElementById('related-posts');
        if (!container) return;

        container.innerHTML = relatedPosts.map(post => `
            <a href="blog-post.html?post=${post.slug}" class="related-post-card">
                <div class="related-post-image">${post.image}</div>
                <div class="related-post-content">
                    <span class="blog-category-badge">${post.category}</span>
                    <h4>${post.title}</h4>
                    <p class="blog-card-date">${post.date}</p>
                </div>
            </a>
        `).join('');
    }

    // Get all categories
    getAllCategories() {
        const categories = ['all'];
        this.posts.forEach(post => {
            if (!categories.includes(post.category.toLowerCase())) {
                categories.push(post.category.toLowerCase());
            }
        });
        return categories;
    }
}

// Initialize blog system when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.BlogSystem = new BlogSystem();
    });
} else {
    window.BlogSystem = new BlogSystem();
}
