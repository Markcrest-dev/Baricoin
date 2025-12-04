// ============================================
// BARICOIN CHARTS & ANALYTICS SYSTEM
// ============================================

class ChartsManager {
    constructor() {
        this.charts = {};
        this.currentPeriod = '30D';
        this.mockData = {};

        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('Chart.js not loaded. Please include Chart.js library.');
            return;
        }

        this.init();
    }

    init() {
        // Generate mock data
        this.generateMockData();

        // Set Chart.js global defaults
        this.configureChartDefaults();

        // Initialize charts when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeCharts());
        } else {
            this.initializeCharts();
        }

        console.log('Charts Manager initialized');
    }

    // ============================================
    // CHART.JS GLOBAL CONFIGURATION
    // ============================================

    configureChartDefaults() {
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.color = '#64748b';
        Chart.defaults.plugins.legend.labels.usePointStyle = true;
        Chart.defaults.plugins.legend.labels.padding = 15;
    }

    // ============================================
    // MOCK DATA GENERATION
    // ============================================

    generateMockData() {
        // Balance history
        this.mockData.balanceHistory = this.generateBalanceHistory(90);

        // Transaction volume
        this.mockData.transactionVolume = this.generateTransactionVolume(12);

        // Crypto portfolio
        this.mockData.cryptoPortfolio = this.generateCryptoPortfolio();

        // Earnings
        this.mockData.earnings = this.generateEarnings(6);
    }

    generateBalanceHistory(days) {
        const labels = [];
        const nairaData = [];
        const cryptoData = [];

        let nairaBalance = 50000;
        let cryptoBalance = 100;

        for (let i = days; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

            // Random walk with trend
            nairaBalance += (Math.random() - 0.45) * 3000;
            nairaBalance = Math.max(10000, nairaBalance);
            nairaData.push(Math.round(nairaBalance));

            cryptoBalance += (Math.random() - 0.48) * 10;
            cryptoBalance = Math.max(50, cryptoBalance);
            cryptoData.push(Math.round(cryptoBalance * 10) / 10);
        }

        return { labels, nairaData, cryptoData };
    }

    generateTransactionVolume(weeks) {
        const labels = [];
        const transfers = [];
        const giftcards = [];
        const crypto = [];
        const bills = [];

        for (let i = weeks; i >= 1; i--) {
            labels.push(`Week ${weeks - i + 1}`);
            transfers.push(Math.floor(Math.random() * 15) + 5);
            giftcards.push(Math.floor(Math.random() * 10) + 3);
            crypto.push(Math.floor(Math.random() * 8) + 2);
            bills.push(Math.floor(Math.random() * 12) + 4);
        }

        return { labels, transfers, giftcards, crypto, bills };
    }

    generateCryptoPortfolio() {
        return {
            labels: ['Bitcoin', 'Ethereum', 'USDT', 'BNB', 'Others'],
            data: [40, 30, 15, 10, 5],
            values: [800, 600, 300, 200, 100] // USD values
        };
    }

    generateEarnings(months) {
        const labels = [];
        const data = [];

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonth = new Date().getMonth();

        for (let i = months - 1; i >= 0; i--) {
            const monthIndex = (currentMonth - i + 12) % 12;
            labels.push(monthNames[monthIndex]);
            data.push(Math.floor(Math.random() * 5000) + 3000);
        }

        return { labels, data };
    }

    // ============================================
    // CHART INITIALIZATION
    // ============================================

    initializeCharts() {
        // Balance History Chart
        this.initBalanceChart();

        // Transaction Volume Chart
        this.initTransactionVolumeChart();

        // Crypto Portfolio Chart
        this.initCryptoPortfolioChart();

        // Earnings Chart
        this.initEarningsChart();

        // Setup period selectors
        this.setupPeriodSelectors();

        // Listen for theme changes
        this.watchThemeChanges();
    }

    initBalanceChart() {
        const canvas = document.getElementById('balanceHistoryChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const isDark = document.documentElement.classList.contains('dark-theme');

        this.charts.balanceHistory = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.mockData.balanceHistory.labels.slice(-30),
                datasets: [
                    {
                        label: 'Naira Wallet',
                        data: this.mockData.balanceHistory.nairaData.slice(-30),
                        borderColor: '#A97458',
                        backgroundColor: 'rgba(169, 116, 88, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        borderWidth: 2
                    },
                    {
                        label: 'Crypto Wallet (USD)',
                        data: this.mockData.balanceHistory.cryptoData.slice(-30),
                        borderColor: '#4A2E23',
                        backgroundColor: 'rgba(74, 46, 35, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: isDark ? '#F8FAFC' : '#1B1B1B'
                        }
                    },
                    tooltip: {
                        backgroundColor: isDark ? '#1E293B' : 'rgba(27, 27, 27, 0.95)',
                        titleColor: '#F8FAFC',
                        bodyColor: '#F8FAFC',
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';

                                if (context.datasetIndex === 0) {
                                    label += '₦' + context.parsed.y.toLocaleString();
                                } else {
                                    label += '$' + context.parsed.y.toLocaleString();
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: isDark ? '#94a3b8' : '#64748b',
                            maxTicksLimit: 8
                        }
                    },
                    y: {
                        grid: {
                            color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            color: isDark ? '#94a3b8' : '#64748b',
                            callback: function (value) {
                                return '₦' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    initTransactionVolumeChart() {
        const canvas = document.getElementById('transactionVolumeChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const isDark = document.documentElement.classList.contains('dark-theme');

        this.charts.transactionVolume = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.mockData.transactionVolume.labels,
                datasets: [
                    {
                        label: 'Transfers',
                        data: this.mockData.transactionVolume.transfers,
                        backgroundColor: '#A97458',
                        borderRadius: 6
                    },
                    {
                        label: 'Gift Cards',
                        data: this.mockData.transactionVolume.giftcards,
                        backgroundColor: '#E8C7A3',
                        borderRadius: 6
                    },
                    {
                        label: 'Crypto',
                        data: this.mockData.transactionVolume.crypto,
                        backgroundColor: '#4A2E23',
                        borderRadius: 6
                    },
                    {
                        label: 'Bills',
                        data: this.mockData.transactionVolume.bills,
                        backgroundColor: '#F0E0CC',
                        borderRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: isDark ? '#F8FAFC' : '#1B1B1B'
                        }
                    },
                    tooltip: {
                        backgroundColor: isDark ? '#1E293B' : 'rgba(27, 27, 27, 0.95)',
                        padding: 12,
                        cornerRadius: 8
                    }
                },
                scales: {
                    x: {
                        stacked: false,
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: isDark ? '#94a3b8' : '#64748b'
                        }
                    },
                    y: {
                        stacked: false,
                        grid: {
                            color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            color: isDark ? '#94a3b8' : '#64748b',
                            stepSize: 5
                        }
                    }
                }
            }
        });
    }

    initCryptoPortfolioChart() {
        const canvas = document.getElementById('cryptoPortfolioChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const isDark = document.documentElement.classList.contains('dark-theme');

        this.charts.cryptoPortfolio = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.mockData.cryptoPortfolio.labels,
                datasets: [{
                    data: this.mockData.cryptoPortfolio.data,
                    backgroundColor: [
                        '#F7931A', // Bitcoin
                        '#627EEA', // Ethereum
                        '#26A17B', // USDT
                        '#F3BA2F', // BNB
                        '#94a3b8'  // Others
                    ],
                    borderWidth: 2,
                    borderColor: isDark ? '#1E293B' : '#FFFFFF'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: isDark ? '#F8FAFC' : '#1B1B1B',
                            padding: 12,
                            generateLabels: (chart) => {
                                const data = chart.data;
                                return data.labels.map((label, i) => ({
                                    text: `${label} (${data.datasets[0].data[i]}%)`,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    hidden: false,
                                    index: i
                                }));
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: isDark ? '#1E293B' : 'rgba(27, 27, 27, 0.95)',
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function (context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const usdValue = context.chart.data.datasets[0].values?.[context.dataIndex] || 0;
                                return `${label}: ${value}% ($${usdValue})`;
                            }
                        }
                    }
                },
                cutout: '65%'
            }
        });

        // Store USD values in dataset
        this.charts.cryptoPortfolio.data.datasets[0].values = this.mockData.cryptoPortfolio.values;
    }

    initEarningsChart() {
        const canvas = document.getElementById('earningsChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const isDark = document.documentElement.classList.contains('dark-theme');

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(169, 116, 88, 0.8)');
        gradient.addColorStop(1, 'rgba(169, 116, 88, 0.1)');

        this.charts.earnings = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.mockData.earnings.labels,
                datasets: [{
                    label: 'Monthly Earnings',
                    data: this.mockData.earnings.data,
                    backgroundColor: gradient,
                    borderColor: '#A97458',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: isDark ? '#1E293B' : 'rgba(27, 27, 27, 0.95)',
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function (context) {
                                return 'Earnings: ₦' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: isDark ? '#94a3b8' : '#64748b'
                        }
                    },
                    y: {
                        grid: {
                            color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            color: isDark ? '#94a3b8' : '#64748b',
                            callback: function (value) {
                                return '₦' + (value / 1000) + 'k';
                            }
                        }
                    }
                }
            }
        });
    }

    // ============================================
    // PERIOD SELECTOR
    // ============================================

    setupPeriodSelectors() {
        const periodButtons = document.querySelectorAll('[data-period]');
        periodButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const period = e.target.getAttribute('data-period');
                this.updatePeriod(period);

                // Update active button
                periodButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    updatePeriod(period) {
        this.currentPeriod = period;

        // Calculate number of days
        const days = {
            '7D': 7,
            '30D': 30,
            '90D': 90,
            '1Y': 365,
            'ALL': 90
        }[period] || 30;

        // Update balance history chart
        if (this.charts.balanceHistory) {
            this.charts.balanceHistory.data.labels = this.mockData.balanceHistory.labels.slice(-days);
            this.charts.balanceHistory.data.datasets[0].data = this.mockData.balanceHistory.nairaData.slice(-days);
            this.charts.balanceHistory.data.datasets[1].data = this.mockData.balanceHistory.cryptoData.slice(-days);
            this.charts.balanceHistory.update();
        }
    }

    // ============================================
    // THEME INTEGRATION
    // ============================================

    watchThemeChanges() {
        window.addEventListener('themeChanged', () => {
            this.updateChartsTheme();
        });
    }

    updateChartsTheme() {
        const isDark = document.documentElement.classList.contains('dark-theme');

        Object.values(this.charts).forEach(chart => {
            if (!chart) return;

            // Update legend colors
            if (chart.options.plugins.legend) {
                chart.options.plugins.legend.labels.color = isDark ? '#F8FAFC' : '#1B1B1B';
            }

            // Update tooltip colors
            if (chart.options.plugins.tooltip) {
                chart.options.plugins.tooltip.backgroundColor = isDark ? '#1E293B' : 'rgba(27, 27, 27, 0.95)';
            }

            // Update scales colors
            if (chart.options.scales) {
                Object.values(chart.options.scales).forEach(scale => {
                    if (scale.ticks) {
                        scale.ticks.color = isDark ? '#94a3b8' : '#64748b';
                    }
                    if (scale.grid) {
                        scale.grid.color = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
                    }
                });
            }

            // Update doughnut border colors
            if (chart.config.type === 'doughnut') {
                chart.data.datasets[0].borderColor = isDark ? '#1E293B' : '#FFFFFF';
            }

            chart.update();
        });
    }

    // ============================================
    // EXPORT FUNCTIONALITY
    // ============================================

    exportChart(chartName, format = 'png') {
        const chart = this.charts[chartName];
        if (!chart) return;

        const link = document.createElement('a');
        link.download = `${chartName}-${new Date().getTime()}.${format}`;
        link.href = chart.toBase64Image();
        link.click();
    }
}

// Initialize charts manager
const chartsManager = new ChartsManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = chartsManager;
}
