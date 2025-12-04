// ============================================
// TRANSACTIONS PAGE FUNCTIONALITY
// ============================================

let allTransactions = [];
let filteredTransactions = [];
let currentPage = 1;
const itemsPerPage = 10;

// Current filters
let activeFilters = {
    type: 'all',
    status: 'all',
    search: '',
    dateFrom: '',
    dateTo: ''
};

document.addEventListener('DOMContentLoaded', () => {
    // Load transactions
    loadTransactions();

    // Load saved filters from localStorage
    loadSavedFilters();

    // Set up event listeners
    setupEventListeners();

    // Display transactions
    applyFiltersAndDisplay();
});

// Load transactions from localStorage or generate sample data
function loadTransactions() {
    // Check for existing transactions
    const stored = localStorage.getItem('baricoinAllTransactions');

    if (stored) {
        allTransactions = JSON.parse(stored);
    } else {
        // Generate sample transactions for demo
        allTransactions = generateSampleTransactions();
        localStorage.setItem('baricoinAllTransactions', JSON.stringify(allTransactions));
    }
}

// Generate sample transactions
function generateSampleTransactions() {
    const types = ['transfer', 'giftcard', 'crypto', 'bills', 'airtime', 'data'];
    const statuses = ['completed', 'pending', 'failed'];
    const transactions = [];

    for (let i = 0; i < 50; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const status = i < 40 ? 'completed' : statuses[Math.floor(Math.random() * statuses.length)];
        const amount = Math.floor(Math.random() * 100000) + 1000;
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 90));

        transactions.push({
            id: `TXN${Date.now()}${i}`,
            type,
            description: getDescriptionForType(type),
            amount,
            status,
            date: date.toISOString()
        });
    }

    return transactions;
}

// Get description based on type
function getDescriptionForType(type) {
    const descriptions = {
        transfer: 'Money Transfer',
        giftcard: 'iTunes Gift Card',
        crypto: 'Bitcoin Sale',
        bills: 'Cable Subscription',
        airtime: 'MTN Airtime Purchase',
        data: 'Glo Data Bundle'
    };
    return descriptions[type] || 'Transaction';
}

// Setup event listeners
function setupEventListeners() {
    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update filter
            activeFilters.type = tab.getAttribute('data-filter');
            currentPage = 1;
            applyFiltersAndDisplay();
        });
    });

    // Search input
    const searchInput = document.getElementById('transactionSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            activeFilters.search = e.target.value.toLowerCase();
            currentPage = 1;
            applyFiltersAndDisplay();
        });
    }

    // Status filter
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', (e) => {
            activeFilters.status = e.target.value;
            currentPage = 1;
            applyFiltersAndDisplay();
        });
    }

    // Date filters
    const dateFrom = document.getElementById('dateFrom');
    const dateTo = document.getElementById('dateTo');

    if (dateFrom) {
        dateFrom.addEventListener('change', (e) => {
            activeFilters.dateFrom = e.target.value;
            currentPage = 1;
            applyFiltersAndDisplay();
        });
    }

    if (dateTo) {
        dateTo.addEventListener('change', (e) => {
            activeFilters.dateTo = e.target.value;
            currentPage = 1;
            applyFiltersAndDisplay();
        });
    }

    // Clear filters button
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllFilters);
    }

    // Export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportToCSV);
    }

    // Pagination buttons
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayTransactions();
                updatePagination();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayTransactions();
                updatePagination();
            }
        });
    }

    // Modal close button
    const closeDetailsBtn = document.getElementById('closeDetailsModal');
    if (closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', () => hideModal('transactionDetailsModal'));
    }
}

// Apply all filters and display
function applyFiltersAndDisplay() {
    // Start with all transactions
    filteredTransactions = allTransactions.filter(transaction => {
        // Type filter
        if (activeFilters.type !== 'all' && transaction.type !== activeFilters.type) {
            return false;
        }

        // Status filter
        if (activeFilters.status !== 'all' && transaction.status !== activeFilters.status) {
            return false;
        }

        // Search filter
        if (activeFilters.search) {
            const searchLower = activeFilters.search.toLowerCase();
            if (!transaction.description.toLowerCase().includes(searchLower) &&
                !transaction.type.toLowerCase().includes(searchLower) &&
                !transaction.id.toLowerCase().includes(searchLower)) {
                return false;
            }
        }

        // Date range filter
        if (activeFilters.dateFrom || activeFilters.dateTo) {
            const txDate = new Date(transaction.date);
            txDate.setHours(0, 0, 0, 0);

            if (activeFilters.dateFrom) {
                const fromDate = new Date(activeFilters.dateFrom);
                fromDate.setHours(0, 0, 0, 0);
                if (txDate < fromDate) return false;
            }

            if (activeFilters.dateTo) {
                const toDate = new Date(activeFilters.dateTo);
                toDate.setHours(23, 59, 59, 999);
                if (txDate > toDate) return false;
            }
        }

        return true;
    });

    // Update results summary
    updateResultsSummary();

    // Display transactions
    displayTransactions();

    // Update pagination
    updatePagination();

    // Save filters to localStorage
    saveFilters();
}

// Load saved filters from localStorage
function loadSavedFilters() {
    const savedFilters = localStorage.getItem('baricoinTransactionFilters');

    if (savedFilters) {
        try {
            const filters = JSON.parse(savedFilters);

            // Restore filter values
            activeFilters = { ...activeFilters, ...filters };

            // Update UI elements
            if (filters.search) {
                document.getElementById('transactionSearch').value = filters.search;
            }
            if (filters.status && filters.status !== 'all') {
                document.getElementById('statusFilter').value = filters.status;
            }
            if (filters.dateFrom) {
                document.getElementById('dateFrom').value = filters.dateFrom;
            }
            if (filters.dateTo) {
                document.getElementById('dateTo').value = filters.dateTo;
            }
            if (filters.type && filters.type !== 'all') {
                // Update active filter tab
                const filterTabs = document.querySelectorAll('.filter-tab');
                filterTabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.getAttribute('data-filter') === filters.type) {
                        tab.classList.add('active');
                    }
                });
            }
        } catch (e) {
            console.error('Error loading saved filters:', e);
        }
    }
}

// Save filters to localStorage
function saveFilters() {
    localStorage.setItem('baricoinTransactionFilters', JSON.stringify(activeFilters));
}

// Display transactions
function displayTransactions() {
    const tbody = document.getElementById('transactionsBody');

    if (filteredTransactions.length === 0) {
        tbody.innerHTML = `
            <tr class="empty-state">
                <td colspan="6">
                    <div class="empty-transactions">
                        <p>No transactions found</p>
                        <span>Try adjusting your filters</span>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageTransactions = filteredTransactions.slice(startIndex, endIndex);

    tbody.innerHTML = pageTransactions.map(tx => `
        <tr>
            <td>
                <span class="transaction-type-badge type-${tx.type}">
                    ${tx.type}
                </span>
            </td>
            <td>${tx.description}</td>
            <td class="transaction-amount">₦${tx.amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>
                <span class="transaction-status status-${tx.status}">
                    ${tx.status}
                </span>
            </td>
            <td class="transaction-date">${new Date(tx.date).toLocaleDateString('en-NG')}</td>
            <td>
                <button class="view-details-btn" onclick="viewTransactionDetails('${tx.id}')">View</button>
            </td>
        </tr>
    `).join('');
}

// Update results summary
function updateResultsSummary() {
    const summary = document.getElementById('resultsSummary');
    const resultCount = document.getElementById('resultCount');

    if (filteredTransactions.length > 0) {
        resultCount.textContent = filteredTransactions.length;
        summary.style.display = 'block';
    } else {
        summary.style.display = 'none';
    }
}

// Update pagination
function updatePagination() {
    const paginationContainer = document.getElementById('paginationContainer');
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }

    paginationContainer.style.display = 'flex';

    // Update page numbers
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('totalPages').textContent = totalPages;

    // Update button states
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Clear all filters
function clearAllFilters() {
    // Reset filters
    activeFilters = {
        type: 'all',
        status: 'all',
        search: '',
        dateFrom: '',
        dateTo: ''
    };

    // Reset UI
    document.getElementById('transactionSearch').value = '';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';

    // Reset active tab
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector('[data-filter="all"]').classList.add('active');

    // Clear saved filters from localStorage
    localStorage.removeItem('baricoinTransactionFilters');

    // Reset page and display
    currentPage = 1;
    applyFiltersAndDisplay();
}

// View transaction details
function viewTransactionDetails(txId) {
    const transaction = allTransactions.find(tx => tx.id === txId);
    if (!transaction) return;

    // Populate modal
    document.getElementById('detailId').textContent = transaction.id;
    document.getElementById('detailType').textContent = transaction.type;
    document.getElementById('detailDescription').textContent = transaction.description;
    document.getElementById('detailAmount').textContent = `₦${transaction.amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;
    document.getElementById('detailStatus').textContent = transaction.status;
    document.getElementById('detailDate').textContent = new Date(transaction.date).toLocaleString('en-NG');

    // Show modal
    showModal('transactionDetailsModal');
}

// Export to CSV
function exportToCSV() {
    if (filteredTransactions.length === 0) {
        alert('No transactions to export');
        return;
    }

    // Create CSV content
    const headers = ['Transaction ID', 'Type', 'Description', 'Amount', 'Status', 'Date'];
    const csvRows = [headers.join(',')];

    filteredTransactions.forEach(tx => {
        const row = [
            tx.id,
            tx.type,
            tx.description,
            tx.amount,
            tx.status,
            new Date(tx.date).toLocaleString('en-NG')
        ];
        csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `baricoin-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Modal utilities
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

console.log('Transactions page loaded');
